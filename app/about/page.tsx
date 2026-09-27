import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About CalcHub Pro — Precision Calculator Engine',
  description: 'CalcHub Pro is dedicated to providing high-accuracy, privacy-focused calculators for US consumers and professionals.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-extrabold font-sans text-zinc-100">About CalcHub Pro</h1>
      <p className="text-sm text-zinc-300 leading-relaxed font-sans">
        CalcHub Pro was built to replace slow, ad-cluttered legacy calculator sites with a high-performance, precision instrument panel experience.
      </p>
      <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-3">
        <h2 className="text-lg font-bold text-amber-400 font-sans">Our Core Principles</h2>
        <ul className="space-y-2 text-xs text-zinc-300 font-sans">
          <li>• <strong>Instant Live Output:</strong> All math runs client-side in real-time as you type.</li>
          <li>• <strong>Mathematical Integrity:</strong> Every formula is verified against standard financial and scientific reference models.</li>
          <li>• <strong>Strict Privacy:</strong> Your financial and personal health inputs remain local in your browser and are never saved to remote servers.</li>
        </ul>
      </div>
    </div>
  );
}
