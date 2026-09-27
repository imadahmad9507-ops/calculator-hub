'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResultDisplayProps {
  label: string;
  value: string | number;
  subText?: string;
  copyableText?: string;
  isPrimary?: boolean;
}

export function ResultDisplay({
  label,
  value,
  subText,
  copyableText,
  isPrimary = false,
}: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = copyableText || String(value);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`relative p-4 rounded-xl border transition-all ${
        isPrimary
          ? 'border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-950 shadow-lg shadow-amber-500/5'
          : 'border-zinc-800 bg-zinc-950/60'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className={`text-xs font-medium uppercase tracking-wider ${isPrimary ? 'text-amber-400' : 'text-zinc-400'}`}>
          {label}
        </span>
        <button
          onClick={handleCopy}
          type="button"
          className="p-1 rounded text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/80 transition-colors"
          title="Copy result"
          aria-label={`Copy ${label}`}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="font-mono tracking-tight font-bold text-2xl md:text-3xl text-zinc-100 my-1 overflow-x-auto whitespace-nowrap scrollbar-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={String(value)}
            initial={{ opacity: 0.6, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0.6, y: 2 }}
            transition={{ duration: 0.15 }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>

      {subText && <p className="text-[11px] font-sans text-zinc-400 mt-1">{subText}</p>}
    </div>
  );
}
