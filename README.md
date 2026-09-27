# CalcHub Pro — All-In-One Precision Calculator Hub

A production-ready, high-precision instrument panel calculator suite built for US audiences with Next.js 15, Tailwind CSS v4, TypeScript, Zod, Framer Motion, and Fuse.js.

## 🚀 Quick Start (Local Development)

1. Clone or download repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run verification tests:
   ```bash
   npx tsx test-calculators.ts
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000` in your browser.

---

## 📦 Vercel Deployment (Zero Config)

This application is built for Vercel Hobby tier (Free) with static generation for all calculator routes (`generateStaticParams`).

### Option A: Vercel CLI
```bash
npx vercel
```

### Option B: GitHub Import
1. Push this project to GitHub.
2. Import repository on [vercel.com/new](https://vercel.com/new).
3. Select Next.js preset (defaults will build automatically with `npm run build`).

---

## 💰 Monetization Configuration

### Google AdSense Setup
AdSense placeholder slots are configured in `components/AdSlot.tsx`.
To enable live AdSense ads:
1. Open `components/AdSlot.tsx`.
2. Replace the placeholder `div` with your official Google AdSense `<ins class="adsbygoogle" ...>` snippet and `adsbygoogle.push({})` script.

### Affiliate Offer Links
Affiliate boxes are configured in `components/AffiliateBox.tsx` and mapped in `data/calculator-configs.ts`.
To plug in live partner links:
1. Search for `TODO` comments in `components/AffiliateBox.tsx`.
2. Update `href` props in `data/calculator-configs.ts` with your affiliate tracking URL.

---

## 📅 Annual Tax Bracket Maintenance

The US Paycheck Calculator tax brackets are located in `lib/calculators.ts` inside `calculatePaycheck()`.
When IRS releases new tax brackets (e.g. 2027 adjustments):
1. Open `lib/calculators.ts`.
2. Update `standardDeduction`, `singleBrackets`, `marriedBrackets`, and `ssWageCap` constants.
3. Run `npx tsx test-calculators.ts` to confirm calculations.
