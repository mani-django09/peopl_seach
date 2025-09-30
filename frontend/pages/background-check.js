import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function BackgroundCheckPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchCount, setSearchCount] = useState(1547892)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchCount(prev => prev + Math.floor(Math.random() * 4) + 1)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter both first and last name')
      return
    }

    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      let urlName = `${firstName.trim()}_${lastName.trim()}`
      if (city.trim()) {
        urlName += `_${city.trim()}`
      }
      if (state.trim()) {
        urlName += `_${state.trim()}`
      }

      router.push(`/background-check/${encodeURIComponent(urlName)}`)
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
      question: 'What is a background check?',
      answer: 'A background check is a comprehensive search of public records to verify someone\'s identity, history, and credentials. It includes criminal records, employment history, education verification, credit reports, and more from various databases and public sources.'
    },
    
    {
      question: 'How long does a background check take?',
      answer: 'Most background checks are completed instantly or within minutes. However, comprehensive reports that include multiple jurisdictions and detailed records may take 24-48 hours for complete results.'
    },
    {
      question: 'Are background checks legal?',
      answer: 'Yes, background checks using public records are legal. However, they cannot be used for employment screening, credit decisions, or housing under the Fair Credit Reporting Act (FCRA). Our service is for personal informational purposes only.'
    },
    {
      question: 'How accurate are background checks?',
      answer: 'We compile information from federal, state, and county public records with 99%+ accuracy. However, records can contain errors or be outdated. We recommend verifying important information through official channels.'
    },
    
    {
      question: 'What is the difference between a background check and people search?',
      answer: 'People search finds contact information and basic details, while background checks provide comprehensive criminal records, court documents, financial records, and detailed history. Background checks are more thorough and include legal and financial information.'
    },
    
  ]

  return (
    <Layout 
      title="Background Check - Criminal Records & Public Records Search | NumberLookup.us"
      description="Comprehensive background checks with criminal records, court records, and public records. Search anyone's background instantly with our detailed background check service."
    >
      {/* Hero Section - Compact */}
      <section className="bg-white py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8">
            

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Comprehensive Background Check
            </h1>
            <p className="text-base text-gray-600">
              Search <strong>criminal records</strong>, court records, and public records instantly
            </p>
          </div>

          {/* Search Box - Compact */}
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden max-w-3xl mx-auto">
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name *"
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name *"
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      disabled={isLoading}
                      required
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
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold text-base hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 transition-all shadow-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Searching Records...
                    </span>
                  ) : (
                    'Run Background Check'
                  )}
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-3">
                By clicking "Run Background Check" you agree to our{' '}
                <a href="/terms" className="text-purple-600 hover:underline">Terms</a> and{' '}
                <a href="/privacy" className="text-purple-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>

          {/* FCRA Notice - Compact */}
          <div className="max-w-3xl mx-auto mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-lg">
            <div className="flex items-start">
              <svg className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-xs text-gray-700">
                <strong>FCRA Notice:</strong> This is NOT a consumer report and cannot be used for employment, credit, 
                housing decisions, or any FCRA-regulated purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Trusted Since 2000
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Comprehensive<br />Background Reports
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-gray-900">Search criminal records</strong> and public records instantly 
                  with our comprehensive background check service. Get detailed reports on anyone in the United States.
                </p>
                <p>
                  Our <strong className="text-gray-900">background check service</strong> searches millions 
                  of records including court documents, property records, and criminal history databases.
                </p>
                <p className="text-base text-gray-600">
                  Join over <strong className="text-purple-600">10 million users</strong> who trust our background 
                  check service for accurate, confidential searches.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">100M+</div>
                  <div className="text-sm text-gray-600">Records</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">99%</div>
                  <div className="text-sm text-gray-600">Accurate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">Instant</div>
                  <div className="text-sm text-gray-600">Results</div>
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80" 
                    alt="Background check - criminal records search"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                    <div className="flex items-center space-x-4 text-white">
                      <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold">Comprehensive Reports</div>
                        <div className="text-sm text-gray-200">Criminal records & public records</div>
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
              What's Included in a<br />Background Check?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive public records information at your fingertips
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                ),
                color: 'purple',
                title: 'Criminal Records',
                items: ['Felony convictions', 'Misdemeanors', 'Arrest records', 'Sex offender status']
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                color: 'blue',
                title: 'Court Records',
                items: ['Civil cases', 'Traffic violations', 'Judgments & liens', 'Small claims']
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                color: 'green',
                title: 'Property Records',
                items: ['Property ownership', 'Foreclosures', 'Deed transfers', 'Property values']
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                color: 'orange',
                title: 'Personal Info',
                items: ['Phone numbers', 'Email addresses', 'Relatives', 'Associates']
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

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about background checks
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-white border-2 rounded-2xl overflow-hidden transition-all ${
                  expandedFaq === index 
                    ? 'border-purple-500 shadow-lg' 
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
                      className="w-6 h-6 text-purple-600" 
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

      {/* CTA */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Run a Background Check?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Get comprehensive criminal records, court records, and public records instantly
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Start Background Check Now
          </button>
        </div>
      </section>
    </Layout>
  )
}