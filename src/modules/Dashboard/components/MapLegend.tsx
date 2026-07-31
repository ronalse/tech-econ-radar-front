export function MapLegend() {
  return (
    <div id="map-legend" className="hidden sm:flex absolute top-3 left-3 md:top-6 md:left-6 bg-surface-container-high/90 backdrop-blur-md border border-outline-variant/20 rounded-xl p-3 md:p-4 flex-col gap-2 md:gap-3 shadow-xl pointer-events-none">
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
        <span className="font-label-sm">Positive Sentiment</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-outline" />
        <span className="font-label-sm">Neutral / Market Baseline</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
        <span className="font-label-sm">Negative Impact</span>
      </div>
    </div>
  );
}
