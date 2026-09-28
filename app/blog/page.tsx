import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Financial & Health Articles — CalcHub Pro',
  description: 'In-depth financial planning, interest rates, tax guides, and health metric formulas explained.',
};

const ARTICLES = [
  {
    slug: 'understanding-mortgage-amortization-schedules',
    title: 'How Mortgage Amortization Works in the US (2026 Guide)',
    excerpt: 'Understand how monthly principal vs interest allocations shift over a 30-year fixed loan term.',
    date: 'September 15, 2026',
    category: 'Finance',
  },
  {
    slug: 'calculating-tdee-and-macronutrients-for-weight-loss',
    title: 'The Science Behind TDEE & Deficit Calorie Calculations',
    excerpt: 'How Mifflin-St Jeor BMR calculations differ from total daily energy expenditure factors.',
    date: 'September 10, 2026',
    category: 'Health',
  },
];

export default function BlogPage() {
  return (
    <div className="space-y-10">
      <div className="pb-8 border-b border-[image:linear-gradient(to_right,transparent,var(--color-slate-200,#e2e8f0),transparent)] dark:border-zinc-800 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#065F46] dark:text-[#34D399] bg-[#065F46]/10 dark:bg-[#34D399]/10 px-3 py-1 rounded-full border border-[#065F46]/20 dark:border-[#34D399]/30 font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          Guides & Articles
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold font-sans text-zinc-900 dark:text-zinc-100 tracking-tight">
          Financial & Health Educational Articles
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          In-depth guides explaining calculation formulas, tax mechanics, interest compounding, and fitness metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ARTICLES.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md hover:border-[#065F46]/30 dark:hover:border-[#34D399]/30 transition-all duration-200 hover:-translate-y-0.5 space-y-4"
          >
            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span className="text-[#065F46] dark:text-[#34D399] bg-[#065F46]/10 dark:bg-[#34D399]/10 px-2.5 py-0.5 rounded-md font-semibold">
                {article.category}
              </span>
              <span>{article.date}</span>
            </div>
            <div className="space-y-2 flex-1">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#065F46] dark:group-hover:text-[#34D399] transition-colors">
                {article.title}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{article.excerpt}</p>
            </div>
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-[#065F46] dark:text-[#34D399]">
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
