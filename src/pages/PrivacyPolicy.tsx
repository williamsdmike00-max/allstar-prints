import SEO from '../components/ui/SEO'

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy — Allstar Prints LLC"
        description="Privacy Policy for Allstar Prints LLC. Learn how we collect, use, and protect your personal information."
        path="/privacy-policy"
      />

      <section className="bg-gradient-to-br from-brand-dark via-brand-dark2 to-brand-dark py-16 md:py-20">
        <div className="container-xl section-padding text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-4">Legal</p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">Privacy Policy</h1>
          <p className="text-brand-silver mt-4">Last updated: April 13, 2025</p>
        </div>
      </section>

      <section className="container-xl section-padding py-14 mx-auto">
        <div className="max-w-3xl mx-auto prose prose-invert prose-sm">
          <div className="space-y-8 text-brand-silver leading-relaxed">

            <div>
              <h2 className="text-white text-xl font-bold mb-3">1. Company Information</h2>
              <p>Allstar Prints LLC<br />
              400 Las Colinas Blvd East, Suite 300<br />
              Irving, TX 75039<br />
              Phone: (817) 507-4553<br />
              Email: contact@allstarprintsllc.com</p>
            </div>

            <div>
              <h2 className="text-white text-xl font-bold mb-3">2. Information We Collect</h2>
              <p>We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Name, email address, and phone number when you request a quote or contact us</li>
                <li>Order details, artwork files, and design preferences</li>
                <li>Billing and shipping information when you place an order</li>
                <li>Communications you send us through our website, chat widget, or email</li>
              </ul>
            </div>

            <div>
              <h2 className="text-white text-xl font-bold mb-3">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Process and fulfill your orders</li>
                <li>Send you quotes, order confirmations, and updates</li>
                <li>Respond to your questions and provide customer support</li>
                <li>Send you marketing communications (only with your consent)</li>
                <li>Improve our website and services</li>
              </ul>
            </div>

            <div>
              <h2 className="text-white text-xl font-bold mb-3">4. SMS / Text Messaging</h2>
              <p>By providing your phone number and opting in, you consent to receive text messages from Allstar Prints LLC regarding your orders, quotes, and promotions. Message and data rates may apply. You can opt out at any time by replying STOP. We do not sell or share your phone number with third parties for their marketing purposes. We do not purchase or sell leads.</p>
            </div>

            <div>
              <h2 className="text-white text-xl font-bold mb-3">5. Information Sharing</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Service providers who help us operate our business (e.g., payment processors, shipping carriers)</li>
                <li>Legal authorities if required by law</li>
              </ul>
            </div>

            <div>
              <h2 className="text-white text-xl font-bold mb-3">6. Cookies</h2>
              <p>Our website may use cookies and similar tracking technologies to improve your experience. You can disable cookies through your browser settings, though some features of the site may not function properly.</p>
            </div>

            <div>
              <h2 className="text-white text-xl font-bold mb-3">7. Data Security</h2>
              <p>We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
            </div>

            <div>
              <h2 className="text-white text-xl font-bold mb-3">8. Your Rights</h2>
              <p>You may request access to, correction of, or deletion of your personal information by contacting us at contact@allstarprintsllc.com or (817) 507-4553.</p>
            </div>

            <div>
              <h2 className="text-white text-xl font-bold mb-3">9. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.</p>
            </div>

            <div>
              <h2 className="text-white text-xl font-bold mb-3">10. Contact Us</h2>
              <p>If you have questions about this Privacy Policy, contact us at:<br />
              Allstar Prints LLC<br />
              400 Las Colinas Blvd East, Suite 300, Irving, TX 75039<br />
              (817) 507-4553 | contact@allstarprintsllc.com</p>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
