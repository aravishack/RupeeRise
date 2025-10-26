import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../utils';

export interface RRCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
}

export function RRCard({
  children,
  padding = 'md',
  shadow = 'sm',
  border = true,
  className,
  ...props
}: RRCardProps) {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowStyles = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-lg',
        paddingStyles[padding],
        shadowStyles[shadow],
        border && 'border border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
