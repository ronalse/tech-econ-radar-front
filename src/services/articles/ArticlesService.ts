import { apiGet } from "@/services/core/api";
import type { ArticlesResponse, FiltersResponse } from "@/models/Article.types";

/**
 * ArticlesService: SOLO llamadas HTTP, sin transformar datos.
 * La transformacion (adaptar al shape que necesita la UI) vive en
 * ArticlesAdapter.ts.
 */
export const ArticlesService = {
  getArticles(limit = 100, offset = 100): Promise<ArticlesResponse> {
    return apiGet<ArticlesResponse>("/articles", { limit, offset });
  },

  getFilters(): Promise<FiltersResponse> {
    return apiGet<FiltersResponse>("/filters/get_all");
  },
};
