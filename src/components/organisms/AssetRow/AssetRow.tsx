import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { RRIconButton, RRSelect, RRNumberInput, RRInput } from '../../atoms';
import type { Asset, AssetInput } from '../../../stores';
import { 
  formatIndianCurrency,
  calculateSIPReturns,
  formatSIPDuration
} from '../../../utils';
import type { AssetCategory } from '../../../types';

const ASSET_CATEGORIES: { value: AssetCategory; label: string }[] = [
  { value: 'Cash', label: '💰 Cash & Savings' },
  { value: 'Indian Stocks', label: '🇮🇳 Indian Stocks' },
  { value: 'International Stocks', label: '🌍 International Stocks' },
  { value: 'Company RSU', label: '🏢 Company RSU' },
  { value: 'Mutual Funds', label: '📊 Mutual Funds' },
  { value: 'Real Estate', label: '🏠 Real Estate' },
  { value: 'PPF', label: '🏦 PPF' },
  { value: 'EPF', label: '💼 EPF' },
  { value: 'NPS', label: '🎯 NPS' },
  { value: 'Fixed Deposits', label: '🏛️ Fixed Deposits & Bonds' },
  { value: 'Gold', label: '🪙 Gold' },
  { value: 'Crypto', label: '₿ Crypto' },
  { value: 'Other', label: '📦 Other Assets' },
];

// Default growth rates for each asset category
const DEFAULT_GROWTH_RATES: Record<AssetCategory, number> = {
  'Cash': 4,
  'Indian Stocks': 12,
  'International Stocks': 10,
  'Company RSU': 15,
  'Mutual Funds': 14,
  'Real Estate': 6,
  'PPF': 7.1,
  'EPF': 8.25,
  'NPS': 10,
  'Fixed Deposits': 6.5,
  'Gold': 8,
  'Crypto': 15,
  'Other': 5,
};

interface AssetRowProps {
  asset?: Asset;
  isNew?: boolean;
  onSave?: (asset: AssetInput) => void;
  onUpdate?: (id: string, updates: Partial<AssetInput>) => void;
  onDelete?: (id: string) => void;
  onCancel?: () => void;
}

