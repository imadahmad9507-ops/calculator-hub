import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CALCULATORS, CATEGORIES } from '@/data/calculator-directory';
import { AdSlot } from '@/components/AdSlot';
import { ArrowRight, Calculator } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: catId } = await params;
  const category = CATEGORIES.find((c) => c.id === catId);
  if (!category) return {};

  return {
    title: `${category.name} Calculators — Free Live Precision Tools`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: catId } = await params;
  const category = CATEGORIES.find((c) => c.id === catId);
  if (!category) notFound();

  const categoryCalcs = CALCULATORS.filter((c) => c.category === catId);

  return (
    <div className="space-y-10">
      {/* Category Header — Simple Light style */}
      <div className="pb-8 border-b border-[image:linear-gradient(to_right,transparent,var(--color-slate-200,#e2e8f0),transparent)] dark:border-zinc-800 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#065F46] dark:text-[#34D399] bg-[#065F46]/10 dark:bg-[#34D399]/10 px-3 py-1 rounded-full border border-[#065F46]/20 dark:border-[#34D399]/30 font-semibold">
          <Calculator className="w-3.5 h-3.5" />
          Category
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold font-sans text-zinc-900 dark:text-zinc-100 tracking-tight">
          {category.name}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          {category.description}
        </p>
      </div>

      <AdSlot slotId={`category-${catId}-top`} format="horizontal" />

      {/* Calculator Grid — Simple Light card pattern */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categoryCalcs.map((calc) => (
          <Link
            key={calc.slug}
            href={`/calculators/${calc.slug}`}
            className="group flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md hover:border-[#065F46]/30 dark:hover:border-[#34D399]/30 transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="space-y-3 flex-1">
              <div className="w-10 h-10 rounded-xl bg-[#065F46]/10 dark:bg-[#34D399]/10 border border-[#065F46]/20 dark:border-[#34D399]/30 flex items-center justify-center text-[#065F46] dark:text-[#34D399] group-hover:bg-[#065F46] group-hover:text-white dark:group-hover:bg-[#34D399] dark:group-hover:text-zinc-950 transition-all duration-200">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#065F46] dark:group-hover:text-[#34D399] transition-colors leading-snug">
                {calc.name}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                {calc.description}
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#065F46] dark:text-[#34D399] font-mono uppercase tracking-wider">
                Open Tool
              </span>
              <ArrowRight className="w-4 h-4 text-[#065F46] dark:text-[#34D399] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
