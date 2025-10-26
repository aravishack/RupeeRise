import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../../utils';

export interface RRInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const RRInput = forwardRef<HTMLInputElement, RRInputProps>(
  ({ label, error, helperText, fullWidth = false, className, ...props }, ref) => {
    const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && (
          <label 
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'px-3 py-2 border rounded-lg',
            'text-sm text-gray-900 placeholder-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-rupee-green focus:border-transparent',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            'transition-colors',
            error 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 hover:border-gray-400',
            fullWidth && 'w-full',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        
        {error && (
          <span 
            id={`${inputId}-error`}
            className="text-xs text-red-500"
            role="alert"
          >
            {error}
          </span>
        )}
        
        {!error && helperText && (
          <span 
            id={`${inputId}-helper`}
            className="text-xs text-gray-500"
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

RRInput.displayName = 'RRInput';
