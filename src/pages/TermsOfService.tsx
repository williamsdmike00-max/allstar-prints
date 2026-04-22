import SEO from '../components/ui/SEO'

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service — Allstar Prints LLC"
        description="Terms of Service for Allstar Prints LLC. Read our terms before placing an order."
        path="/terms-of-service"
      />

      <section className="bg-gradient-to-br from-brand-dark via-brand-dark2 to-brand-dark py-16 md:py-20">
        <div className="container-xl section-padding text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-4">Legal</p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">Terms of Service</h1>
          <p className="text-brand-silver mt-4">Last updated: April 13, 2025</p>
        </div>
      </section>

      <section className="container-xl section-padding py-14 mx-auto">
        <div className="max-w-3xl mx-auto">
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
              <h2 className="text-white text-xl font-bold mb-3">2. Acceptance of Terms</h2>
              <p>By using this website or placing an order with Allstar Prints LLC, you agree to these Terms of Service. If you do not agree, please do not use our services.</p>
            </div>

            <div>
              <h2 className="text-white text-xl font-bold mb-3">3. Services</h2>
              <p>Allstar Prints LLC provides custom apparel printing services including custom t-shirts, DTF printing, embroidery, and related products. All orders are subject to availability and our approval of submitted artwork.</p>
            </div>

            <div>
              <h2 className="text-white text-xl font-bold mb-3">4. Orders & Payment</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>All orders require a deposit or full payment before production begins</li>
                <li>Prices are subject to change without notice</li>
                <li>Rush orders may incur additional fees</li>
                <li>We reserve the right to refuse any order at our discretion</li>
              </ul>
            </div>

            <div>
              <h2 className="text-white text-xl font-bold mb-3">5. Artwork & Intellectual Property</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>You represent that you own or have the right to use all artwork submitted</li>
                <li>We are not responsible for copyright infringement resulting from customer-supplied artwork</li>
                <li>We reserve the right to decline orders containing offensive, illegal, or infringing content</li>
              </ul>
            </div>

            <div>
              <h2 className="text-white text-xl font-bold mb-3">6. Turnaround & Shipping</h2>
              <p>Standard turnaround is 5–7 business days after artwork approval and payment. Rush options are available. Shipping times are estimates and not guaranteed. We are not responsible for carrier delays.</p>
            </div>

            <div>
              <h2 className="text-white text-xl font-bold mb-3">7. Returns & Refunds</h2>
              <p>Custom printed items are non-refundable unless there is a defect in our printing or a production error on our part. Claims must be submitted within 5 business days of receiving your order with photos of the issue. We will reprint or refund defective items at our discretion.</p>
            </div>

            <div>
              <h2 className="text-white text-xl font-bold mb-3">8. SMS Communications</h2>
              <p>By providing your phone number, you may opt in to receive SMS communications from Allstar Prints LLC. We do not purchase leads or sell your contact information. Message and data rates may apply. Reply STOP to opt out at any time.</p>
            </div>

            <div>
              <h2 className="text-white text-xl font-bold mb-3">9. Limitation of Liability</h2>
              <p>Allstar Prints LLC shall not be liable for any indirect, incidental, or consequential damages. Our maximum liability is limited to the amount paid for the specific order in question.</p>
            </div>

            <div>
              <h2 className="text-white text-xl font-bold mb-3">10. Governing Law</h2>
              <p>These terms are governed by the laws of the State of Texas. Any disputes shall be resolved in the courts of Dallas County, Texas.</p>
            </div>

            <div>
              <h2 className="text-white text-xl font-bold mb-3">11. Contact</h2>
              <p>Questions about these Terms? Contact us:<br />
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
