import type { UsgsEarthquakeResponse } from "@/models/Earthquake.types";

export interface EarthquakePoint {
  id: string;
  lat: number;
  lng: number;
  magnitude: number;
  place: string;
  depthKm: number;
  time: number;
  url: string;
}

export const EarthquakesAdapter = {
  toPoints(response: UsgsEarthquakeResponse): EarthquakePoint[] {
    return response.features
      .filter((feature) => feature.properties.mag !== null)
      .map((feature) => ({
        id: feature.id,
        lng: feature.geometry.coordinates[0],
        lat: feature.geometry.coordinates[1],
        depthKm: feature.geometry.coordinates[2],
        magnitude: feature.properties.mag as number,
        place: feature.properties.place ?? "Ubicacion desconocida",
        time: feature.properties.time,
        url: feature.properties.url,
      }));
  },
};
