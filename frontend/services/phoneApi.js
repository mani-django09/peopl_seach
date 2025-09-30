/**
 * API service layer for phone lookup operations
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

class PhoneApiService {
  constructor() {
    this.baseURL = API_BASE_URL
    this.timeout = 10000 // 10 seconds
  }

  /**
   * Generic API request handler with error handling and timeout
   */
  async makeRequest(endpoint, options = {}) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - please try again')
      }
      
      throw error
    }
  }

  /**
   * Search phone number information
   */
  async searchPhoneNumber(phoneNumber, countryCode = 'US') {
    try {
      // Format phone number for API
      const formattedNumber = this.formatPhoneForApi(phoneNumber, countryCode)
      
      const data = await this.makeRequest(`/api/search/phone/${encodeURIComponent(formattedNumber)}/`)
      
      // Track search for analytics
      this.trackSearch(phoneNumber, countryCode, data.valid)
      
      return {
        success: true,
        data: {
          ...data,
          searchTimestamp: new Date().toISOString(),
          countryCode: countryCode
        }
      }
    } catch (error) {
      console.error('Phone search error:', error)
      return {
        success: false,
        error: error.message || 'Search failed',
        fallbackData: this.generateFallbackData(phoneNumber, countryCode)
      }
    }
  }

  /**
   * Format phone number for API calls
   */
  formatPhoneForApi(phoneNumber, countryCode) {
    const cleaned = phoneNumber.replace(/[^\d]/g, '')
    
    // Get country dial code
    const countryData = this.getCountryData(countryCode)
    const dialCode = countryData?.dialCode?.replace('+', '') || '1'
    
    // Format based on country
    switch (countryCode) {
      case 'US':
      case 'CA':
        if (cleaned.length === 10) {
          return `+1${cleaned}`
        }
        if (cleaned.length === 11 && cleaned[0] === '1') {
          return `+${cleaned}`
        }
        return `+1${cleaned}`
        
      default:
        // For international numbers, prepend country code if not present
        if (cleaned.startsWith(dialCode)) {
          return `+${cleaned}`
        }
        return `+${dialCode}${cleaned}`
    }
  }

  /**
   * Generate fallback data when API fails
   */
  generateFallbackData(phoneNumber, countryCode) {
    const countryData = this.getCountryData(countryCode)
    
    return {
      number: phoneNumber,
      valid: true,
      country_code: countryCode,
      country_name: countryData?.name || 'Unknown',
      location: 'API temporarily unavailable',
      carrier: 'Information not available',
      line_type: 'unknown',
      source: 'fallback',
      cached: false,
      error: 'Using fallback data - limited information available'
    }
  }

  /**
   * Get country data by code
   */
  getCountryData(countryCode) {
    const countries = {
      'US': { name: 'United States', dialCode: '+1' },
      'CA': { name: 'Canada', dialCode: '+1' },
      'GB': { name: 'United Kingdom', dialCode: '+44' },
      'AU': { name: 'Australia', dialCode: '+61' },
      'DE': { name: 'Germany', dialCode: '+49' },
      'FR': { name: 'France', dialCode: '+33' },
      'JP': { name: 'Japan', dialCode: '+81' },
      'IN': { name: 'India', dialCode: '+91' },
      'BR': { name: 'Brazil', dialCode: '+55' },
      'MX': { name: 'Mexico', dialCode: '+52' }
    }
    
    return countries[countryCode]
  }

  /**
   * Track search for analytics (non-blocking)
   */
  async trackSearch(phoneNumber, countryCode, success) {
    try {
      // Don't block main request for analytics
      setTimeout(async () => {
        try {
          await this.makeRequest('/api/track/search/', {
            method: 'POST',
            body: JSON.stringify({
              phone_number: phoneNumber,
              country_code: countryCode,
              success: success,
              timestamp: new Date().toISOString(),
              user_agent: navigator.userAgent,
              referrer: document.referrer || window.location.href
            })
          })
        } catch (error) {
          // Silently fail analytics
          console.warn('Analytics tracking failed:', error)
        }
      }, 100)
    } catch (error) {
      // Silently fail analytics
    }
  }

  /**
   * Track affiliate clicks
   */
  async trackAffiliateClick(searchLogId, affiliateUrl) {
    try {
      return await this.makeRequest('/api/track/affiliate-click/', {
        method: 'POST',
        body: JSON.stringify({
          search_log_id: searchLogId,
          affiliate_name: 'truthfinder',
          affiliate_url: affiliateUrl,
          click_timestamp: new Date().toISOString()
        })
      })
    } catch (error) {
      console.warn('Affiliate tracking failed:', error)
      return { success: false }
    }
  }

  /**
   * Get API health status
   */
  async getHealthStatus() {
    try {
      return await this.makeRequest('/api/health/')
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
        timestamp: new Date().toISOString()
      }
    }
  }

  /**
   * Validate phone number format
   */
  validatePhoneNumber(phoneNumber, countryCode) {
    if (!phoneNumber || !phoneNumber.trim()) {
      return {
        isValid: false,
        error: 'Phone number is required'
      }
    }

    const cleaned = phoneNumber.replace(/[^\d]/g, '')

    // Country-specific validation
    switch (countryCode) {
      case 'US':
      case 'CA':
        if (cleaned.length < 10) {
          return { isValid: false, error: 'US/Canada numbers must be 10 digits' }
        }
        if (cleaned.length > 11) {
          return { isValid: false, error: 'Phone number is too long' }
        }
        // Check for invalid area codes
        if (cleaned[0] === '0' || cleaned[0] === '1') {
          return { isValid: false, error: 'Invalid area code' }
        }
        break

      case 'GB':
        if (cleaned.length < 10 || cleaned.length > 11) {
          return { isValid: false, error: 'UK numbers must be 10-11 digits' }
        }
        break

      case 'AU':
        if (cleaned.length < 9 || cleaned.length > 10) {
          return { isValid: false, error: 'Australian numbers must be 9-10 digits' }
        }
        break

      case 'DE':
        if (cleaned.length < 10 || cleaned.length > 12) {
          return { isValid: false, error: 'German numbers must be 10-12 digits' }
        }
        break

      case 'FR':
        if (cleaned.length !== 10) {
          return { isValid: false, error: 'French numbers must be 10 digits' }
        }
        break

      case 'JP':
        if (cleaned.length < 10 || cleaned.length > 11) {
          return { isValid: false, error: 'Japanese numbers must be 10-11 digits' }
        }
        break

      case 'IN':
        if (cleaned.length !== 10) {
          return { isValid: false, error: 'Indian numbers must be 10 digits' }
        }
        break

      default:
        if (cleaned.length < 7) {
          return { isValid: false, error: 'Phone number too short' }
        }
        if (cleaned.length > 15) {
          return { isValid: false, error: 'Phone number too long' }
        }
    }

    return { isValid: true, cleaned }
  }

  /**
   * Get example phone number for country
   */
  getExampleNumber(countryCode) {
    const examples = {
      'US': '408-123-4567',
      'CA': '416-123-4567',
      'GB': '20 1234 5678',
      'AU': '2 1234 5678',
      'DE': '30 12345678',
      'FR': '1 23 45 67 89',
      'JP': '3-1234-5678',
      'IN': '98765 43210',
      'BR': '11 91234-5678',
      'MX': '55 1234 5678'
    }
    
    return examples[countryCode] || '123456789'
  }

  /**
   * Get phone number formatting rules for country
   */
  getFormattingRules(countryCode) {
    const rules = {
      'US': { pattern: 'XXX-XXX-XXXX', length: 10 },
      'CA': { pattern: 'XXX-XXX-XXXX', length: 10 },
      'GB': { pattern: 'XX XXXX XXXX', length: 10 },
      'AU': { pattern: 'X XXXX XXXX', length: 9 },
      'DE': { pattern: 'XXX XXXXXXXX', length: 11 },
      'FR': { pattern: 'X XX XX XX XX', length: 10 },
      'JP': { pattern: 'X-XXXX-XXXX', length: 10 },
      'IN': { pattern: 'XXXXX XXXXX', length: 10 }
    }
    
    return rules[countryCode] || { pattern: 'XXXXXXXXX', length: 9 }
  }
}

