import type { Metadata } from 'next';
import { Geist, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'CalcHub Pro — Precision Instrument Calculator Suite',
    template: '%s | CalcHub Pro',
  },
  description:
    'All-in-one precision calculator hub for US mortgage, loans, tax paycheck, compound interest, health, BMI, TDEE, math, and business ROI.',
  keywords: [
    'calculator',
    'mortgage calculator',
    'paycheck tax calculator',
    'compound interest',
    'bmi calculator',
    'tdee calculator',
    'roi calculator',
  ],
  authors: [{ name: 'CalcHub Engineering' }],
  metadataBase: new URL('https://calculator-hub-eosin-one.vercel.app'),
  openGraph: {
    title: 'CalcHub Pro — Precision Instrument Calculator Suite',
    description: 'Fast, live-computing precision calculators for finance, health, math, and business.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} font-sans bg-[#F5F7F6] text-[#11181C] dark:bg-[#0D1114] dark:text-[#F1F3F5] antialiased min-h-screen flex flex-col selection:bg-emerald-500/20 selection:text-emerald-900 transition-colors duration-200`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
