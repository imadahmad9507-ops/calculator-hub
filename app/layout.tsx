import type { Metadata } from 'next';
import { Geist, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
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

const spaceGrotesk = Space_Grotesk({
  variable: '--font-heading',
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
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} font-sans bg-zinc-950 text-zinc-100 antialiased min-h-screen flex flex-col selection:bg-amber-500/30 selection:text-amber-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
