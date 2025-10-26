import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { RRIconButton, RRSelect, RRNumberInput, RRInput } from '../../atoms';
import type { Liability, LiabilityInput } from '../../../features/liabilities/stores/liabilityStore';
import { DEFAULT_INTEREST_RATES as RATES } from '../../../features/liabilities/stores/liabilityStore';
import { 
  formatIndianCurrency, 
  calculateRemainingMonths,
  calculatePayoffDate,
  formatPayoffDate,
  formatPayoffTimeline
} from '../../../utils';
import type { LiabilityType } from '../../../types';

const LIABILITY_TYPES: { value: LiabilityType; label: string }[] = [
  { value: 'Home Loan', label: '🏠 Home Loan' },
  { value: 'Car Loan', label: '🚗 Car Loan' },
  { value: 'Personal Loan', label: '💳 Personal Loan' },
  { value: 'Education Loan', label: '🎓 Education Loan' },
  { value: 'Credit Card', label: '💳 Credit Card' },
  { value: 'Business Loan', label: '💼 Business Loan' },
  { value: 'Other', label: '📄 Other Debt' },
];

interface LiabilityRowProps {
  liability?: Liability;
  isNew?: boolean;
  onSave?: (liability: LiabilityInput) => void;
  onUpdate?: (id: string, updates: Partial<LiabilityInput>) => void;
  onDelete?: (id: string) => void;
  onCancel?: () => void;
}

