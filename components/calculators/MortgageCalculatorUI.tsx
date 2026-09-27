'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { calculateMortgage } from '@/lib/calculators';
import { formatCurrency } from '@/lib/utils';
import { ResultDisplay } from '@/components/ui/result-display';
import { Input } from '@/components/ui/input';
import { CalculationResults } from '@/components/ui/calculation-results';
import { InputError } from '@/components/ui/input-error';

const schema = z.object({
  homePrice: z.number().min(1000, 'Minimum home price $1,000'),
  downPayment: z.number().min(0, 'Down payment cannot be negative'),
  interestRate: z.number().min(0, 'Rate cannot be negative').max(30, 'Rate max 30%'),
  loanTermYears: z.number().min(1, 'Term min 1 year').max(50, 'Term max 50 years'),
}).refine(({ homePrice, downPayment }) => downPayment <= homePrice, {
  path: ['downPayment'],
  message: 'Down payment cannot exceed home price',
});

type FormValues = z.infer<typeof schema>;

export function MortgageCalculatorUI() {
  const { register, watch, formState: { errors, isValid } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      homePrice: 400000,
      downPayment: 80000,
      interestRate: 6.5,
      loanTermYears: 30,
    },
    mode: 'onChange',
  });

  const values = watch();
  const results = calculateMortgage({
    homePrice: Number(values.homePrice) || 0,
    downPayment: Number(values.downPayment) || 0,
    interestRate: Number(values.interestRate) || 0,
    loanTermYears: Number(values.loanTermYears) || 0,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-7 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Home Purchase Price ($)
          </label>
          <Input type="number" step="1000" {...register('homePrice', { valueAsNumber: true })} />
          <InputError message={errors.homePrice?.message} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Down Payment Amount ($)
          </label>
          <Input type="number" step="1000" {...register('downPayment', { valueAsNumber: true })} />
          <InputError message={errors.downPayment?.message} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Interest Rate (%)
            </label>
            <Input type="number" step="0.1" {...register('interestRate', { valueAsNumber: true })} />
            <InputError message={errors.interestRate?.message} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Loan Term (Years)
            </label>
            <Input type="number" step="1" {...register('loanTermYears', { valueAsNumber: true })} />
            <InputError message={errors.loanTermYears?.message} />
          </div>
        </div>
      </div>

      {/* Live Results Panel */}
      <div className="lg:col-span-5 space-y-4">
        <CalculationResults isValid={isValid}>
          <>
            <ResultDisplay
              label="Estimated Monthly Principal & Interest"
              value={formatCurrency(results.monthlyPayment)}
              subText={`Based on a total loan amount of ${formatCurrency(results.loanAmount)}`}
              isPrimary
            />
            <ResultDisplay
              label="Total Interest Payable"
              value={formatCurrency(results.totalInterest)}
              subText="Interest over full loan term"
            />
            <ResultDisplay
              label="Total Cost of Loan"
              value={formatCurrency(results.totalPaid)}
              subText="Principal plus total interest"
            />
          </>
        </CalculationResults>
      </div>
    </div>
  );
}
