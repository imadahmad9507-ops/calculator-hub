'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { calculateTDEE } from '@/lib/calculators';
import { formatNumber } from '@/lib/utils';
import { ResultDisplay } from '@/components/ui/result-display';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { CalculationResults } from '@/components/ui/calculation-results';
import { InputError } from '@/components/ui/input-error';

const schema = z.object({
  gender: z.enum(['male', 'female']),
  age: z.number().min(15, 'Age min 15').max(100, 'Age max 100'),
  weightLbs: z.number().min(50, 'Min 50 lbs').max(800, 'Max 800 lbs'),
  heightInches: z.number().min(36, 'Min 36 in').max(96, 'Max 96 in'),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active']),
});

type FormValues = z.infer<typeof schema>;

export function CalorieTDEECalculatorUI() {
  const { register, watch, formState: { errors, isValid } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      gender: 'male',
      age: 28,
      weightLbs: 175,
      heightInches: 70,
      activityLevel: 'moderate',
    },
    mode: 'onChange',
  });

  const values = watch();
  const results = calculateTDEE({
    gender: values.gender,
    age: Number(values.age) || 0,
    weightLbs: Number(values.weightLbs) || 0,
    heightInches: Number(values.heightInches) || 0,
    activityLevel: values.activityLevel,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Biological Sex
            </label>
            <Select {...register('gender')}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Age (Years)
            </label>
            <Input type="number" step="1" {...register('age', { valueAsNumber: true })} />
            <InputError message={errors.age?.message} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Weight (lbs)
            </label>
            <Input type="number" step="1" {...register('weightLbs', { valueAsNumber: true })} />
            <InputError message={errors.weightLbs?.message} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Height (Total Inches)
            </label>
            <Input type="number" step="1" {...register('heightInches', { valueAsNumber: true })} />
            <InputError message={errors.heightInches?.message} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Daily Physical Activity Level
          </label>
          <Select {...register('activityLevel')}>
            <option value="sedentary">Sedentary (Office job, little exercise)</option>
            <option value="light">Lightly Active (Exercise 1-3 days/week)</option>
            <option value="moderate">Moderately Active (Exercise 3-5 days/week)</option>
            <option value="active">Very Active (Heavy exercise 6-7 days/week)</option>
            <option value="very_active">Extremely Active (Athletic training/physical job)</option>
          </Select>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <CalculationResults isValid={isValid}>
          <>
            <ResultDisplay
              label="Total Daily Energy Expenditure (TDEE)"
              value={`${formatNumber(results.tdee, 0)} kcal`}
              subText="Daily calories to maintain current weight"
              isPrimary
            />
            <ResultDisplay
              label="Basal Metabolic Rate (BMR)"
              value={`${formatNumber(results.bmr, 0)} kcal`}
              subText="Calories burned at total rest (Mifflin-St Jeor)"
            />
            <div className="grid grid-cols-2 gap-3">
              <ResultDisplay
                label="Weight Loss (-1 lb/wk)"
                value={`${formatNumber(results.weightLossCalories, 0)} kcal`}
                subText="500 kcal daily deficit"
              />
              <ResultDisplay
                label="Weight Gain (+1 lb/wk)"
                value={`${formatNumber(results.weightGainCalories, 0)} kcal`}
                subText="500 kcal daily surplus"
              />
            </div>
          </>
        </CalculationResults>
      </div>
    </div>
  );
}
