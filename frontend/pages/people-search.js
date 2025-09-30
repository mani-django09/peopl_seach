import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function PeopleSearchPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (router.query.name) {
      const nameParts = decodeURIComponent(router.query.name).split(' ')
      if (nameParts.length >= 2) {
        setFirstName(nameParts[0])
        setLastName(nameParts.slice(1).join(' '))
      } else {
        setFirstName(nameParts[0] || '')
      }
    }
  }, [router.query])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!firstName.trim() && !lastName.trim()) {
      setError('Please enter at least a first or last name')
      return
    }

    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800))

      // Create URL format: firstname_lastname or firstname_lastname_city_state
      let urlName = `${firstName.trim()}_${lastName.trim()}`
      if (city.trim()) {
        urlName += `_${city.trim()}`
      }
      if (state.trim()) {
        urlName += `_${state.trim()}`
      }

      // Redirect to results page
      router.push(`/people/${encodeURIComponent(urlName)}`)
      
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
      question: 'How do I do a free people search?',
      answer: 'Simply enter the person\'s first and last name in our true people search tool above. Our free people search service will search through millions of public records to find contact information, addresses, and more. You can also add city and state for more accurate results.'
    },
    {
      question: 'What is true people search and how does it work?',
      answer: 'True people search is a comprehensive search tool that finds real, verified information about people from public records databases. Our fast people search engine scans millions of records including addresses, phone numbers, relatives, and more to provide accurate results.'
    },
    {
      question: 'Is this a fast people search service?',
      answer: 'Yes! Our fast people search technology delivers results in seconds. Search people free by name and get instant access to public records, contact information, and background data.'
    },
    {
      question: 'Can I search people free without paying?',
      answer: 'Absolutely! Our people search free service allows you to search people free by entering their name. Basic information is available at no cost. For comprehensive background reports with detailed records, premium options are available.'
    },
    
    {
      question: 'How accurate is your free people search?',
      answer: 'Our people search free database contains over 250 million records and is updated regularly. We use true people search technology to ensure high accuracy rates. Results are compiled from public records, phone directories, and other verified sources.'
    },
    
  ]

  return (
    <Layout 
      title="True People Search - Fast People Search Free | Find Anyone"
      description="Free people search by name. True people search engine with 250M+ records. Fast people search - find anyone free. Search people free with our comprehensive people finder."
    >
      {/* Hero Section - Compact */}
      <section className="bg-white py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              True People Search - Find Anyone Fast
            </h1>
            <p className="text-base text-gray-600">
              Free people search by name. <strong>Search people free</strong> with our fast people search engine.
            </p>
          </div>

          {/* Search Box - Compact */}
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden max-w-3xl mx-auto">
            {/* Tabs */}
            <div className="border-b border-gray-200 bg-gray-50">
              <div className="flex">
                <button
                  type="button"
                  className="flex-1 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-blue-600 bg-white border-b-3 border-blue-600"
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
                  onClick={() => router.push('/address-lookup')}
                  className="flex-1 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Reverse Address
                </button>
              </div>
            </div>

            {/* Search Form - Compact */}
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City (Optional)"
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isLoading}
                    >
                      <option value="">State (Optional)</option>
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
                      Searching...
                    </span>
                  ) : (
                    'Search People Free'
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
              <strong>True people search</strong> • <strong>Fast people search</strong> • <strong>Free people search</strong>
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
                Trusted True People Search Since 2000
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Fast People Search<br />Free & Accurate
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Our <strong className="text-gray-900">true people search</strong> engine helps you find anyone quickly. 
                  Use our <strong className="text-gray-900">free people search</strong> to discover contact information, 
                  addresses, relatives, and more.
                </p>
                <p>
                  <strong className="text-gray-900">Search people free</strong> by name and get instant results from our 
                  comprehensive database. Our <strong className="text-gray-900">fast people search</strong> technology 
                  delivers accurate information in seconds.
                </p>
                <p className="text-base text-gray-600">
                  Join over <strong className="text-blue-600">50 million users</strong> who trust our people search free 
                  service to find accurate, up-to-date information about anyone in the USA.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">250M+</div>
                  <div className="text-sm text-gray-600">People Records</div>
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
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=500&fit=crop" 
                    alt="True people search - fast people search free"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                    <div className="flex items-center space-x-4 text-white">
                      <div className="flex -space-x-3">
                        <div className="w-12 h-12 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center font-semibold">TP</div>
                        <div className="w-12 h-12 rounded-full bg-green-500 border-2 border-white flex items-center justify-center font-semibold">FP</div>
                        <div className="w-12 h-12 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center font-semibold">PS</div>
                      </div>
                      <div>
                        <div className="font-semibold">50M+ Users Trust Our Free People Search</div>
                        <div className="text-sm text-gray-200">Search people free - find anyone in the US</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Use Our True People Search?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The most comprehensive fast people search engine - search people free with verified results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Fast People Search',
                description: 'Get instant results in seconds. Our fast people search technology scans 250M+ records to find anyone quickly.'
              },
              {
                icon: '✓',
                title: 'True People Search',
                description: 'Verified and accurate data. Our true people search delivers real information from trusted public records.'
              },
              {
                icon: '🆓',
                title: 'Free People Search',
                description: 'Search people free with no hidden costs. Our people search free service provides instant access to public records.'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              People Search FAQs
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about free people search, true people search, and fast people search
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
                    expandedFaq === index ? 'transform rotate-180' : ''
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

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Someone?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Use our true people search to search people free. Fast people search with instant results from 250M+ records.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Start Free People Search
          </button>
        </div>
      </section>
    </Layout>
  )
}