import { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Support — CalcHub Pro',
  description: 'Get in touch with the CalcHub Pro engineering team for calculator suggestions or feedback.',
};

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold font-sans text-zinc-100">Contact CalcHub Team</h1>
        <p className="text-xs text-zinc-400">
          Have questions, feedback, or a request for a custom calculator formula? Send us a message below.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
