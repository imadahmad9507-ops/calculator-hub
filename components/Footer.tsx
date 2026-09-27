import React from 'react';
import Link from 'next/link';
import { Calculator, ShieldAlert } from 'lucide-react';
import { CATEGORIES } from '@/data/calculator-directory';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 text-xs font-sans mt-20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-md bg-[#065F46]/10 dark:bg-[#34D399]/10 border border-[#065F46]/20 dark:border-[#34D399]/30 text-[#065F46] dark:text-[#34D399] flex items-center justify-center">
                <Calculator className="w-4 h-4" />
              </div>
              <span className="font-sans font-bold text-base text-zinc-900 dark:text-zinc-100">
                Calc<span className="text-[#065F46] dark:text-[#34D399]">Hub</span>
              </span>
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed max-w-sm">
              Precision instrument calculators designed for US finance, health, math, business, and everyday decisions. Live computation, strict privacy, zero lag.
            </p>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">
              © {new Date().getFullYear()} CalcHub Inc. All rights reserved.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider text-[11px] font-mono mb-3">
              Categories
            </h4>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/${cat.id}`} className="hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider text-[11px] font-mono mb-3">
              Company & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
                  About CalcHub
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
                  Financial & Medical Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Security & Disclaimer */}
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider text-[11px] font-mono mb-3">
              Compliance
            </h4>
            <div className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-2">
              <div className="flex items-center gap-1.5 text-[#065F46] dark:text-[#34D399] font-mono font-semibold">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>Estimate Disclaimer</span>
              </div>
              <p>
                All calculations are for educational and estimation purposes only. Consult certified financial or healthcare professionals for advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
