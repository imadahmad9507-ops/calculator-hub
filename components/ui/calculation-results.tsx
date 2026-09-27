import type { ReactNode } from 'react';

export function CalculationResults({
  isValid,
  children,
}: {
  isValid: boolean;
  children: ReactNode;
}) {
  if (!isValid) {
    return (
      <p role="status" className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-300">
        Correct empty or invalid inputs to view results.
      </p>
    );
  }

  return <>{children}</>;
}
