import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const router = useRouter()

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📚' },
    { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
    { id: 'phone-lookup', name: 'Phone Lookup', icon: '📱' },
    { id: 'people-search', name: 'People Search', icon: '👤' },
    { id: 'address-lookup', name: 'Address Lookup', icon: '🏠' },
    { id: 'account', name: 'Account & Billing', icon: '💳' },
    { id: 'privacy', name: 'Privacy & Security', icon: '🔒' },
    { id: 'technical', name: 'Technical Issues', icon: '⚙️' }
  ]

  const helpArticles = [
    // Getting Started
    {
      id: 1,
      category: 'getting-started',
      title: 'How to Use NumberLookup - Complete Guide',
      description: 'Step-by-step guide to using all features of NumberLookup effectively',
      content: 'Learn the basics of searching for phone numbers, people, and addresses on NumberLookup.',
      link: '#'
    },
    {
      id: 2,
      category: 'getting-started',
      title: 'Understanding Your Search Results',
      description: 'Learn how to read and interpret the information in your search results',
      content: 'A comprehensive guide to understanding what each field means in your results.',
      link: '#'
    },
    {
      id: 3,
      category: 'getting-started',
      title: 'Tips for Better Search Results',
      description: 'Best practices to get the most accurate and complete information',
      content: 'Improve your search accuracy with these proven techniques.',
      link: '#'
    },

    // Phone Lookup
    {
      id: 4,
      category: 'phone-lookup',
      title: 'How Does Reverse Phone Lookup Work?',
      description: 'Understanding the technology behind phone number identification',
      content: 'Discover how we identify phone numbers and provide caller information.',
      link: '#'
    },
    {
      id: 5,
      category: 'phone-lookup',
      title: 'What Information Can I Find About a Phone Number?',
      description: 'Complete list of data available for phone number searches',
      content: 'Learn what details are available: carrier, location, owner name, and more.',
      link: '#'
    },
    {
      id: 6,
      category: 'phone-lookup',
      title: 'Identifying Spam and Scam Calls',
      description: 'How to recognize and report suspicious phone numbers',
      content: 'Protect yourself from phone scams with our identification tools.',
      link: '#'
    },
    {
      id: 7,
      category: 'phone-lookup',
      title: 'Supported Phone Number Formats',
      description: 'Which phone number formats work with our system',
      content: 'We support all US formats: (555) 123-4567, 555-123-4567, +1 555 123 4567.',
      link: '#'
    },
    {
      id: 8,
      category: 'phone-lookup',
      title: 'Why No Results for My Phone Search?',
      description: 'Troubleshooting when your phone lookup returns no information',
      content: 'Common reasons and solutions for empty search results.',
      link: '#'
    },

    // People Search
    {
      id: 9,
      category: 'people-search',
      title: 'How to Search for Someone by Name',
      description: 'Best practices for finding people using name search',
      content: 'Tips for successful people searches including name variations.',
      link: '#'
    },
    {
      id: 10,
      category: 'people-search',
      title: 'What Public Records Are Included?',
      description: 'Types of records available in people search results',
      content: 'We search phone directories, property records, court documents, and more.',
      link: '#'
    },
    {
      id: 11,
      category: 'people-search',
      title: 'Finding Old Friends and Classmates',
      description: 'How to reconnect with people from your past',
      content: 'Use location filters and age ranges to narrow down results.',
      link: '#'
    },
    {
      id: 12,
      category: 'people-search',
      title: 'Verifying Someone\'s Identity',
      description: 'Using people search for identity verification',
      content: 'Cross-reference multiple data points to confirm identity.',
      link: '#'
    },

    // Address Lookup
    {
      id: 13,
      category: 'address-lookup',
      title: 'How to Search Property Records',
      description: 'Finding property information by address',
      content: 'Access property values, tax info, ownership history, and more.',
      link: '#'
    },
    {
      id: 14,
      category: 'address-lookup',
      title: 'Understanding Property Data',
      description: 'What each property field means in your results',
      content: 'Learn about assessed value, square footage, and tax records.',
      link: '#'
    },
    {
      id: 15,
      category: 'address-lookup',
      title: 'Finding Current and Past Residents',
      description: 'Who lives or lived at a specific address',
      content: 'View current occupants and historical resident information.',
      link: '#'
    },

    // Account & Billing
    {
      id: 16,
      category: 'account',
      title: 'How to Upgrade to Premium',
      description: 'Benefits and process for upgrading your account',
      content: 'Premium offers unlimited searches, detailed reports, and priority support.',
      link: '#'
    },
    {
      id: 17,
      category: 'account',
      title: 'Managing Your Subscription',
      description: 'How to update, pause, or cancel your subscription',
      content: 'Full control over your account settings and billing preferences.',
      link: '#'
    },
    {
      id: 18,
      category: 'account',
      title: 'Billing and Payment Issues',
      description: 'Resolving payment problems and understanding charges',
      content: 'Common billing questions and how to update payment methods.',
      link: '#'
    },
    {
      id: 19,
      category: 'account',
      title: 'Refund and Cancellation Policy',
      description: 'Our policies for refunds and account cancellations',
      content: 'Understanding our terms for refunds and subscription cancellations.',
      link: '#'
    },

    // Privacy & Security
    {
      id: 20,
      category: 'privacy',
      title: 'How We Protect Your Privacy',
      description: 'Our security measures and privacy commitments',
      content: 'We use encryption and follow strict privacy protocols.',
      link: '#'
    },
    {
      id: 21,
      category: 'privacy',
      title: 'How to Remove Your Information',
      description: 'Step-by-step opt-out process',
      content: 'Complete guide to removing your personal data from our database.',
      link: '#'
    },
    {
      id: 22,
      category: 'privacy',
      title: 'FCRA Compliance and Legal Use',
      description: 'Understanding legal restrictions and proper use',
      content: 'Important information about FCRA compliance and permissible uses.',
      link: '#'
    },
    {
      id: 23,
      category: 'privacy',
      title: 'Data Sources and Accuracy',
      description: 'Where our information comes from',
      content: 'We compile data from public records, directories, and verified sources.',
      link: '#'
    },

    // Technical Issues
    {
      id: 24,
      category: 'technical',
      title: 'Website Not Loading or Slow',
      description: 'Troubleshooting connection and speed issues',
      content: 'Clear cache, check internet connection, try different browser.',
      link: '#'
    },
    {
      id: 25,
      category: 'technical',
      title: 'Search Not Working',
      description: 'Fixing search functionality problems',
      content: 'Check input format, try refreshing page, contact support if persists.',
      link: '#'
    },
    {
      id: 26,
      category: 'technical',
      title: 'Login and Password Issues',
      description: 'Recovering access to your account',
      content: 'Reset password, clear cookies, check email for verification.',
      link: '#'
    },
    {
      id: 27,
      category: 'technical',
      title: 'Mobile App and Browser Compatibility',
      description: 'Supported devices and browsers',
      content: 'Works on all modern browsers: Chrome, Firefox, Safari, Edge.',
      link: '#'
    }
  ]

  const filteredArticles = selectedCategory === 'all' 
    ? helpArticles 
    : helpArticles.filter(article => article.category === selectedCategory)

  const popularArticles = [
    helpArticles[3], // Phone lookup
    helpArticles[8], // People search
    helpArticles[12], // Address lookup
    helpArticles[15], // Premium
    helpArticles[20], // Privacy
    helpArticles[7] // No results
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  return (
    <Layout 
      title="Help Center - NumberLookup Support & Documentation"
      description="Find comprehensive guides, tutorials, and answers for using NumberLookup. Get help with phone lookup, people search, and more."
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Help Center
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Find answers, guides, and tutorials for using NumberLookup
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search help articles..."
                className="w-full px-6 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Popular Help Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularArticles.map((article) => (
              <a
                key={article.id}
                href={article.link}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-500 transition-all group"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {article.description}
                </p>
                <div className="mt-4 text-blue-600 text-sm font-medium flex items-center">
                  Read more
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Browse by Category
          </h2>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Articles List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map((article) => (
              <a
                key={article.id}
                href={article.link}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-500 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {article.description}
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-gray-600 mb-8">
            Our support team is here to help with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/contact-support')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </button>
            <button
              onClick={() => router.push('/faq')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              View FAQs
            </button>
            <button
              onClick={() => router.push('/report-issue')}
              className="bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold border-2 border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Report Issue
            </button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">27+</div>
              <div className="text-sm text-gray-600">Help Articles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">8</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">&lt;24h</div>
              <div className="text-sm text-gray-600">Response Time</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}