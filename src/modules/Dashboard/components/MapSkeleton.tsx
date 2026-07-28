import { Loader2 } from "lucide-react";

export function MapSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-surface-container-lowest z-10">
      <div className="flex flex-col items-center gap-3 text-on-surface-variant animate-pulse">
        <Loader2 size={32} className="animate-spin text-primary" />
        <span className="font-label-sm">Loading map...</span>
      </div>
    </div>
  );
}
