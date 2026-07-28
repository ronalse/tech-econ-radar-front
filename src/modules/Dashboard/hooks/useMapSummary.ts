"use client";

import { useMemo } from "react";
import type { ArticleCategory, ArticleSentiment } from "@/models/Article.types";
import type { MapPin } from "@/services/articles/ArticlesAdapter";
import type { EarthquakePoint } from "@/services/earthquakes/EarthquakesAdapter";

export interface CategoryTally {
  category: ArticleCategory;
  count: number;
}

export interface SentimentTally {
  sentiment: ArticleSentiment;
  count: number;
}

interface UseMapSummaryResult {
  totalSignals: number;
  sentimentCounts: SentimentTally[];
  topCategories: CategoryTally[];
  earthquakeCount: number;
}

const TOP_N_CATEGORIES = 3;
const SENTIMENT_ORDER: ArticleSentiment[] = ["positive", "neutral", "negative"];

/**
 * Agrega los pines de noticias y sismos que estan efectivamente
 * dibujados en el globo, para mostrar un resumen fiel a lo que
 * el usuario ve (no a los totales globales de la BD).
 */
export function useMapSummary(
  pins: MapPin[],
  earthquakes: EarthquakePoint[],
  showEarthquakes: boolean,
): UseMapSummaryResult {
  return useMemo(() => {
    const sentimentTally: Record<ArticleSentiment, number> = { positive: 0, neutral: 0, negative: 0 };
    const categoryTally = new Map<ArticleCategory, number>();

    for (const pin of pins) {
      if (pin.sentiment) sentimentTally[pin.sentiment] += 1;
      if (pin.category) categoryTally.set(pin.category, (categoryTally.get(pin.category) ?? 0) + 1);
    }

    const topCategories = Array.from(categoryTally.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, TOP_N_CATEGORIES);

    const sentimentCounts = SENTIMENT_ORDER.map((sentiment) => ({
      sentiment,
      count: sentimentTally[sentiment],
    }));

    return {
      totalSignals: pins.length,
      sentimentCounts,
      topCategories,
      earthquakeCount: showEarthquakes ? earthquakes.length : 0,
    };
  }, [pins, earthquakes, showEarthquakes]);
}
