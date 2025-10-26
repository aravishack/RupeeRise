import { forwardRef, useState, useEffect } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../../utils';

export interface RRNumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  prefix?: string;
  suffix?: string;
  onChange?: (value: number | undefined) => void;
  value?: number;
}

export const RRNumberInput = forwardRef<HTMLInputElement, RRNumberInputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    fullWidth = false, 
    prefix = '₹', 
    suffix,
    onChange,
    value,
    className,
    ...props 
  }, ref) => {
    const inputId = props.id || `number-input-${Math.random().toString(36).substr(2, 9)}`;
    const [displayValue, setDisplayValue] = useState(value?.toString() || '');
    
    // Sync internal state when value prop changes from parent
    useEffect(() => {
      setDisplayValue(value?.toString() || '');
    }, [value]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value.replace(/[^0-9.]/g, '');
      setDisplayValue(inputValue);
      
      if (onChange) {
        const numValue = inputValue === '' ? undefined : parseFloat(inputValue);
        onChange(numValue);
      }
    };
    
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
        
        <div className="relative">
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              {prefix}
            </span>
          )}
          
          <input
            ref={ref}
            id={inputId}
            type="text"
            inputMode="decimal"
            value={displayValue}
            onChange={handleChange}
            className={cn(
              'px-3 py-2 border rounded-lg',
              'text-sm text-gray-900 placeholder-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-rupee-green focus:border-transparent',
              'disabled:bg-gray-100 disabled:cursor-not-allowed',
              'transition-colors',
              error 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 hover:border-gray-400',
              prefix && 'pl-8',
              suffix && 'pr-8',
              fullWidth && 'w-full',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              {suffix}
            </span>
          )}
        </div>
        
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

RRNumberInput.displayName = 'RRNumberInput';
