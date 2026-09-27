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
    <div className="my-8 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-amber-500/10 text-amber-400 text-[10px] font-mono px-3 py-1 rounded-bl-lg border-b border-l border-amber-500/20 uppercase tracking-widest flex items-center gap-1">
        <ShieldCheck className="w-3 h-3" />
        Sponsored Partner
      </div>
      <div className="pr-20">
        <h4 className="text-base font-semibold text-zinc-100 mb-1">{title}</h4>
        <p className="text-xs text-zinc-400 leading-relaxed mb-4">{description}</p>
      </div>
      {/* TODO: Replace placeholder href with your actual affiliate partner referral URL */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer opacity-90 hover:opacity-100"
        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium text-xs rounded-md transition-colors shadow-sm shadow-amber-500/20"
      >
        <span>{buttonText}</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
