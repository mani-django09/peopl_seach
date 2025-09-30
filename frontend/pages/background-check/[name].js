// pages/background-check/[name].js
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'

export default function BackgroundCheckResultsPage() {
  const router = useRouter()
  const { name } = router.query
  const [backgroundData, setBackgroundData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!name) return

    const fetchBackgroundData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Parse the name from URL
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

        // In production, you would call your background check API here
        // For now, we'll simulate with mock data after a delay
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Mock background check data
        const mockData = {
          success: true,
          query: {
            first_name: firstName,
            last_name: lastName,
            city: city,
            state: state,
            full_name: `${firstName} ${lastName}`
          },
          subject: {
            name: `${firstName} ${lastName}`,
            age: '35-40',
            current_address: {
              street: '123 Main Street',
              city: city || 'New York',
              state: state || 'NY',
              zip: '10001'
            },
            aliases: ['John D.', 'Johnny Doe']
          },
          criminal_records: {
            summary: 'No serious criminal records found',
            records_found: 0,
            details: []
          },
          court_records: {
            civil_cases: 1,
            traffic_violations: 2,
            small_claims: 0,
            details: [
              {
                type: 'Civil Case',
                case_number: 'CV-2019-12345',
                date: '2019-05-15',
                court: 'County Superior Court',
                status: 'Closed',
                description: 'Contract Dispute'
              },
              {
                type: 'Traffic Violation',
                case_number: 'TR-2020-67890',
                date: '2020-08-22',
                court: 'Municipal Court',
                status: 'Resolved',
                description: 'Speeding - 15 over limit'
              }
            ]
          },
          property_records: [
            {
              address: '123 Main Street',
              city: city || 'New York',
              state: state || 'NY',
              ownership_type: 'Owner',
              value: '$450,000',
              purchase_date: '2018-03-10',
              purchase_price: '$420,000'
            }
          ],
          phone_numbers: [
            { number: '(555) 123-4567', type: 'Mobile', carrier: 'Verizon' },
            { number: '(555) 987-6543', type: 'Landline', carrier: 'AT&T' }
          ],
          email_addresses: [
            `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
            `${firstName.toLowerCase()}${lastName.toLowerCase()}@gmail.com`
          ],
          employment_history: [
            {
              company: 'Tech Corp Inc.',
              position: 'Senior Developer',
              years: '2015 - Present',
              location: 'New York, NY'
            },
            {
              company: 'StartUp LLC',
              position: 'Developer',
              years: '2012 - 2015',
              location: 'Boston, MA'
            }
          ],
          education: [
            {
              institution: 'State University',
              degree: 'Bachelor of Science',
              field: 'Computer Science',
              year: '2012'
            }
          ],
          relatives: [
            'Jane Doe (Spouse)',
            'John Doe Sr. (Parent)',
            'Emily Doe (Sibling)'
          ],
          social_media: [
            { platform: 'LinkedIn', url: 'linkedin.com/in/johndoe', verified: true },
            { platform: 'Facebook', url: 'facebook.com/johndoe', verified: false }
          ],
          bankruptcies: [],
          liens_judgments: [],
          sex_offender_check: 'Clear - Not on registry',
          report_date: new Date().toISOString().split('T')[0]
        }

        setBackgroundData(mockData)
        
      } catch (err) {
        setError('Failed to retrieve background check')
      } finally {
        setLoading(false)
      }
    }

    fetchBackgroundData()
  }, [name])

  const handleNewSearch = () => router.push('/background-check')
  const handleGetFullReport = () => {
    window.open('https://www.truthfinder.com/?a=default&o=100265&utm_source=numberlookup', '_blank', 'noopener,noreferrer')
  }

  if (loading) {
    return (
      <Layout title={`Running Background Check...`}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md mx-4">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Running Background Check</h2>
            <p className="text-gray-600 mb-4">Searching criminal records, court records, and public databases...</p>
            <div className="space-y-2 text-sm text-gray-500">
              <p className="flex items-center justify-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Searching criminal records
              </p>
              <p className="flex items-center justify-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Checking court records
              </p>
              <p className="flex items-center justify-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Verifying public records
              </p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (error || !backgroundData) {
    return (
      <Layout title="Error - Background Check">
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Background Check Failed</h2>
              <p className="text-gray-600 mb-6">{error || 'Unable to complete background check'}</p>
              <button 
                onClick={handleNewSearch} 
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Try New Search
              </button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  const fullName = backgroundData.query.full_name

  return (
    <Layout title={`Background Check: ${fullName} | NumberLookup.us`}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <button onClick={handleNewSearch} className="hover:text-purple-600">Background Check</button>
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
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-8 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="font-semibold">Background Check Report</span>
                      </div>
                      <h1 className="text-3xl font-bold mb-2">{fullName}</h1>
                      <p className="text-purple-100 text-sm">Report Date: {backgroundData.report_date}</p>
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
                  {/* Subject Information */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Subject Information
                    </h3>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 border border-purple-200">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Full Name</p>
                          <p className="font-semibold text-gray-900">{backgroundData.subject.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Age Range</p>
                          <p className="font-semibold text-gray-900">{backgroundData.subject.age}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-600 mb-1">Current Address</p>
                          <p className="font-semibold text-gray-900">
                            {backgroundData.subject.current_address.street}, {backgroundData.subject.current_address.city}, {backgroundData.subject.current_address.state} {backgroundData.subject.current_address.zip}
                          </p>
                        </div>
                        {backgroundData.subject.aliases.length > 0 && (
                          <div className="col-span-2">
                            <p className="text-sm text-gray-600 mb-1">Known Aliases</p>
                            <p className="font-semibold text-gray-900">{backgroundData.subject.aliases.join(', ')}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Criminal Records - PRIMARY FOCUS */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Criminal Records Check
                    </h3>
                    <div className={`rounded-lg p-5 border-2 ${
                      backgroundData.criminal_records.records_found === 0 
                        ? 'bg-green-50 border-green-300' 
                        : 'bg-red-50 border-red-300'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <svg className={`w-6 h-6 flex-shrink-0 mt-0.5 ${
                          backgroundData.criminal_records.records_found === 0 ? 'text-green-600' : 'text-red-600'
                        }`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="font-bold text-gray-900 text-lg mb-1">{backgroundData.criminal_records.summary}</p>
                          <p className="text-sm text-gray-700">
                            Our search found {backgroundData.criminal_records.records_found} serious criminal record(s) in federal, state, and county databases.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sex Offender Check */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Sex Offender Registry
                    </h3>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-300">
                      <p className="font-semibold text-green-900">{backgroundData.sex_offender_check}</p>
                    </div>
                  </div>

                  {/* Court Records */}
                  {backgroundData.court_records.details.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                        </svg>
                        Court Records
                      </h3>
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-3">
                        <p className="text-sm text-gray-700">
                          <strong>Summary:</strong> {backgroundData.court_records.civil_cases} Civil Case(s), {backgroundData.court_records.traffic_violations} Traffic Violation(s), {backgroundData.court_records.small_claims} Small Claim(s)
                        </p>
                      </div>
                      <div className="space-y-3">
                        {backgroundData.court_records.details.map((record, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-bold text-gray-900">{record.type}</p>
                                <p className="text-sm text-gray-600 mb-2">{record.description}</p>
                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                  <p><span className="font-medium">Case #:</span> {record.case_number}</p>
                                  <p><span className="font-medium">Date:</span> {record.date}</p>
                                  <p><span className="font-medium">Court:</span> {record.court}</p>
                                  <p><span className="font-medium">Status:</span> <span className="text-green-600 font-medium">{record.status}</span></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      {backgroundData.phone_numbers.map((phone, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{phone.number}</p>
                            <p className="text-sm text-gray-600">{phone.type} • {phone.carrier}</p>
                          </div>
                        </div>
                      ))}
                      {backgroundData.email_addresses.map((email, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <p className="font-semibold text-gray-900">{email}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Property Records */}
                  {backgroundData.property_records.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Property Records
                      </h3>
                      {backgroundData.property_records.map((property, index) => (
                        <div key={index} className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                          <p className="font-bold text-gray-900 mb-2">{property.address}, {property.city}, {property.state}</p>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-gray-600">Ownership</p>
                              <p className="font-semibold text-gray-900">{property.ownership_type}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Estimated Value</p>
                              <p className="font-semibold text-gray-900">{property.value}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Purchase Date</p>
                              <p className="font-semibold text-gray-900">{property.purchase_date}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Purchase Price</p>
                              <p className="font-semibold text-gray-900">{property.purchase_price}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Relatives */}
                  {backgroundData.relatives.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Possible Relatives
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <ul className="space-y-2">
                          {backgroundData.relatives.map((relative, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <svg className="w-4 h-4 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                              {relative}
                            </li>
                          ))}
                        </ul>
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
                  Run Another Check
                </button>
                <button 
                  onClick={() => window.print()} 
                  className="flex-1 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition-colors"
                >
                  Print Report
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-xl sticky top-8">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">Get Full Premium Report</h3>
                </div>
                
                <p className="text-green-100 mb-4 text-sm">
                  Unlock complete background information:
                </p>
                
                <ul className="space-y-2 text-sm text-green-100 mb-6">
                  {[
                    'Complete criminal history',
                    'All court records & cases',
                    'Financial records',
                    'Professional licenses',
                    'Social media profiles',
                    'Employment verification',
                    'Education records',
                    'Detailed property records',
                    'Bankruptcies & liens',
                    'Traffic violations'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg className="w-4 h-4 text-green-300// Continuation of background-check/[name].js - Sidebar completion and remaining sections

mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
                  Get Complete Report →
                </button>
                
                <p className="text-xs text-green-200 mt-3 text-center">
                  Instant access • 100% confidential • Money-back guarantee
                </p>
              </div>

              {/* Report Summary Card */}
              <div className="mt-6 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4">Report Summary</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Criminal Records</span>
                    <span className={`font-semibold ${
                      backgroundData.criminal_records.records_found === 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {backgroundData.criminal_records.records_found === 0 ? 'Clear' : `${backgroundData.criminal_records.records_found} Found`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Court Cases</span>
                    <span className="font-semibold text-gray-900">
                      {backgroundData.court_records.civil_cases + backgroundData.court_records.traffic_violations + backgroundData.court_records.small_claims}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Properties</span>
                    <span className="font-semibold text-gray-900">{backgroundData.property_records.length}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Phone Numbers</span>
                    <span className="font-semibold text-gray-900">{backgroundData.phone_numbers.length}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Email Addresses</span>
                    <span className="font-semibold text-gray-900">{backgroundData.email_addresses.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}