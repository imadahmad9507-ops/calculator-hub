'use client';

import React from 'react';
import Link from 'next/link';
import { CALCULATORS, CATEGORIES } from '@/data/calculator-directory';
import { CALCULATOR_CONFIGS } from '@/data/calculator-configs';
import { AdSlot } from '@/components/AdSlot';
import { AffiliateBox } from '@/components/AffiliateBox';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, HelpCircle, ShieldAlert, Sparkles } from 'lucide-react';

interface ClientCalculatorPageContentProps {
  slug: string;
}

export function ClientCalculatorPageContent({ slug }: ClientCalculatorPageContentProps) {
  const calc = CALCULATORS.find((c) => c.slug === slug);
  const config = CALCULATOR_CONFIGS[slug];
  const shouldReduceMotion = useReducedMotion();

  if (!calc || !config) return null;

  const CalculatorComponent = config.component;

  const relatedCalcs = CALCULATORS.filter(
    (c) => c.category === calc.category && c.slug !== calc.slug
  ).slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35 },
    },
  };

  return (
    <div className="space-y-10">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href={`/${calc.category}`} className="hover:text-emerald-600 dark:hover:text-emerald-400 capitalize transition-colors">
          {calc.category}
        </Link>
        <span>/</span>
        <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{calc.name}</span>
      </div>

      {/* Title & Description Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 font-semibold">
            {calc.category}
          </span>
          <span className="text-xs text-zinc-400 font-mono">• Live Computation</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black font-sans text-zinc-900 dark:text-zinc-100 tracking-tight">{calc.name}</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">{calc.description}</p>
      </div>

      {/* Main Interactive Calculator Card */}
      <div className="p-6 md:p-8 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-md backdrop-blur-xl">
        <CalculatorComponent />

        {config.disclaimer && (
          <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-sans">
            <ShieldAlert className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>{config.disclaimer}</span>
          </div>
        )}
      </div>

      {/* Affiliate Offer Box (if configured) */}
      {config.affiliate && (
        <AffiliateBox
          title={config.affiliate.title}
          description={config.affiliate.description}
          buttonText={config.affiliate.buttonText}
        />
      )}

      <AdSlot slotId={`${calc.slug}-mid-ad`} format="horizontal" />

      {/* How This Works Explanation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
        className="space-y-6"
      >
        <motion.div variants={itemVariants} className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/40 space-y-3 shadow-xs">
          <h2 className="text-lg font-bold font-sans text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            How This Calculator Works
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">{config.howItWorks}</p>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 font-mono text-xs text-emerald-800 dark:text-emerald-400 overflow-x-auto">
            Formula: {config.formula}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-lg font-bold font-sans text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/50 space-y-2 shadow-xs">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{faq.question}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Related Calculators */}
        {relatedCalcs.length > 0 && (
          <motion.div variants={itemVariants} className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-base font-bold font-sans text-zinc-900 dark:text-zinc-100">Related {calc.category} Calculators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedCalcs.map((rc) => (
                <Link
                  key={rc.slug}
                  href={`/calculators/${rc.slug}`}
                  className="group p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/40 hover:border-emerald-600/40 dark:hover:border-emerald-500/40 hover:bg-white dark:hover:bg-zinc-900 transition-all duration-200 flex flex-col justify-between shadow-xs hover:-translate-y-0.5"
                >
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {rc.name}
                    </h4>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 line-clamp-2 mt-1">{rc.description}</p>
                  </div>
                  <div className="mt-3 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                    <span>Open</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
