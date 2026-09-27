export function InputError({ message }: { message?: string }) {
  if (!message) return null;

  const safeMessage = /NaN|undefined/i.test(message) ? 'Enter a valid number' : message;

  return <p className="text-xs text-red-400 mt-1">{safeMessage}</p>;
}
