import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function ReverseAddressLookupPage() {
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchCount, setSearchCount] = useState(1247583)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchCount(prev => prev + Math.floor(Math.random() * 4) + 2)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!street.trim() || !city.trim() || !state.trim()) {
      setError('Please enter street address, city, and state')
      return
    }

    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Create URL format: street_city_state or street_city_state_zip
      let urlAddress = `${street.trim()}_${city.trim()}_${state.trim()}`
      if (zipCode.trim()) {
        urlAddress += `_${zipCode.trim()}`
      }

      // Redirect to results page
      router.push(`/address/${encodeURIComponent(urlAddress)}`)
    } catch (err) {
      setError('An error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const faqData = [
    {
      question: 'What is reverse address lookup?',
      answer: 'Reverse address lookup is a service that allows you to search for detailed information about a property using its street address. Our address search tool finds property records, ownership details, residents, value estimates, and more from public records databases.'
    },
    
    {
      question: 'Is reverse address lookup free?',
      answer: 'Yes! Our basic reverse address lookup service is completely free. Enter any address to get property information, estimated value, and resident data at no cost. For detailed background reports and complete ownership history, premium options are available.'
    },
    
    
    {
      question: 'How accurate is your address lookup service?',
      answer: 'Our address search database contains over 150 million property records updated regularly from county assessors, deed recordings, and public databases. The address finder delivers highly accurate property information with 99%+ reliability for valid US addresses.'
    },
   
    {
      question: 'Do I need to register to use the address finder?',
      answer: 'No registration required! Our address lookup service is instantly accessible. Simply enter an address in the address search box and get immediate results. No account creation, no sign-up process needed for basic address finder searches.'
    },
    {
      question: 'Can I search addresses in any US state?',
      answer: 'Yes! Our reverse address lookup covers all 50 US states and territories. The address search database includes urban, suburban, and rural properties. Whether you need an address finder for New York or California, our service provides accurate nationwide coverage.'
    }
  ]

  return (
    <Layout 
      title="Free Reverse Address Lookup - Address Search & Address Finder | NumberLookup.us"
      description="Free reverse address lookup service. Use our address search and address finder to discover property records, owners, residents, and values for any US address instantly."
    >
      {/* Hero Section */}
      <section className="bg-white py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8">
            

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Free Reverse Address Lookup
            </h1>
            <p className="text-base text-gray-600">
              <strong>Address search</strong> made easy. Find property records, owners, and residents with our <strong>address finder</strong>.
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden max-w-3xl mx-auto">
            {/* Tabs */}
            <div className="border-b border-gray-200 bg-gray-50">
              <div className="flex">
                <button
                  type="button"
                  onClick={() => router.push('/people-search')}
                  className="flex-1 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  People Search
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/reverse-phone-lookup')}
                  className="flex-1 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Reverse Phone
                </button>
                <button
                  type="button"
                  className="flex-1 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-blue-600 bg-white border-b-3 border-blue-600"
                >
                  Reverse Address
                </button>
              </div>
            </div>

            {/* Search Form */}
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Street Address (e.g., 123 Main St)"
                      className="w-full pl-11 pr-4 py-3 text-base border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="px-4 py-3 text-base border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="px-4 py-3 text-base border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  >
                    <option value="">Select State</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                    placeholder="ZIP Code (Optional)"
                    maxLength={5}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>

                {error && (
                  <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-xs text-red-800">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-base hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition-all shadow-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Searching Address...
                    </span>
                  ) : (
                    'Search Address'
                  )}
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-3">
                By clicking "Search" you agree to our{' '}
                <a href="/terms" className="text-blue-600 hover:underline">Terms</a> and{' '}
                <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-xs text-gray-600">
              <strong>Reverse address lookup</strong> • <strong>Address search</strong> • <strong>Address finder</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Trusted Address Lookup Since 2000
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Address Search<br />Made Simple
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Our <strong className="text-gray-900">reverse address lookup</strong> tool helps you discover 
                  property information instantly. Use our <strong className="text-gray-900">address finder</strong> to 
                  search property records, find owners, and verify residents.
                </p>
                <p>
                  With our comprehensive <strong className="text-gray-900">address search</strong> database, 
                  you can access property values, ownership history, tax records, and neighborhood data for 
                  any US address in seconds.
                </p>
                <p className="text-base text-gray-600">
                  Join over <strong className="text-blue-600">15 million users</strong> who trust our 
                  address lookup service for accurate, comprehensive property information.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">150M+</div>
                  <div className="text-sm text-gray-600">Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">99.9%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">Instant</div>
                  <div className="text-sm text-gray-600">Results</div>
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&h=500&fit=crop&q=80" 
                    alt="Reverse address lookup - find property records and owners"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                    <div className="flex items-center space-x-4 text-white">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold">Complete Property Information</div>
                        <div className="text-sm text-gray-200">Search any address in the USA</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              What You'll Discover with<br />Address Lookup
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive property and resident information with our address search tool
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ),
                color: 'blue',
                title: 'Property Owners',
                items: ['Current Owner Name', 'Ownership History', 'Contact Information', 'Length of Ownership']
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                color: 'green',
                title: 'Property Details',
                items: ['Square Footage', 'Lot Size', 'Year Built', 'Bedrooms & Baths']
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                color: 'purple',
                title: 'Property Value',
                items: ['Estimated Value', 'Tax Assessment', 'Sale History', 'Market Trends']
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                color: 'orange',
                title: 'Residents',
                items: ['Current Residents', 'Past Residents', 'Age Information', 'Phone Numbers']
              }
            ].map((item, index) => (
              <div key={index} className={`bg-gradient-to-br from-${item.color}-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-${item.color}-100`}>
                <div className={`inline-flex p-3 bg-${item.color}-100 rounded-xl mb-5`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <ul className="space-y-3">
                  {item.items.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className={`w-5 h-5 text-${item.color}-600 mr-3 mt-0.5 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700 leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Use Reverse Address Lookup?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our address finder helps with various real-world scenarios
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🏠',
                title: 'Verify Property Information',
                description: 'Use address search to confirm property details before buying or renting. Our address lookup provides accurate property records and owner information.'
              },
              {
                icon: '🔍',
                title: 'Find Property Owners',
                description: 'Our reverse address lookup helps you identify property owners for business, legal, or personal reasons with our comprehensive address finder.'
              },
              {
                icon: '💰',
                title: 'Research Property Values',
                description: 'Get estimated property values and tax assessments with our address search tool. Compare neighborhood prices and market trends.'
              },
              {
                icon: '👥',
                title: 'Identify Neighbors',
                description: 'Use our address lookup to find information about neighbors or verify who lives at a specific address for safety and community purposes.'
              },
              {
                icon: '📊',
                title: 'Investment Research',
                description: 'Real estate investors use our address finder to research properties, analyze market values, and identify investment opportunities.'
              },
              {
                icon: '🛡️',
                title: 'Background Checks',
                description: 'Verify addresses during background checks. Our reverse address search provides resident history and property ownership records.'
              }
            ].map((useCase, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600 leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about reverse address lookup, address search, and address finder
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-white border-2 rounded-2xl overflow-hidden transition-all ${
                  expandedFaq === index 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300 shadow-sm'
                }`}
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-6 text-left flex items-start justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-8 leading-relaxed">{faq.question}</span>
                  <div className={`flex-shrink-0 mt-1 transition-transform duration-300 ${
                    expandedFaq === index ? 'transform rotate-180' :// Continuation of reverse-address-lookup.js

                    ''
                  }`}>
                    <svg 
                      className="w-6 h-6 text-blue-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedFaq === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-8 pb-6 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed pt-6 text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Our Address Lookup Works
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to comprehensive property information
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Enter Address',
                description: 'Type the street address, city, and state into our address search form. Add ZIP code for more precise results.',
                image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&q=80'
              },
              {
                step: '2',
                title: 'Search Database',
                description: 'Our address finder instantly searches 150+ million property records, tax assessments, and public databases.',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&q=80'
              },
              {
                step: '3',
                title: 'Get Results',
                description: 'View complete property details, owner information, residents, values, and history in seconds with our address lookup.',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop&q=80'
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                  {step.step}
                </div>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <img 
                    src={step.image}
                    alt={`${step.title} - Address search step ${step.step}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Address Search Features
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need from a reverse address lookup service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏘️', title: 'Neighborhood Data', description: 'School ratings, crime stats, demographics' },
              { icon: '📜', title: 'Property Records', description: 'Deed information, permits, violations' },
              { icon: '💵', title: 'Tax Information', description: 'Property taxes, assessments, exemptions' },
              { icon: '📈', title: 'Market Analysis', description: 'Price trends, comparable sales' },
              { icon: '🔒', title: 'Ownership History', description: 'Previous owners, sale dates, prices' },
              { icon: '📏', title: 'Property Specs', description: 'Size, age, features, improvements' },
              { icon: '🗺️', title: 'Location Details', description: 'GPS coordinates, parcel ID, zoning' },
              { icon: '⚡', title: 'Instant Results', description: 'Real-time data, no waiting' }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors border border-gray-200">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                150M+
              </div>
              <div className="text-sm text-gray-600">Property Records</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                50 States
              </div>
              <div className="text-sm text-gray-600">Full Coverage</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                24/7
              </div>
              <div className="text-sm text-gray-600">Always Available</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                99.9%
              </div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Search an Address?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Use our reverse address lookup to find property information instantly. Free address search with comprehensive results from 150M+ records.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Start Address Lookup
          </button>
          <p className="text-blue-200 mt-6 text-sm">
            Free address finder • No registration required • Instant results
          </p>
        </div>
      </section>

      {/* Bottom Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              About Our Reverse Address Lookup Service
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              NumberLookup.us provides the most comprehensive <strong>reverse address lookup</strong> and <strong>address search</strong> service 
              available online. Our advanced <strong>address finder</strong> technology searches through over 150 million property records 
              to deliver accurate, detailed information about any residential or commercial address in the United States.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Whether you need to verify property information, find property owners, research real estate investments, or simply learn more 
              about a neighborhood, our <strong>address lookup</strong> tool provides instant access to public records, property details, 
              ownership history, and resident information. Our <strong>address search</strong> database is updated regularly to ensure 
              you receive the most current and accurate property data available.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our <strong>reverse address search</strong> service is trusted by millions of users including real estate professionals, 
              investors, homebuyers, legal professionals, and individuals conducting background checks or verifying addresses. 
              The <strong>address finder</strong> provides comprehensive results including property values, tax assessments, ownership 
              records, resident names, and detailed property specifications.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Start your free <strong>address lookup</strong> today and discover why NumberLookup.us is America's most trusted 
              <strong>address search</strong> and <strong>reverse address lookup</strong> service. With nationwide coverage, 
              instant results, and no registration required, finding property information has never been easier.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}