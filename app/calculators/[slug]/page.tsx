import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { CALCULATORS } from '@/data/calculator-directory';
import { CALCULATOR_CONFIGS } from '@/data/calculator-configs';
import { AdSlot } from '@/components/AdSlot';
import { AffiliateBox } from '@/components/AffiliateBox';
import { ArrowLeft, ArrowRight, HelpCircle, ShieldAlert, Sparkles } from 'lucide-react';

interface CalculatorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CALCULATORS.map((calc) => ({ slug: calc.slug }));
}

export async function generateMetadata({ params }: CalculatorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const calc = CALCULATORS.find((c) => c.slug === slug);
  if (!calc) return {};

  return {
    title: `${calc.name} — Free Live Precision Calculator`,
    description: calc.description,
    keywords: calc.keywords,
  };
}

export default async function CalculatorDetailPage({ params }: CalculatorPageProps) {
  const { slug } = await params;
  const calc = CALCULATORS.find((c) => c.slug === slug);
  const config = CALCULATOR_CONFIGS[slug];

  if (!calc || !config) notFound();

  const CalculatorComponent = config.component;

  // Related calculators in same category
  const relatedCalcs = CALCULATORS.filter(
    (c) => c.category === calc.category && c.slug !== calc.slug
  ).slice(0, 3);

  // JSON-LD FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="space-y-10">
      {/* FAQ Schema Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
        <Link href="/" className="hover:text-amber-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href={`/${calc.category}`} className="hover:text-amber-400 capitalize transition-colors">
          {calc.category}
        </Link>
        <span>/</span>
        <span className="text-amber-400 font-semibold">{calc.name}</span>
      </div>

      {/* Title & Description Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            {calc.category}
          </span>
          <span className="text-xs text-zinc-500 font-mono">• Live Computation</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black font-sans text-zinc-100">{calc.name}</h1>
        <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">{calc.description}</p>
      </div>

      {/* Main Interactive Calculator Card */}
      <div className="p-6 md:p-8 rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-2xl backdrop-blur-xl">
        <CalculatorComponent />

        {config.disclaimer && (
          <div className="mt-8 pt-4 border-t border-zinc-800/80 flex items-start gap-2 text-[11px] text-zinc-400 font-sans">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
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
      <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-3">
        <h2 className="text-lg font-bold font-sans text-zinc-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          How This Calculator Works
        </h2>
        <p className="text-xs text-zinc-300 leading-relaxed font-sans">{config.howItWorks}</p>
        <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-amber-400/90 overflow-x-auto">
          Formula: {config.formula}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold font-sans text-zinc-100 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-amber-400" />
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.faqs.map((faq, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-2">
              <h3 className="text-sm font-semibold text-zinc-100">{faq.question}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Calculators */}
      {relatedCalcs.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-zinc-800">
          <h2 className="text-base font-bold font-sans text-zinc-100">Related {calc.category} Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedCalcs.map((rc) => (
              <Link
                key={rc.slug}
                href={`/calculators/${rc.slug}`}
                className="group p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:border-amber-500/40 hover:bg-zinc-900 transition-all flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-zinc-200 group-hover:text-amber-400 transition-colors">
                    {rc.name}
                  </h4>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1">{rc.description}</p>
                </div>
                <div className="mt-3 text-[10px] font-mono text-amber-400 flex items-center gap-1">
                  <span>Open</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
