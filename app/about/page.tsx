import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About CalcHub Pro — Precision Calculator Engine',
  description: 'CalcHub Pro is dedicated to providing high-accuracy, privacy-focused calculators for US consumers and professionals.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      <div className="pb-6 border-b border-[image:linear-gradient(to_right,transparent,var(--color-slate-200,#e2e8f0),transparent)] dark:border-zinc-800 space-y-2">
        <h1 className="text-3xl md:text-4xl font-extrabold font-sans text-zinc-900 dark:text-zinc-100 tracking-tight">
          About CalcHub Pro
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Precision calculation tools engineered for speed, privacy, and mathematical accuracy.
        </p>
      </div>

      <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
        CalcHub Pro was built to replace slow, ad-cluttered legacy calculator sites with a high-performance, precision instrument panel experience.
      </p>

      <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-sans">Our Core Principles</h2>
        <ul className="space-y-3 text-xs text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#065F46] dark:bg-[#34D399] shrink-0 mt-1.5" />
            <span><strong>Instant Live Output:</strong> All calculations process client-side in real time as parameters change.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#065F46] dark:bg-[#34D399] shrink-0 mt-1.5" />
            <span><strong>Mathematical Integrity:</strong> Every formula is validated against standard financial and scientific reference models.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#065F46] dark:bg-[#34D399] shrink-0 mt-1.5" />
            <span><strong>Strict Privacy:</strong> Inputs remain in your browser session and are never transmitted or saved to remote databases.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
