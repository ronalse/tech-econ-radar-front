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
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-surface-container-high/90 backdrop-blur-md border border-outline-variant/20 rounded-xl px-6 py-3 flex items-center gap-6 shadow-xl pointer-events-none max-w-[90%] overflow-x-auto">
      <div className="flex flex-col items-center shrink-0">
        <span className="font-headline-sm text-on-surface">{totalSignals}</span>
        <span className="font-label-sm text-on-surface-variant whitespace-nowrap">Signals Shown</span>
      </div>

      <div className="w-px h-8 bg-outline-variant/30 shrink-0" />

      <div className="flex items-center gap-4 shrink-0">
        {sentimentCounts.map((item) => (
          <div key={item.sentiment} className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${SENTIMENT_DOT_CLASS[item.sentiment]}`} />
            <span className="font-label-sm text-on-surface-variant whitespace-nowrap">
              {sentimentLabel(item.sentiment)} {item.count}
            </span>
          </div>
        ))}
      </div>

      {topCategories.length > 0 && (
        <>
          <div className="w-px h-8 bg-outline-variant/30 shrink-0" />
          <div className="flex items-center gap-3 shrink-0">
            {topCategories.map((item) => (
              <span key={item.category} className="font-label-sm text-on-surface-variant whitespace-nowrap">
                {categoryDisplayName(item.category)} <span className="text-on-surface">{item.count}</span>
              </span>
            ))}
          </div>
        </>
      )}

      {showEarthquakes && (
        <>
          <div className="w-px h-8 bg-outline-variant/30 shrink-0" />
          <div className="flex flex-col items-center shrink-0">
            <span className="font-headline-sm text-on-surface">{earthquakeCount}</span>
            <span className="font-label-sm text-on-surface-variant whitespace-nowrap">Earthquakes (24h)</span>
          </div>
        </>
      )}
    </div>
  );
}
