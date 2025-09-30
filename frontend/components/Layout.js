import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Layout({ children, title, description }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [supportMenuOpen, setSupportMenuOpen] = useState(false)

  return (
    <>
      <Head>
        <title>{title || 'FastPeopleSearches - Free People Search & Reverse Phone Lookup'}</title>
        <meta name="description" content={description || 'Free people search, reverse phone lookup, and address search. Find contact information, background checks, and public records.'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicon Links */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color for Mobile Browsers */}
        <meta name="theme-color" content="#2563eb" />
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">FPS</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">FastPeopleSearches</span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/people-search" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  People Search
                </Link>
                <Link href="/reverse-phone-lookup" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  Phone Lookup
                </Link>
                <Link href="/address-lookup" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  Address Lookup
                </Link>
                
                
              </nav>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-200">
                <div className="flex flex-col space-y-3">
                  <Link href="/people-search" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                    People Search
                  </Link>
                  <Link href="/reverse-phone-lookup" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                    Phone Lookup
                  </Link>
                  <Link href="/address-lookup" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                    Address Lookup
                  </Link>
                  
                  {/* Support Section */}
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Support</div>
                    <div className="flex flex-col space-y-2 pl-2">
                      <Link href="/help-center" className="text-sm text-gray-700 hover:text-blue-600">
                        Help Center
                      </Link>
                      <Link href="/faq" className="text-sm text-gray-700 hover:text-blue-600">
                        FAQ
                      </Link>
                      <Link href="/contact-support" className="text-sm text-gray-700 hover:text-blue-600">
                        Contact Support
                      </Link>
                      <Link href="/report-issue" className="text-sm text-gray-700 hover:text-blue-600">
                        Report Issue
                      </Link>
                    </div>
                  </div>

                  <Link href="/premium" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 text-center">
                    Go Premium
                  </Link>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">NL</span>
                  </div>
                  <span className="text-lg font-bold text-white">FastPeopleSearches</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  The leading true people search and fast people search engine. Find anyone with our free people search service on fastpeoplesearches.us.
                </p>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h3>
                <ul className="space-y-2">
                  <li><Link href="/people-search" className="text-sm hover:text-white transition-colors">People Search</Link></li>
                  <li><Link href="/reverse-phone-lookup" className="text-sm hover:text-white transition-colors">Reverse Phone Lookup</Link></li>
                  <li><Link href="/address-lookup" className="text-sm hover:text-white transition-colors">Address Lookup</Link></li>
                  <li><Link href="/background-check" className="text-sm hover:text-white transition-colors">Background Check</Link></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h3>
                <ul className="space-y-2">
                  <li><Link href="/help-center" className="text-sm hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link href="/contact-support" className="text-sm hover:text-white transition-colors">Contact Support</Link></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h3>
                <ul className="space-y-2">
                  <li><Link href="/terms" className="text-sm hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link href="/privacy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/about" className="text-sm hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/contact" className="text-sm hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-sm text-gray-400">
                  © {new Date().getFullYear()} NumberLookup.us. All rights reserved.
                </p>
                <div className="flex items-center space-x-6">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}