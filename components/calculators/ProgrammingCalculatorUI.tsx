'use client';

import React, { useState } from 'react';
import { calculateProgramming } from '@/lib/calculators';
import { ResultDisplay } from '@/components/ui/result-display';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

export function ProgrammingCalculatorUI() {
  const [value, setValue] = useState<number>(42);
  const [operation, setOperation] = useState<'AND' | 'OR' | 'XOR' | 'NOT' | 'LSH' | 'RSH'>('AND');
  const [operand2, setOperand2] = useState<number>(15);

  const results = calculateProgramming({ value, operation, operand2 });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
            Input Decimal Integer Value
          </label>
          <Input
            type="number"
            step="1"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value) || 0)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
              Bitwise Operation
            </label>
            <Select value={operation} onChange={(e: any) => setOperation(e.target.value)}>
              <option value="AND">AND (&)</option>
              <option value="OR">OR (|)</option>
              <option value="XOR">XOR (^)</option>
              <option value="NOT">NOT (~)</option>
              <option value="LSH">Left Shift (&lt;&lt;)</option>
              <option value="RSH">Right Shift (&gt;&gt;)</option>
            </Select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
              Operand 2 / Shift Bits
            </label>
            <Input
              type="number"
              step="1"
              value={operand2}
              onChange={(e) => setOperand2(parseInt(e.target.value) || 0)}
              disabled={operation === 'NOT'}
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <ResultDisplay
          label="Decimal (Base 10)"
          value={results.dec}
          subText={`Bitwise ${operation} calculation result`}
          isPrimary
        />
        <ResultDisplay
          label="Hexadecimal (Base 16)"
          value={results.hex}
          subText="Hex format"
        />
        <ResultDisplay
          label="Binary (32-Bit Base 2)"
          value={results.bin}
          subText="Binary nibble formatted"
        />
        <ResultDisplay
          label="Octal (Base 8)"
          value={results.oct}
          subText="Octal format"
        />
      </div>
    </div>
  );
}
