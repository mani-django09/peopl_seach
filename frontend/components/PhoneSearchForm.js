import { useState } from 'react'
import { useRouter } from 'next/router'

export default function PhoneSearchForm({ 
  initialValue = '', 
  onSearchStart, 
  className = '',
  size = 'large' // 'small', 'medium', 'large'
}) {
  const [phoneNumber, setPhoneNumber] = useState(initialValue)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join('-')
    }
    return value
  }

  const handleInputChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
    setError('')
  }

  const validatePhoneNumber = (phone) => {
    if (!phone) return { isValid: false, error: 'Phone number is required' }
    
    const cleaned = phone.replace(/[^\d]/g, '')
    
    if (cleaned.length < 10) return { isValid: false, error: 'Please enter a complete 10-digit phone number' }
    if (cleaned.length > 11) return { isValid: false, error: 'Phone number is too long' }
    
    return { isValid: true, cleaned }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (onSearchStart) {
      onSearchStart(phoneNumber)
    }

    try {
      const validation = validatePhoneNumber(phoneNumber)
      if (!validation.isValid) {
        setError(validation.error)
        setIsLoading(false)
        return
      }

      const cleanedNumber = validation.cleaned.replace(/[^\d]/g, '')
      
      // Add a slight delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800))
      
      router.push(`/phone/${cleanedNumber}`)
    } catch (err) {
      setError('An error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  // Size variants
  const sizeClasses = {
    small: {
      container: 'p-4',
      input: 'py-2 text-base',
      button: 'py-2 px-4 text-sm',
      label: 'text-base mb-2'
    },
    medium: {
      container: 'p-6',
      input: 'py-3 text-lg',
      button: 'py-3 px-6 text-base',
      label: 'text-lg mb-3'
    },
    large: {
      container: 'p-8',
      input: 'py-4 text-lg',
      button: 'py-4 px-8 text-lg',
      label: 'text-lg mb-4'
    }
  }

  const currentSize = sizeClasses[size] || sizeClasses.large

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${currentSize.container} ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="phone-search" className={`block font-semibold text-gray-900 text-left ${currentSize.label}`}>
            Enter Phone Number
          </label>
          
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            
            <input
              type="text"
              id="phone-search"
              value={phoneNumber}
              onChange={handleInputChange}
              placeholder="555-123-4567"
              className={`w-full pl-12 pr-4 border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${currentSize.input} ${
                error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              disabled={isLoading}
            />
            
            {isLoading && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !phoneNumber.trim()}
          className={`w-full bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${currentSize.button}`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Searching...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center space-x-2">
              <span>Search Phone Number</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          )}
        </button>
      </form>
    </div>
  )
}

// Utility function to export
export const formatPhoneDisplay = (phoneNumber) => {
  if (!phoneNumber) return ''
  const cleaned = phoneNumber.replace(/[^\d]/g, '')
  
  if (cleaned.length === 10) {
    return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6)}`
  }
  
  if (cleaned.length === 11 && cleaned[0] === '1') {
    const usDigits = cleaned.substring(1)
    return `+1 (${usDigits.substring(0, 3)}) ${usDigits.substring(3, 6)}-${usDigits.substring(6)}`
  }
  
  return phoneNumber
}