import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — CalcHub Pro',
  description: 'CalcHub Pro terms of service, as-is calculation disclosures, acceptable use policies, and liability limitations.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-sm text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed py-4">
      <div className="pb-6 border-b border-[image:linear-gradient(to_right,transparent,var(--color-slate-200,#e2e8f0),transparent)] dark:border-zinc-800 space-y-2">
        <span className="text-xs font-semibold text-[#065F46] dark:text-[#34D399] uppercase tracking-wider bg-[#065F46]/10 dark:bg-[#34D399]/10 px-3 py-1 rounded-full border border-[#065F46]/20 dark:border-[#34D399]/30 inline-block">
          User Agreement
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold font-sans text-zinc-900 dark:text-zinc-100 tracking-tight">Terms of Service</h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Effective Date: September 27, 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">1. Acceptance of Terms</h2>
        <p>
          By accessing or using CalcHub Pro, you agree to these Terms of Service. If you do not agree, please discontinue using the website.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">2. "As-Is" Service & No Warranty</h2>
        <p>
          All calculators, algorithms, formulas, and educational content provided on CalcHub Pro are available strictly on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis without warranties of any kind.
        </p>
        <p>
          You assume sole responsibility for verifying any figures before relying on them for financial, loan, tax, or medical decisions.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">3. Limitation of Liability</h2>
        <p>
          In no event shall CalcHub Pro or its developers be liable for any direct, indirect, or consequential damages resulting from the use or inability to use this site or its calculation tools.
        </p>
      </section>
    </div>
  );
}
