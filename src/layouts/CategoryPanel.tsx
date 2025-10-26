import { AssetsList, LiabilitiesList, AIAnalysisCard } from '../components/organisms';

export function CategoryPanel() {
  return (
    <div className="space-y-4">
      {/* Assets Section */}
      <AssetsList />

      {/* Liabilities Section */}
      <LiabilitiesList />

      {/* What-If Scenarios Section - Hidden for now */}
      {/* TODO: Implement What-If Scenarios feature
      <RRCard>
        <CategoryCardHeader
          title="What-If Scenarios"
          description="Explore future possibilities and plan ahead"
          action={
            <button className="text-sm text-rupee-green hover:text-green-600 font-medium transition-colors">
              + Add Scenario
            </button>
          }
        />
      </RRCard>
      */}

      {/* AI Analysis Section */}
      <AIAnalysisCard />
    </div>
  );
}
