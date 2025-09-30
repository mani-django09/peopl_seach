// pages/address/[address].js
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'

export default function AddressResultsPage() {
  const router = useRouter()
  const { address } = router.query
  const [addressData, setAddressData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!address) return

    const fetchAddressData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Parse the address from URL (format: street_city_state or street_city_state_zip)
        const decodedAddress = decodeURIComponent(address)
        const addressParts = decodedAddress.split('_')
        
        let street = ''
        let city = ''
        let state = ''
        let zipCode = ''

        if (addressParts.length >= 3) {
          street = addressParts[0]
          city = addressParts[1]
          state = addressParts[2]
          if (addressParts.length >= 4) zipCode = addressParts[3]
        }

        const params = new URLSearchParams({
          street,
          city,
          state,
          ...(zipCode && { zip_code: zipCode })
        })

        const apiUrls = [
          `http://localhost:8000/api/search/address/?${params}`,
          `http://127.0.0.1:8000/api/search/address/?${params}`
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
          setAddressData(response)
        } else {
          setError('No results found')
        }
        
      } catch (err) {
        setError('Search failed')
      } finally {
        setLoading(false)
      }
    }

    setTimeout(fetchAddressData, 1200)
  }, [address])

  const handleNewSearch = () => router.push('/address-lookup')
  const handleGetFullReport = () => {
    if (addressData?.affiliate_url) {
      window.open(addressData.affiliate_url, '_blank', 'noopener,noreferrer')
    }
  }

  if (loading) {
    return (
      <Layout title={`Searching ${address ? decodeURIComponent(address).replace(/_/g, ', ') : ''}...`}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md mx-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-6"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Searching Property Records</h2>
            <p className="text-gray-600">Looking up {address ? decodeURIComponent(address).replace(/_/g, ', ') : ''}...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error || !addressData) {
    return (
      <Layout title="Error - Address Search">
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Results Found</h2>
              <p className="text-gray-600 mb-6">{error || 'No data available for this address'}</p>
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

  const property = addressData.property
  const fullAddress = property.address.formatted

  return (
    <Layout title={`${fullAddress} - Property Information | NumberLookup.us`}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <button onClick={handleNewSearch} className="hover:text-blue-600">Address Lookup</button>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900">{fullAddress}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Results */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
                {/* Header with Property Image */}
                <div className="relative h-64 bg-gradient-to-br from-blue-500 to-blue-700">
                  <img 
                    src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=400&fit=crop&q=80" 
                    alt={`Property at ${fullAddress}`}
                    className="w-full h-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-3xl font-bold mb-2">{fullAddress}</h1>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <span>Property Found</span>
                        </div>
                      </div>
                      <button 
                        onClick={handleNewSearch}
                        className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors backdrop-blur-sm"
                      >
                        New Search
                      </button>
                    </div>
                  </div>
                </div>

                {/* Property Value Cards */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-blue-700 mb-1">Estimated Value</p>
                      <p className="text-2xl font-bold text-blue-900">{property.value.estimated_value}</p>
                      <p className="text-xs text-blue-600 mt-1">{property.value.price_per_sqft}/sqft</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                      <p className="text-sm text-green-700 mb-1">Tax Assessment</p>
                      <p className="text-2xl font-bold text-green-900">{property.value.tax_assessment}</p>
                      <p className="text-xs text-green-600 mt-1">{property.tax_info.tax_year}</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                      <p className="text-sm text-purple-700 mb-1">Annual Tax</p>
                      <p className="text-2xl font-bold text-purple-900">{property.tax_info.annual_tax}</p>
                      <p className="text-xs text-purple-600 mt-1">Property tax</p>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Property Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Property Type', value// Continuation of [address].js

: property.details.property_type },
                        { label: 'Year Built', value: property.details.year_built },
                        { label: 'Square Feet', value: `${property.details.square_feet.toLocaleString()} sqft` },
                        { label: 'Lot Size', value: property.details.lot_size },
                        { label: 'Bedrooms', value: property.details.bedrooms },
                        { label: 'Bathrooms', value: property.details.bathrooms },
                        { label: 'Stories', value: property.details.stories },
                        { label: 'Garage', value: property.details.garage },
                        { label: 'Heating', value: property.details.heating },
                        { label: 'Cooling', value: property.details.cooling }
                      ].map((item, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <p className="text-xs text-gray-600 mb-1">{item.label}</p>
                          <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Owner Information */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Property Owner
                    </h3>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-lg font-bold text-gray-900 mb-2">{property.owner.name}</p>
                          <div className="space-y-1 text-sm">
                            <p className="text-gray-700"><span className="font-medium">Type:</span> {property.owner.owner_type}</p>
                            <p className="text-gray-700"><span className="font-medium">Ownership:</span> {property.owner.ownership_years}</p>
                            <p className="text-gray-700"><span className="font-medium">Mailing:</span> {property.owner.mailing_address}</p>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {property.owner.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current Residents */}
                  {property.residents && property.residents.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Current Residents
                      </h3>
                      <div className="space-y-3">
                        {property.residents.map((resident, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="font-bold text-gray-900 mb-2">{resident.name}</p>
                                <div className="flex flex-wrap gap-3 text-sm">
                                  <span className="text-gray-600">
                                    <span className="font-medium">Age:</span> {resident.age_range}
                                  </span>
                                  <span className="text-gray-600">
                                    <span className="font-medium">Residence:</span> {resident.length_of_residence}
                                  </span>
                                </div>
                                {resident.phone_numbers && resident.phone_numbers.length > 0 && (
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {resident.phone_numbers.map((phone, pidx) => (
                                      <span key={pidx} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        {phone}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <svg className="w-5 h-5 text-green-600 flex-shrink-0 ml-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sale History */}
                  {property.sale_history && property.sale_history.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Sale History
                      </h3>
                      <div className="space-y-3">
                        {property.sale_history.map((sale, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-between">
                            <div>
                              <p className="font-bold text-gray-900">{sale.date}</p>
                              <p className="text-sm text-gray-600">{sale.type}</p>
                            </div>
                            <p className="text-xl font-bold text-green-600">{sale.price}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Past Residents */}
                  {property.past_residents && property.past_residents.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Past Residents
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {property.past_residents.map((resident, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <p className="font-semibold text-gray-900">{resident.name}</p>
                            <p className="text-sm text-gray-600">Lived: {resident.years_lived}</p>
                            <p className="text-xs text-gray-500">Age: {resident.age_range}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Neighborhood Info */}
                  {property.neighborhood && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        Neighborhood Information
                      </h3>
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {[
                            { label: 'School Rating', value: property.neighborhood.school_rating, icon: '🎓' },
                            { label: 'Crime Rating', value: property.neighborhood.crime_rating, icon: '🛡️' },
                            { label: 'Walkability', value: property.neighborhood.walkability_score, icon: '🚶' },
                            { label: 'Transit Score', value: property.neighborhood.transit_score, icon: '🚌' },
                            { label: 'Median Value', value: property.neighborhood.median_home_value, icon: '🏘️' },
                            { label: 'Median Rent', value: property.neighborhood.median_rent, icon: '💵' }
                          ].map((item, index) => (
                            <div key={index} className="text-center">
                              <div className="text-2xl mb-1">{item.icon}</div>
                              <p className="text-xs text-gray-600 mb-1">{item.label}</p>
                              <p className="font-bold text-gray-900">{item.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tax Information */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Tax Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Parcel Number</p>
                          <p className="font-semibold text-gray-900">{property.tax_info.parcel_number}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Tax Year</p>
                          <p className="font-semibold text-gray-900">{property.tax_info.tax_year}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Demo Notice */}
                  {addressData.message && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-blue-800">{addressData.message}</p>
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
                  Search Another Address
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
                  <h3 className="text-lg font-bold">Get Complete Property Report</h3>
                </div>
                
                <p className="text-green-100 mb-4 text-sm">
                  Unlock comprehensive property information:
                </p>
                
                <ul className="space-y-2 text-sm text-green-100 mb-6">
                  {[
                    'Full ownership history',
                    'Complete resident records',
                    'Detailed sale history',
                    'Property liens & judgments',
                    'Building permits',
                    'HOA information',
                    'Utility details',
                    'Flood zone data',
                    'Environmental records',
                    'Mortgage information'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg className="w-4 h-4 text-green-300 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
                  Get Full Property Report →
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