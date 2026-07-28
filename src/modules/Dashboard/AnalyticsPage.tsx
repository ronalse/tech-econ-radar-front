"use client";

import { useFilters } from "@/modules/Dashboard/hooks/useFilters";
import { useIngestion } from "@/modules/Dashboard/hooks/useIngestion";
import { DashboardShell } from "@/modules/Dashboard/components/DashboardShell";
import { CategoryChart } from "@/modules/Dashboard/components/CategoryChart";
import { SentimentChart } from "@/modules/Dashboard/components/SentimentChart";

export function AnalyticsPage() {
  const { categories, sentiments, totalSignals, isLoading } = useFilters();
  const { isRunning, nextUpdateIn, triggerUpdate } = useIngestion();

  return (
    <DashboardShell isRunning={isRunning} nextUpdateIn={nextUpdateIn} onUpdate={triggerUpdate}>
      <section className="flex-1 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
        <div className="h-80 shrink-0">
          <CategoryChart categories={categories} totalSignals={totalSignals} isLoading={isLoading} />
        </div>
        <SentimentChart sentiments={sentiments} isLoading={isLoading} />
      </section>
    </DashboardShell>
  );
}
