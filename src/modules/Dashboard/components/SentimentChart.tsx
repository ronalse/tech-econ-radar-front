"use client";

import type { SentimentCount } from "@/models/Article.types";
import { sentimentLabel } from "@/services/articles/ArticlesAdapter";

interface SentimentChartProps {
  sentiments: SentimentCount[];
  isLoading: boolean;
}

const COLOR_CLASS: Record<string, string> = {
  positive: "bg-primary",
  neutral: "bg-outline",
  negative: "bg-secondary",
};

export function SentimentChart({ sentiments, isLoading }: SentimentChartProps) {
  const total = sentiments.reduce((sum, item) => sum + item.count, 0) || 1;

  return (
    <div className="p-6 bg-surface-container rounded-xl border border-outline-variant/30 shadow-sm">
      <h3 className="font-label-md text-on-surface-variant uppercase tracking-wider mb-6">
        Sentiment Breakdown
      </h3>

      {isLoading && <p className="text-on-surface-variant font-label-sm">Loading...</p>}

      <div className="flex h-3 w-full rounded-full overflow-hidden mb-6">
        {sentiments.map((item) => (
          <div
            key={item.sentiment}
            className={COLOR_CLASS[item.sentiment]}
            style={{ width: `${(item.count / total) * 100}%` }}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {sentiments.map((item) => (
          <div key={item.sentiment} className="flex flex-col gap-1">
            <span className={`w-2.5 h-2.5 rounded-full ${COLOR_CLASS[item.sentiment]}`} />
            <span className="font-label-sm text-on-surface-variant">
              {sentimentLabel(item.sentiment)}
            </span>
            <span className="font-headline-md">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
