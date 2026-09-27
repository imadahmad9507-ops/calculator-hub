import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — CalcHub Pro (Updated September 27, 2026)',
  description: 'CalcHub Pro terms of service, as-is calculation disclosures, acceptable use policies, and liability limitations.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-sm text-zinc-300 font-sans leading-relaxed py-4">
      <div className="border-b border-zinc-800 pb-6 space-y-2">
        <span className="text-xs font-mono text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
          User Agreement
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold font-sans text-zinc-100">Terms of Service</h1>
        <p className="text-xs text-zinc-400 font-mono">Effective Date: September 27, 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-100">1. Acceptance of Terms</h2>
        <p>
          By accessing or using CalcHub Pro ("Website"), operated at calculator-hub-eosin-one.vercel.app, you agree to be legally bound by these Terms of Service. If you do not agree to all terms, you must immediately discontinue use of the Website.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-100">2. "As-Is" Service & No Warranty on Calculation Accuracy</h2>
        <p>
          All calculators, algorithms, formulas, conversion rates, and educational content provided on CalcHub Pro are made available strictly on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis without warranties of any kind, whether express or implied.
        </p>
        <p>
          While we make every effort to verify mathematical algorithms against reference standards, CalcHub Pro does not guarantee that calculations will be error-free, uninterrupted, complete, or updated to reflect real-time market or legal changes. You assume sole responsibility for verifying any figures before relying on them for financial, loan, tax, medical, or engineering decisions.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-100">3. Limitation of Liability</h2>
        <p>
          In no event shall CalcHub Pro, its developers, or affiliates be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising from your access to or use of, or inability to access or use, this Website or any content or calculations herein.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-100">4. Acceptable Use Policy</h2>
        <p>
          You agree not to misuse the Website, attempt unauthorized access to infrastructure, perform automated scraping that degrades service performance for other users, or use our tools for any illegal purpose under US or international law.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-100">5. Modifications to Website & Terms</h2>
        <p>
          We reserve the right to modify, suspend, or discontinue any calculator or feature at any time without prior notice. We may update these Terms of Service periodically, and continued use of the Website constitutes acceptance of updated terms.
        </p>
      </section>
    </div>
  );
}
