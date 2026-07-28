"use client";

import { useEffect, useState } from "react";
import { EarthquakesService } from "@/services/earthquakes/EarthquakesService";
import { EarthquakesAdapter, type EarthquakePoint } from "@/services/earthquakes/EarthquakesAdapter";

interface UseEarthquakesResult {
  earthquakes: EarthquakePoint[];
  isLoading: boolean;
}

export function useEarthquakes(): UseEarthquakesResult {
  const [earthquakes, setEarthquakes] = useState<EarthquakePoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    EarthquakesService.getRecentEarthquakes()
      .then((response) => {
        if (!cancelled) setEarthquakes(EarthquakesAdapter.toPoints(response));
      })
      .catch(() => {
        if (!cancelled) setEarthquakes([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { earthquakes, isLoading };
}
