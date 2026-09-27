import React from 'react';

interface AdSlotProps {
  slotId?: string;
  format?: 'banner' | 'rectangle' | 'horizontal';
  className?: string;
}

export function AdSlot({ slotId = 'default-ad-slot', format = 'horizontal', className = '' }: AdSlotProps) {
  const formatClasses = {
    horizontal: 'w-full min-h-[90px] max-w-[728px]',
    rectangle: 'w-full min-h-[250px] max-w-[300px]',
    banner: 'w-full min-h-[100px] max-w-[320px] sm:max-w-[468px]',
  }[format];

  return (
    <div
      className={`my-6 mx-auto border border-dashed border-emerald-600/30 dark:border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/10 rounded-xl p-4 flex flex-col items-center justify-center text-center select-none ${formatClasses} ${className}`}
      aria-label="Advertisement Placeholder"
    >
      <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-emerald-800 dark:text-emerald-400 uppercase mb-1">
        <span>Advertisement</span>
        <span className="text-zinc-400">•</span>
        <span>{format}</span>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
        AdSense Slot ID: <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{slotId}</span>
      </p>

      {/* TODO: Replace this placeholder div with official Google AdSense <ins> tag when ready for production monetization */}
    </div>
  );
}
