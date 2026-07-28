"use client";

import { useArticles } from "@/modules/Dashboard/hooks/useArticles";
import { useFilters } from "@/modules/Dashboard/hooks/useFilters";
import { useIngestion } from "@/modules/Dashboard/hooks/useIngestion";
import { DashboardShell } from "@/modules/Dashboard/components/DashboardShell";
import { WorldMap } from "@/modules/Dashboard/components/WorldMap";
import { MapLegend } from "@/modules/Dashboard/components/MapLegend";
import { CategoryChart } from "@/modules/Dashboard/components/CategoryChart";
import { SignalFeed } from "@/modules/Dashboard/components/SignalFeed";

export function Dashboard() {
  const { mapPins, feedItems, isLoading: articlesLoading, refetch: refetchArticles } = useArticles();
  const { categories, totalSignals, isLoading: filtersLoading } = useFilters();
  const { isRunning, nextUpdateIn, triggerUpdate } = useIngestion(refetchArticles);

  return (
    <DashboardShell isRunning={isRunning} nextUpdateIn={nextUpdateIn} onUpdate={triggerUpdate}>
      <section className="flex-1 relative rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 shadow-inner">
        <WorldMap pins={mapPins} />
        <MapLegend />
      </section>

      <section className="w-[380px] h-full flex flex-col gap-4 min-h-0">
        <div className="h-[35%]">
          <CategoryChart
            categories={categories}
            totalSignals={totalSignals}
            isLoading={filtersLoading}
          />
        </div>
        <SignalFeed items={feedItems} isLoading={articlesLoading} onRefresh={refetchArticles} />
      </section>
    </DashboardShell>
  );
}