export function LiabilityRow({
  liability,
  isNew = false,
  onSave,
  onUpdate,
  onDelete,
  onCancel,
}: LiabilityRowProps) {
  const [isEditing, setIsEditing] = useState(isNew);
  
  // Initialize form data with default interest rate if it's a new liability
  const initialType = liability?.type || 'Personal Loan';
  
  // Form state type allows undefined for validation
  type FormState = {
    name: string;
    type: LiabilityType;
    amount: number | undefined;
    interestRate: number | undefined;
    monthlyEMI: number | undefined;
    hasEMI: boolean;
  };
  
  const [formData, setFormData] = useState<FormState>({
    name: liability?.name || '',
    type: initialType,
    amount: liability?.amount, // undefined for new liabilities
    interestRate: liability?.interestRate ?? RATES[initialType],
    monthlyEMI: liability?.monthlyEMI,
    hasEMI: liability?.monthlyEMI !== undefined && liability?.monthlyEMI > 0,
  });

  // Check if form is valid
  const isFormValid = 
    formData.name.trim() !== '' &&
    formData.amount !== undefined &&
    formData.amount > 0 &&
    formData.interestRate !== undefined &&
    formData.interestRate >= 0 &&
    (!formData.hasEMI || (formData.monthlyEMI !== undefined && formData.monthlyEMI > 0));

  const handleSave = () => {
    if (!isFormValid) return;
    
    // All validations passed, convert to LiabilityInput
    const validatedData: LiabilityInput = {
      name: formData.name,
      type: formData.type,
      amount: formData.amount!,
      interestRate: formData.interestRate!,
      monthlyEMI: formData.hasEMI ? formData.monthlyEMI : undefined,
    };
    
    if (isNew) {
      onSave?.(validatedData);
      onCancel?.();
    } else if (liability && onUpdate) {
      onUpdate(liability.id, validatedData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (isNew) {
      onCancel?.();
    } else {
      setFormData({
        name: liability?.name || '',
        type: liability?.type || 'Personal Loan',
        amount: liability?.amount,
        interestRate: liability?.interestRate,
        monthlyEMI: liability?.monthlyEMI,
        hasEMI: liability?.monthlyEMI !== undefined && liability?.monthlyEMI > 0,
      });
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (liability && onDelete) {
      onDelete(liability.id);
    }
  };

  // Edit Mode
  if (isEditing) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Liability Type <span className="text-red-500">*</span>
            </label>
            <RRSelect
              value={formData.type}
              onChange={(e) => {
                const newType = e.target.value as LiabilityType;
                setFormData({ 
                  ...formData, 
                  type: newType,
                  interestRate: RATES[newType]
                });
              }}
              options={LIABILITY_TYPES}
              placeholder="Select liability type"
              fullWidth
            />
          </div>
          
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Liability Name <span className="text-red-500">*</span>
            </label>
            <RRInput
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Home Loan - HDFC"
              fullWidth
            />
          </div>
          
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Outstanding Amount <span className="text-red-500">*</span>
            </label>
            <RRNumberInput
              value={formData.amount}
              onChange={(value) => setFormData({ ...formData, amount: value })}
              prefix="₹"
              placeholder="e.g., 30,00,000"
              fullWidth
            />
          </div>
          
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Interest Rate (% p.a.) <span className="text-red-500">*</span>
            </label>
            <RRNumberInput
              value={formData.interestRate}
              onChange={(value) => setFormData({ ...formData, interestRate: value })}
              prefix="" 
              suffix="%"
              placeholder="e.g., 8.5"
              fullWidth
            />
          </div>
        </div>
        
        {/* EMI Section */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
            <input
              type="checkbox"
              checked={formData.hasEMI}
              onChange={(e) => setFormData({ ...formData, hasEMI: e.target.checked, monthlyEMI: e.target.checked ? formData.monthlyEMI : undefined })}
              className="rounded border-gray-300 text-rupee-green focus:ring-rupee-green"
            />
            I have a fixed monthly payment (EMI)
          </label>
          
          {formData.hasEMI && (
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">
                Monthly EMI <span className="text-red-500">*</span>
              </label>
              <RRNumberInput
                value={formData.monthlyEMI}
                onChange={(value) => setFormData({ ...formData, monthlyEMI: value })}
                prefix="₹"
                placeholder="e.g., 43,000"
                fullWidth
              />
              {formData.amount && formData.interestRate && formData.monthlyEMI && formData.monthlyEMI > 0 && (
                <div className="mt-2 text-xs text-gray-600">
                  {(() => {
                    const months = calculateRemainingMonths(formData.amount, formData.interestRate, formData.monthlyEMI);
                    if (!isFinite(months)) {
                      return <span className="text-red-600">⚠️ EMI too low to cover interest. Loan will never be paid off!</span>;
                    }
                    const payoffDate = calculatePayoffDate(months);
                    const timeline = formatPayoffTimeline(months);
                    return (
                      <span className="text-green-600">
                        ✓ Debt-free by ~{formatPayoffDate(payoffDate)} ({timeline})
                      </span>
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
            Save Liability
          </button>
        </div>
      </div>
    );
  }

  // View Mode
  // Find the type label with emoji
  const typeLabel = LIABILITY_TYPES.find(t => t.value === liability?.type)?.label || liability?.type;
  
  // Calculate payoff information if EMI is available
  const hasEMI = liability?.monthlyEMI && liability.monthlyEMI > 0;
  let payoffInfo = null;
  
  if (hasEMI && liability?.amount && liability?.interestRate && liability?.monthlyEMI) {
    const months = calculateRemainingMonths(liability.amount, liability.interestRate, liability.monthlyEMI);
    if (isFinite(months) && months > 0) {
      const payoffDate = calculatePayoffDate(months);
      const timeline = formatPayoffTimeline(months);
      const formattedDate = formatPayoffDate(payoffDate);
      payoffInfo = { months, payoffDate, timeline, formattedDate };
    }
  }
  
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-gray-900">{typeLabel}</span>
          {liability?.name && liability.name.trim() !== '' && (
            <span className="text-sm text-gray-600">— {liability.name}</span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-sm font-semibold text-red-600">
            {formatIndianCurrency(liability?.amount || 0)}
          </span>
          <span className="text-xs text-gray-500">
            {liability?.interestRate}% interest
          </span>
        </div>
        
        {/* EMI and Payoff Information */}
        {hasEMI && (
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="font-medium">💳 EMI:</span>
              <span>{formatIndianCurrency(liability?.monthlyEMI || 0)}/month</span>
            </div>
            {payoffInfo && (
              <>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="font-medium">⏱️ Remaining:</span>
                  <span>{payoffInfo.timeline}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-green-600">
                  <span className="font-medium">🎉 Debt-free by:</span>
                  <span>~{payoffInfo.formattedDate}</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      
      <div className="flex gap-1">
        <RRIconButton
          icon={Edit}
          variant="ghost"
          size="sm"
          ariaLabel="Edit liability"
          onClick={() => setIsEditing(true)}
        />
        <RRIconButton
          icon={Trash2}
          variant="ghost"
          size="sm"
          ariaLabel="Delete liability"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}
