import Layout from '../components/Layout'

export default function PrivacyPage() {
  return (
    <Layout 
      title="Privacy Policy - NumberLookup.us"
      description="Read NumberLookup's privacy policy to understand how we collect, use, and protect your information when you use our people search services."
    >
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
            <p className="text-blue-100">Last Updated: September 29, 2025</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose max-w-none">
              
              {/* Introduction */}
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed mb-4">
                  NumberLookup.us ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                  explains how we collect, use, disclose, and safeguard your information when you visit our website 
                  and use our people search services.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, 
                  please do not access the site.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Use our search services</li>
                  <li>Register for an account</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Contact us for support</li>
                  <li>Participate in surveys or promotions</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  This information may include:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Name and contact information</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Payment information (processed securely through third-party payment processors)</li>
                  <li>Search queries and search history</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Automatically Collected Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you visit our website, we automatically collect certain information about your device, including:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Referring URLs</li>
                  <li>Pages viewed and time spent on pages</li>
                  <li>Device identifiers</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>

              {/* How We Use Your Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use the information we collect for various purposes, including to:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Provide, operate, and maintain our services</li>
                  <li>Process your search requests and deliver results</li>
                  <li>Improve and personalize your experience</li>
                  <li>Develop new features and services</li>
                  <li>Communicate with you about our services</li>
                  <li>Send you marketing and promotional communications (with your consent)</li>
                  <li>Process transactions and send related information</li>
                  <li>Detect, prevent, and address technical issues</li>
                  <li>Protect against fraudulent or illegal activity</li>
                  <li>Comply with legal obligations</li>
                  <li>Analyze usage patterns and trends</li>
                </ul>
              </div>

              {/* Cookies and Tracking */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cookies and Tracking Technologies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to track activity on our website and store certain 
                  information. Cookies are files with a small amount of data that are sent to your browser from a website 
                  and stored on your device.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Types of cookies we use:</strong>
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
                  <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
                  <li><strong>Functional cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Advertising cookies:</strong> Deliver relevant advertisements</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
                  However, if you do not accept cookies, you may not be able to use some portions of our service.
                </p>
              </div>

              {/* Information Sharing */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Share Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may share your information in the following situations:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li><strong>Service Providers:</strong> We may share your information with third-party service providers 
                  who perform services on our behalf (payment processing, data analysis, email delivery, hosting services)</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, 
                  your information may be transferred</li>
                  <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law 
                  or in response to valid requests by public authorities</li>
                  <li><strong>Affiliates:</strong> We may share information with our affiliates, in which case we will 
                  require them to honor this privacy policy</li>
                  <li><strong>With Your Consent:</strong> We may share your information for any other purpose with your consent</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  <strong>We do not sell your personal information to third parties.</strong>
                </p>
              </div>

              {/* Data Security */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure servers and databases</li>
                  <li>Regular security audits</li>
                  <li>Access controls and authentication</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  However, no method of transmission over the Internet or electronic storage is 100% secure. While we 
                  strive to use commercially acceptable means to protect your personal information, we cannot guarantee 
                  its absolute security.
                </p>
              </div>

              {/* Your Privacy Rights */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Privacy Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Opt-out:</strong> Opt-out of marketing communications</li>
                  <li><strong>Data portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Restriction:</strong> Request restriction of processing your information</li>
                  <li><strong>Objection:</strong> Object to our processing of your information</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  To exercise these rights, please contact us using the information provided at the end of this policy.
                </p>
              </div>

              {/* Third-Party Links */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Links</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices 
                  or content of these third-party sites. We encourage you to read the privacy policies of any third-party 
                  sites you visit.
                </p>
              </div>

              {/* Children's Privacy */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our services are not intended for children under 18 years of age. We do not knowingly collect personal 
                  information from children under 18. If you are a parent or guardian and believe your child has provided 
                  us with personal information, please contact us immediately.
                </p>
              </div>

              {/* California Privacy Rights */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. California Privacy Rights (CCPA)</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you are a California resident, you have specific rights regarding your personal information under 
                  the California Consumer Privacy Act (CCPA):
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Right to know what personal information is collected</li>
                  <li>Right to know whether personal information is sold or disclosed</li>
                  <li>Right to say no to the sale of personal information</li>
                  <li>Right to access your personal information</li>
                  <li>Right to equal service and price</li>
                  <li>Right to delete personal information</li>
                </ul>
              </div>

              {/* European Privacy Rights */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. European Privacy Rights (GDPR)</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you are located in the European Economic Area (EEA), you have certain data protection rights under 
                  the General Data Protection Regulation (GDPR). We will take reasonable steps to allow you to correct, 
                  amend, delete, or limit the use of your personal information.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The legal bases for processing your information include consent, contract performance, legitimate 
                  interests, and legal obligations.
                </p>
              </div>

              {/* Data Retention */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Data Retention</h2>
                <p className="text-gray-700 leading-relaxed">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in 
                  this privacy policy, unless a longer retention period is required or permitted by law. When we no longer 
                  need your information, we will securely delete or anonymize it.
                </p>
              </div>

              {/* Changes to Privacy Policy */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update our privacy policy from time to time. We will notify you of any changes by posting the 
                  new privacy policy on this page and updating the "Last Updated" date. You are advised to review this 
                  privacy policy periodically for any changes.
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about this privacy policy or our privacy practices, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <p className="text-gray-700 mb-2"><strong>NumberLookup.us</strong></p>
                  <p className="text-gray-700 mb-2">Email: privacy@numberlookup.us</p>
                  <p className="text-gray-700 mb-2">Phone: 1-800-LOOKUP-US</p>
                  <p className="text-gray-700">Address: 123 Search Street, Data City, DC 20001</p>
                </div>
              </div>

              {/* FCRA Disclaimer */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Important FCRA Notice</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  NumberLookup.us is not a consumer reporting agency as defined by the Fair Credit Reporting Act (FCRA). 
                  The information provided on this site cannot be used for employment screening, credit decisions, tenant 
                  screening, or any other purpose covered by the FCRA. By using this service, you agree not to use any 
                  information for any purpose prohibited by the FCRA.
                </p>
              </div>

            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}