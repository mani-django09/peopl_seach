import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'

export default function PeopleResultsPage() {
  const router = useRouter()
  const { name } = router.query
  const [searchResults, setSearchResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!name) return

    const fetchPeopleData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Parse the name from URL (format: firstname_lastname or firstname_lastname_city_state)
        const decodedName = decodeURIComponent(name)
        const nameParts = decodedName.split('_')
        
        let firstName = ''
        let lastName = ''
        let city = ''
        let state = ''

        if (nameParts.length >= 2) {
          firstName = nameParts[0]
          lastName = nameParts[1]
          if (nameParts.length >= 3) city = nameParts[2]
          if (nameParts.length >= 4) state = nameParts[3]
        }

        const params = new URLSearchParams({
          first_name: firstName,
          last_name: lastName,
          ...(city && { city }),
          ...(state && { state })
        })

        const apiUrls = [
          `http://localhost:8000/api/search/people/?${params}`,
          `http://127.0.0.1:8000/api/search/people/?${params}`
        ]

        let response = null
        for (const apiUrl of apiUrls) {
          try {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 10000)
            
            const res = await fetch(apiUrl, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              mode: 'cors',
              signal: controller.signal
            })
            
            clearTimeout(timeoutId)
            
            if (res.ok) {
              response = await res.json()
              break
            }
          } catch (fetchError) {
            continue
          }
        }

        if (response && response.success) {
          setSearchResults(response)
        } else {
          setError('No results found')
        }
        
      } catch (err) {
        setError('Search failed')
      } finally {
        setLoading(false)
      }
    }

    setTimeout(fetchPeopleData, 1200)
  }, [name])

  const handleNewSearch = () => router.push('/people-search')
  const handleGetFullReport = () => {
    if (searchResults?.affiliate_url) {
      window.open(searchResults.affiliate_url, '_blank', 'noopener,noreferrer')
    }
  }

  if (loading) {
    return (
      <Layout title={`Searching ${name ? decodeURIComponent(name).replace(/_/g, ' ') : ''}...`}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md mx-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Searching People Records</h2>
            <p className="text-gray-600">Looking up {name ? decodeURIComponent(name).replace(/_/g, ' ') : ''}...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error || !searchResults) {
    return (
      <Layout title="Error - People Search">
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Results Found</h2>
              <p className="text-gray-600 mb-6">{error || 'No data available for this search'}</p>
              <button 
                onClick={handleNewSearch} 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try New Search
              </button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  const person = searchResults.results[0]
  const fullName = searchResults.query.full_name

  return (
    <Layout title={`${fullName} - People Search Results | NumberLookup.us`}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <button onClick={handleNewSearch} className="hover:text-blue-600">People Search</button>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900">{fullName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Results */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{fullName}</h1>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span>Results Found</span>
                      </div>
                    </div>
                    <button 
                      onClick={handleNewSearch}
                      className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                    >
                      New Search
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Basic Info Cards */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-blue-700">Age Range</p>
                          <p className="font-bold text-blue-900">{person.age}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-green-700">Location</p>
                          <p className="font-bold text-green-900">{person.current_address.city}, {person.current_address.state}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current Address */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Current Address
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-gray-900 font-medium">{person.current_address.street}</p>
                      <p className="text-gray-600">{person.current_address.city}, {person.current_address.state} {person.current_address.zip}</p>
                    </div>
                  </div>

                  {/* Phone Numbers */}
                  {person.phone_numbers && person.phone_numbers.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Phone Numbers
                      </h3>
                      <div className="space-y-2">
                        {person.phone_numbers.map((phone, pidx) => (
                          <div key={pidx} className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-between">
                            <div>
                              <p className="text-gray-900 font-medium">{phone.number}</p>
                              <p className="text-sm text-gray-600">{phone.type} • {phone.carrier}</p>
                            </div>
                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Relatives */}
                  {person.relatives && person.relatives.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Possible Relatives
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <ul className="space-y-2">
                          {person.relatives.map((relative, ridx) => (
                            <li key={ridx} className="flex items-center space-x-2">
                              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                              <span className="text-gray-700">{relative}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Email Addresses */}
                  {person.email_addresses && person.email_addresses.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email Addresses
                      </h3>
                      <div className="space-y-2">
                        {person.email_addresses.map((email, eidx) => (
                          <div key={eidx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <p className="text-gray-900 font-medium">{email}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Past Addresses */}
                  {person.past_addresses && person.past_addresses.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Past Addresses
                      </h3>
                      <div className="space-y-2">
                        {person.past_addresses.map((addr, aidx) => (
                          <div key={aidx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <p className="text-gray-900 font-medium">{addr.street}</p>
                            <p className="text-gray-600">{addr.city}, {addr.state} {addr.zip}</p>
                            <p className="text-sm text-gray-500 mt-1">Lived here: {addr.years}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Demo Notice */}
                  {searchResults.message && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                      <div className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-blue-800">{searchResults.message}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-4">
                <button 
                  onClick={handleNewSearch} 
                  className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl hover:border-gray-400 transition-colors"
                >
                  Search Another Person
                </button>
                <button 
                  onClick={() => window.location.reload()} 
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Refresh Results
                </button>
              </div>
            </div>

            {/* Sidebar with Affiliate */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-xl sticky top-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">Get Complete Report</h3>
                </div>
                
                <p className="text-green-100 mb-4 text-sm">
                  Unlock full background information:
                </p>
                
                <ul className="space-y-2 text-sm text-green-100 mb-6">
                  {[
                    'Complete address history',
                    'All phone numbers',
                    'Email addresses',
                    'Criminal records',
                    'Court records',
                    'Social media profiles',
                    'Property records',
                    'Business affiliations'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg className="w-4 h-4 text-green-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={handleGetFullReport}
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