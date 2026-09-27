'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { calculatePaycheck } from '@/lib/calculators';
import { formatCurrency } from '@/lib/utils';
import { ResultDisplay } from '@/components/ui/result-display';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { CalculationResults } from '@/components/ui/calculation-results';
import { InputError } from '@/components/ui/input-error';

const schema = z.object({
  grossSalary: z.number().min(1000, 'Minimum gross salary $1,000'),
  payFrequency: z.enum(['weekly', 'biweekly', 'semimonthly', 'monthly']),
  filingStatus: z.enum(['single', 'married']),
});

type FormValues = z.infer<typeof schema>;

export function PaycheckCalculatorUI() {
  const { register, watch, formState: { errors, isValid } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      grossSalary: 85000,
      payFrequency: 'biweekly',
      filingStatus: 'single',
    },
    mode: 'onChange',
  });

  const values = watch();
  const results = calculatePaycheck({
    grossSalary: Number(values.grossSalary) || 0,
    payFrequency: values.payFrequency,
    filingStatus: values.filingStatus,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Annual Gross Salary ($)
          </label>
          <Input type="number" step="1000" {...register('grossSalary', { valueAsNumber: true })} />
          <InputError message={errors.grossSalary?.message} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Pay Frequency
            </label>
            <Select {...register('payFrequency')}>
              <option value="weekly">Weekly (52 / yr)</option>
              <option value="biweekly">Bi-Weekly (26 / yr)</option>
              <option value="semimonthly">Semi-Monthly (24 / yr)</option>
              <option value="monthly">Monthly (12 / yr)</option>
            </Select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Federal Filing Status
            </label>
            <Select {...register('filingStatus')}>
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </Select>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 text-[11px] text-zinc-400 font-sans leading-relaxed">
          <span className="text-amber-400 font-medium">IRS Tax Bracket Note: </span>
          Estimated with 2026 IRS federal tax brackets and standard deduction, plus 6.2% Social Security and 1.45% Medicare. State and local taxes excluded.
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <CalculationResults isValid={isValid}>
          <>
            <ResultDisplay
              label="Net Take-Home Pay Per Paycheck"
              value={formatCurrency(results.netPayPerPaycheck)}
              subText={`Gross paycheck: ${formatCurrency(results.grossPerPaycheck)}`}
              isPrimary
            />
            <ResultDisplay
              label="Federal Income Tax Withholding"
              value={formatCurrency(results.federalTaxPerPaycheck)}
              subText={`Annual Federal Tax: ${formatCurrency(results.annualFederalTax)}`}
            />
            <ResultDisplay
              label="FICA Withholding (SS + Medicare)"
              value={formatCurrency(results.socialSecurityPerPaycheck + results.medicarePerPaycheck)}
              subText={`SS: ${formatCurrency(results.socialSecurityPerPaycheck)} | Medicare: ${formatCurrency(results.medicarePerPaycheck)}`}
            />
          </>
        </CalculationResults>
      </div>
    </div>
  );
}
