import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'

export default function PhoneResultsPage() {
  const router = useRouter()
  const { number } = router.query
  const [phoneData, setPhoneData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return ''
    const cleaned = phoneNumber.replace(/[^\d]/g, '')
    
    if (cleaned.startsWith('91') && cleaned.length === 12) {
      const indian = cleaned.substring(2)
      return `+91 ${indian.substring(0, 5)} ${indian.substring(5)}`
    } else if (cleaned.startsWith('1') && cleaned.length === 11) {
      const us = cleaned.substring(1)
      return `+1 (${us.substring(0, 3)}) ${us.substring(3, 6)}-${us.substring(6)}`
    } else if (cleaned.length === 10) {
      if (['6', '7', '8', '9'].includes(cleaned[0])) {
        return `${cleaned.substring(0, 5)} ${cleaned.substring(5)}`
      } else {
        return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6)}`
      }
    }
    return phoneNumber
  }

  useEffect(() => {
    if (!number) return

    const fetchPhoneData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        let cleanedNumber = number.replace(/[^\d]/g, '')
        let phoneNumberForAPI = ''
        
        if (cleanedNumber.startsWith('91') && cleanedNumber.length === 12) {
          phoneNumberForAPI = `+${cleanedNumber}`
        } else if (cleanedNumber.startsWith('1') && cleanedNumber.length === 11) {
          phoneNumberForAPI = `+${cleanedNumber}`
        } else if (cleanedNumber.length === 10) {
          if (['6', '7', '8', '9'].includes(cleanedNumber[0])) {
            phoneNumberForAPI = `+91${cleanedNumber}`
          } else {
            phoneNumberForAPI = `+1${cleanedNumber}`
          }
        } else {
          phoneNumberForAPI = cleanedNumber.startsWith('+') ? cleanedNumber : `+${cleanedNumber}`
        }
        
        const apiUrls = [
          `http://localhost:8000/api/search/phone/${encodeURIComponent(phoneNumberForAPI)}/`,
          `http://127.0.0.1:8000/api/search/phone/${encodeURIComponent(phoneNumberForAPI)}/`
        ]
        
        let apiSuccess = false
        let data = null
        
        for (const apiUrl of apiUrls) {
          try {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 5000)
            
            const response = await fetch(apiUrl, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              mode: 'cors',
              signal: controller.signal
            })
            
            clearTimeout(timeoutId)
            
            if (response.ok) {
              data = await response.json()
              apiSuccess = true
              break
            }
          } catch (fetchError) {
            continue
          }
        }
        
        if (apiSuccess && data) {
          setPhoneData(data)
        } else {
          setError('Unable to fetch data')
        }
        
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    setTimeout(fetchPhoneData, 1200)
  }, [number])

  const handleNewSearch = () => router.push('/reverse-phone-lookup')
  const handleGetMoreInfo = () => {
    if (phoneData?.affiliate_url) {
      window.open(phoneData.affiliate_url, '_blank', 'noopener,noreferrer')
    }
  }

  if (loading) {
    return (
      <Layout title={`Searching ${formatPhoneNumber(number)}`}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md mx-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Searching Phone Number</h2>
            <p className="text-gray-600">Looking up {formatPhoneNumber(number)}...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error || !phoneData) {
    return (
      <Layout title="Error">
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to Lookup Number</h2>
              <p className="text-gray-600 mb-6">{error || 'No data available'}</p>
              <button onClick={handleNewSearch} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Try New Search
              </button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={`${phoneData.formatted_number || formatPhoneNumber(number)} - Results`}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <button onClick={handleNewSearch} className="hover:text-blue-600">Phone Lookup</button>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900">{phoneData.formatted_number || formatPhoneNumber(number)}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Results */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">
                        {phoneData.formatted_number || formatPhoneNumber(number)}
                      </h1>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span>Verified Number</span>
                      </div>
                    </div>
                    <button onClick={handleNewSearch} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg">
                      New Search
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-blue-700">Location</p>
                          <p className="font-bold text-blue-900">{phoneData.location || 'Unknown'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-green-700">Carrier</p>
                          <p className="font-bold text-green-900">{phoneData.carrier || 'Unknown'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-purple-700">Line Type</p>
                          <p className="font-bold text-purple-900 capitalize">{phoneData.line_type || 'Mobile'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-orange-700">Country</p>
                          <p className="font-bold text-orange-900">{phoneData.country_name || 'Unknown'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                      Data Source: <span className="font-medium text-gray-900">{phoneData.source}</span>
                      {phoneData.cached && <span className="ml-2 text-green-600">(Cached)</span>}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button onClick={handleNewSearch} className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl hover:border-gray-400">
                  Search Another Number
                </button>
                <button onClick={() => window.location.reload()} className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
                  Refresh Results
                </button>
              </div>
            </div>

            {/* Sidebar with Affiliate */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">Get Complete Report</h3>
                </div>
                
                <p className="text-green-100 mb-4 text-sm">
                  Unlock detailed background information:
                </p>
                
                <ul className="space-y-2 text-sm text-green-100 mb-6">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Full name and address history
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Criminal records check
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Social media profiles
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-green-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Relatives and associates
                  </li>
                </ul>
                
                <button
                  onClick={handleGetMoreInfo}
                  className="w-full bg-white text-green-600 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Get Full Background Report →
                </button>
                
                <p className="text-xs text-green-200 mt-3 text-center">
                  Instant access • 100% confidential • Money-back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}