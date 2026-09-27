'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { calculateBMI } from '@/lib/calculators';
import { ResultDisplay } from '@/components/ui/result-display';
import { Input } from '@/components/ui/input';
import { CalculationResults } from '@/components/ui/calculation-results';
import { InputError } from '@/components/ui/input-error';

const schema = z.object({
  weightLbs: z.number().min(20, 'Weight min 20 lbs').max(1000, 'Weight max 1000 lbs'),
  heightInches: z.number().min(24, 'Height min 24 inches').max(108, 'Height max 108 inches'),
});

type FormValues = z.infer<typeof schema>;

export function BMICalculatorUI() {
  const { register, watch, formState: { errors, isValid } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      weightLbs: 165,
      heightInches: 70,
    },
    mode: 'onChange',
  });

  const values = watch();
  const results = calculateBMI({
    weightLbs: Number(values.weightLbs) || 0,
    heightInches: Number(values.heightInches) || 0,
  });

  const categoryColor = {
    Underweight: 'text-blue-400',
    'Normal weight': 'text-emerald-400',
    Overweight: 'text-amber-400',
    Obesity: 'text-rose-400',
  }[results.category];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Body Weight (lbs)
          </label>
          <Input type="number" step="1" {...register('weightLbs', { valueAsNumber: true })} />
          <InputError message={errors.weightLbs?.message} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Height (Total Inches - e.g. 5ft 10in = 70 in)
          </label>
          <Input type="number" step="1" {...register('heightInches', { valueAsNumber: true })} />
          <InputError message={errors.heightInches?.message} />
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <CalculationResults isValid={isValid}>
          <>
            <ResultDisplay
              label="Body Mass Index (BMI)"
              value={results.bmi.toFixed(1)}
              subText="Calculated using standard CDC formula"
              isPrimary
            />
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/60">
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-400 block mb-1">
                CDC Weight Status Category
              </span>
              <span className={`font-mono text-xl font-bold ${categoryColor}`}>
                {results.category}
              </span>
              <p className="text-[11px] text-zinc-400 mt-1">
                Normal range: 18.5 - 24.9 BMI
              </p>
            </div>
          </>
        </CalculationResults>
      </div>
    </div>
  );
}
