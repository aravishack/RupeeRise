import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../../utils';

export interface RRIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  ariaLabel: string;
}

export const RRIconButton = forwardRef<HTMLButtonElement, RRIconButtonProps>(
  ({ 
    icon: Icon, 
    variant = 'ghost', 
    size = 'md', 
    ariaLabel,
    className,
    ...props 
  }, ref) => {
    // Base styles
    const baseStyles = 'inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Variant styles
    const variantStyles = {
      primary: 'bg-rupee-green text-white hover:bg-green-600 focus:ring-rupee-green',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400',
      ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-400',
      danger: 'text-red-500 hover:bg-red-50 focus:ring-red-500',
    };

    // Size styles (includes padding and icon size)
    const sizeStyles = {
      sm: 'p-1.5',
      md: 'p-2',
      lg: 'p-3',
    };

    const iconSizes = {
      sm: 16,
      md: 20,
      lg: 24,
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        aria-label={ariaLabel}
        {...props}
      >
        <Icon size={iconSizes[size]} strokeWidth={2} />
      </button>
    );
  }
);

RRIconButton.displayName = 'RRIconButton';
