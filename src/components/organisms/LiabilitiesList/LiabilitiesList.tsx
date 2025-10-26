import { useState } from 'react';
import { RRCard } from '../../atoms';
import { CategoryCardHeader } from '../../molecules';
import { LiabilityRow } from '../LiabilityRow';
import { useLiabilitiesStore } from '../../../stores';

export function LiabilitiesList() {
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  // Subscribe to liabilities from store
  const liabilities = useLiabilitiesStore((state) => state.liabilities);
  const addLiability = useLiabilitiesStore((state) => state.addLiability);
  const updateLiability = useLiabilitiesStore((state) => state.updateLiability);
  const deleteLiability = useLiabilitiesStore((state) => state.deleteLiability);

  const handleAddClick = () => {
    setIsAddingNew(true);
  };

  const handleSaveNew = (liabilityData: Parameters<typeof addLiability>[0]) => {
    addLiability(liabilityData);
    setIsAddingNew(false);
  };

  const handleCancelNew = () => {
    setIsAddingNew(false);
  };

  return (
    <RRCard>
      <CategoryCardHeader
        title="Liabilities"
        description="Track your loans, debts, and financial obligations"
        action={
          <button
            onClick={handleAddClick}
            disabled={isAddingNew}
            className="text-sm text-rupee-green hover:text-green-600 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + Add Liability
          </button>
        }
      />

      <div className="mt-4 space-y-2">
        {/* Existing liabilities */}
        {liabilities.map((liability) => (
          <LiabilityRow
            key={liability.id}
            liability={liability}
            onUpdate={updateLiability}
            onDelete={deleteLiability}
          />
        ))}

        {/* New liability row */}
        {isAddingNew && (
          <LiabilityRow
            isNew
            onSave={handleSaveNew}
            onCancel={handleCancelNew}
          />
        )}
        
        {/* Empty state */}
        {liabilities.length === 0 && !isAddingNew && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No liabilities yet</p>
            <p className="text-xs mt-1">Click "+ Add Liability" to get started</p>
          </div>
        )}
      </div>
    </RRCard>
  );
}
