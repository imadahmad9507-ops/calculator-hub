'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { convertUnits, UnitCategory } from '@/lib/calculators';
import { formatNumber } from '@/lib/utils';
import { ResultDisplay } from '@/components/ui/result-display';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { CalculationResults } from '@/components/ui/calculation-results';

const schema = z.object({
  category: z.enum(['temperature', 'length', 'weight']),
  fromUnit: z.string(),
  toUnit: z.string(),
  value: z.number().finite('Enter a valid number'),
}).refine(({ category, fromUnit, value }) => {
  if (category !== 'temperature') return value >= 0;
  return fromUnit !== 'K' || value >= 0;
}, {
  path: ['value'],
  message: 'Negative length, weight, or Kelvin values are not supported.',
});

type FormValues = z.infer<typeof schema>;

const UNITS: Record<UnitCategory, { label: string; value: string }[]> = {
  temperature: [
    { label: 'Fahrenheit (°F)', value: 'F' },
    { label: 'Celsius (°C)', value: 'C' },
    { label: 'Kelvin (K)', value: 'K' },
  ],
  length: [
    { label: 'Meters (m)', value: 'm' },
    { label: 'Kilometers (km)', value: 'km' },
    { label: 'Centimeters (cm)', value: 'cm' },
    { label: 'Millimeters (mm)', value: 'mm' },
    { label: 'Miles (mi)', value: 'mi' },
    { label: 'Feet (ft)', value: 'ft' },
    { label: 'Inches (in)', value: 'in' },
    { label: 'Yards (yd)', value: 'yd' },
  ],
  weight: [
    { label: 'Kilograms (kg)', value: 'kg' },
    { label: 'Grams (g)', value: 'g' },
    { label: 'Milligrams (mg)', value: 'mg' },
    { label: 'Pounds (lb)', value: 'lb' },
    { label: 'Ounces (oz)', value: 'oz' },
  ],
};

export function UnitConverterUI() {
  const { register, watch, setValue, formState: { isValid } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: 'temperature',
      fromUnit: 'F',
      toUnit: 'C',
      value: 98.6,
    },
    mode: 'onChange',
  });

  const values = watch();

  const handleCategoryChange = (cat: UnitCategory) => {
    setValue('category', cat, { shouldValidate: true });
    if (cat === 'temperature') {
      setValue('fromUnit', 'F', { shouldValidate: true });
      setValue('toUnit', 'C', { shouldValidate: true });
    } else if (cat === 'length') {
      setValue('fromUnit', 'mi', { shouldValidate: true });
      setValue('toUnit', 'km', { shouldValidate: true });
    } else if (cat === 'weight') {
      setValue('fromUnit', 'lb', { shouldValidate: true });
      setValue('toUnit', 'kg', { shouldValidate: true });
    }
  };

  const converted = convertUnits({
    category: values.category,
    fromUnit: values.fromUnit,
    toUnit: values.toUnit,
    value: Number(values.value) || 0,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Unit Type
          </label>
          <div className="flex gap-2">
            {(['temperature', 'length', 'weight'] as UnitCategory[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 rounded text-xs font-mono capitalize border transition-colors ${
                  values.category === cat
                    ? 'border-amber-500 bg-amber-500/20 text-amber-400 font-bold'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
            Input Value
          </label>
          <Input type="number" step="any" {...register('value', { valueAsNumber: true })} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              From Unit
            </label>
            <Select {...register('fromUnit')}>
              {UNITS[values.category]?.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.label}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              To Unit
            </label>
            <Select {...register('toUnit')}>
              {UNITS[values.category]?.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <CalculationResults isValid={isValid}>
          <ResultDisplay
            label="Converted Result"
            value={`${formatNumber(converted, 4)} ${values.toUnit}`}
            subText={`Converted from ${values.value} ${values.fromUnit}`}
            isPrimary
          />
        </CalculationResults>
      </div>
    </div>
  );
}
