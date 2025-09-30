// components/AffiliateCard.js
import { useState } from 'react'

export default function AffiliateCard({ affiliateUrl, onAffiliateClick, phoneNumber }) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (onAffiliateClick) {
      onAffiliateClick()
    }
    
    // Open affiliate link in new tab
    window.open(affiliateUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg p-6 text-white shadow-lg">
      <div className="flex items-center mb-4">
        <div className="bg-white/20 rounded-full p-2 mr-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold">Get Full Background Report</h3>
      </div>
      
      <p className="text-blue-100 mb-4 text-sm">
        Get comprehensive information including:
      </p>
      
      <ul className="space-y-2 text-sm text-blue-100 mb-6">
        <li className="flex items-center">
          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Criminal Records Check
        </li>
        <li className="flex items-center">
          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Social Media Profiles
        </li>
        <li className="flex items-center">
          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Relatives & Associates
        </li>
      </ul>
      
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-full bg-white text-blue-600 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
          isHovered ? 'bg-blue-50 transform scale-105' : 'hover:bg-blue-50'
        }`}
      >
        Start Background Check →
      </button>
      
      <p className="text-xs text-blue-200 mt-3 text-center">
        Trusted by millions • Instant results • 100% confidential
      </p>
    </div>
  )
}
