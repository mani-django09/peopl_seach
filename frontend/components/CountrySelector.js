import { useState, useRef, useEffect } from 'react'

const COUNTRIES = [
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', popular: true },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', popular: true },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', popular: true },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', popular: true },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪', popular: true },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷', popular: true },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹', popular: false },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸', popular: false },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱', popular: false },
  { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪', popular: false },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭', popular: false },
  { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹', popular: false },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪', popular: false },
  { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴', popular: false },
  { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰', popular: false },
  { code: 'FI', name: 'Finland', dialCode: '+358', flag: '🇫🇮', popular: false },
  { code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱', popular: false },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420', flag: '🇨🇿', popular: false },
  { code: 'HU', name: 'Hungary', dialCode: '+36', flag: '🇭🇺', popular: false },
  { code: 'RO', name: 'Romania', dialCode: '+40', flag: '🇷🇴', popular: false },
  { code: 'GR', name: 'Greece', dialCode: '+30', flag: '🇬🇷', popular: false },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹', popular: false },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪', popular: false },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵', popular: true },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷', popular: false },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳', popular: true },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳', popular: true },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬', popular: false },
  { code: 'HK', name: 'Hong Kong', dialCode: '+852', flag: '🇭🇰', popular: false },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾', popular: false },
  { code: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭', popular: false },
  { code: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭', popular: false },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩', popular: false },
  { code: 'VN', name: 'Vietnam', dialCode: '+84', flag: '🇻🇳', popular: false },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷', popular: true },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽', popular: true },
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷', popular: false },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱', popular: false },
  { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴', popular: false },
  { code: 'PE', name: 'Peru', dialCode: '+51', flag: '🇵🇪', popular: false },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦', popular: false },
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬', popular: false },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬', popular: false },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪', popular: false },
  { code: 'GH', name: 'Ghana', dialCode: '+233', flag: '🇬🇭', popular: false },
  { code: 'MA', name: 'Morocco', dialCode: '+212', flag: '🇲🇦', popular: false },
  { code: 'TN', name: 'Tunisia', dialCode: '+216', flag: '🇹🇳', popular: false },
  { code: 'IL', name: 'Israel', dialCode: '+972', flag: '🇮🇱', popular: false },
  { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷', popular: false },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦', popular: false },
  { code: 'AE', name: 'UAE', dialCode: '+971', flag: '🇦🇪', popular: false },
  { code: 'RU', name: 'Russia', dialCode: '+7', flag: '🇷🇺', popular: false },
  { code: 'UA', name: 'Ukraine', dialCode: '+380', flag: '🇺🇦', popular: false },
  { code: 'BY', name: 'Belarus', dialCode: '+375', flag: '🇧🇾', popular: false }
]

export default function CountrySelector({ 
  selectedCountry, 
  onCountryChange, 
  className = '',
  showDialCode = true,
  disabled = false 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef(null)
  const inputRef = useRef(null)

  const currentCountry = COUNTRIES.find(c => c.code === selectedCountry) || COUNTRIES[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filter countries based on search
  const filteredCountries = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Sort countries: popular first, then alphabetical
  const sortedCountries = [
    ...filteredCountries.filter(c => c.popular),
    ...filteredCountries.filter(c => !c.popular)
  ]

  const handleCountrySelect = (country) => {
    onCountryChange(country.code)
    setIsOpen(false)
    setSearchTerm('')
  }

  const handleToggleDropdown = () => {
    if (disabled) return
    setIsOpen(!isOpen)
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggleDropdown}
        disabled={disabled}
        className={`flex items-center space-x-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-l-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <span className="text-lg">{currentCountry.flag}</span>
        {showDialCode && (
          <span className="font-medium text-gray-700 text-sm min-w-[3rem]">
            {currentCountry.dialCode}
          </span>
        )}
        <svg 
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-hidden">
          
          {/* Search Input */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Countries List */}
          <div className="max-h-60 overflow-y-auto">
            {sortedCountries.length > 0 ? (
              <>
                {/* Popular Countries */}
                {sortedCountries.some(c => c.popular) && !searchTerm && (
                  <>
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 bg-gray-50">
                      Popular Countries
                    </div>
                    {sortedCountries
                      .filter(c => c.popular)
                      .map((country) => (
                        <button
                          key={`popular-${country.code}`}
                          onClick={() => handleCountrySelect(country)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 text-left transition-colors ${
                            selectedCountry === country.code ? 'bg-blue-100 text-blue-900' : 'text-gray-700'
                          }`}
                        >
                          <span className="text-lg">{country.flag}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{country.name}</div>
                          </div>
                          <span className="text-sm text-gray-500 font-mono">
                            {country.dialCode}
                          </span>
                        </button>
                      ))}
                  </>
                )}

                {/* Other Countries */}
                {sortedCountries.some(c => !c.popular) && !searchTerm && (
                  <div className="px-3 py-2 text-xs font-medium text-gray-500 bg-gray-50 border-t border-gray-100">
                    All Countries
                  </div>
                )}
                
                {sortedCountries
                  .filter(c => searchTerm || !c.popular)
                  .map((country) => (
                    <button
                      key={country.code}
                      onClick={() => handleCountrySelect(country)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 text-left transition-colors ${
                        selectedCountry === country.code ? 'bg-blue-100 text-blue-900' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{country.flag}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{country.name}</div>
                      </div>
                      <span className="text-sm text-gray-500 font-mono">
                        {country.dialCode}
                      </span>
                    </button>
                  ))}
              </>
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-sm">No countries found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Export country utilities
export const getCountryByCode = (code) => {
  return COUNTRIES.find(c => c.code === code) || COUNTRIES[0]
}

export const getCountryByDialCode = (dialCode) => {
  return COUNTRIES.find(c => c.dialCode === dialCode) || null
}

export const getPopularCountries = () => {
  return COUNTRIES.filter(c => c.popular)
}

export const getAllCountries = () => {
  return COUNTRIES
}