// Export singleton instance
export default new PhoneApiService()

// Export utility functions
export const formatPhoneDisplay = (phoneNumber, countryCode = 'US') => {
  if (!phoneNumber) return ''
  
  const cleaned = phoneNumber.replace(/[^\d]/g, '')
  
  switch (countryCode) {
    case 'US':
    case 'CA':
      if (cleaned.length === 10) {
        return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6)}`
      }
      break
    case 'GB':
      if (cleaned.length === 11) {
        return `${cleaned.substring(0, 2)} ${cleaned.substring(2, 6)} ${cleaned.substring(6)}`
      }
      break
    case 'AU':
      if (cleaned.length === 9) {
        return `${cleaned.substring(0, 1)} ${cleaned.substring(1, 5)} ${cleaned.substring(5)}`
      }
      break
  }
  
  return phoneNumber
}

export const getCountryFromDialCode = (phoneNumber) => {
  const cleaned = phoneNumber.replace(/[^\d]/g, '')
  
  if (cleaned.startsWith('1')) return 'US'
  if (cleaned.startsWith('44')) return 'GB'
  if (cleaned.startsWith('61')) return 'AU'
  if (cleaned.startsWith('49')) return 'DE'
  if (cleaned.startsWith('33')) return 'FR'
  if (cleaned.startsWith('81')) return 'JP'
  if (cleaned.startsWith('91')) return 'IN'
  
  return 'US' // Default fallback
}