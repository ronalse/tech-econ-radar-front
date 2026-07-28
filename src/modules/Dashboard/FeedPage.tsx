"use client";

import { useArticles } from "@/modules/Dashboard/hooks/useArticles";
import { useIngestion } from "@/modules/Dashboard/hooks/useIngestion";
import { DashboardShell } from "@/modules/Dashboard/components/DashboardShell";
import { SignalFeed } from "@/modules/Dashboard/components/SignalFeed";

export function FeedPage() {
  const { feedItems, isLoading, refetch } = useArticles(100);
  const { isRunning, nextUpdateIn, triggerUpdate } = useIngestion(refetch);

  return (
    <DashboardShell isRunning={isRunning} nextUpdateIn={nextUpdateIn} onUpdate={triggerUpdate}>
      <section className="flex-1 max-w-3xl mx-auto w-full h-full flex flex-col min-h-0">
        <SignalFeed items={feedItems} isLoading={isLoading} onRefresh={refetch} />
      </section>
    </DashboardShell>
  );
}
