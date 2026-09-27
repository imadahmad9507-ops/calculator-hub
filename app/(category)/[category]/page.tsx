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
    <div className="space-y-8">
      {/* Category Header */}
      <div className="border-b border-zinc-800 pb-6 space-y-2">
        <div className="text-xs font-mono text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded inline-block border border-amber-500/20">
          Category Hub
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold font-sans text-zinc-100">{category.name}</h1>
        <p className="text-sm text-zinc-400 max-w-2xl">{category.description}</p>
      </div>

      <AdSlot slotId={`category-${catId}-top`} format="horizontal" />

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryCalcs.map((calc) => (
          <Link
            key={calc.slug}
            href={`/calculators/${calc.slug}`}
            className="group p-6 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-amber-500/50 hover:bg-zinc-900 transition-all shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-all">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                {calc.name}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{calc.description}</p>
            </div>
            <div className="mt-6 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs text-amber-400 font-mono">
              <span>Calculate Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
