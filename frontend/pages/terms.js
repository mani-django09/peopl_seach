import Layout from '../components/Layout'

export default function TermsPage() {
  return (
    <Layout 
      title="Terms of Service - NumberLookup.us"
      description="Read the terms of service for using NumberLookup.us people search services. Understand your rights and responsibilities when accessing our platform."
    >
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
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
                  Welcome to NumberLookup.us. These Terms of Service ("Terms") govern your access to and use of our 
                  website, services, and applications (collectively, the "Services"). By accessing or using our Services, 
                  you agree to be bound by these Terms.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>PLEASE READ THESE TERMS CAREFULLY BEFORE USING OUR SERVICES.</strong> If you do not agree to 
                  these Terms, you may not access or use our Services.
                </p>
              </div>

              {/* Acceptance of Terms */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  By accessing or using NumberLookup.us, you acknowledge that you have read, understood, and agree to be 
                  bound by these Terms and our Privacy Policy. If you are using our Services on behalf of an organization, 
                  you represent and warrant that you have the authority to bind that organization to these Terms.
                </p>
              </div>

              {/* Eligibility */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Eligibility</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You must be at least 18 years old to use our Services. By using our Services, you represent and warrant 
                  that you:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Are at least 18 years of age</li>
                  <li>Have the legal capacity to enter into these Terms</li>
                  <li>Will use the Services only for lawful purposes</li>
                  <li>Will comply with all applicable laws and regulations</li>
                </ul>
              </div>

              {/* FCRA Compliance */}
              <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. FCRA Compliance and Prohibited Uses</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>IMPORTANT:</strong> NumberLookup.us is NOT a consumer reporting agency as defined by the Fair 
                  Credit Reporting Act (FCRA), 15 U.S.C. § 1681 et seq.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>You agree that you will NOT use any information obtained from our Services for any of the following purposes:</strong>
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Employment screening or hiring decisions</li>
                  <li>Credit or lending decisions</li>
                  <li>Insurance underwriting or eligibility</li>
                  <li>Tenant screening or housing decisions</li>
                  <li>Government licensing or benefits determinations</li>
                  <li>Any other purpose covered under the FCRA</li>
                  <li>Stalking, harassment, or threatening any individual</li>
                  <li>Identity theft or fraud</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  By using our Services, you certify that you will use the information only for lawful purposes and in 
                  compliance with all applicable federal, state, and local laws.
                </p>
              </div>

              {/* Permitted Uses */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Permitted Uses</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You may use our Services for legitimate purposes, including:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Finding contact information for friends or family</li>
                  <li>Verifying the identity of people you meet online</li>
                  <li>Researching your family history</li>
                  <li>Investigating unknown callers</li>
                  <li>Locating old classmates or colleagues</li>
                  <li>General informational purposes</li>
                </ul>
              </div>

              {/* User Account */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Accounts</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Some features of our Services may require you to create an account. When creating an account, you agree to:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information to keep it accurate</li>
                  <li>Maintain the security of your password</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized access</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to suspend or terminate your account if any information provided is inaccurate, 
                  fraudulent, or violates these Terms.
                </p>
              </div>

              {/* Subscription and Payment */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Subscription and Payment Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Some of our Services are offered on a subscription basis. By subscribing, you agree to:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Pay all applicable fees in accordance with the pricing terms</li>
                  <li>Automatic renewal unless you cancel before the renewal date</li>
                  <li>Provide current, complete, and accurate billing information</li>
                  <li>Promptly update payment information if it changes</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Refund Policy:</strong> We offer a satisfaction guarantee. If you're not satisfied with our 
                  premium services, you may request a refund within 7 days of purchase. Refunds are processed within 
                  5-10 business days.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Cancellation:</strong> You may cancel your subscription at any time through your account settings. 
                  Cancellation will take effect at the end of your current billing period.
                </p>
              </div>

              {/* Intellectual Property */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  All content on NumberLookup.us, including but not limited to text, graphics, logos, images, software, 
                  and data compilations, is owned by NumberLookup.us or its licensors and is protected by United States 
                  and international copyright, trademark, and other intellectual property laws.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You may not:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Copy, modify, or distribute our content without permission</li>
                  <li>Use our trademarks without written authorization</li>
                  <li>Create derivative works based on our Services</li>
                  <li>Reverse engineer or decompile any software</li>
                  <li>Use automated systems to scrape or data mine our Services</li>
                </ul>
              </div>

              {/* User Conduct */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. User Conduct and Restrictions</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Use the Services for any illegal purpose</li>
                  <li>Violate any local, state, national, or international law</li>
                  <li>Infringe on the intellectual property rights of others</li>
                  <li>Transmit any viruses, malware, or harmful code</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt the Services or servers</li>
                  <li>Use the Services to harass, abuse, or harm others</li>
                  <li>Impersonate any person or entity</li>
                  <li>Collect or store personal data about other users</li>
                  <li>Use automated scripts or bots to access the Services</li>
                </ul>
              </div>

              {/* Data Accuracy */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Data Accuracy and Limitations</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  While we strive to provide accurate and up-to-date information, we cannot guarantee the accuracy, 
                  completeness, or timeliness of the data in our database. Information is compiled from public records 
                  and third-party sources, which may contain errors or be outdated.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  You acknowledge and agree that you use the information provided at your own risk and should verify 
                  important information through independent sources.
                </p>
              </div>

              {/* Disclaimers */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Disclaimers</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS 
                  OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Warranties of merchantability or fitness for a particular purpose</li>
                  <li>Warranties of accuracy, reliability, or completeness of information</li>
                  <li>Warranties that the Services will be uninterrupted or error-free</li>
                  <li>Warranties that defects will be corrected</li>
                  <li>Warranties regarding the security of your information</li>
                </ul>
              </div>

              {/* Limitation of Liability */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, NUMBERLOOKUP.US SHALL NOT BE LIABLE FOR ANY INDIRECT, 
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, 
                  WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE 
                  LOSSES RESULTING FROM:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Your use or inability to use the Services</li>
                  <li>Any unauthorized access to or use of our servers</li>
                  <li>Any interruption or cessation of the Services</li>
                  <li>Any bugs, viruses, or similar harmful code</li>
                  <li>Any errors or omissions in any content</li>
                  <li>The actions of third parties</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Our total liability shall not exceed the amount you paid us in the twelve months preceding the claim.
                </p>
              </div>

              {/* Indemnification */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Indemnification</h2>
                <p className="text-gray-700 leading-relaxed">
                  You agree to indemnify, defend, and hold harmless NumberLookup.us, its officers, directors, employees, 
                  agents, and affiliates from any claims, liabilities, damages, losses, costs, or expenses (including 
                  reasonable attorneys' fees) arising out of or relating to your use of the Services, violation of these 
                  Terms, or violation of any rights of another.
                </p>
              </div>

              {/* Dispute Resolution */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Dispute Resolution and Arbitration</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Any dispute arising out of or relating to these Terms or the Services shall be resolved through binding 
                  arbitration in accordance with the Commercial Arbitration Rules of the American Arbitration Association.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Class Action Waiver:</strong> You agree that any arbitration or legal proceeding shall be 
                  conducted only on an individual basis and not as a class action or representative action.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Governing Law:</strong> These Terms shall be governed by the laws of the State of Delaware, 
                  without regard to its conflict of law provisions.
                </p>
              </div>

              {/* Termination */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Termination</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We reserve the right to suspend or terminate your access to the Services at any time, without notice, 
                  for any reason, including but not limited to:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Violation of these Terms</li>
                  <li>Fraudulent or illegal activity</li>
                  <li>Actions that may harm other users or our business</li>
                  <li>Non-payment of fees</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Upon termination, your right to use the Services will immediately cease. All provisions of these Terms 
                  that by their nature should survive termination shall survive.
                </p>
              </div>

              {/* Changes to Terms */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Changes to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify you of material changes by 
                  posting the updated Terms on our website and updating the "Last Updated" date. Your continued use 
                  of the Services after changes constitutes acceptance of the modified Terms.
                </p>
              </div>

              {/* Severability */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Severability</h2>
                <p className="text-gray-700 leading-relaxed">
                  If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions 
                  shall remain in full force and effect.
                </p>
              </div>

              {/* Entire Agreement */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Entire Agreement</h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms, together with our Privacy Policy, constitute the entire agreement between you and 
                  NumberLookup.us regarding the use of our Services and supersede all prior agreements.
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Contact Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <p className="text-gray-700 mb-2"><strong>NumberLookup.us</strong></p>
                  <p className="text-gray-700 mb-2">Email: legal@numberlookup.us</p>
                  <p className="text-gray-700 mb-2">Phone: 1-800-LOOKUP-US</p>
                  <p className="text-gray-700">Address: 123 Search Street, Data City, DC 20001</p>
                </div>
              </div>

              {/* Acknowledgment */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Acknowledgment</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE, UNDERSTAND THEM, 
                  AND AGREE TO BE BOUND BY THEM. IF YOU DO NOT AGREE TO THESE TERMS, YOU MUST NOT USE OUR SERVICES.
                </p>
              </div>

            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}