import Layout from '../components/Layout'

export default function AboutPage() {
  return (
    <Layout 
      title="About Us - NumberLookup.us | True People Search Service"
      description="Learn about NumberLookup.us, the leading true people search and fast people search engine. Our mission is to help you find people, verify identities, and stay connected."
    >
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About NumberLookup.us
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              America's Most Trusted People Search Engine
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Founded in 2000, NumberLookup.us has been helping millions of people find accurate information 
                about individuals, verify identities, and reconnect with lost contacts. What started as a simple 
                phone directory has evolved into the most comprehensive <strong>true people search</strong> and 
                <strong> fast people search</strong> platform in the United States.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our <strong>free people search</strong> service was built on the principle that everyone deserves 
                access to public information to make informed decisions about the people in their lives. Whether 
                you're reconnecting with old friends, verifying a new acquaintance, or researching your family 
                history, NumberLookup provides the tools you need.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we serve over 50 million users annually, maintaining a database of 250+ million records 
                with 99.9% accuracy. Our commitment to providing reliable, fast, and free people search services 
                has made us the go-to resource for Americans seeking public records information.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Empowering people with instant access to accurate public records information
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Accuracy',
                  description: 'We maintain 99.9% accuracy by constantly updating our database with verified public records from trusted sources.'
                },
                {
                  icon: (
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: 'Speed',
                  description: 'Our fast people search technology delivers instant results, saving you time when you need information quickly.'
                },
                {
                  icon: (
                    <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ),
                  title: 'Privacy',
                  description: 'We respect your privacy and handle all searches confidentially. Your search history remains private and secure.'
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg text-center">
                  <div className="inline-flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What We Offer</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'True People Search',
                  description: 'Search for anyone by name and get comprehensive results including contact information, addresses, relatives, and public records.',
                  features: ['250M+ records', 'Nationwide coverage', 'Instant results', 'Free basic search']
                },
                {
                  title: 'Reverse Phone Lookup',
                  description: 'Find out who called you by entering any phone number. Get caller ID, location, carrier information, and more.',
                  features: ['US phone numbers', 'Carrier details', 'Location data', 'Spam detection']
                },
                {
                  title: 'Address Lookup',
                  description: 'Discover who lives at any address. Get resident information, property details, and neighborhood data.',
                  features: ['Current residents', 'Property records', 'Past residents', 'Owner information']
                },
                {
                  title: 'Background Reports',
                  description: 'Access comprehensive background information including criminal records, court records, and employment history.',
                  features: ['Criminal records', 'Court records', 'Social media', 'Complete history']
                }
              ].map((service, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-500 transition-colors">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Commitment to You</h2>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="space-y-6">
                {[
                  {
                    title: 'Data Accuracy',
                    text: 'We continuously update our database to ensure you receive the most current and accurate information available.'
                  },
                  {
                    title: 'User Privacy',
                    text: 'Your searches are confidential. We do not share your search history or personal information with third parties.'
                  },
                  {
                    title: 'Fair Access',
                    text: 'We believe everyone deserves access to public records. Our free people search service ensures information is accessible to all.'
                  },
                  {
                    title: 'Legal Compliance',
                    text: 'We operate in full compliance with the Fair Credit Reporting Act (FCRA) and all applicable federal and state laws.'
                  },
                  {
                    title: 'Customer Support',
                    text: 'Our dedicated support team is available to help you with any questions or concerns about our services.'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">NumberLookup by the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '250M+', label: 'Records in Database' },
                { number: '50M+', label: 'Annual Users' },
                { number: '99.9%', label: 'Accuracy Rate' },
                { number: '24/7', label: 'Always Available' },
                { number: '2000', label: 'Year Founded' },
                { number: '50', label: 'US States Covered' },
                { number: '<1sec', label: 'Average Search Time' },
                { number: '100%', label: 'Legal Compliance' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Find Someone?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join millions who trust NumberLookup for accurate people search results
            </p>
            <a 
              href="/"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              Start Free People Search
            </a>
          </div>
        </section>
      </div>
    </Layout>
  )
}