import { NetWorthCard, ProjectionsCard, GrowthChartCard, BreakdownCard } from '../components/organisms';
import { useAssetsStore, useLiabilitiesStore } from '../stores';
import * as financial from '../stores/useFinancialStore';

export function ResultsPanel() {
  // Subscribe to store changes to trigger re-renders
  const assets = useAssetsStore((state) => state.assets);
  const liabilities = useLiabilitiesStore((state) => state.liabilities);

  // Calculate values (will recalculate on every render when dependencies change)
  const netWorth = financial.getNetWorth();
  const totalAssets = financial.getTotalAssets();
  const totalLiabilities = financial.getTotalLiabilities();
  const projections = financial.getProjections();

  // Suppress unused variable warnings (needed for subscriptions)
  void assets;
  void liabilities;

  return (
    <div className="space-y-4">
      {/* Net Worth Card */}
      <NetWorthCard netWorth={netWorth} />
      {/* Breakdown Card */}
      <BreakdownCard totalAssets={totalAssets} totalLiabilities={totalLiabilities} />

      {/* Projections Card */}
      <ProjectionsCard
        year5={projections.year5}
        year10={projections.year10}
        year20={projections.year20}
        year25={projections.year25}
        year30={projections.year30}
      />

      {/* Growth Chart */}
      <GrowthChartCard
        currentValue={netWorth}
        year5={projections.year5}
        year10={projections.year10}
        year20={projections.year20}
        year25={projections.year25}
        year30={projections.year30}
      />


    </div>
  );
}
