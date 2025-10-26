/**
 * Liabilities Store - MVP Version
 * 
 * Manages liability data (CRUD operations)
 * - No persistence (data resets on page refresh)
 * - Simple in-memory state with Zustand
 * - Auto-generates IDs using crypto.randomUUID()
 */

import { create } from 'zustand';
import type { LiabilityType } from '../../../types';

// Default interest rates for each liability type
const DEFAULT_INTEREST_RATES: Record<LiabilityType, number> = {
  'Home Loan': 8.5,
  'Car Loan': 10,
  'Personal Loan': 13.5,
  'Education Loan': 10,
  'Credit Card': 39,
  'Business Loan': 12.5,
  'Other': 12,
};

// Simplified Liability for MVP
export interface Liability {
  id: string;
  name: string;
  type: LiabilityType;
  amount: number;         // Outstanding amount
  interestRate: number;   // Annual interest rate in percentage
  monthlyEMI?: number;    // Optional: Monthly payment amount
}

// Liability input (without auto-generated fields)
export type LiabilityInput = Omit<Liability, 'id'>;

// Export for use in components
export { DEFAULT_INTEREST_RATES };

interface LiabilitiesStore {
  // State
  liabilities: Liability[];
  
  // Actions
  addLiability: (liability: LiabilityInput) => void;
  updateLiability: (id: string, updates: Partial<LiabilityInput>) => void;
  deleteLiability: (id: string) => void;
  
  // Queries
  getLiabilityById: (id: string) => Liability | undefined;
  getTotalLiabilities: () => number;
  clearLiabilities: () => void;  // For testing/demo
}

export const useLiabilitiesStore = create<LiabilitiesStore>((set, get) => ({
  // Initial state with default Personal Loan liability
  liabilities: [
    {
      id: crypto.randomUUID(),
      name: 'Personal Loan',
      type: 'Personal Loan',
      amount: 1000,
      interestRate: 13.5,
    }
  ],

  // Add a new liability
  addLiability: (liabilityInput) => {
    const newLiability: Liability = {
      ...liabilityInput,
      id: crypto.randomUUID(),
    };
    
    set((state) => ({
      liabilities: [...state.liabilities, newLiability],
    }));
  },

  // Update an existing liability
  updateLiability: (id, updates) => {
    set((state) => ({
      liabilities: state.liabilities.map((liability) =>
        liability.id === id ? { ...liability, ...updates } : liability
      ),
    }));
  },

  // Delete a liability
  deleteLiability: (id) => {
    set((state) => ({
      liabilities: state.liabilities.filter((liability) => liability.id !== id),
    }));
  },

  // Get liability by ID
  getLiabilityById: (id) => {
    return get().liabilities.find((liability) => liability.id === id);
  },

  // Get total value of all liabilities
  getTotalLiabilities: () => {
    return get().liabilities.reduce((sum, liability) => sum + liability.amount, 0);
  },

  // Clear all liabilities (for testing/demo)
  clearLiabilities: () => {
    set({ liabilities: [] });
  },
}));
