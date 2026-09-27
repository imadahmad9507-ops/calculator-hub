'use client';

import React from 'react';
import Link from 'next/link';
import { CALCULATORS, CATEGORIES } from '@/data/calculator-directory';
import { AdSlot } from '@/components/AdSlot';
import { MortgageCalculatorUI } from '@/components/calculators/MortgageCalculatorUI';
import { ParallaxVideoShowcase } from '@/components/ParallaxVideoShowcase';
import { motion, useReducedMotion } from 'framer-motion';
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
  Code,
  Cpu,
  Box,
  LineChart,
} from 'lucide-react';

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
  Calculator,
  Code,
  Cpu,
  Box,
  LineChart,
};

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <section className="text-center py-6 md:py-10 space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-[#065F46]/20 dark:border-[#34D399]/30 bg-[#065F46]/10 dark:bg-[#34D399]/10 text-[#065F46] dark:text-[#34D399] text-xs font-mono uppercase tracking-widest font-semibold">
          <Zap className="w-3.5 h-3.5" />
          100% Free • Live Computation • No Ads Registration Required
        </div>
        <h1 className="text-3xl md:text-5xl font-black font-sans tracking-tight text-zinc-900 dark:text-zinc-100">
          Precision <span className="text-[#065F46] dark:text-[#34D399]">Calculator Suite</span> for Instant Decisions
        </h1>

        <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
          Accurate, live-updating calculations for US mortgage, loan EMI, paycheck taxes, compound interest, TDEE, GPA, and business ROI.
        </p>

        {/* Hero Showcase Frame (Video 1 - Lagging Parallax ~0.6x) */}
        <div className="pt-2 pb-4">
          <ParallaxVideoShowcase
            src="/videos/hero-loop.mp4"
            poster="/videos/hero-loop-poster.jpg"
            alt="Calculator Input to Result Showcase"
            parallaxSpeed={0.6}
          />
        </div>
      </section>

      {/* Asymmetrical Featured Dual-Pane Instrument Console (Mortgage) */}
      <section className="p-6 md:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[#065F46]/10 dark:bg-[#34D399]/10 border border-[#065F46]/20 dark:border-[#34D399]/30 text-[#065F46] dark:text-[#34D399] flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#065F46] dark:text-[#34D399] font-bold">
                Live Interactive Instrument Console
              </span>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-sans mt-0.5">
                US Mortgage Amortization Console
              </h2>
            </div>
          </div>
          <Link
            href="/calculators/mortgage-calculator"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#065F46] dark:text-[#34D399] hover:underline"
          >
            <span>Full Tool</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <MortgageCalculatorUI />
      </section>

      <AdSlot slotId="homepage-top-banner" format="horizontal" />

      {/* Search & Discovery Showcase Section (Video 2 - Leading Parallax ~1.25x) */}
      <section className="py-6 space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-xs font-mono uppercase tracking-widest font-semibold">
          Instant Discovery & Search
        </div>
        <h2 className="text-2xl font-bold font-sans text-zinc-900 dark:text-zinc-100">
          Find Any Tool in Seconds
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans">
          Search across 12+ specialized financial, health, mathematical, and business calculators with live parameter previews.
        </p>

        <div className="pt-2">
          <ParallaxVideoShowcase
            src="/videos/search-loop.mp4"
            poster="/videos/search-loop-poster.jpg"
            alt="Search and Discovery Showcase"
            parallaxSpeed={1.25}
          />
        </div>
      </section>

      {/* Asymmetrical Tabular Category & Tool List */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
        className="space-y-6"
      >
        <h2 className="text-xl font-bold font-sans text-zinc-900 dark:text-zinc-100">
          Calculator Directories & Tools
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((cat) => {
            const calcsInCat = CALCULATORS.filter((c) => c.category === cat.id);
            return (
              <motion.div
                key={cat.id}
                variants={itemVariants}
                className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-sans">{cat.name}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{cat.description}</p>
                  </div>
                  <Link
                    href={`/${cat.id}`}
                    className="text-xs font-mono text-[#065F46] dark:text-[#34D399] font-bold hover:underline shrink-0"
                  >
                    View All ({calcsInCat.length})
                  </Link>
                </div>

                <div className="space-y-2">
                  {calcsInCat.map((calc) => {
                    const IconComponent = ICON_MAP[calc.icon] || Calculator;
                    return (
                      <Link
                        key={calc.slug}
                        href={`/calculators/${calc.slug}`}
                        className="group flex items-center justify-between p-3 rounded-md border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/40 hover:bg-white dark:hover:bg-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-150"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded bg-[#065F46]/10 dark:bg-[#34D399]/10 text-[#065F46] dark:text-[#34D399] flex items-center justify-center">
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-[#065F46] dark:group-hover:text-[#34D399] transition-colors">
                              {calc.name}
                            </h4>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">{calc.description}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#065F46] dark:group-hover:text-[#34D399] group-hover:translate-x-1 transition-all" />
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      <AdSlot slotId="homepage-bottom-banner" format="rectangle" />
    </div>
  );
}
