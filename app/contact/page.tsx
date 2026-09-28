import { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Support — CalcHub Pro',
  description: 'Get in touch with the CalcHub Pro engineering team for calculator suggestions or feedback.',
};

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto space-y-8 py-4">
      <div className="pb-6 border-b border-[image:linear-gradient(to_right,transparent,var(--color-slate-200,#e2e8f0),transparent)] dark:border-zinc-800 space-y-2 text-center">
        <h1 className="text-3xl font-extrabold font-sans text-zinc-900 dark:text-zinc-100 tracking-tight">
          Contact CalcHub Team
        </h1>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Have questions, feedback, or a request for a custom calculator formula? Send us a message below.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
