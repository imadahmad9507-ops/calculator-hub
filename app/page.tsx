import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { CALCULATORS, CATEGORIES } from '@/data/calculator-directory';
import { AdSlot } from '@/components/AdSlot';
import {
  Home,
  Landmark,
  TrendingUp,
  DollarSign,
  Activity,
  Flame,
  Percent,
  GraduationCap,
  Utensils,
  Calendar,
  ArrowLeftRight,
  Briefcase,
  ArrowRight,
  Zap,
  Calculator,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'CalcHub Pro — Precision Instrument Calculator Suite',
  description:
    'Free, live-computing precision calculators for US finance, health, math, business, and everyday unit conversions.',
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Landmark,
  TrendingUp,
  DollarSign,
  Activity,
  Flame,
  Percent,
  GraduationCap,
  Utensils,
  Calendar,
  ArrowLeftRight,
  Briefcase,
};

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-10 md:py-16 space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono uppercase tracking-widest">
          <Zap className="w-3.5 h-3.5" />
          100% Free • Live Computation • No Ads Registration Required
        </div>
        <h1 className="text-4xl md:text-6xl font-black font-sans tracking-tight text-zinc-100">
          Precision <span className="text-amber-500">Calculator Suite</span> for Instant Decisions
        </h1>
        <p className="text-base md:text-lg text-zinc-400 leading-relaxed font-sans">
          Accurate, live-updating calculations for US mortgage, tax paycheck, compound interest, TDEE, GPA, and business ROI.
        </p>
      </section>

      <AdSlot slotId="homepage-top-banner" format="horizontal" />

      {/* Category Grid */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold font-sans text-zinc-100 flex items-center gap-2">
          <span>Explore Calculator Categories</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => {
            const count = CALCULATORS.filter((c) => c.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/${cat.id}`}
                className="group p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-900 hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {count} Tools
                    </span>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1">{cat.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bento Grid of All 12 Calculators */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold font-sans text-zinc-100">
          All 12 Interactive Calculators
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CALCULATORS.map((calc) => {
            const IconComponent = ICON_MAP[calc.icon] || Calculator;
            return (
              <Link
                key={calc.slug}
                href={`/calculators/${calc.slug}`}
                className="group p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-amber-500/50 hover:bg-zinc-900 transition-all shadow-md flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest bg-zinc-800 px-2 py-0.5 rounded">
                      {calc.category}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                      {calc.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-1 line-clamp-2">
                      {calc.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs text-amber-400/90 font-mono">
                  <span>Open Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <AdSlot slotId="homepage-bottom-banner" format="rectangle" />
    </div>
  );
}
