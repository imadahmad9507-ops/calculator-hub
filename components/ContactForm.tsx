'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export function ContactForm() {
  // TODO: Create a free account at https://formspree.io, create a new form, and replace 'YOUR_FORMSPREE_ID' below with your actual Formspree ID (e.g., 'xzyvpwq1')
  const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'YOUR_FORMSPREE_ID';

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        const data = await response.json();
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit form. Please check your Formspree ID configuration.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-xl border border-zinc-800 bg-zinc-900/60 shadow-xl">
      {status === 'success' && (
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-sans flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Thank you! Your message has been submitted successfully. We will get back to you shortly.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-sans flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
          Your Full Name
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full h-10 px-3 rounded-md border border-zinc-800 bg-zinc-950 font-sans text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
          placeholder="Jane Doe"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full h-10 px-3 rounded-md border border-zinc-800 bg-zinc-950 font-sans text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
          placeholder="jane@example.com"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
          Message / Feedback
        </label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full p-3 rounded-md border border-zinc-800 bg-zinc-950 font-sans text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
          placeholder="Describe your inquiry or feature request..."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full h-10 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-md uppercase tracking-wider transition-colors shadow-sm shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        <Send className="w-3.5 h-3.5" />
        <span>{status === 'submitting' ? 'Submitting...' : 'Send Message'}</span>
      </button>
    </form>
  );
}
