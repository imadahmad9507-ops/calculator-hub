'use client';

import React, { useState, useMemo } from 'react';
import { generateGraphPoints } from '@/lib/calculators';
import { ResultDisplay } from '@/components/ui/result-display';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const PRESET_FUNCTIONS = [
  { label: 'sin(x)', expr: 'sin(x)' },
  { label: 'cos(x)', expr: 'cos(x)' },
  { label: 'tan(x)', expr: 'tan(x)' },
  { label: 'x²', expr: 'x^2' },
  { label: 'x³', expr: 'x^3' },
  { label: '2x + 3', expr: '2x + 3' },
  { label: 'x² - 4', expr: 'x^2 - 4' },
  { label: 'sqrt(x)', expr: 'sqrt(x)' },
  { label: 'exp(x)', expr: 'exp(x)' },
  { label: 'ln(x)', expr: 'ln(x)' },
  { label: '1/x', expr: '1/x' },
  { label: 'abs(x)', expr: 'abs(x)' },
];

export function GraphCalculatorUI() {
  const [expression, setExpression] = useState('sin(x)');
  const [inputVal, setInputVal] = useState('sin(x)');
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number } | null>(null);

  // Compute points with memoization
  const points = useMemo(() => {
    const min = Number.isFinite(xMin) ? xMin : -10;
    const max = Number.isFinite(xMax) ? xMax : 10;
    const span = Math.abs(max - min) || 1;
    // Aim for ~120-200 smooth points
    const step = Math.max(0.05, Math.min(1, span / 150));
    return generateGraphPoints(expression, min, max, step);
  }, [expression, xMin, xMax]);

  // Compute y domain dynamically to fit function curve nicely
  const { yMin, yMax } = useMemo(() => {
    if (points.length === 0) return { yMin: -10, yMax: 10 };
    const yValues = points.map((p) => p.y).filter((y) => !isNaN(y) && isFinite(y));
    if (yValues.length === 0) return { yMin: -10, yMax: 10 };
    let min = Math.min(...yValues);
    let max = Math.max(...yValues);
    if (Math.abs(max - min) < 1e-5) {
      // For constant functions (e.g., f(x) = sin(4) ≈ -0.757), anchor vertically around the value
      const pad = Math.max(1, Math.abs(min) * 0.5);
      min -= pad;
      max += pad;
    }
    // Add 10% breathing room padding
    const padding = (max - min) * 0.1 || 1;
    return {
      yMin: Number((min - padding).toFixed(2)),
      yMax: Number((max + padding).toFixed(2)),
    };
  }, [points]);

  // SVG coordinate dimensions
  const svgWidth = 540;
  const svgHeight = 280;
  const padLeft = 45;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 35;
  const plotWidth = svgWidth - padLeft - padRight;
  const plotHeight = svgHeight - padTop - padBottom;

  const minX = Math.min(xMin, xMax);
  const maxX = Math.max(xMin, xMax);
  const spanX = maxX - minX || 1;
  const spanY = yMax - yMin || 1;

  // Coordinate mapper functions
  const mapX = (x: number) => padLeft + ((x - minX) / spanX) * plotWidth;
  const mapY = (y: number) => padTop + ((yMax - y) / spanY) * plotHeight;

  // Origin (0,0) location if within view
  const originX = minX <= 0 && maxX >= 0 ? mapX(0) : null;
  const originY = yMin <= 0 && yMax >= 0 ? mapY(0) : null;

  // Generate SVG polyline path string
  const svgPolyline = points
    .filter((p) => !isNaN(p.y) && isFinite(p.y))
    .map((p) => {
      const cx = mapX(p.x);
      const cy = mapY(p.y);
      const clampedY = Math.max(padTop - 5, Math.min(svgHeight - padBottom + 5, cy));
      return `${cx.toFixed(1)},${clampedY.toFixed(1)}`;
    })
    .join(' ');

  // Compute key stats
  const pointAtZero = points.find((p) => Math.abs(p.x) < 0.05);
  const validY = points.map((p) => p.y).filter((y) => !isNaN(y) && isFinite(y));
  const peakY = validY.length > 0 ? Math.max(...validY) : 0;
  const lowY = validY.length > 0 ? Math.min(...validY) : 0;

  const handleApply = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputVal.trim()) {
      setExpression(inputVal.trim());
    }
  };

  const handlePreset = (preset: string) => {
    setInputVal(preset);
    setExpression(preset);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Input and SVG Graph */}
      <div className="lg:col-span-7 space-y-5">
        <form onSubmit={handleApply} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
              Enter Function f(x)
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-xs text-zinc-400">
                  f(x) =
                </span>
                <Input
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="e.g. 2x + 3, x^2 - 4, sin(x)"
                  className="pl-14 text-sm font-mono"
                />
              </div>
              <Button type="submit" variant="default" className="px-5">
                Plot Graph
              </Button>
            </div>
            <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
              Supports: <code className="font-mono text-zinc-700 dark:text-zinc-300">sin</code>,{' '}
              <code className="font-mono text-zinc-700 dark:text-zinc-300">cos</code>,{' '}
              <code className="font-mono text-zinc-700 dark:text-zinc-300">tan</code>,{' '}
              <code className="font-mono text-zinc-700 dark:text-zinc-300">sec</code>,{' '}
              <code className="font-mono text-zinc-700 dark:text-zinc-300">csc</code>,{' '}
              <code className="font-mono text-zinc-700 dark:text-zinc-300">cot</code>,{' '}
              <code className="font-mono text-zinc-700 dark:text-zinc-300">asin</code>,{' '}
              <code className="font-mono text-zinc-700 dark:text-zinc-300">sinh/cosh/tanh</code>,{' '}
              <code className="font-mono text-zinc-700 dark:text-zinc-300">exp</code>,{' '}
              <code className="font-mono text-zinc-700 dark:text-zinc-300">ln/log</code>,{' '}
              <code className="font-mono text-zinc-700 dark:text-zinc-300">sqrt/cbrt</code>,{' '}
              <code className="font-mono text-zinc-700 dark:text-zinc-300">abs</code>, powers{' '}
              (<code className="font-mono text-zinc-700 dark:text-zinc-300">x^2</code>, <code className="font-mono text-zinc-700 dark:text-zinc-300">x^3</code>), polynomials, and constants (<code className="font-mono text-zinc-700 dark:text-zinc-300">pi</code>, <code className="font-mono text-zinc-700 dark:text-zinc-300">e</code>).
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div>
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider block mb-1.5">
              Quick Presets
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_FUNCTIONS.map((p) => (
                <button
                  key={p.expr}
                  type="button"
                  onClick={() => handlePreset(p.expr)}
                  className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                    expression === p.expr
                      ? 'bg-[#065F46] text-white border-[#065F46] dark:bg-[#34D399] dark:text-zinc-950 font-bold'
                      : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Range Configuration */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                x Minimum
              </label>
              <Input
                type="number"
                value={xMin}
                onChange={(e) => setXMin(Number(e.target.value) || -10)}
                className="h-9 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                x Maximum
              </label>
              <Input
                type="number"
                value={xMax}
                onChange={(e) => setXMax(Number(e.target.value) || 10)}
                className="h-9 text-xs"
              />
            </div>
          </div>
        </form>

        {/* SVG Graph Plotter Canvas */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col items-center shadow-xs">
          <div className="w-full flex items-center justify-between text-xs font-mono text-zinc-500 mb-2 px-1">
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              f(x) = {expression}
            </span>
            <span>
              x: [{minX}, {maxX}] | y: [{yMin}, {yMax}]
            </span>
          </div>

          <div className="w-full overflow-x-auto flex justify-center">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full max-w-[540px] h-auto select-none"
            >
              {/* Background Rect */}
              <rect
                x={padLeft}
                y={padTop}
                width={plotWidth}
                height={plotHeight}
                fill="none"
                stroke="#E4E4E7"
                strokeWidth="1"
                className="dark:stroke-zinc-800"
              />

              {/* Grid Lines - X ticks */}
              {[-8, -6, -4, -2, 0, 2, 4, 6, 8]
                .filter((tick) => tick >= minX && tick <= maxX)
                .map((tick) => {
                  const cx = mapX(tick);
                  return (
                    <g key={`xtick-${tick}`}>
                      <line
                        x1={cx}
                        y1={padTop}
                        x2={cx}
                        y2={svgHeight - padBottom}
                        stroke="#8E98A0"
                        strokeWidth="0.5"
                        strokeDasharray="2 3"
                        opacity="0.35"
                      />
                      <text
                        x={cx}
                        y={svgHeight - padBottom + 14}
                        textAnchor="middle"
                        fontSize="9"
                        fill="#71717A"
                        className="font-mono"
                      >
                        {tick}
                      </text>
                    </g>
                  );
                })}

              {/* Grid Lines - Y ticks */}
              {[yMin, Math.round((yMin + yMax) / 2), yMax].map((tick) => {
                const cy = mapY(tick);
                return (
                  <g key={`ytick-${tick}`}>
                    <line
                      x1={padLeft}
                      y1={cy}
                      x2={svgWidth - padRight}
                      y2={cy}
                      stroke="#8E98A0"
                      strokeWidth="0.5"
                      strokeDasharray="2 3"
                      opacity="0.35"
                    />
                    <text
                      x={padLeft - 6}
                      y={cy + 3}
                      textAnchor="end"
                      fontSize="9"
                      fill="#71717A"
                      className="font-mono"
                    >
                      {tick}
                    </text>
                  </g>
                );
              })}

              {/* Primary Coordinate Axes */}
              {originY !== null && (
                <line
                  x1={padLeft}
                  y1={originY}
                  x2={svgWidth - padRight}
                  y2={originY}
                  stroke="#71717A"
                  strokeWidth="1.5"
                />
              )}
              {originX !== null && (
                <line
                  x1={originX}
                  y1={padTop}
                  x2={originX}
                  y2={svgHeight - padBottom}
                  stroke="#71717A"
                  strokeWidth="1.5"
                />
              )}

              {/* Function Polyline Plot */}
              {svgPolyline && (
                <polyline
                  fill="none"
                  stroke="#065F46"
                  className="dark:stroke-[#34D399]"
                  strokeWidth="2.5"
                  points={svgPolyline}
                />
              )}

              {/* Interactive sample dots */}
              {points
                .filter((_, idx) => idx % Math.max(1, Math.floor(points.length / 25)) === 0)
                .map((pt, i) => (
                  <circle
                    key={`dot-${i}`}
                    cx={mapX(pt.x)}
                    cy={Math.max(padTop, Math.min(svgHeight - padBottom, mapY(pt.y)))}
                    r="3.5"
                    className="fill-[#065F46] dark:fill-[#34D399] cursor-pointer hover:r-5 transition-all"
                    onMouseEnter={() => setHoveredPoint(pt)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                ))}

              {/* Hover point indicator tooltip */}
              {hoveredPoint && (
                <g>
                  <circle
                    cx={mapX(hoveredPoint.x)}
                    cy={mapY(hoveredPoint.y)}
                    r="5"
                    fill="#34D399"
                    stroke="#062C22"
                    strokeWidth="2"
                  />
                  <text
                    x={Math.min(svgWidth - 65, Math.max(padLeft + 45, mapX(hoveredPoint.x)))}
                    y={Math.max(padTop + 14, mapY(hoveredPoint.y) - 10)}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#065F46"
                    className="font-mono font-bold dark:fill-[#34D399]"
                  >
                    ({hoveredPoint.x}, {hoveredPoint.y})
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-500 mt-2 px-1">
            <span>Hover on dots to inspect coordinates</span>
            <span>{points.length} sample points calculated</span>
          </div>
        </div>
      </div>

      {/* Right Column: Mathematical Readout and Function Summary */}
      <div className="lg:col-span-5 space-y-4">
        <ResultDisplay
          label="Plotted Function"
          value={`f(x) = ${expression}`}
          subText={`Calculated across range x ∈ [${minX}, ${maxX}]`}
          isPrimary
        />

        <ResultDisplay
          label="Value at f(0)"
          value={pointAtZero !== undefined ? pointAtZero.y : 'Outside Range'}
          subText="Intersection with y-axis"
        />

        <div className="grid grid-cols-2 gap-3">
          <ResultDisplay
            label="Peak y (Max)"
            value={peakY}
            subText="Maximum sampled y"
          />
          <ResultDisplay
            label="Trough y (Min)"
            value={lowY}
            subText="Minimum sampled y"
          />
        </div>

        {/* Value Table Preview */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <h4 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
            Sample Value Table (x vs f(x))
          </h4>
          <div className="max-h-48 overflow-y-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500">
                  <th className="text-left py-1">x</th>
                  <th className="text-right py-1">f(x)</th>
                </tr>
              </thead>
              <tbody>
                {points
                  .filter((_, idx) => idx % Math.max(1, Math.floor(points.length / 10)) === 0)
                  .map((p, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-zinc-100 dark:border-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    >
                      <td className="py-1 text-zinc-700 dark:text-zinc-300">{p.x}</td>
                      <td className="py-1 text-right font-semibold text-[#065F46] dark:text-[#34D399]">
                        {p.y}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

