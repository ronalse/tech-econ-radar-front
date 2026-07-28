"use client";

import { useArticles } from "@/modules/Dashboard/hooks/useArticles";
import { useFilters } from "@/modules/Dashboard/hooks/useFilters";
import { useMapSummary } from "@/modules/Dashboard/hooks/useMapSummary";
import { DashboardShell } from "@/modules/Dashboard/components/DashboardShell";
import { WorldMap } from "@/modules/Dashboard/components/WorldMap";
import { MapLegend } from "@/modules/Dashboard/components/MapLegend";
import { MapSummaryBar } from "@/modules/Dashboard/components/MapSummaryBar";
import { CategoryChart } from "@/modules/Dashboard/components/CategoryChart";
import { SignalFeed } from "@/modules/Dashboard/components/SignalFeed";
import type { EarthquakePoint } from "@/services/earthquakes/EarthquakesAdapter";

const NO_EARTHQUAKES: EarthquakePoint[] = [];

export function Dashboard() {
  const { mapPins, feedItems, isLoading: articlesLoading, refetch: refetchArticles } = useArticles();
  const { categories, totalSignals, isLoading: filtersLoading } = useFilters();
  const summary = useMapSummary(mapPins, NO_EARTHQUAKES, false);

  return (
    <DashboardShell>
      <section className="flex-1 relative rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 shadow-inner">
        <WorldMap pins={mapPins} />
        <MapLegend />
        <MapSummaryBar
          totalSignals={summary.totalSignals}
          sentimentCounts={summary.sentimentCounts}
          topCategories={summary.topCategories}
          earthquakeCount={summary.earthquakeCount}
          showEarthquakes={false}
        />
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
