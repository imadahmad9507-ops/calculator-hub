'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { calculateTip } from '@/lib/calculators';
import { formatCurrency } from '@/lib/utils';
import { ResultDisplay } from '@/components/ui/result-display';
import { Input } from '@/components/ui/input';
import { CalculationResults } from '@/components/ui/calculation-results';
import { InputError } from '@/components/ui/input-error';

const schema = z.object({
  billAmount: z.number().min(0, 'Bill amount cannot be negative'),
  tipPercentage: z.number().min(0, 'Tip percentage min 0%').max(100, 'Max 100%'),
  numPeople: z.number().min(1, 'Minimum 1 person'),
});

type FormValues = z.infer<typeof schema>;

export function TipCalculatorUI() {
  const { register, watch, setValue, formState: { errors, isValid } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      billAmount: 85.50,
      tipPercentage: 18,
      numPeople: 3,
    },
    mode: 'onChange',
  });

  const values = watch();
  const results = calculateTip({
    billAmount: Number(values.billAmount) || 0,
    tipPercentage: Number(values.tipPercentage) || 0,
    numPeople: Number(values.numPeople) || 1,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Bill Total ($)
          </label>
          <Input type="number" step="0.01" {...register('billAmount', { valueAsNumber: true })} />
          <InputError message={errors.billAmount?.message} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Tip Percentage (%)
          </label>
          <div className="flex gap-2 mb-2">
            {[15, 18, 20, 25].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => setValue('tipPercentage', pct)}
                className={`px-3 py-1.5 rounded text-xs font-mono border transition-colors ${
                  values.tipPercentage === pct
                    ? 'border-amber-500 bg-amber-500/20 text-amber-400 font-bold'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
          <Input type="number" step="1" {...register('tipPercentage', { valueAsNumber: true })} />
          <InputError message={errors.tipPercentage?.message} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Split Between (People)
          </label>
          <Input type="number" step="1" {...register('numPeople', { valueAsNumber: true })} />
          <InputError message={errors.numPeople?.message} />
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <CalculationResults isValid={isValid}>
          <>
            <ResultDisplay
              label="Total Per Person"
              value={formatCurrency(results.perPersonBill)}
              subText={`Includes ${formatCurrency(results.perPersonTip)} tip per person`}
              isPrimary
            />
            <ResultDisplay
              label="Total Tip Amount"
              value={formatCurrency(results.tipAmount)}
              subText={`${values.tipPercentage}% of ${formatCurrency(values.billAmount || 0)}`}
            />
            <ResultDisplay
              label="Total Combined Bill"
              value={formatCurrency(results.totalBill)}
              subText="Original bill plus tip"
            />
          </>
        </CalculationResults>
      </div>
    </div>
  );
}
