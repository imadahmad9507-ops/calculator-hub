'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Calculator, Sun, Moon, ArrowUp } from 'lucide-react';
import { useTheme } from 'next-themes';
import Fuse from 'fuse.js';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CALCULATORS } from '@/data/calculator-directory';

const fuse = new Fuse(CALCULATORS, {
  keys: ['name', 'description', 'keywords', 'category'],
  threshold: 0.3,
});

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  };

  const results = query.trim() ? fuse.search(query).map((r) => r.item) : [];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          scrolled
            ? 'bg-white/90 dark:bg-[#0D1114]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-md bg-[#065F46]/10 dark:bg-[#34D399]/10 border border-[#065F46]/20 dark:border-[#34D399]/30 flex items-center justify-center text-[#065F46] dark:text-[#34D399] group-hover:bg-[#065F46] group-hover:text-white dark:group-hover:bg-[#34D399] dark:group-hover:text-zinc-950 transition-all duration-150">
              <Calculator className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-sans font-extrabold text-base tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-[#065F46] dark:group-hover:text-[#34D399] transition-colors">
                Calc<span className="text-[#065F46] dark:text-[#34D399]">Hub</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest text-[#065F46] dark:text-[#34D399] bg-[#065F46]/10 dark:bg-[#34D399]/10 px-1.5 py-0.5 rounded border border-[#065F46]/20 dark:border-[#34D399]/30 font-semibold">
                PRO
              </span>
            </div>
          </Link>

          {/* Global Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link href="/finance" className="hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
              Finance
            </Link>
            <Link href="/health" className="hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
              Health
            </Link>
            <Link href="/math" className="hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
              Math
            </Link>
            <Link href="/everyday" className="hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
              Everyday
            </Link>
            <Link href="/business" className="hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
              Business
            </Link>
            <Link href="/blog" className="hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
              Articles
            </Link>
          </nav>

          {/* Search & Theme Actions */}
          <div className="flex items-center gap-3 relative">
            <div className="relative w-48 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
              <input
                type="text"
                placeholder="Search 12+ calculators..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                className="w-full h-9 pl-9 pr-3 rounded-md bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs font-sans text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#065F46] dark:focus:ring-[#34D399] transition-all duration-150"
              />

              {/* Fuzzy Search Dropdown */}
              {isOpen && query.trim() !== '' && (
                <div
                  className="absolute right-0 left-0 top-11 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50 max-h-80 overflow-y-auto"
                  onMouseLeave={() => setIsOpen(false)}
                >
                  {results.length > 0 ? (
                    results.map((calc) => (
                      <Link
                        key={calc.slug}
                        href={`/calculators/${calc.slug}`}
                        onClick={() => {
                          setQuery('');
                          setIsOpen(false);
                        }}
                        className="flex flex-col p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 border-b border-zinc-100 dark:border-zinc-800/40 last:border-none transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{calc.name}</span>
                          <span className="text-[10px] font-mono text-[#065F46] dark:text-[#34D399] uppercase tracking-widest bg-[#065F46]/10 dark:bg-[#34D399]/10 px-1.5 py-0.5 rounded font-semibold">
                            {calc.category}
                          </span>
                        </div>
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">{calc.description}</span>
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-zinc-500">No matching calculators found.</div>
                  )}
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-9 h-9 rounded-md border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-zinc-400 dark:hover:border-zinc-700 flex items-center justify-center transition-all duration-150 cursor-pointer shadow-xs active:scale-95"
                aria-label="Toggle Theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <motion.span
                      key="sun"
                      initial={shouldReduceMotion ? false : { rotate: -90, opacity: 0 }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { rotate: 0, opacity: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-4 h-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={shouldReduceMotion ? false : { rotate: 90, opacity: 0 }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { rotate: 0, opacity: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Floating Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-md bg-[#065F46] dark:bg-[#34D399] text-white dark:text-zinc-950 shadow-md hover:bg-[#044E39] dark:hover:bg-[#2CB884] transition-colors cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
