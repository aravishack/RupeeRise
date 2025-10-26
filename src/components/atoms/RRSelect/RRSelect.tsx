import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { cn } from '../../../utils';

export interface RRSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RRSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  options: RRSelectOption[];
  placeholder?: string;
}

export const RRSelect = forwardRef<HTMLSelectElement, RRSelectProps>(
  ({ 
    label, 
    error, 
    helperText, 
    fullWidth = false,
    options,
    placeholder = 'Select an option',
    className,
    ...props 
  }, ref) => {
    const selectId = props.id || `select-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && (
          <label 
            htmlFor={selectId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'px-3 py-2 pr-10 border rounded-lg appearance-none',
              'text-sm text-gray-900',
              'focus:outline-none focus:ring-2 focus:ring-rupee-green focus:border-transparent',
              'disabled:bg-gray-100 disabled:cursor-not-allowed',
              'transition-colors cursor-pointer',
              'bg-white',
              error 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 hover:border-gray-400',
              fullWidth && 'w-full',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Dropdown arrow */}
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        
        {error && (
          <span 
            id={`${selectId}-error`}
            className="text-xs text-red-500"
            role="alert"
          >
            {error}
          </span>
        )}
        
        {!error && helperText && (
          <span 
            id={`${selectId}-helper`}
            className="text-xs text-gray-500"
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

RRSelect.displayName = 'RRSelect';
