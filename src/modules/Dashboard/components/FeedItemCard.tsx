import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { FeedItem } from "@/services/articles/ArticlesAdapter";

const SENTIMENT_ICON = {
  positive: TrendingUp,
  neutral: Minus,
  negative: TrendingDown,
} as const;

const SENTIMENT_TEXT_CLASS = {
  positive: "text-primary",
  neutral: "text-on-surface-variant",
  negative: "text-secondary",
} as const;

interface FeedItemCardProps {
  item: FeedItem;
}

export function FeedItemCard({ item }: FeedItemCardProps) {
  const SentimentIcon = item.sentiment ? SENTIMENT_ICON[item.sentiment] : Minus;
  const sentimentTextClass = item.sentiment
    ? SENTIMENT_TEXT_CLASS[item.sentiment]
    : "text-on-surface-variant";

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block m-1 p-4 rounded-xl hover:bg-surface-variant/50 transition-all group cursor-pointer border border-transparent hover:border-outline-variant/20"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2">
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-lg text-[10px] font-label-md">
            {item.categoryLabel}
          </span>
          <span className={`text-[10px] font-label-md flex items-center gap-1 ${sentimentTextClass}`}>
            <SentimentIcon size={14} />
            {item.sentimentLabel}
          </span>
        </div>
        <span className="text-[11px] text-on-surface-variant">{item.relativeTime}</span>
      </div>
      <h4 className="font-body-md text-[15px] font-semibold leading-snug group-hover:text-primary transition-colors mb-2">
        {item.title}
      </h4>
      <p className="text-on-surface-variant text-[12px] leading-relaxed">
        Source: {item.sourceName}
      </p>
    </a>
  );
}
