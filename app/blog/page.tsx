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
    <div className="space-y-8">
      <div className="border-b border-zinc-800 pb-6 space-y-2">
        <h1 className="text-3xl md:text-4xl font-extrabold font-sans text-zinc-100">
          Financial & Health Educational Articles
        </h1>
        <p className="text-sm text-zinc-400">
          In-depth guides explaining formulas, IRS tax rules, interest rate compounding, and fitness metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ARTICLES.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group p-6 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-amber-500/50 hover:bg-zinc-900 transition-all space-y-3"
          >
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {article.category}
              </span>
              <span>{article.date}</span>
            </div>
            <h2 className="text-lg font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
              {article.title}
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">{article.excerpt}</p>
            <div className="pt-2 text-xs font-mono text-amber-400 flex items-center gap-1">
              <span>Read Full Article</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
