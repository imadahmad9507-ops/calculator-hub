import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface AffiliateBoxProps {
  title: string;
  description: string;
  buttonText: string;
  href?: string;
  providerLogo?: string;
}

export function AffiliateBox({
  title,
  description,
  buttonText,
  href = '#',
}: AffiliateBoxProps) {
  return (
    <div className="my-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/60 p-6 backdrop-blur-sm relative overflow-hidden shadow-xs">
      <div className="absolute top-0 right-0 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 text-[10px] font-mono px-3 py-1 rounded-bl-xl border-b border-l border-emerald-200 dark:border-emerald-800 uppercase tracking-widest flex items-center gap-1.5 font-semibold">
        <ShieldCheck className="w-3.5 h-3.5" />
        Sponsored Partner
      </div>
      <div className="pr-20">
        <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1">{title}</h4>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">{description}</p>
      </div>
      {/* TODO: Replace placeholder href with your actual affiliate partner referral URL */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-medium text-xs rounded-lg transition-colors shadow-xs shadow-emerald-700/20"
      >
        <span>{buttonText}</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
