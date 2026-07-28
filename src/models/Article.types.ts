export type ArticleCategory =
  | "ai"
  | "funding"
  | "cybersecurity"
  | "hardware"
  | "macro_economy"
  | "markets"
  | "other";

export type ArticleSentiment = "positive" | "neutral" | "negative";

export interface Article {
  id: string;
  external_id: string;
  title: string;
  description: string | null;
  url: string;
  author: string | null;
  image_url: string | null;
  language: string;
  published_at: string;
  category: ArticleCategory | null;
  country_code: string | null;
  lat: number | null;
  lng: number | null;
  sentiment: ArticleSentiment | null;
  relevance_score: number | null;
  is_processed: boolean;
  is_noise: boolean;
}

export interface ArticlesResponse {
  total: number;
  limit: number;
  offset: number;
  results: Article[];
}

export interface CategoryCount {
  category: ArticleCategory;
  count: number;
}

export interface CountryCount {
  country_code: string;
  count: number;
}

export interface SentimentCount {
  sentiment: ArticleSentiment;
  count: number;
}

export interface FiltersResponse {
  categories: CategoryCount[];
  country_codes: CountryCount[];
  sentiments: SentimentCount[];
}
