'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { calculatePercentage } from '@/lib/calculators';
import { formatNumber } from '@/lib/utils';
import { ResultDisplay } from '@/components/ui/result-display';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { CalculationResults } from '@/components/ui/calculation-results';

const schema = z.object({
  mode: z.enum(['of', 'is_what_percent', 'change']),
  val1: z.number().finite('Enter a valid number'),
  val2: z.number().finite('Enter a valid number'),
});

type FormValues = z.infer<typeof schema>;

export function PercentageCalculatorUI() {
  const { register, watch, formState: { isValid } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      mode: 'of',
      val1: 15,
      val2: 250,
    },
    mode: 'onChange',
  });

  const values = watch();
  const results = calculatePercentage({
    mode: values.mode,
    val1: Number(values.val1) || 0,
    val2: Number(values.val2) || 0,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Calculation Mode
          </label>
          <Select {...register('mode')}>
            <option value="of">1. What is X% of Y?</option>
            <option value="is_what_percent">2. X is what percent of Y?</option>
            <option value="change">3. Percentage change from X to Y?</option>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              {values.mode === 'of' ? 'Percentage (X %)' : values.mode === 'is_what_percent' ? 'Value (X)' : 'Initial Value (X)'}
            </label>
            <Input type="number" step="any" {...register('val1', { valueAsNumber: true })} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              {values.mode === 'of' ? 'Total Amount (Y)' : values.mode === 'is_what_percent' ? 'Total Amount (Y)' : 'Final Value (Y)'}
            </label>
            <Input type="number" step="any" {...register('val2', { valueAsNumber: true })} />
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <CalculationResults isValid={isValid}>
          <ResultDisplay
            label="Calculated Result"
            value={
              values.mode === 'is_what_percent' || values.mode === 'change'
                ? `${formatNumber(results.result, 2)}%`
                : formatNumber(results.result, 2)
            }
            subText={results.label}
            isPrimary
          />
        </CalculationResults>
      </div>
    </div>
  );
}
