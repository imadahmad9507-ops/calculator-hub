'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { calculateLoanEMI } from '@/lib/calculators';
import { formatCurrency } from '@/lib/utils';
import { ResultDisplay } from '@/components/ui/result-display';
import { Input } from '@/components/ui/input';
import { CalculationResults } from '@/components/ui/calculation-results';
import { InputError } from '@/components/ui/input-error';

const schema = z.object({
  loanAmount: z.number().min(100, 'Minimum loan amount $100'),
  interestRate: z.number().min(0, 'Rate cannot be negative').max(50, 'Rate max 50%'),
  loanTermMonths: z.number().min(1, 'Term min 1 month').max(360, 'Term max 360 months'),
});

type FormValues = z.infer<typeof schema>;

export function LoanEMICalculatorUI() {
  const { register, watch, formState: { errors, isValid } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      loanAmount: 25000,
      interestRate: 7.5,
      loanTermMonths: 60,
    },
    mode: 'onChange',
  });

  const values = watch();
  const results = calculateLoanEMI({
    loanAmount: Number(values.loanAmount) || 0,
    interestRate: Number(values.interestRate) || 0,
    loanTermMonths: Number(values.loanTermMonths) || 0,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Total Loan Amount ($)
          </label>
          <Input type="number" step="500" {...register('loanAmount', { valueAsNumber: true })} />
          <InputError message={errors.loanAmount?.message} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Annual Interest Rate (%)
            </label>
            <Input type="number" step="0.1" {...register('interestRate', { valueAsNumber: true })} />
            <InputError message={errors.interestRate?.message} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Loan Term (Months)
            </label>
            <Input type="number" step="1" {...register('loanTermMonths', { valueAsNumber: true })} />
            <InputError message={errors.loanTermMonths?.message} />
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <CalculationResults isValid={isValid}>
          <>
            <ResultDisplay
              label="Monthly EMI Payment"
              value={formatCurrency(results.monthlyEMI)}
              subText={`Fixed monthly installment over ${values.loanTermMonths} months`}
              isPrimary
            />
            <ResultDisplay
              label="Total Interest Paid"
              value={formatCurrency(results.totalInterest)}
              subText="Cumulative interest over full loan duration"
            />
            <ResultDisplay
              label="Total Payment Amount"
              value={formatCurrency(results.totalPayment)}
              subText="Loan principal plus total interest"
            />
          </>
        </CalculationResults>
      </div>
    </div>
  );
}
