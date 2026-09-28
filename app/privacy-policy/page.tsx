import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — CalcHub Pro',
  description: 'CalcHub Pro privacy policy, Google AdSense disclosures, cookie usages, localStorage client-side operations, and CCPA rights.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-sm text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed py-4">
      <div className="pb-6 border-b border-[image:linear-gradient(to_right,transparent,var(--color-slate-200,#e2e8f0),transparent)] dark:border-zinc-800 space-y-2">
        <span className="text-xs font-semibold text-[#065F46] dark:text-[#34D399] uppercase tracking-wider bg-[#065F46]/10 dark:bg-[#34D399]/10 px-3 py-1 rounded-full border border-[#065F46]/20 dark:border-[#34D399]/30 inline-block">
          Legal Compliance
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold font-sans text-zinc-900 dark:text-zinc-100 tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Effective Date: September 27, 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">1. Overview & Data Protection Philosophy</h2>
        <p>
          At CalcHub Pro ("we", "us", "our"), your privacy is our highest priority.
          CalcHub Pro is engineered as a client-side precision tool suite. Numerical inputs, mortgage figures,
          salaries, health metrics, and numbers entered into our calculators are processed locally in your browser session.
          We do not collect, store, or transmit your calculation input data to remote databases.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">2. Cookies, Analytics & Third-Party Advertising</h2>
        <p>
          We use standard cookies and analytics technology to evaluate traffic and display relevant advertisements.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-300">
          <li>
            <strong>Advertising Cookies:</strong> Third-party vendors use cookies to serve ads based on prior web visits.
          </li>
          <li>
            <strong>Opt-Out Options:</strong> Users can manage ad settings at{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#065F46] dark:text-[#34D399] underline">
              Google Ads Settings
            </a>
            .
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">3. Browser LocalStorage</h2>
        <p>
          CalcHub Pro uses browser <code className="text-[#065F46] dark:text-[#34D399] font-mono">localStorage</code> solely to remember your color theme preference (Dark or Light) and recent tool history. This data stays entirely on your local device.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">4. Contact Information</h2>
        <p>
          If you have questions regarding this Privacy Policy, please contact us via our{' '}
          <Link href="/contact" className="text-[#065F46] dark:text-[#34D399] underline">
            Support Form
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
