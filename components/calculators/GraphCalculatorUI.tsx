'use client';

import React, { useState } from 'react';
import { generateGraphPoints } from '@/lib/calculators';
import { ResultDisplay } from '@/components/ui/result-display';
import { Select } from '@/components/ui/select';

export function GraphCalculatorUI() {
  const [fnType, setFnType] = useState('sin(x)');
  const points = generateGraphPoints(fnType, -10, 10, 1);

  // SVG dimensions
  const width = 360;
  const height = 200;
  const padding = 20;

  // Map math points to SVG coordinates
  const svgPoints = points
    .map((p) => {
      const cx = padding + ((p.x + 10) / 20) * (width - 2 * padding);
      const cy = height / 2 - (p.y / 10) * (height / 2 - padding);
      const clampedY = Math.max(padding, Math.min(height - padding, cy));
      return `${cx},${clampedY}`;
    })
    .join(' ');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
            Select 2D Function f(x)
          </label>
          <Select value={fnType} onChange={(e) => setFnType(e.target.value)}>
            <option value="sin(x)">f(x) = sin(x)</option>
            <option value="cos(x)">f(x) = cos(x)</option>
            <option value="x^2">f(x) = x² (Parabola)</option>
            <option value="x^3">f(x) = x³ (Cubic)</option>
            <option value="2x + 3">f(x) = 2x + 3 (Linear)</option>
          </Select>
        </div>

        {/* SVG Graph Canvas */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col items-center">
          <span className="text-xs font-mono text-zinc-500 mb-2">2D Coordinate Graph [-10 to +10]</span>
          <svg width={width} height={height} className="overflow-visible">
            {/* Grid Axes */}
            <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="#8E98A0" strokeWidth="1" strokeDasharray="3 3" />
            <line x1={width / 2} y1={padding} x2={width / 2} y2={height - padding} stroke="#8E98A0" strokeWidth="1" strokeDasharray="3 3" />

            {/* Polyline Curve */}
            <polyline fill="none" stroke="#065F46" className="dark:stroke-[#34D399]" strokeWidth="2.5" points={svgPoints} />
          </svg>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <ResultDisplay
          label="Active Plot Function"
          value={fnType}
          subText={`Plotted across ${points.length} sample points`}
          isPrimary
        />
        <ResultDisplay
          label="Sample Point f(0)"
          value={points.find((p) => p.x === 0)?.y ?? 0}
          subText="Value of function at x = 0"
        />
      </div>
    </div>
  );
}
