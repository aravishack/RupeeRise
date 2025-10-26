import { useState } from 'react';
import { RRCard } from '../../atoms';
import { CategoryCardHeader } from '../../molecules';
import { AssetRow } from '../AssetRow';
import { useAssetsStore } from '../../../stores';

export function AssetsList() {
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  // Subscribe to assets from store
  const assets = useAssetsStore((state) => state.assets);
  const addAsset = useAssetsStore((state) => state.addAsset);
  const updateAsset = useAssetsStore((state) => state.updateAsset);
  const deleteAsset = useAssetsStore((state) => state.deleteAsset);

  const handleAddClick = () => {
    setIsAddingNew(true);
  };

  const handleSaveNew = (assetData: Parameters<typeof addAsset>[0]) => {
    addAsset(assetData);
    setIsAddingNew(false);
  };

  const handleCancelNew = () => {
    setIsAddingNew(false);
  };

  return (
    <RRCard>
      <CategoryCardHeader
        title="Assets"
        description="Track your investments, savings, and property"
        action={
          <button
            onClick={handleAddClick}
            disabled={isAddingNew}
            className="text-sm text-rupee-green hover:text-green-600 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + Add Asset
          </button>
        }
      />

      <div className="mt-4 space-y-2">
        {/* Existing assets */}
        {assets.map((asset) => (
          <AssetRow
            key={asset.id}
            asset={asset}
            onUpdate={updateAsset}
            onDelete={deleteAsset}
          />
        ))}

        {/* New asset row */}
        {isAddingNew && (
          <AssetRow
            isNew
            onSave={handleSaveNew}
            onCancel={handleCancelNew}
          />
        )}
        
        {/* Empty state */}
        {assets.length === 0 && !isAddingNew && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No assets yet</p>
            <p className="text-xs mt-1">Click "+ Add Asset" to get started</p>
          </div>
        )}
      </div>
    </RRCard>
  );
}
