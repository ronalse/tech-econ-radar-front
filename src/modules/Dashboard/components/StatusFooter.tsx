export function StatusFooter() {
  return (
    <footer className="h-8 bg-surface-container-low border-t border-outline-variant/20 flex items-center px-6 justify-between font-label-sm text-[11px] text-on-surface-variant z-50">
      <div className="flex gap-8">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-sm shadow-primary" />
          CONNECTED: LOCAL BACKEND
        </span>
      </div>
      <div className="flex gap-6 items-center">
        <span className="uppercase tracking-widest text-[10px] opacity-60">
          Tech/Econ Radar - Ronald Reyes
        </span>
      </div>
    </footer>
  );
}
