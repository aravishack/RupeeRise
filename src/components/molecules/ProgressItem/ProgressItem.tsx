import type { ReactNode } from 'react';

interface ProgressItemProps {
  label: string;
  value: ReactNode;
  progress: number; // 0-100
  barColor?: string;
  valueClassName?: string;
}

export function ProgressItem({ 
  label, 
  value, 
  progress, 
  barColor = 'bg-rupee-green',
  valueClassName = 'font-medium text-gray-900'
}: ProgressItemProps) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className={valueClassName}>{value}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div 
          className={`${barColor} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        ></div>
      </div>
    </div>
  );
}
