import React from 'react';

interface AdSlotProps {
  slotId?: string;
  format?: 'banner' | 'rectangle' | 'horizontal';
  className?: string;
}

export function AdSlot({ slotId = 'default-ad-slot', format = 'horizontal', className = '' }: AdSlotProps) {
  // Sizing definitions for standard AdSense dimensions
  const formatClasses = {
    horizontal: 'w-full min-h-[90px] max-w-[728px]',
    rectangle: 'w-full min-h-[250px] max-w-[300px]',
    banner: 'w-full min-h-[100px] max-w-[320px] sm:max-w-[468px]',
  }[format];

  return (
    <div
      className={`my-6 mx-auto border border-dashed border-amber-500/30 bg-amber-500/5 rounded-lg p-4 flex flex-col items-center justify-center text-center select-none ${formatClasses} ${className}`}
      aria-label="Advertisement Placeholder"
    >
      <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-amber-500/80 uppercase mb-1">
        <span>Advertisement</span>
        <span className="text-zinc-500">•</span>
        <span>{format}</span>
      </div>
      <p className="text-xs text-zinc-400 font-mono">
        AdSense Slot ID: <span className="text-amber-400">{slotId}</span>
      </p>

      {/* TODO: Insert real Google AdSense <ins> tag here once approved, e.g.:
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot={slotId}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      */}
    </div>
  );
}
