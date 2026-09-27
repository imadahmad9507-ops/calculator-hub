'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { calculateROI } from '@/lib/calculators';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { ResultDisplay } from '@/components/ui/result-display';
import { Input } from '@/components/ui/input';
import { CalculationResults } from '@/components/ui/calculation-results';
import { InputError } from '@/components/ui/input-error';

const schema = z.object({
  initialInvestment: z.number().min(1, 'Initial investment must be > $0'),
  finalValue: z.number().min(0, 'Final value cannot be negative'),
  years: z.number().min(0.1, 'Min 0.1 years').max(100, 'Max 100 years'),
});

type FormValues = z.infer<typeof schema>;

export function ROICalculatorUI() {
  const { register, watch, formState: { errors, isValid } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialInvestment: 50000,
      finalValue: 85000,
      years: 4,
    },
    mode: 'onChange',
  });

  const values = watch();
  const results = calculateROI({
    initialInvestment: Number(values.initialInvestment) || 0,
    finalValue: Number(values.finalValue) || 0,
    years: Number(values.years) || 0,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Initial Investment ($)
          </label>
          <Input type="number" step="500" {...register('initialInvestment', { valueAsNumber: true })} />
          <InputError message={errors.initialInvestment?.message} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Final Investment Value ($)
          </label>
          <Input type="number" step="500" {...register('finalValue', { valueAsNumber: true })} />
          <InputError message={errors.finalValue?.message} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Holding Period (Years)
          </label>
          <Input type="number" step="0.5" {...register('years', { valueAsNumber: true })} />
          <InputError message={errors.years?.message} />
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <CalculationResults isValid={isValid}>
          <>
            <ResultDisplay
              label="Simple Return on Investment (ROI)"
              value={`${formatNumber(results.simpleROI, 2)}%`}
              subText={`Total capital gain: ${formatCurrency(results.totalGain)}`}
              isPrimary
            />
            <ResultDisplay
              label="Compound Annual Growth Rate (CAGR)"
              value={`${formatNumber(results.cagr, 2)}%`}
              subText={`Annualized return rate over ${values.years} years`}
            />
            <ResultDisplay
              label="Net Profit / Capital Gain"
              value={formatCurrency(results.totalGain)}
              subText="Final value minus initial capital"
            />
          </>
        </CalculationResults>
      </div>
    </div>
  );
}
