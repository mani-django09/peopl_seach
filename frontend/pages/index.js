import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function HomePage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchCount, setSearchCount] = useState(2847291)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchCount(prev => prev + Math.floor(Math.random() * 5) + 2)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

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
      
      let urlName = `${firstName.trim()}_${lastName.trim()}`
      if (city.trim()) {
        urlName += `_${city.trim()}`
      }
      if (state.trim()) {
        urlName += `_${state.trim()}`
      }

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
      question: 'How do I find someone\'s address online for free?',
      answer: 'You can use our free people search or address lookup features. Enter either the person\'s name or their phone number, and our fast people search system will search for associated addresses in our database.'
    },
    {
      question: 'How do I find an address using a phone number?',
      answer: 'Use our Reverse Phone Lookup feature. Enter the 10-digit phone number in the search box, and we\'ll provide you with location information, carrier details, and any available address information associated with that number.'
    },
    {
      question: 'What kind of real estate information can I find on peoplesearch?',
      answer: 'Our Address Lookup feature provides property records, ownership information, property values, and transaction history for residential and commercial properties across the United States.'
    },
    {
      question: 'Is there a Peoplesearch mobile app?',
      answer: 'Currently, FastPeopleSearches is available through our mobile-responsive website. You can access all features from any smartphone or tablet browser. A dedicated mobile app is in development.'
    },
    {
      question: 'How can a small business get updated addresses for its customer list?',
      answer: 'Small businesses can use our bulk lookup features to verify and update customer contact information. Please contact our business services team for enterprise solutions and pricing.'
    },
    {
      question: 'What additional features are available in Peoplesearch Premium?',
      answer: 'FastPeopleSearches Premium offers unlimited searches, detailed background reports, criminal records access, email addresses, social media profiles, and priority customer support.'
    }
  ]

  return (
    <Layout 
      title="Free People Search - True People Search & Fast People Search | FastPeopleSearches.us"
      description="Free people search by name. Search people free with our true people search engine. Find contact info, addresses, and more with fast people search. Over 250 million records."
    >
      {/* Hero Section */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Free People Search - Find Anyone Fast
            </h1>
            <p className="text-base text-gray-600">
              True people search engine trusted by millions. Search people free and get instant results.
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden max-w-4xl mx-auto">
            {/* Tabs */}
            <div className="border-b border-gray-200 bg-gray-50">
              <div className="flex">
                <button
                  type="button"
                  className="flex-1 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors text-blue-600 bg-white border-b-2 border-blue-600"
                >
                  People Search
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/reverse-phone-lookup')}
                  className="flex-1 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                >
                  Reverse Phone
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/address-lookup')}
                  className="flex-1 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                >
                  Reverse Address
                </button>
              </div>
            </div>

            {/* Search Form */}
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="px-4 py-3 text-base border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="px-4 py-3 text-base border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City (Optional)"
                    className="px-4 py-3 text-base border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="px-4 py-3 text-base border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                {error && (
                  <p className="mb-3 text-sm text-red-600">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading || (!firstName.trim() && !lastName.trim())}
                  className="w-full bg-blue-600 text-white px-8 py-3 rounded-md font-semibold text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </button>
              </form>
            </div>
          </div>

          <div className="text-center mt-6 text-xs text-gray-500 max-w-4xl mx-auto">
            <p>
              By using this site, you agree to our{' '}
              <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section with Image */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Trusted People Search Since 2000
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Find Anyone<br />Fast & Free
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Our <strong className="text-gray-900">true people search</strong> engine helps you find anyone quickly. 
                  Use our <strong className="text-gray-900">free people search</strong> to discover contact information, 
                  addresses, relatives, and more.
                </p>
                <p>
                  <strong className="text-gray-900">Search people free</strong> by name and get instant results from our 
                  comprehensive database of over 250 million records. Our <strong className="text-gray-900">fast people search</strong> technology 
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
                    src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop&q=80" 
                    alt="People search - find anyone free"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                    <div className="flex items-center space-x-4 text-white">
                      <div className="flex -space-x-3">
                        <div className="w-12 h-12 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center font-semibold">PS</div>
                        <div className="w-12 h-12 rounded-full bg-green-500 border-2 border-white flex items-center justify-center font-semibold">FS</div>
                        <div className="w-12 h-12 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center font-semibold">NL</div>
                      </div>
                      <div>
                        <div className="font-semibold">50M+ Users Trust FastPeopleSearches</div>
                        <div className="text-sm text-gray-200">Free people search - find anyone in the US</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Can I Find */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            What can you find with our free people search?
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-8 gap-y-6">
            {[
              { text: 'Cell phone numbers' },
              { text: 'Relatives' },
              { text: 'Current addresses' },
              { text: 'Past addresses' },
              { text: 'Landline numbers' },
              { text: 'Background checks' },
              { text: 'Email addresses' },
              { text: 'Age information' },
              { text: 'Maiden names' },
              { text: 'Property records' },
              { text: 'Carrier information' },
              { text: 'Social media profiles' },
              { text: 'Court records' },
              { text: 'Business info' },
              { text: 'Professional licenses' },
              { text: 'Associates' },
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Can I Use - With Images */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            How can I use FastPeopleSearches?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                image: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=400&h=300&fit=crop',
                title: 'Free People Search',
                description: 'Search people free by name, get contact info and more.',
                link: '/people-search'
              },
              {
                image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop',
                title: 'Reverse Phone Lookup',
                description: 'Enter a phone number to find who called you instantly.',
                link: '/reverse-phone-lookup'
              },
              {
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
                title: 'Address Lookup',
                description: 'Search for address and property records easily.',
                link: '/address-lookup'
              },
              {
                image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
                title: 'Background Check',
                description: 'Get comprehensive background reports and records.',
                link: '/background-check'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gray-200">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-blue-600 mb-2 hover:text-blue-700">
                    <a href={item.link}>{item.title}</a>
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - WITH EXPAND/COLLAPSE */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900 pr-4">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-blue-600 transition-transform duration-200 flex-shrink-0 ${
                      expandedFaq === index ? 'transform rotate-45' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                {expandedFaq === index && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is NumberLookup */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What is FastPeopleSearches?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8 text-sm">
            FastPeopleSearches is the leading true people search and fast people search engine, established to help you stay safe, connected and informed. 
            Our free people search provides comprehensive contact information, background checks, and accurate public records for 
            millions of people and businesses. Search people free to find contact info, verify identities, check backgrounds, 
            and reconnect with old friends. FastPeopleSearches has been featured on major tech publications and news outlets. 
            Use our people search free service to find anyone in the USA with our comprehensive directory.
          </p>
          <button 
            onClick={() => document.querySelector('input')?.focus()}
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Start a search
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {searchCount.toLocaleString()}+
              </div>
              <div className="text-sm text-gray-600">Searches Today</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">100M+</div>
              <div className="text-sm text-gray-600">Records Available</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">99.9%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Always Available</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}