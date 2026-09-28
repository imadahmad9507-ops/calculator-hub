import { Metadata } from 'next';
import Link from 'next/link';

interface ArticleDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: 'understanding-mortgage-amortization-schedules' },
    { slug: 'calculating-tdee-and-macronutrients-for-weight-loss' },
  ];
}

export default async function BlogArticlePage({ params }: ArticleDetailProps) {
  const { slug } = await params;

  return (
    <article className="max-w-3xl mx-auto space-y-8 py-4">
      <div className="pb-6 border-b border-[image:linear-gradient(to_right,transparent,var(--color-slate-200,#e2e8f0),transparent)] dark:border-zinc-800 space-y-3">
        <span className="text-xs font-semibold text-[#065F46] dark:text-[#34D399] uppercase tracking-wider bg-[#065F46]/10 dark:bg-[#34D399]/10 px-3 py-1 rounded-full border border-[#065F46]/20 dark:border-[#34D399]/30 inline-block">
          Educational Guide
        </span>
        <h1 className="text-3xl md:text-5xl font-black font-sans text-zinc-900 dark:text-zinc-100 capitalize tracking-tight">
          {slug.replace(/-/g, ' ')}
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Published by CalcHub Research Team • Updated 2026</p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-sm text-zinc-700 dark:text-zinc-300 space-y-4 font-sans leading-relaxed">
        <p>
          Understanding how interest rates and principal balances interact is essential for making sound financial decisions. Fixed-rate amortizing loans allocate a larger portion of early monthly payments toward interest, while principal paydown accelerates over time.
        </p>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-6">Key Takeaways</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Early payments consist primarily of interest charges calculated on remaining principal balance.</li>
          <li>Making extra principal payments shortens total loan duration significantly.</li>
          <li>Refinancing to a lower rate reduces total cumulative interest burden.</li>
        </ul>
      </div>

      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-xs font-semibold text-[#065F46] dark:text-[#34D399]">
        <Link href="/blog" className="hover:underline">
          ← Back to all articles
        </Link>
        <Link href="/calculators/mortgage-calculator" className="hover:underline">
          Try Mortgage Calculator →
        </Link>
      </div>
    </article>
  );
}
