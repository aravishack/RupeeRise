import type { ReactNode } from 'react';

interface StatRowProps {
  label: string;
  value: ReactNode;
  valueClassName?: string;
}

export function StatRow({ label, value, valueClassName = 'font-semibold text-gray-900' }: StatRowProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );
}
