"use client";

import { useState } from "react";
import { useArticles } from "@/modules/Dashboard/hooks/useArticles";
import { useEarthquakes } from "@/modules/Dashboard/hooks/useEarthquakes";
import { useIngestion } from "@/modules/Dashboard/hooks/useIngestion";
import { DashboardShell } from "@/modules/Dashboard/components/DashboardShell";
import { Globe3D } from "@/modules/Dashboard/components/Globe3D";
import { MapLegend } from "@/modules/Dashboard/components/MapLegend";

export function GlobalMapPage() {
  const { mapPins, refetch } = useArticles();
  const { earthquakes, isLoading: earthquakesLoading } = useEarthquakes();
  const { isRunning, nextUpdateIn, triggerUpdate } = useIngestion(refetch);
  const [showEarthquakes, setShowEarthquakes] = useState(true);

  let earthquakeButtonLabel = "Show Earthquakes (24h)";
  if (showEarthquakes && earthquakesLoading) earthquakeButtonLabel = "Loading earthquakes...";
  if (showEarthquakes && !earthquakesLoading) {
    earthquakeButtonLabel = `Hide Earthquakes (${earthquakes.length})`;
  }

  return (
    <DashboardShell isRunning={isRunning} nextUpdateIn={nextUpdateIn} onUpdate={triggerUpdate}>
      <section className="flex-1 relative rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 shadow-inner">
        <Globe3D pins={mapPins} earthquakes={earthquakes} showEarthquakes={showEarthquakes} />
        <MapLegend />
        <button
          type="button"
          onClick={() => setShowEarthquakes((prev) => !prev)}
          className={`absolute top-6 right-6 px-4 py-2 rounded-xl font-label-md border shadow-lg transition-all ${
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
