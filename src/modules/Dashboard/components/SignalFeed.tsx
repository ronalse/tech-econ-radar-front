"use client";

import { RefreshCw } from "lucide-react";
import type { FeedItem } from "@/services/articles/ArticlesAdapter";
import { FeedItemCard } from "@/modules/Dashboard/components/FeedItemCard";

interface SignalFeedProps {
  items: FeedItem[];
  isLoading: boolean;
  onRefresh: () => void;
}

export function SignalFeed({ items, isLoading, onRefresh }: SignalFeedProps) {
  return (
    <div className="flex-1 min-h-0 flex flex-col bg-surface-container rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low">
        <h3 className="font-label-md text-on-surface-variant uppercase tracking-wider">
          Signal Feed
        </h3>
        <button
          type="button"
          onClick={onRefresh}
          className="text-on-surface-variant hover:text-primary transition-colors p-1"
        >
          <RefreshCw size={20} />
        </button>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-2 py-2">
        {isLoading && <p className="p-4 text-on-surface-variant font-label-sm">Loading...</p>}
        {!isLoading && items.length === 0 && (
          <p className="p-4 text-on-surface-variant font-label-sm">No hay noticias todavia.</p>
        )}
        {items.map((item) => (
          <FeedItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
