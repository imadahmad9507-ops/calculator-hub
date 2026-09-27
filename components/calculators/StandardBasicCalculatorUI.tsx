'use client';

import React, { useState } from 'react';
import { evaluateBasicExpression } from '@/lib/calculators';
import { ResultDisplay } from '@/components/ui/result-display';

export function StandardBasicCalculatorUI() {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);

  const handleBtn = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
    } else if (val === 'CE') {
      setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    } else if (val === '=') {
      const res = evaluateBasicExpression(display);
      setDisplay(String(res));
    } else if (val === 'MC') {
      setMemory(0);
    } else if (val === 'MR') {
      setDisplay(String(memory));
    } else if (val === 'M+') {
      setMemory(memory + evaluateBasicExpression(display));
    } else if (val === 'M-') {
      setMemory(memory - evaluateBasicExpression(display));
    } else {
      setDisplay(display === '0' ? val : display + val);
    }
  };

  const btnGrid = [
    ['MC', 'MR', 'M+', 'M-'],
    ['C', 'CE', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=', ''],
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-4">
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 font-mono text-right text-2xl font-bold text-zinc-900 dark:text-zinc-100 min-h-[60px] flex items-center justify-end">
          {display}
        </div>

        <div className="grid grid-cols-4 gap-2">
          {btnGrid.flat().map((btn, idx) => {
            if (!btn) return <div key={idx} />;
            const isOp = ['/', '*', '-', '+', '=', 'C', 'CE'].includes(btn);
            const isMem = ['MC', 'MR', 'M+', 'M-'].includes(btn);

            return (
              <button
                key={idx}
                onClick={() => handleBtn(btn)}
                className={`h-12 rounded-lg font-mono font-bold text-sm transition-all cursor-pointer ${
                  isOp
                    ? 'bg-[#065F46] dark:bg-[#34D399] text-white dark:text-zinc-950 hover:opacity-90'
                    : isMem
                    ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                {btn}
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <ResultDisplay
          label="Current Display Output"
          value={display}
          subText="Interactive standard keypad calculation"
          isPrimary
        />
        <ResultDisplay
          label="Memory Storage (M)"
          value={memory}
          subText="Memory register value (MR/M+/M-)"
        />
      </div>
    </div>
  );
}
