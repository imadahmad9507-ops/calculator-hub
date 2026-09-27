import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — CalcHub Pro (Updated September 27, 2026)',
  description: 'CalcHub Pro privacy policy, Google AdSense disclosures, cookie usages, localStorage client-side operations, and CCPA rights.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-sm text-zinc-300 font-sans leading-relaxed py-4">
      <div className="border-b border-zinc-800 pb-6 space-y-2">
        <span className="text-xs font-mono text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
          Legal Compliance
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold font-sans text-zinc-100">Privacy Policy</h1>
        <p className="text-xs text-zinc-400 font-mono">Effective Date: September 27, 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-100">1. Overview & Data Protection Philosophy</h2>
        <p>
          At CalcHub Pro ("we", "us", "our"), accessible from calculator-hub-eosin-one.vercel.app, your privacy is our highest priority.
          CalcHub Pro is engineered as a client-side precision instrument panel. All numerical inputs, mortgage figures,
          salaries, medical metrics, and unit numbers you type into our calculators are processed locally in your web browser.
          We do not collect, store, or transmit your private calculation input data to remote servers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-100">2. Cookies, Analytics & Third-Party Advertising (Google AdSense)</h2>
        <p>
          We use standard cookies and tracking technology to analyze site traffic and display relevant advertisements.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-300">
          <li>
            <strong>Google AdSense & DoubleClick Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to CalcHub Pro or other websites. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet.
          </li>
          <li>
            <strong>Opt-Out Options:</strong> Users may opt out of personalized advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 underline hover:text-amber-300"
            >
              Google Ads Settings
            </a>
            . Alternatively, users can opt out of third-party vendor cookies for personalized advertising by visiting{' '}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 underline hover:text-amber-300"
            >
              www.aboutads.info
            </a>
            .
          </li>
          <li>
            <strong>Google Analytics:</strong> We may utilize Google Analytics to understand aggregate visitor demographics and usage metrics. This data is anonymized and contains no personally identifiable information.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-100">3. Browser LocalStorage Usage</h2>
        <p>
          CalcHub Pro uses web browser <code className="text-amber-400 font-mono">localStorage</code> solely to preserve your visual theme preference (Dark or Light mode) and maintain a client-side history of your 6 most recently used calculators. This data remains 100% on your local device, is never transmitted to our servers, and can be cleared at any time by clearing your browser cache.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-100">4. California Consumer Privacy Act (CCPA) Rights</h2>
        <p>
          Under the CCPA, California residents have specific rights regarding their personal information:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-zinc-300">
          <li>The right to know what personal data is collected, used, shared, or sold.</li>
          <li>The right to request deletion of personal information collected by us.</li>
          <li>The right to opt-out of the sale of personal information (Note: CalcHub Pro does not sell personal data).</li>
          <li>The right to non-discrimination for exercising CCPA privacy rights.</li>
        </ul>
        <p className="mt-2">
          California residents wishing to exercise their privacy rights can contact us via our{' '}
          <Link href="/contact" className="text-amber-400 underline hover:text-amber-300">
            Contact Page
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-100">5. Contact Information</h2>
        <p>
          If you have questions or feedback regarding this Privacy Policy, please reach out through our{' '}
          <Link href="/contact" className="text-amber-400 underline hover:text-amber-300">
            Support Portal
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
