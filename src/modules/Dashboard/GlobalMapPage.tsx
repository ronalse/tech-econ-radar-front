"use client";

import { useState } from "react";
import { useArticles } from "@/modules/Dashboard/hooks/useArticles";
import { useEarthquakes } from "@/modules/Dashboard/hooks/useEarthquakes";
import { useMapSummary } from "@/modules/Dashboard/hooks/useMapSummary";
import { DashboardShell } from "@/modules/Dashboard/components/DashboardShell";
import { Globe3D } from "@/modules/Dashboard/components/Globe3D";
import { MapLegend } from "@/modules/Dashboard/components/MapLegend";
import { MapSummaryBar } from "@/modules/Dashboard/components/MapSummaryBar";

export function GlobalMapPage() {
  const { mapPins } = useArticles();
  const { earthquakes, isLoading: earthquakesLoading } = useEarthquakes();
  const [showEarthquakes, setShowEarthquakes] = useState(true);
  const summary = useMapSummary(mapPins, earthquakes, showEarthquakes);

  let earthquakeButtonLabel = "Show Earthquakes (24h)";
  if (showEarthquakes && earthquakesLoading) earthquakeButtonLabel = "Loading earthquakes...";
  if (showEarthquakes && !earthquakesLoading) {
    earthquakeButtonLabel = `Hide Earthquakes (${earthquakes.length})`;
  }

  return (
    <DashboardShell>
      <section className="flex-1 relative rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 shadow-inner">
        <Globe3D pins={mapPins} earthquakes={earthquakes} showEarthquakes={showEarthquakes} />
        <MapLegend />
        <MapSummaryBar
          totalSignals={summary.totalSignals}
          sentimentCounts={summary.sentimentCounts}
          topCategories={summary.topCategories}
          earthquakeCount={summary.earthquakeCount}
          showEarthquakes={showEarthquakes}
        />
        <button
          type="button"
          onClick={() => setShowEarthquakes((prev) => !prev)}
          className={`absolute top-3 right-3 md:top-6 md:right-6 px-3 py-1.5 md:px-4 md:py-2 rounded-xl font-label-sm md:font-label-md border shadow-lg transition-all ${
            showEarthquakes
              ? "bg-tertiary/20 text-tertiary border-tertiary/40"
              : "bg-surface-container-high/90 text-on-surface-variant border-outline-variant/30 hover:text-on-surface"
          }`}
        >
          {earthquakeButtonLabel}
        </button>
      </section>
    </DashboardShell>
  );
}
