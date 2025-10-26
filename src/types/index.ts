// RupeeRise Type Definitions

export type AssetCategory =
  | 'Indian Stocks'
  | 'International Stocks'
  | 'Company RSU'
  | 'Mutual Funds'
  | 'Real Estate'
  | 'PPF'
  | 'EPF'
  | 'NPS'
  | 'Fixed Deposits'
  | 'Gold'
  | 'Crypto'
  | 'Cash'
  | 'Other';

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  currentValue: number;
  monthlySIP?: number;
  growthRate: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type LiabilityType =
  | 'Home Loan'
  | 'Car Loan'
  | 'Personal Loan'
  | 'Education Loan'
  | 'Credit Card'
  | 'Business Loan'
  | 'Other';

export interface Liability {
  id: string;
  name: string;
  type: LiabilityType;
  outstanding: number;
  monthlyEMI: number;
  interestRate: number;
  remainingMonths?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Scenario {
  id: string;
  name: string;
  changes: ScenarioChange[];
  impact: ScenarioImpact;
  createdAt: Date;
}

export type ScenarioAction =
  | 'increase_sip'
  | 'decrease_sip'
  | 'add_lumpsum'
  | 'prepay'
  | 'sell';

export interface ScenarioChange {
  action: ScenarioAction;
  targetId: string;
  targetName: string;
  amount: number;
}

export interface ScenarioImpact {
  year5: ProjectionValue;
  year10: ProjectionValue;
  year20: ProjectionValue;
}

export interface ProjectionValue {
  baseline: number;
  scenario: number;
  difference: number;
  percentChange: number;
}

export interface NetWorth {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  debtRatio: number;
}
