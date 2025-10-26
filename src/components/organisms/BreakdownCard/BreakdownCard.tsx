import { RRCard } from '../../atoms';
import { StatRow, ProgressItem } from '../../molecules';
import { formatCompact } from '../../../utils';

interface BreakdownCardProps {
  totalAssets: number;
  totalLiabilities: number;
}

export function BreakdownCard({ totalAssets, totalLiabilities }: BreakdownCardProps) {
  // Safe calculations that handle zero values
  const debtRatio = totalAssets === 0 ? '0.0' : ((totalLiabilities / totalAssets) * 100).toFixed(1);
  
  const total = totalAssets + totalLiabilities;
  const assetsPercentage = total === 0 ? '0' : ((totalAssets / total) * 100).toFixed(0);
  const liabilitiesPercentage = total === 0 ? '0' : ((totalLiabilities / total) * 100).toFixed(0);

  return (
    <RRCard>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Breakdown</h3>
      <div className="space-y-3">
        <ProgressItem
          label="Assets"
          value={formatCompact(totalAssets)}
          progress={Number(assetsPercentage)}
          barColor="bg-green-500"
          valueClassName="font-medium text-green-600"
        />
        
        <ProgressItem
          label="Liabilities"
          value={formatCompact(totalLiabilities)}
          progress={Number(liabilitiesPercentage)}
          barColor="bg-red-500"
          valueClassName="font-medium text-red-600"
        />

        <div className="pt-3 border-t border-gray-200">
          <StatRow label="Debt Ratio" value={`${debtRatio}%`} />
        </div>
      </div>
    </RRCard>
  );
}