export function AssetRow({
  asset,
  isNew = false,
  onSave,
  onUpdate,
  onDelete,
  onCancel,
}: AssetRowProps) {
  const [isEditing, setIsEditing] = useState(isNew);
  
  // Initialize form data with default growth rate if it's a new asset
  const initialCategory = asset?.category || 'Cash';
  
  // Form state type allows undefined for validation
  type FormState = {
    name: string;
    category: AssetCategory;
    currentValue: number | undefined;
    growthRate: number | undefined;
    
    // SIP fields
    hasSIP: boolean;
    monthlyContribution: number | undefined;
    sipDuration: number | undefined;
  };
  
  const [formData, setFormData] = useState<FormState>({
    name: asset?.name || '',
    category: initialCategory,
    currentValue: asset?.currentValue, // undefined for new assets
    growthRate: asset?.growthRate ?? DEFAULT_GROWTH_RATES[initialCategory],
    
    // SIP initialization
    hasSIP: asset?.monthlyContribution !== undefined && asset?.monthlyContribution > 0,
    monthlyContribution: asset?.monthlyContribution,
    sipDuration: asset?.sipDuration ?? 0,
  });

  // Check if form is valid
  const isFormValid = 
    formData.name.trim() !== '' &&
    formData.currentValue !== undefined &&
    formData.currentValue > 0 &&
    formData.growthRate !== undefined &&
    formData.growthRate >= 0 &&
    (!formData.hasSIP || (
      formData.monthlyContribution !== undefined && 
      formData.monthlyContribution > 0 &&
      formData.sipDuration !== undefined &&
      formData.sipDuration >= 0
    ));

  const handleSave = () => {
    if (!isFormValid) return;
    
    // All validations passed, convert to AssetInput
    const validatedData: AssetInput = {
      name: formData.name,
      category: formData.category,
      currentValue: formData.currentValue!,
      growthRate: formData.growthRate!,
      
      // Include SIP data if enabled
      monthlyContribution: formData.hasSIP ? formData.monthlyContribution : undefined,
      sipDuration: formData.hasSIP ? formData.sipDuration : undefined,
    };
    
    if (isNew) {
      onSave?.(validatedData);
      onCancel?.();
    } else if (asset && onUpdate) {
      onUpdate(asset.id, validatedData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (isNew) {
      onCancel?.();
    } else {
      setFormData({
        name: asset?.name || '',
        category: asset?.category || 'Cash',
        currentValue: asset?.currentValue,
        growthRate: asset?.growthRate,
        
        // Reset SIP fields
        hasSIP: asset?.monthlyContribution !== undefined && asset?.monthlyContribution > 0,
        monthlyContribution: asset?.monthlyContribution,
        sipDuration: asset?.sipDuration ?? 0,
      });
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (asset && onDelete) {
      onDelete(asset.id);
    }
  };

  // Edit Mode
  if (isEditing) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Asset Type <span className="text-red-500">*</span>
            </label>
            <RRSelect
              value={formData.category}
              onChange={(e) => {
                const newCategory = e.target.value as AssetCategory;
                setFormData({ 
                  ...formData, 
                  category: newCategory,
                  growthRate: DEFAULT_GROWTH_RATES[newCategory] || 0
                });
              }}
              options={ASSET_CATEGORIES}
              placeholder="Select asset type"
              fullWidth
            />
          </div>
          
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Asset Name <span className="text-red-500">*</span>
            </label>
            <RRInput
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Nifty 50 Index Fund"
              fullWidth
            />
          </div>
          
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Current Value <span className="text-red-500">*</span>
            </label>
            <RRNumberInput
              value={formData.currentValue}
              onChange={(value) => setFormData({ ...formData, currentValue: value })}
              prefix="₹"
              placeholder="e.g., 5,00,000"
              fullWidth
            />
          </div>
          
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Growth Rate (% p.a.) <span className="text-red-500">*</span>
            </label>
            <RRNumberInput
              value={formData.growthRate}
              onChange={(value) => setFormData({ ...formData, growthRate: value })}
              prefix="" 
              suffix="%"
              placeholder="e.g., 12"
              fullWidth
            />
          </div>
        </div>
        
        {/* SIP Section */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
            <input
              type="checkbox"
              checked={formData.hasSIP}
              onChange={(e) => setFormData({ 
                ...formData, 
                hasSIP: e.target.checked,
                monthlyContribution: e.target.checked ? formData.monthlyContribution : undefined,
                sipDuration: e.target.checked ? (formData.sipDuration ?? 0) : undefined
              })}
              className="rounded border-gray-300 text-rupee-green focus:ring-rupee-green"
            />
            I make regular monthly contributions
          </label>
          
          {formData.hasSIP && (
            <div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">
                    Monthly Contribution <span className="text-red-500">*</span>
                  </label>
                  <RRNumberInput
                    value={formData.monthlyContribution}
                    onChange={(value) => setFormData({ ...formData, monthlyContribution: value })}
                    prefix="₹"
                    placeholder="e.g., 10,000"
                    fullWidth
                  />
                </div>
                
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-1 block">
                    Duration (years) <span className="text-red-500">*</span>
                  </label>
                  <RRNumberInput
                    value={formData.sipDuration}
                    onChange={(value) => setFormData({ ...formData, sipDuration: value ?? 0 })}
                    prefix=""
                    suffix="yrs"
                    placeholder="0 = ongoing"
                    fullWidth
                  />
                  <p className="text-xs text-green-600 mt-1">
                    {formData.sipDuration === 0 || formData.sipDuration === undefined 
                      ? '✓ Ongoing contributions (will continue for projection period)'
                      : `✓ Fixed term: ${formData.sipDuration} years`
                    }
                  </p>
                </div>
              </div>
              
              {/* Real-time SIP calculation preview */}
              {formData.monthlyContribution && 
               formData.growthRate && 
               formData.sipDuration !== undefined &&
               formData.sipDuration > 0 && (
                <div className="mt-2 p-2 bg-green-50 rounded text-xs">
                  {(() => {
                    const sipMonths = formData.sipDuration * 12;
                    const returns = calculateSIPReturns(
                      formData.monthlyContribution,
                      formData.growthRate,
                      sipMonths
                    );
                    return (
                      <div className="text-green-700 space-y-1">
                        <div className="font-semibold">✓ In {formData.sipDuration} years:</div>
                        <div>Invested: {formatIndianCurrency(returns.invested)}</div>
                        <div>Returns: {formatIndianCurrency(returns.returns)}</div>
                        <div className="font-semibold">Total Value: {formatIndianCurrency(returns.total)}</div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex gap-2 mt-3 justify-end">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isFormValid}
            className="px-4 py-2 text-sm font-medium text-white bg-rupee-green rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Save Asset
          </button>
        </div>
      </div>
    );
  }

  // View Mode
  // Find the category label with emoji
  const categoryLabel = ASSET_CATEGORIES.find(cat => cat.value === asset?.category)?.label || asset?.category;
  
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-gray-900">{categoryLabel}</span>
          {asset?.name && asset.name.trim() !== '' && (
            <span className="text-sm text-gray-600">— {asset.name}</span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-sm font-semibold text-gray-900">
            {formatIndianCurrency(asset?.currentValue || 0)}
          </span>
          <span className="text-xs text-gray-500">
            {asset?.growthRate}% growth
          </span>
        </div>
        
        {/* SIP Information - Show if monthlyContribution exists */}
        {asset?.monthlyContribution && asset.monthlyContribution > 0 && (
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="font-medium">📈 Monthly:</span>
              <span>
                {formatIndianCurrency(asset.monthlyContribution)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="font-medium">⏱️ Duration:</span>
              <span>{formatSIPDuration(asset.sipDuration)}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex gap-1">
        <RRIconButton
          icon={Edit}
          variant="ghost"
          size="sm"
          ariaLabel="Edit asset"
          onClick={() => setIsEditing(true)}
        />
        <RRIconButton
          icon={Trash2}
          variant="ghost"
          size="sm"
          ariaLabel="Delete asset"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}
