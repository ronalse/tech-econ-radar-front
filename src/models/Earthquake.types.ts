export interface UsgsEarthquakeFeature {
  id: string;
  properties: {
    mag: number | null;
    place: string | null;
    time: number;
    url: string;
  };
  geometry: {
    coordinates: [number, number, number]; // [lng, lat, depth]
  };
}

export interface UsgsEarthquakeResponse {
  features: UsgsEarthquakeFeature[];
}
