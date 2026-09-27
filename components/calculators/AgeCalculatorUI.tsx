'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { calculateAge } from '@/lib/calculators';
import { formatNumber } from '@/lib/utils';
import { ResultDisplay } from '@/components/ui/result-display';
import { Input } from '@/components/ui/input';
import { CalculationResults } from '@/components/ui/calculation-results';
import { InputError } from '@/components/ui/input-error';

const schema = z.object({
  birthDate: z.string().min(1, 'Select birth date'),
  targetDate: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function AgeCalculatorUI() {
  const { register, watch, formState: { errors, isValid } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      birthDate: '1996-05-15',
      targetDate: new Date().toISOString().split('T')[0],
    },
    mode: 'onChange',
  });

  const values = watch();
  const results = calculateAge({
    birthDate: values.birthDate,
    targetDate: values.targetDate,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Date of Birth
          </label>
          <Input type="date" {...register('birthDate')} />
          <InputError message={errors.birthDate?.message} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Target / As-Of Date
          </label>
          <Input type="date" {...register('targetDate')} />
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <CalculationResults isValid={isValid && results.isValid}>
          <>
            <ResultDisplay
              label="Exact Age"
              value={`${results.years}y ${results.months}m ${results.days}d`}
              subText="Exact years, months, and days calculated with date-fns"
              isPrimary
            />
            <ResultDisplay
              label="Total Days Lived"
              value={`${formatNumber(results.totalDays, 0)} days`}
              subText="Cumulative total calendar days"
            />
          </>
        </CalculationResults>
      </div>
    </div>
  );
}
