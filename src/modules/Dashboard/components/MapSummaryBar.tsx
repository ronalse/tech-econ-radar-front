import type { ArticleSentiment } from "@/models/Article.types";
import { categoryDisplayName, sentimentLabel } from "@/services/articles/ArticlesAdapter";
import type { CategoryTally, SentimentTally } from "@/modules/Dashboard/hooks/useMapSummary";

interface MapSummaryBarProps {
  totalSignals: number;
  sentimentCounts: SentimentTally[];
  topCategories: CategoryTally[];
  earthquakeCount: number;
  showEarthquakes: boolean;
}

const SENTIMENT_DOT_CLASS: Record<ArticleSentiment, string> = {
  positive: "bg-primary",
  neutral: "bg-outline",
  negative: "bg-secondary",
};

export function MapSummaryBar({
  totalSignals,
  sentimentCounts,
  topCategories,
  earthquakeCount,
  showEarthquakes,
}: MapSummaryBarProps) {
  return (
    <div
      id="map-summary-bar"
      className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 bg-surface-container-high/90 backdrop-blur-md border border-outline-variant/20 rounded-xl px-3 py-2 md:px-6 md:py-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:gap-x-6 shadow-xl pointer-events-none max-w-[95%]"
    >
      <div className="flex flex-col items-center shrink-0">
        <span className="font-headline-sm text-on-surface">{totalSignals}</span>
        <span className="font-label-sm text-on-surface-variant whitespace-nowrap">Signals Shown</span>
      </div>

      <div className="hidden sm:block w-px h-8 bg-outline-variant/30 shrink-0" />

      {sentimentCounts.map((item) => (
        <div key={item.sentiment} className="flex items-center gap-2 shrink-0">
          <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${SENTIMENT_DOT_CLASS[item.sentiment]}`} />
          <span className="font-label-sm text-on-surface-variant whitespace-nowrap">
            {sentimentLabel(item.sentiment)} {item.count}
          </span>
        </div>
      ))}

      {topCategories.length > 0 && (
        <>
          <div className="hidden sm:block w-px h-8 bg-outline-variant/30 shrink-0" />
          {topCategories.map((item) => (
            <span
              key={item.category}
              className="hidden sm:inline-block font-label-sm text-on-surface-variant whitespace-nowrap shrink-0"
            >
              {categoryDisplayName(item.category)} <span className="text-on-surface">{item.count}</span>
            </span>
          ))}
        </>
      )}

      {showEarthquakes && (
        <>
          <div className="hidden sm:block w-px h-8 bg-outline-variant/30 shrink-0" />
          <div className="flex flex-col items-center shrink-0">
            <span className="font-headline-sm text-on-surface">{earthquakeCount}</span>
            <span className="font-label-sm text-on-surface-variant whitespace-nowrap">Earthquakes (24h)</span>
          </div>
        </>
      )}
    </div>
  );
}
