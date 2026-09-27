import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer rounded-md';
    
    const variants = {
      default: 'bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-sm shadow-amber-500/20 font-semibold',
      outline: 'border border-zinc-800 bg-transparent hover:bg-zinc-800/60 text-zinc-200',
      ghost: 'hover:bg-zinc-800/60 text-zinc-300 hover:text-zinc-100',
      secondary: 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
