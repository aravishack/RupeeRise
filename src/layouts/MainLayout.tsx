import type { ReactNode } from 'react';

interface MainLayoutProps {
  sidebar: ReactNode;
  results: ReactNode;
}

export function MainLayout({ sidebar, results }: MainLayoutProps) {
  return (
    <div className="py-6">
      <div className="max-w-screen-2xl mx-auto px-6">
      {/* 12-column grid: 8 columns for sidebar + 4 columns for results */}
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar - 8 columns (inputs: Assets, Liabilities, Scenarios) */}
        <aside className="col-span-12 lg:col-span-8">
          <div className="space-y-4">
            {sidebar}
          </div>
        </aside>

        {/* Results Panel - 4 columns (Net Worth, Projections, Charts) */}
        <main className="col-span-12 lg:col-span-4">
          <div className="space-y-4 lg:sticky lg:top-24">
            {results}
          </div>
        </main>
      </div>
      </div>
    </div>
  );
}
