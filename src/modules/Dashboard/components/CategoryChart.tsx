"use client";

import type { CategoryCount } from "@/models/Article.types";
import { categoryDisplayName } from "@/services/articles/ArticlesAdapter";

interface CategoryChartProps {
  categories: CategoryCount[];
  totalSignals: number;
  isLoading: boolean;
}

const TOP_N = 4;

export function CategoryChart({ categories, totalSignals, isLoading }: CategoryChartProps) {
  const topCategories = categories.slice(0, TOP_N);
  const maxCount = topCategories[0]?.count ?? 1;

  return (
    <div className="p-6 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col h-full shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-label-md text-on-surface-variant uppercase tracking-wider">
          Volume by Category
        </h3>
        <span className="font-label-sm text-on-surface-variant bg-surface-variant/50 px-2 py-1 rounded-lg">
          {totalSignals} Signals
        </span>
      </div>

      {isLoading && <p className="text-on-surface-variant font-label-sm">Loading...</p>}

      <div className="flex-1 flex flex-col justify-between">
        {topCategories.map((item, index) => {
          const widthPercent = Math.round((item.count / maxCount) * 100);
          const barColor = index === 0 ? "bg-primary" : "bg-tertiary";
          const textColor = index === 0 ? "text-primary font-bold" : "text-on-surface-variant";

          return (
            <div key={item.category} className="space-y-1.5">
              <div className="flex justify-between font-label-sm">
                <span className="text-on-surface">{categoryDisplayName(item.category)}</span>
                <span className={textColor}>{item.count}</span>
              </div>
              <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                <div
                  className={`h-full ${barColor} rounded-full transition-all duration-1000`}
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
