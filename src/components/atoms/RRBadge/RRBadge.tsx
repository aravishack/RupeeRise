import type { HTMLAttributes } from 'react';
import { cn } from '../../../utils';

export interface RRBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
}

export function RRBadge({
  variant = 'primary',
  size = 'sm',
  className,
  children,
  ...props
}: RRBadgeProps) {
  const variantStyles = {
    primary: 'bg-rupee-green text-white',
    secondary: 'bg-gray-200 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-rise-orange text-white',
    danger: 'bg-red-100 text-red-800',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
