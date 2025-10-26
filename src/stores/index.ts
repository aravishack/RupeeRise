/**
 * Store Exports
 * 
 * Central export file for all Zustand stores
 */

// Feature stores
export { useAssetsStore } from '../features/assets/stores/assetStore';
export type { Asset, AssetInput } from '../features/assets/stores/assetStore';

export { useLiabilitiesStore } from '../features/liabilities/stores/liabilityStore';
export type { Liability, LiabilityInput } from '../features/liabilities/stores/liabilityStore';

// Financial calculations (utility functions)
export * as financial from './useFinancialStore';
export type { Projections } from './useFinancialStore';
