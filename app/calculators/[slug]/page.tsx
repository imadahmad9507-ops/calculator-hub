import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CALCULATORS } from '@/data/calculator-directory';
import { CALCULATOR_CONFIGS } from '@/data/calculator-configs';
import { ClientCalculatorPageContent } from '@/components/ClientCalculatorPageContent';

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ClientCalculatorPageContent slug={slug} />
    </>
  );
}
