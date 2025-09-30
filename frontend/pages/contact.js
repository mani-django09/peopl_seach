import Layout from '../components/Layout'

export default function ContactPage() {
  return (
    <Layout 
      title="Contact Us - NumberLookup.us | Get Support"
      description="Contact NumberLookup.us for support, questions, or feedback about our people search services. Multiple ways to reach our customer support team."
    >
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We're here to help! Reach out to our support team
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Email Support */}
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200 hover:border-blue-500 transition-colors">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Email Support</h3>
                <p className="text-gray-600 text-center mb-4 text-sm">
                  For general inquiries and support
                </p>
                <a 
                  href="mailto:support@numberlookup.us" 
                  className="block text-center text-blue-600 hover:text-blue-700 font-semibold"
                >
                  support@numberlookup.us
                </a>
                <p className="text-gray-500 text-xs text-center mt-3">
                  Response time: 24-48 hours
                </p>
              </div>

              {/* Phone Support */}
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200 hover:border-green-500 transition-colors">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Phone Support</h3>
                <p className="text-gray-600 text-center mb-4 text-sm">
                  Speak with our support team
                </p>
                <a 
                  href="tel:1-800-586-5687" 
                  className="block text-center text-green-600 hover:text-green-700 font-semibold text-lg"
                >
                  1-800-LOOKUP-US<br />
                  <span className="text-base">(1-800-586-5687)</span>
                </a>
                <p className="text-gray-500 text-xs text-center mt-3">
                  Mon-Fri: 9am-6pm EST
                </p>
              </div>

              {/* Live Chat */}
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200 hover:border-purple-500 transition-colors">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Live Chat</h3>
                <p className="text-gray-600 text-center mb-4 text-sm">
                  Get instant help online
                </p>
                <button 
                  className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  Start Chat
                </button>
                <p className="text-gray-500 text-xs text-center mt-3">
                  Available 24/7
                </p>
              </div>
            </div>

            {/* Mailing Address */}
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Mailing Address</h3>
                  <p className="text-gray-700 mb-1">NumberLookup.us</p>
                  <p className="text-gray-700 mb-1">123 Search Street, Suite 100</p>
                  <p className="text-gray-700 mb-1">Data City, DC 20001</p>
                  <p className="text-gray-700">United States</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Department-Specific Contacts */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Department-Specific Contacts
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  department: 'Customer Support',
                  description: 'General questions, account help, search assistance',
                  email: 'support@numberlookup.us',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )
                },
                {
                  department: 'Technical Support',
                  description: 'Website issues, bugs, technical problems',
                  email: 'tech@numberlookup.us',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35// Continuation of contact.js - Department-Specific Contacts section completion

 0l6.25 7.5-.313 5.875a1 1 0 01-.561.869l-4 2a1 1 0 01-1.156-.106c-.98-.98-2.5-2.5-3.656-3.656a1 1 0 01-.106-1.156l2-4a1 1 0 01.869-.561l5.875-.313 7.5 6.25zm0 0l-7.5 7.5" />
                    </svg>
                  )
                },
                {
                  department: 'Billing & Accounts',
                  description: 'Payment issues, refunds, subscription management',
                  email: 'billing@numberlookup.us',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  )
                },
                {
                  department: 'Privacy & Data',
                  description: 'Data removal requests, privacy concerns',
                  email: 'privacy@numberlookup.us',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )
                },
                {
                  department: 'Business & Partnerships',
                  description: 'B2B inquiries, partnerships, enterprise solutions',
                  email: 'business@numberlookup.us',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )
                },
                {
                  department: 'Legal',
                  description: 'Legal matters, subpoenas, compliance',
                  email: 'legal@numberlookup.us',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  )
                },
                {
                  department: 'Media & Press',
                  description: 'Press inquiries, media requests, interviews',
                  email: 'press@numberlookup.us',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  )
                }
              ].map((dept, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:border-blue-500 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {dept.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{dept.department}</h3>
                      <p className="text-sm text-gray-600 mb-3">{dept.description}</p>
                      <a 
                        href={`mailto:${dept.email}`}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        {dept.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Common Questions
            </h2>

            <div className="space-y-6">
              {[
                {
                  question: 'How quickly will I receive a response?',
                  answer: 'Email inquiries are typically answered within 24-48 hours during business days. Phone and live chat support provide immediate assistance during business hours.'
                },
                {
                  question: 'What information should I include in my inquiry?',
                  answer: 'Please include your account email (if applicable), a detailed description of your question or issue, and any relevant screenshots or error messages. This helps us assist you more efficiently.'
                },
                {
                  question: 'Can I request data removal?',
                  answer: 'Yes. If you wish to remove your information from our database, please contact privacy@numberlookup.us with your name, current address, and phone number. We process removal requests within 5-7 business days.'
                },
                {
                  question: 'Do you offer phone support?',
                  answer: 'Yes, phone support is available Monday through Friday, 9am-6pm EST at 1-800-LOOKUP-US (1-800-586-5687). For after-hours assistance, please use our 24/7 live chat or email support.'
                },
                {
                  question: 'How do I report inaccurate information?',
                  answer: 'If you find inaccurate information in our database, please contact support@numberlookup.us with the specific details and correct information. We review all reports and update our records accordingly.'
                },
                {
                  question: 'Are you available on weekends?',
                  answer: 'Our live chat support is available 24/7 including weekends. Email support operates Monday-Friday, but you can submit inquiries anytime and we\'ll respond on the next business day.'
                }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Follow Us on Social Media
            </h2>
            <p className="text-gray-600 mb-8">
              Stay updated with the latest news, tips, and updates
            </p>

            <div className="flex justify-center space-x-6">
              {[
                {
                  name: 'Facebook',
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ),
                  link: '#',
                  color: 'hover:text-blue-600'
                },
                {
                  name: 'Twitter',
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  ),
                  link: '#',
                  color: 'hover:text-blue-400'
                },
                {
                  name: 'LinkedIn',
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                  link: '#',
                  color: 'hover:text-blue-700'
                },
                {
                  name: 'Instagram',
                  icon: (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                    </svg>
                  ),
                  link: '#',
                  color: 'hover:text-pink-600'
                }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.link}
                  className={`w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 ${social.color} transition-colors`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Business Hours */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Business Hours
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-xl p-8 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Support</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Saturday:</span>
                    <span>10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-8 border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Live Chat Support</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-medium">Availability:</span>
                    <span>24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Response Time:</span>
                    <span>Instant</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Average Wait:</span>
                    <span>&lt; 2 minutes</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Email responses may be delayed during holidays and weekends. 
                    For urgent matters, please use our live chat or phone support during business hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Help Right Now?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our support team is ready to assist you
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
                Start Live Chat
              </button>
              <a 
                href="tel:1-800-586-5687"
                className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-xl"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}