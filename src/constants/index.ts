// RupeeRise Constants

import type { AssetCategory, LiabilityType } from '../types';

export const ASSET_CATEGORIES: Record<AssetCategory, { icon: string; defaultGrowthRate: number }> = {
  'Indian Stocks': { icon: '🇮🇳', defaultGrowthRate: 12 },
  'International Stocks': { icon: '🌍', defaultGrowthRate: 10 },
  'Company RSU': { icon: '🏢', defaultGrowthRate: 15 },
  'Mutual Funds': { icon: '📊', defaultGrowthRate: 12 },
  'Real Estate': { icon: '🏠', defaultGrowthRate: 8 },
  'PPF': { icon: '🏛️', defaultGrowthRate: 7.1 },
  'EPF': { icon: '💼', defaultGrowthRate: 8.25 },
  'NPS': { icon: '🎯', defaultGrowthRate: 10 },
  'Fixed Deposits': { icon: '🏦', defaultGrowthRate: 6.5 },
  'Gold': { icon: '✨', defaultGrowthRate: 8 },
  'Crypto': { icon: '₿', defaultGrowthRate: 15 },
  'Cash': { icon: '💵', defaultGrowthRate: 0 },
  'Other': { icon: '📂', defaultGrowthRate: 8 },
};

export const LIABILITY_TYPES: Record<LiabilityType, { icon: string; defaultInterestRate: number }> = {
  'Home Loan': { icon: '🏠', defaultInterestRate: 8.5 },
  'Car Loan': { icon: '🚗', defaultInterestRate: 10 },
  'Personal Loan': { icon: '💳', defaultInterestRate: 12 },
  'Education Loan': { icon: '🎓', defaultInterestRate: 9 },
  'Credit Card': { icon: '💳', defaultInterestRate: 36 },
  'Business Loan': { icon: '🏢', defaultInterestRate: 11 },
  'Other': { icon: '📂', defaultInterestRate: 10 },
};

export const APP_NAME = 'RupeeRise';
export const APP_TAGLINE = 'Watch Your Rupees Rise';
export const APP_VERSION = '1.0.0';
