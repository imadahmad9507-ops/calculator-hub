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
      {/* Hero Header — Simple Light style */}
      <section className="relative text-center py-10 md:py-16 space-y-5 max-w-3xl mx-auto">
        {/* Decorative gradient glow blobs (Simple Light pattern) */}
        <div className="pointer-events-none absolute -top-20 left-1/2 ml-[280px] -translate-x-1/2" aria-hidden="true">
          <div className="h-64 w-64 rounded-full bg-gradient-to-tr from-[#065F46] opacity-20 blur-[120px]" />
        </div>
        <div className="pointer-events-none absolute top-[300px] left-1/2 -ml-[200px] -translate-x-1/2" aria-hidden="true">
          <div className="h-64 w-64 rounded-full bg-gradient-to-tr from-[#065F46] to-zinc-200 opacity-15 blur-[120px]" />
        </div>

        {/* Badge — Simple Light rounded-full pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#065F46]/25 dark:border-[#34D399]/30 bg-[#065F46]/8 dark:bg-[#34D399]/10 text-[#065F46] dark:text-[#34D399] text-xs font-semibold tracking-wide">
          Calculations update in your browser as you type
        </div>

        {/* H1 with border-image gradient separators (Simple Light) */}
        <h1 className="text-4xl md:text-6xl font-black font-sans tracking-tight text-zinc-900 dark:text-zinc-100 border-y py-4
          [border-image:linear-gradient(to_right,transparent,rgba(148,163,184,0.5),transparent)1]
          dark:[border-image:linear-gradient(to_right,transparent,rgba(63,63,70,0.5),transparent)1]">
          Precision <span className="text-[#065F46] dark:text-[#34D399]">Calculator Suite</span>
          <br className="hidden md:block" /> for Instant Decisions
        </h1>

        <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          Accurate, live-updating calculations for US mortgage, loan EMI, paycheck taxes, compound interest, TDEE, GPA, and business ROI.
        </p>

        {/* CTA button group — Simple Light gradient button */}
        <div className="relative z-10 py-5 my-2 border-y border-zinc-200/80 dark:border-zinc-800/80 max-w-lg mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/finance"
              className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm text-white
                bg-gradient-to-t from-[#044E39] to-[#065F46] bg-[length:100%_100%] hover:bg-[length:100%_150%] bg-bottom
                shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
            >
              Explore Calculators
              <ArrowRight className="w-4 h-4 tracking-normal text-emerald-300 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/calculators/mortgage-calculator"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm
                bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200
                border border-zinc-200 dark:border-zinc-700
                shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              Try Mortgage Calculator
            </Link>
          </div>
        </div>

        {/* Hero Showcase Frame (Video 1 - Lagging Parallax & Left Drift) */}
        <div className="pt-2 pb-4">
          <ParallaxVideoShowcase
            src="/videos/hero-loop.mp4"
            poster="/videos/hero-loop-poster.jpg"
            alt="Calculator Input to Result Showcase"
            direction="left"
            verticalDistance={-50}
          />
        </div>
      </section>


      {/* Asymmetrical Featured Dual-Pane Instrument Console (Mortgage) */}
      <section className="p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#065F46]/10 dark:bg-[#34D399]/10 border border-[#065F46]/20 dark:border-[#34D399]/30 text-[#065F46] dark:text-[#34D399] flex items-center justify-center">
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
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#065F46] dark:text-[#34D399] hover:underline"
          >
            <span>Full Tool</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <MortgageCalculatorUI />
      </section>

      <AdSlot slotId="homepage-top-banner" format="horizontal" />

      {/* Search & Discovery Showcase Section (Video 2 - Leading Parallax & Right Drift) */}
      <section className="py-8 space-y-5 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 text-xs font-semibold tracking-wide shadow-sm">
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
            direction="right"
            verticalDistance={60}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CATEGORIES.map((cat) => {
            const calcsInCat = CALCULATORS.filter((c) => c.category === cat.id);
            return (
              <motion.div
                key={cat.id}
                variants={itemVariants}
                className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-sans">{cat.name}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{cat.description}</p>
                  </div>
                  <Link
                    href={`/${cat.id}`}
                    className="text-xs font-semibold text-[#065F46] dark:text-[#34D399] hover:underline shrink-0"
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
                        className="group flex items-center justify-between p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-950/40 hover:bg-white dark:hover:bg-zinc-800/80 hover:border-zinc-200 dark:hover:border-zinc-700 hover:shadow-sm transition-all duration-150"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-md bg-[#065F46]/10 dark:bg-[#34D399]/10 text-[#065F46] dark:text-[#34D399] flex items-center justify-center">
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
