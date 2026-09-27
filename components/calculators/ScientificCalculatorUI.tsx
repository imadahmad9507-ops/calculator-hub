'use client';

import React, { useState } from 'react';
import { evaluateScientific } from '@/lib/calculators';
import { ResultDisplay } from '@/components/ui/result-display';
import { Input } from '@/components/ui/input';

export function ScientificCalculatorUI() {
  const [expression, setExpression] = useState('sin(45) + sqrt(16)');
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');

  const result = evaluateScientific({ expression, angleMode });

  const appendToken = (tok: string) => {
    setExpression((prev) => (prev === '0' ? tok : prev + tok));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-5">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
              Mathematical Expression
            </label>
            <div className="flex gap-1 text-xs font-mono">
              <button
                type="button"
                onClick={() => setAngleMode('deg')}
                className={`px-2 py-0.5 rounded ${
                  angleMode === 'deg'
                    ? 'bg-[#065F46] dark:bg-[#34D399] text-white dark:text-zinc-950 font-bold'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                DEG
              </button>
              <button
                type="button"
                onClick={() => setAngleMode('rad')}
                className={`px-2 py-0.5 rounded ${
                  angleMode === 'rad'
                    ? 'bg-[#065F46] dark:bg-[#34D399] text-white dark:text-zinc-950 font-bold'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                RAD
              </button>
            </div>
          </div>
          <Input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="e.g. sin(30) + log(100)"
          />
        </div>

        {/* Quick Function Buttons */}
        <div className="grid grid-cols-5 gap-2">
          {['sin(', 'cos(', 'tan(', 'sqrt(', 'log(', 'ln(', 'π', 'e', '(', ')'].map((func) => (
            <button
              key={func}
              type="button"
              onClick={() => appendToken(func)}
              className="h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {func}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <ResultDisplay
          label="Evaluated Result"
          value={result}
          subText={`Calculated using ${angleMode.toUpperCase()} angle mode`}
          isPrimary
        />
      </div>
    </div>
  );
}
