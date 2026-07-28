"use client";

import { useCallback, useEffect, useState } from "react";
import { ArticlesService } from "@/services/articles/ArticlesService";
import { ArticlesAdapter, type MapPin, type FeedItem } from "@/services/articles/ArticlesAdapter";

interface UseArticlesResult {
  mapPins: MapPin[];
  feedItems: FeedItem[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useArticles(limit = 50): UseArticlesResult {
  const [mapPins, setMapPins] = useState<MapPin[]>([]);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ArticlesService.getArticles(limit, 0);
      setMapPins(ArticlesAdapter.toMapPins(response.results));
      setFeedItems(ArticlesAdapter.toFeedItems(response.results));
    } catch {
      setError("No se pudieron cargar las noticias.");
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { mapPins, feedItems, isLoading, error, refetch: fetchArticles };
}
