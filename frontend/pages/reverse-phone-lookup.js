import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function ReversePhoneLookupPage() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchCount, setSearchCount] = useState(847291)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchCount(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
    if (match) {
      const parts = [match[1], match[2], match[3]].filter(Boolean)
      if (parts.length === 1) return parts[0]
      if (parts.length === 2) return `(${parts[0]}) ${parts[1]}`
      if (parts.length === 3) return `(${parts[0]}) ${parts[1]}-${parts[2]}`
    }
    return value
  }

  const handleInputChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
    setError('')
  }

  const validateUSPhoneNumber = (phone) => {
    if (!phone) {
      return { isValid: false, error: 'Phone number is required' }
    }
    
    const cleaned = phone.replace(/[^\d]/g, '')
    
    if (cleaned.length < 10) {
      return { isValid: false, error: 'Please enter a complete 10-digit phone number' }
    }
    
    if (cleaned.length > 10) {
      return { isValid: false, error: 'Phone number is too long. US numbers are 10 digits.' }
    }
    
    if (cleaned[0] === '0' || cleaned[0] === '1') {
      return { isValid: false, error: 'Area code cannot start with 0 or 1' }
    }
    
    if (cleaned[3] === '0' || cleaned[3] === '1') {
      return { isValid: false, error: 'Exchange code cannot start with 0 or 1' }
    }
    
    return { isValid: true, cleaned }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const validation = validateUSPhoneNumber(phoneNumber)
      if (!validation.isValid) {
        setError(validation.error)
        setIsLoading(false)
        return
      }

      const usNumber = `1${validation.cleaned}`
      await new Promise(resolve => setTimeout(resolve, 800))
      router.push(`/phone/${usNumber}`)
      
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
      question: "Is this reverse phone lookup service really free?",
      answer: "Yes, our basic reverse phone lookup service for US numbers is completely free. You can search any US phone number without registration or payment."
    },
    
    {
      question: "How accurate is the phone number information?",
      answer: "Our database is updated regularly with US carrier and location data. We provide highly accurate information for valid US phone numbers."
    },
    {
      question: "Do you support international numbers?",
      answer: "Currently, our service is optimized for US phone numbers only. International support may be added in the future."
    },
    
    {
      question: "What information will I get from a reverse phone lookup?",
      answer: "You'll receive location details (city, state), carrier information, line type (mobile/landline/VoIP), and verification status of the phone number."
    },
    {
      question: "Can I find the owner's name with reverse phone lookup?",
      answer: "Basic searches provide location and carrier info. For detailed owner information including names, you may need a premium background report."
    },
    
  ]

  return (
    <Layout 
      title="Free US Reverse Phone Lookup - Find Who Called You | NumberLookup.us"
      description="Free reverse phone lookup service for US phone numbers. Enter any US phone number to find caller ID, location, carrier information and more."
    >
      {/* Hero Section - Compact */}
      <section className="bg-white py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8">
            

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Free US Reverse Phone Lookup
            </h1>
            <p className="text-base text-gray-600">
              Find out <strong>who called you</strong>. Get instant caller information and location details.
            </p>
          </div>

          {/* Search Box - Compact */}
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
                  className="flex-1 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-blue-600 bg-white border-b-3 border-blue-600"
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
                <div className="mb-4">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    
                    <input
                      type="text"
                      id="phone"
                      value={phoneNumber}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      maxLength={14}
                      className={`w-full pl-11 pr-4 py-3 text-base border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        error ? 'border-red-300 bg-red-50' : ''
                      }`}
                      disabled={isLoading}
                    />
                    
                    {isLoading && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  
                  {error && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-xs text-red-800">{error}</p>
                    </div>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading || !phoneNumber.trim()}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-base hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition-all shadow-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Searching...
                    </span>
                  ) : (
                    'Search Phone Number'
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
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Trusted Since 2000
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Instant Phone Lookup<br />100% Free
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-gray-900">Find out who's calling</strong> with our comprehensive 
                  reverse phone lookup service. Get instant access to caller information, location details, 
                  and carrier data.
                </p>
                <p>
                  Our <strong className="text-gray-900">free phone lookup</strong> service searches millions 
                  of US phone records to help you identify unknown callers and verify phone numbers.
                </p>
                <p className="text-base text-gray-600">
                  Join over <strong className="text-blue-600">10 million users</strong> who trust our phone 
                  lookup service for accurate, up-to-date caller information.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">10M+</div>
                  <div className="text-sm text-gray-600">Numbers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">99.9%</div>
                  <div className="text-sm text-gray-600">Accurate</div>
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
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&h=500&fit=crop" 
                    alt="Phone lookup and caller identification"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                    <div className="flex items-center space-x-4 text-white">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold">Instant Caller ID</div>
                        <div className="text-sm text-gray-200">Identify any US phone number</div>
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
              What You'll Discover with<br />Reverse Phone Lookup
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive phone number information at your fingertips
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                color: 'blue',
                title: 'Location Details',
                items: ['City & State', 'Area Code', 'Time Zone', 'Region Info']
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                ),
                color: 'green',
                title: 'Carrier Info',
                items: ['Network Provider', 'Carrier Name', 'Service Type', 'Coverage Area']
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                color: 'purple',
                title: 'Line Type',
                items: ['Mobile/Landline', 'VoIP Status', 'Business/Personal', 'Number Type']
              },
              {
                icon: (
                  <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                color: 'orange',
                title: 'Verification',
                items: ['Number Status', 'Active/Inactive', 'Validity Check', 'Risk Assessment']
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
              Common questions about reverse phone lookup
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

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Out Who Called?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join millions who trust our free reverse phone lookup. Get instant caller information now.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Start Phone Lookup
          </button>
        </div>
      </section>
    </Layout>
  )
}