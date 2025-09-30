// frontend/utils/phoneUtils.js

/**
 * Clean phone number by removing all non-digit characters except +
 */
export function cleanPhoneNumber(phoneNumber) {
  if (!phoneNumber) return ''
  return phoneNumber.replace(/[^\d+]/g, '')
}

/**
 * Validate phone number format
 */
export function validatePhoneNumber(phoneNumber) {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return {
      isValid: false,
      error: 'Phone number is required',
      cleaned: ''
    }
  }

  const cleaned = cleanPhoneNumber(phoneNumber.trim())
  
  if (!cleaned) {
    return {
      isValid: false,
      error: 'Please enter a valid phone number',
      cleaned: ''
    }
  }

  // Check for basic length requirements
  const digitsOnly = cleaned.replace(/\+/g, '')
  
  if (digitsOnly.length < 7) {
    return {
      isValid: false,
      error: 'Phone number is too short',
      cleaned: cleaned
    }
  }

  if (digitsOnly.length > 15) {
    return {
      isValid: false,
      error: 'Phone number is too long',
      cleaned: cleaned
    }
  }

  // US phone number validation
  if (isUSPhoneNumber(cleaned)) {
    const usValidation = validateUSPhoneNumber(cleaned)
    if (!usValidation.isValid) {
      return usValidation
    }
  }

  // Check for obviously invalid patterns
  if (hasInvalidPatterns(digitsOnly)) {
    return {
      isValid: false,
      error: 'Please enter a valid phone number',
      cleaned: cleaned
    }
  }

  return {
    isValid: true,
    error: null,
    cleaned: cleaned
  }
}

/**
 * Check if phone number appears to be US number
 */
function isUSPhoneNumber(phoneNumber) {
  const digits = phoneNumber.replace(/[^\d]/g, '')
  
  // 10 digits (standard US) or 11 digits starting with 1 (US with country code)
  return (digits.length === 10) || (digits.length === 11 && digits[0] === '1')
}

/**
 * Validate US phone number specifically
 */
function validateUSPhoneNumber(phoneNumber) {
  const digits = phoneNumber.replace(/[^\d]/g, '')
  
  let areaCode, exchange, number
  
  if (digits.length === 10) {
    areaCode = digits.substring(0, 3)
    exchange = digits.substring(3, 6)
    number = digits.substring(6)
  } else if (digits.length === 11 && digits[0] === '1') {
    areaCode = digits.substring(1, 4)
    exchange = digits.substring(4, 7)
    number = digits.substring(7)
  } else {
    return {
      isValid: false,
      error: 'US phone numbers must be 10 digits or 11 digits starting with 1',
      cleaned: phoneNumber
    }
  }

  // Area code validation
  if (areaCode[0] === '0' || areaCode[0] === '1') {
    return {
      isValid: false,
      error: 'Invalid area code - cannot start with 0 or 1',
      cleaned: phoneNumber
    }
  }

  // Exchange validation
  if (exchange[0] === '0' || exchange[0] === '1') {
    return {
      isValid: false,
      error: 'Invalid exchange code - cannot start with 0 or 1',
      cleaned: phoneNumber
    }
  }

  return {
    isValid: true,
    error: null,
    cleaned: phoneNumber
  }
}

/**
 * Check for invalid patterns
 */
function hasInvalidPatterns(digits) {
  // All same digits
  if (new Set(digits).size === 1) {
    return true
  }

  // Sequential numbers
  const sequential = '0123456789012345'
  if (sequential.includes(digits) || sequential.split('').reverse().join('').includes(digits)) {
    return true
  }

  // Common fake numbers
  const fakeNumbers = [
    '5551234567',
    '1234567890',
    '0000000000',
    '1111111111'
  ]
  
  return fakeNumbers.includes(digits)
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phoneNumber) {
  if (!phoneNumber) return ''

  const cleaned = cleanPhoneNumber(phoneNumber)
  const digits = cleaned.replace(/[^\d]/g, '')

  // US number formatting
  if (digits.length === 10) {
    return `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6)}`
  }

  if (digits.length === 11 && digits[0] === '1') {
    const usDigits = digits.substring(1)
    return `+1 (${usDigits.substring(0, 3)}) ${usDigits.substring(3, 6)}-${usDigits.substring(6)}`
  }

  // International number formatting
  if (phoneNumber.startsWith('+')) {
    return phoneNumber
  }

  // Fallback formatting
  if (digits.length > 6) {
    return `${digits.substring(0, 3)}-${digits.substring(3, 6)}-${digits.substring(6)}`
  }

  return phoneNumber
}

/**
 * Format phone number for URL/API calls
 */
export function formatPhoneForAPI(phoneNumber) {
  const cleaned = cleanPhoneNumber(phoneNumber)
  const digits = cleaned.replace(/[^\d]/g, '')

  // Add country code for US numbers if missing
  if (digits.length === 10) {
    return `+1${digits}`
  }

  if (digits.length === 11 && digits[0] === '1') {
    return `+${digits}`
  }

  // Return as-is for international numbers with +
  if (cleaned.startsWith('+')) {
    return cleaned
  }

  // Fallback
  return `+${digits}`
}