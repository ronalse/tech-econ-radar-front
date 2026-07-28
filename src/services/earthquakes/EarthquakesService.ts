import type { UsgsEarthquakeResponse } from "@/models/Earthquake.types";

// Feed publico del USGS, sin API key. "all_day" = todos los sismos
// (cualquier magnitud) de las ultimas 24h.
const USGS_FEED_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

export const EarthquakesService = {
  async getRecentEarthquakes(): Promise<UsgsEarthquakeResponse> {
    const response = await fetch(USGS_FEED_URL);
    if (!response.ok) {
      throw new Error(`USGS feed fallo con status ${response.status}`);
    }
    return response.json() as Promise<UsgsEarthquakeResponse>;
  },
};
