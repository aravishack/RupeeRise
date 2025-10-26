// Utility Functions

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper precedence
 * @example cn('px-2 py-1', 'px-4') // 'py-1 px-4'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Re-export formatting utilities
export * from './formatting/currency';
export * from './calculations/projections';
export * from './calculations/emi';
export * from './calculations/sip';
