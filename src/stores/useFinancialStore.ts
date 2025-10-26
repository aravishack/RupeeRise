/**
 * Financial Calculations - MVP Version
 * 
 * Pure utility functions for financial calculations
 * - Reads directly from stores without creating subscriptions
 * - No Zustand store to avoid infinite loops
 * - Called directly by components
 */

import { useAssetsStore } from '../features/assets/stores/assetStore';
import { useLiabilitiesStore } from '../features/liabilities/stores/liabilityStore';
import { calculateCombinedFutureValue } from '../utils';

export interface Projections {
  year5: number;
  year10: number;
  year20: number;
  year25: number;
  year30: number;
}

// Get total value of all assets
export const getTotalAssets = (): number => {
  return useAssetsStore.getState().getTotalAssets();
};

// Get total value of all liabilities
export const getTotalLiabilities = (): number => {
  return useLiabilitiesStore.getState().getTotalLiabilities();
};

// Calculate net worth (assets - liabilities)
export const getNetWorth = (): number => {
  const totalAssets = getTotalAssets();
  const totalLiabilities = getTotalLiabilities();
  return totalAssets - totalLiabilities;
};

// Calculate debt ratio percentage
export const getDebtRatio = (): number => {
  const totalAssets = getTotalAssets();
  const totalLiabilities = getTotalLiabilities();
  
  if (totalAssets === 0) return 0;
  return (totalLiabilities / totalAssets) * 100;
};

// Calculate future value projection for a given number of years
// Now handles both lump sum growth and SIP contributions
export const getProjection = (years: number, customGrowthRate?: number): number => {
  const assets = useAssetsStore.getState().assets;
  let totalAssetsFV = 0;
  
  // Calculate future value for each asset
  assets.forEach(asset => {
    const rate = asset.growthRate;
    
    // Check if asset has SIP
    const hasSIP = asset.monthlyContribution && asset.monthlyContribution > 0;
    
    if (hasSIP) {
      // Asset has both lump sum and SIP - use combined calculation
      const sipDuration = asset.sipDuration === undefined || asset.sipDuration === 0 
        ? years  // Ongoing = use projection years
        : asset.sipDuration;
      
      const assetFV = calculateCombinedFutureValue(
        asset.currentValue,
        asset.monthlyContribution!,
        rate,
        years,
        sipDuration
      );
      
      totalAssetsFV += assetFV;
    } else {
      // Lump sum only - standard compound interest
      const assetFV = asset.currentValue * Math.pow(1 + rate / 100, years);
      totalAssetsFV += assetFV;
    }
  });
  
  // Subtract liabilities (assuming they stay constant for now)
  const totalLiabilities = getTotalLiabilities();
  
  return totalAssetsFV - totalLiabilities;
};

// Get all standard projections (5, 10, 20, 25, 30 years)
export const getProjections = (): Projections => {
  return {
    year5: getProjection(5),
    year10: getProjection(10),
    year20: getProjection(20),
    year25: getProjection(25),
    year30: getProjection(30),
  };
};

// Get asset percentage in total (assets / (assets + liabilities) * 100)
export const getAssetPercentage = (): number => {
  const totalAssets = getTotalAssets();
  const totalLiabilities = getTotalLiabilities();
  const total = totalAssets + totalLiabilities;
  
  if (total === 0) return 0;
  return (totalAssets / total) * 100;
};

// Get liability percentage in total (liabilities / (assets + liabilities) * 100)
export const getLiabilityPercentage = (): number => {
  const totalAssets = getTotalAssets();
  const totalLiabilities = getTotalLiabilities();
  const total = totalAssets + totalLiabilities;
  
  if (total === 0) return 0;
  return (totalLiabilities / total) * 100;
};
