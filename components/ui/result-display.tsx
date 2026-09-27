'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

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
  const shouldReduceMotion = useReducedMotion();

  const handleCopy = () => {
    const textToCopy = copyableText || String(value);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`relative p-5 rounded-xl border transition-all duration-200 ${
        isPrimary
          ? 'border-[#065F46]/40 dark:border-[#34D399]/40 bg-[#062C22] text-white shadow-xs'
          : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span
          className={`text-[11px] font-mono uppercase tracking-wider ${
            isPrimary ? 'text-[#34D399] font-bold' : 'text-zinc-500 dark:text-zinc-400 font-semibold'
          }`}
        >
          {label}
        </span>
        <button
          onClick={handleCopy}
          type="button"
          className={`p-1.5 rounded-md transition-colors cursor-pointer ${
            isPrimary
              ? 'text-[#34D399] hover:bg-emerald-900/60'
              : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
          title="Copy result"
          aria-label={`Copy ${label}`}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={shouldReduceMotion ? false : { scale: 0.5, opacity: 0 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Check className={`w-4 h-4 ${isPrimary ? 'text-[#34D399]' : 'text-emerald-600 dark:text-emerald-400'}`} />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={shouldReduceMotion ? false : { scale: 0.8, opacity: 0 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Copy className="w-4 h-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <div
        className={`font-mono tracking-tight font-bold text-2xl md:text-3xl my-1 overflow-x-auto whitespace-nowrap scrollbar-none ${
          isPrimary ? 'text-[#34D399]' : 'text-zinc-900 dark:text-zinc-100'
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={String(value)}
            initial={shouldReduceMotion ? false : { opacity: 0.4, scale: 0.98 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0.4 } : { opacity: 0.4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>

      {subText && (
        <p
          className={`text-xs font-sans mt-1.5 leading-relaxed ${
            isPrimary ? 'text-emerald-200/80' : 'text-zinc-500 dark:text-zinc-400'
          }`}
        >
          {subText}
        </p>
      )}
    </div>
  );
}
