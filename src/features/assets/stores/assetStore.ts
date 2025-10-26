/**
 * Assets Store - MVP Version
 * 
 * Manages asset data (CRUD operations)
 * - No persistence (data resets on page refresh)
 * - Simple in-memory state with Zustand
 * - Auto-generates IDs using crypto.randomUUID()
 */

import { create } from 'zustand';
import type { AssetCategory } from '../../../types';

// Simplified Asset data model
export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  currentValue: number;
  growthRate: number; // Annual growth rate as percentage
  
  // SIP/Recurring Investment (optional)
  monthlyContribution?: number;  // Monthly investment amount
  sipDuration?: number;           // How many years will continue (0 = ongoing)
}

// Asset input (without auto-generated fields)
export type AssetInput = Omit<Asset, 'id'>;

interface AssetsStore {
  // State
  assets: Asset[];
  
  // Actions
  addAsset: (asset: AssetInput) => void;
  updateAsset: (id: string, updates: Partial<AssetInput>) => void;
  deleteAsset: (id: string) => void;
  
  // Queries
  getAssetById: (id: string) => Asset | undefined;
  getTotalAssets: () => number;
  clearAssets: () => void;  // For testing/demo
}

export const useAssetsStore = create<AssetsStore>((set, get) => ({
  // Initial state with default Cash asset
  assets: [
    {
      id: crypto.randomUUID(),
      name: 'Cash',
      category: 'Cash',
      currentValue: 1000,
      growthRate: 4, // 4% p.a. for Cash & Savings
    }
  ],

  // Add a new asset
  addAsset: (assetInput) => {
    const newAsset: Asset = {
      ...assetInput,
      id: crypto.randomUUID(),
    };
    
    set((state) => ({
      assets: [...state.assets, newAsset],
    }));
  },

  // Update an existing asset
  updateAsset: (id, updates) => {
    set((state) => ({
      assets: state.assets.map((asset) =>
        asset.id === id ? { ...asset, ...updates } : asset
      ),
    }));
  },

  // Delete an asset
  deleteAsset: (id) => {
    set((state) => ({
      assets: state.assets.filter((asset) => asset.id !== id),
    }));
  },

  // Get asset by ID
  getAssetById: (id) => {
    return get().assets.find((asset) => asset.id === id);
  },

  // Get total value of all assets
  getTotalAssets: () => {
    return get().assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  },

  // Clear all assets (for testing/demo)
  clearAssets: () => {
    set({ assets: [] });
  },
}));
