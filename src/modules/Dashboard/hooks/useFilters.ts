"use client";

import { useEffect, useMemo, useState } from "react";
import { ArticlesService } from "@/services/articles/ArticlesService";
import type { CategoryCount, SentimentCount } from "@/models/Article.types";

interface UseFiltersResult {
  categories: CategoryCount[];
  sentiments: SentimentCount[];
  totalSignals: number;
  isLoading: boolean;
}

export function useFilters(): UseFiltersResult {
  const [categories, setCategories] = useState<CategoryCount[]>([]);
  const [sentiments, setSentiments] = useState<SentimentCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    ArticlesService.getFilters()
      .then((response) => {
        if (!cancelled) {
          setCategories(response.categories);
          setSentiments(response.sentiments);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const totalSignals = useMemo(
    () => categories.reduce((sum, item) => sum + item.count, 0),
    [categories],
  );

  return { categories, sentiments, totalSignals, isLoading };
}
