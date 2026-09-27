'use client';

import React, { useState } from 'react';
import { calculateShapeGeometry, ShapeType } from '@/lib/calculators';
import { ResultDisplay } from '@/components/ui/result-display';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

export function ShapeGeometryCalculatorUI() {
  const [shape, setShape] = useState<ShapeType>('circle');
  const [dim1, setDim1] = useState<number>(5);
  const [dim2, setDim2] = useState<number>(10);

  const results = calculateShapeGeometry({ shape, dim1, dim2 });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
            Select Shape / Solid
          </label>
          <Select value={shape} onChange={(e: any) => setShape(e.target.value)}>
            <option value="circle">Circle (2D)</option>
            <option value="rectangle">Rectangle (2D)</option>
            <option value="sphere">Sphere (3D)</option>
            <option value="cylinder">Cylinder (3D)</option>
            <option value="cone">Cone (3D)</option>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
              {shape === 'rectangle' ? 'Width (w)' : 'Radius (r)'}
            </label>
            <Input
              type="number"
              step="any"
              value={dim1}
              onChange={(e) => setDim1(parseFloat(e.target.value) || 0)}
            />
          </div>

          {['rectangle', 'cylinder', 'cone'].includes(shape) && (
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                {shape === 'rectangle' ? 'Length (h)' : 'Height (h)'}
              </label>
              <Input
                type="number"
                step="any"
                value={dim2}
                onChange={(e) => setDim2(parseFloat(e.target.value) || 0)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <ResultDisplay
          label={results.label1}
          value={results.areaOrSurface}
          subText={`Computed for ${shape}`}
          isPrimary
        />
        <ResultDisplay
          label={results.label2}
          value={results.perimeterOrVolume}
          subText="Secondary geometric metric"
        />
      </div>
    </div>
  );
}
