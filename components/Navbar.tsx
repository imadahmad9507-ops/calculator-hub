'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Calculator, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from 'next-themes';
import Fuse from 'fuse.js';
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

  useEffect(() => setMounted(true), []);

  const results = query.trim() ? fuse.search(query).map((r) => r.item) : [];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-all">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <span className="font-sans font-extrabold text-lg tracking-tight text-zinc-100 group-hover:text-amber-400 transition-colors">
              Calc<span className="text-amber-500">Hub</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-mono uppercase tracking-widest text-amber-400/80 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
              PRO
            </span>
          </div>
        </Link>

        {/* Global Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <Link href="/finance" className="hover:text-amber-400 transition-colors">
            Finance
          </Link>
          <Link href="/health" className="hover:text-amber-400 transition-colors">
            Health
          </Link>
          <Link href="/math" className="hover:text-amber-400 transition-colors">
            Math
          </Link>
          <Link href="/everyday" className="hover:text-amber-400 transition-colors">
            Everyday
          </Link>
          <Link href="/business" className="hover:text-amber-400 transition-colors">
            Business
          </Link>
          <Link href="/blog" className="hover:text-amber-400 transition-colors">
            Articles
          </Link>
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-3 relative">
          <div className="relative w-48 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search 12+ calculators..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              className="w-full h-9 pl-9 pr-3 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-sans text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />

            {/* Fuzzy Search Dropdown */}
            {isOpen && query.trim() !== '' && (
              <div
                className="absolute right-0 left-0 top-11 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto"
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
                      className="flex flex-col p-3 hover:bg-zinc-800/80 border-b border-zinc-800/40 last:border-none transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-zinc-100">{calc.name}</span>
                        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest bg-amber-500/10 px-1.5 py-0.5 rounded">
                          {calc.category}
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">{calc.description}</span>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-zinc-500">No matching calculators found.</div>
                )}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-amber-400 hover:border-zinc-700 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
