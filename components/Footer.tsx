import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldAlert } from 'lucide-react';
import { CATEGORIES } from '@/data/calculator-directory';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-emerald-900/10 dark:border-emerald-500/10 bg-gradient-to-b from-transparent via-[#065F46]/[0.03] to-[#065F46]/[0.08] dark:via-[#065F46]/[0.1] dark:to-[#062C22]/40">
      {/* Simple Light-style emerald gradient border top */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 py-10 sm:grid-cols-12 md:py-14 border-t border-transparent [border-image:linear-gradient(to_right,transparent,var(--color-emerald-600,#059669),transparent)1] dark:[border-image:linear-gradient(to_right,transparent,rgba(52,211,153,0.4),transparent)1]">

          {/* Brand — 4 cols */}
          <div className="sm:col-span-12 lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <Image
                src="/logo.png"
                alt="CalcHub Pro Logo"
                width={170}
                height={40}
                className="h-9 w-auto object-contain dark:hidden"
              />
              <Image
                src="/logo-dark.png"
                alt="CalcHub Pro Logo"
                width={170}
                height={40}
                className="h-9 w-auto object-contain hidden dark:block"
              />
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xs">
              Precision calculators for US finance, health, math, business, and everyday decisions. Live computation, strict privacy.
            </p>
            <p className="text-xs text-emerald-800/80 dark:text-emerald-400/80 font-medium">
              © {new Date().getFullYear()} CalcHub Inc. All rights reserved.
            </p>
          </div>


          {/* Categories — 2 cols */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Categories</h3>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/${cat.id}`}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal — 2 cols */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-zinc-600 dark:text-zinc-400 hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
                  About CalcHub
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-600 dark:text-zinc-400 hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-zinc-600 dark:text-zinc-400 hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal — 2 cols */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-zinc-600 dark:text-zinc-400 hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-zinc-600 dark:text-zinc-400 hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-zinc-600 dark:text-zinc-400 hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance note — 2 cols */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Compliance</h3>
            <div className="p-3.5 rounded-xl border border-[#065F46]/20 dark:border-[#34D399]/30 bg-white/80 dark:bg-zinc-900/80 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-2 shadow-xs">
              <div className="flex items-center gap-1.5 text-[#065F46] dark:text-[#34D399] font-bold">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>Estimates Only</span>
              </div>
              <p>
                All results are educational estimates. Consult licensed professionals before making financial or health decisions.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Simple Light-style large emerald watermark at bottom */}
      <div className="relative overflow-hidden py-6" aria-hidden="true">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center text-[clamp(60px,10vw,120px)] font-black leading-none tracking-tighter select-none
            bg-gradient-to-b from-[#065F46]/35 via-[#065F46]/15 to-transparent dark:from-[#34D399]/40 dark:via-[#34D399]/15 dark:to-transparent
            bg-clip-text text-transparent">
            CalcHub Pro
          </div>
        </div>
        <div className="h-20" />
      </div>
    </footer>
  );
}
