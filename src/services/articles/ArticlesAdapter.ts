import type { Article, ArticleCategory, ArticleSentiment } from "@/models/Article.types";

export interface MapPin {
  id: string;
  lat: number;
  lng: number;
  title: string;
  url: string;
  category: ArticleCategory | null;
  sentiment: ArticleSentiment | null;
  relevanceScore: number;
  publishedAt: string;
}

export interface FeedItem {
  id: string;
  title: string;
  categoryLabel: string;
  sentiment: ArticleSentiment | null;
  sentimentLabel: string;
  relativeTime: string;
  sourceName: string;
  url: string;
}

const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  ai: "AI",
  funding: "FUNDING",
  cybersecurity: "CYBERSECURITY",
  hardware: "HARDWARE",
  macro_economy: "MACRO",
  markets: "MARKETS",
  other: "OTHER",
};

const CATEGORY_DISPLAY_NAMES: Record<ArticleCategory, string> = {
  ai: "AI & ML",
  funding: "Venture Funding",
  cybersecurity: "Cybersecurity",
  hardware: "Hardware",
  macro_economy: "Macro Economy",
  markets: "Markets",
  other: "Other",
};

const SENTIMENT_LABELS: Record<ArticleSentiment, string> = {
  positive: "BULLISH",
  neutral: "NEUTRAL",
  negative: "BEARISH",
};

export function categoryLabel(category: ArticleCategory | null): string {
  if (!category) return "UNKNOWN";
  return CATEGORY_LABELS[category];
}

export function categoryDisplayName(category: ArticleCategory): string {
  return CATEGORY_DISPLAY_NAMES[category];
}

export function sentimentLabel(sentiment: ArticleSentiment | null): string {
  if (!sentiment) return "UNKNOWN";
  return SENTIMENT_LABELS[sentiment];
}

/**
 * Mapea sentimiento -> color del design system (primary=emerald, secondary=coral).
 * Centralizado aqui para que ningun componente decida colores por su cuenta.
 */
export function sentimentColorToken(sentiment: ArticleSentiment | null): "primary" | "secondary" | "outline" {
  if (sentiment === "positive") return "primary";
  if (sentiment === "negative") return "secondary";
  return "outline";
}

const CATEGORY_COLOR_TOKENS: Record<ArticleCategory, "primary" | "secondary" | "tertiary"> = {
  ai: "primary",
  markets: "primary",
  cybersecurity: "secondary",
  macro_economy: "secondary",
  funding: "tertiary",
  hardware: "tertiary",
  other: "tertiary",
};

export function categoryColorToken(category: ArticleCategory | null): "primary" | "secondary" | "tertiary" {
  if (!category) return "tertiary";
  return CATEGORY_COLOR_TOKENS[category];
}

export function relativeTime(publishedAt: string): string {
  const published = new Date(publishedAt).getTime();
  const now = Date.now();
  const diffMs = now - published;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) {
    const diffMinutes = Math.max(1, Math.floor(diffMs / (1000 * 60)));
    return `${diffMinutes}m ago`;
  }
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

function extractSourceName(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    return hostname;
  } catch {
    return "Unknown source";
  }
}

/**
 * ArticlesAdapter: transforma Article (shape de la API) en los shapes
 * que consumen los componentes de UI. Ningun componente debe leer
 * campos crudos de Article directamente para pintar - siempre pasa
 * por aqui.
 */
function pseudoRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return (hash % 10000) / 10000; // 0..1 deterministico segun el seed
}

/**
 * Como lat/lng vienen de un centroide fijo por pais (no la ubicacion
 * exacta del evento), todas las noticias del mismo pais caen en el
 * mismo punto exacto y se ven como un solo pin. Este jitter las
 * dispersa un poco (siempre igual para el mismo id, no "baila" en
 * cada render) para que se puedan distinguir visualmente.
 */
function jitterCoordinate(base: number, seed: string, spreadDegrees: number): number {
  const r = pseudoRandom(seed) - 0.5; // -0.5..0.5
  return base + r * spreadDegrees * 2;
}

export const ArticlesAdapter = {
  toMapPins(articles: Article[]): MapPin[] {
    return articles
      .filter((article) => article.lat !== null && article.lng !== null)
      .map((article) => ({
        id: article.id,
        lat: jitterCoordinate(article.lat as number, `${article.id}-lat`, 2.5),
        lng: jitterCoordinate(article.lng as number, `${article.id}-lng`, 2.5),
        title: article.title,
        url: article.url,
        category: article.category,
        sentiment: article.sentiment,
        relevanceScore: article.relevance_score ?? 0,
        publishedAt: article.published_at,
      }));
  },

  toFeedItems(articles: Article[]): FeedItem[] {
    return articles.map((article) => ({
      id: article.id,
      title: article.title,
      categoryLabel: categoryLabel(article.category),
      sentiment: article.sentiment,
      sentimentLabel: sentimentLabel(article.sentiment),
      relativeTime: relativeTime(article.published_at),
      sourceName: extractSourceName(article.url),
      url: article.url,
    }));
  },
};
