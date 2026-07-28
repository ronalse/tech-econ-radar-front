"use client";

import { Bell, Settings, ChevronDown, Filter, Globe as GlobeIcon } from "lucide-react";

interface TopNavBarProps {
  isRunning: boolean;
  nextUpdateIn: string | null;
  onUpdate: () => void;
}

export function TopNavBar({ isRunning, nextUpdateIn, onUpdate }: TopNavBarProps) {
  return (
    <header className="flex justify-between items-center w-full px-6 h-16 z-50 bg-surface-container border-b border-outline-variant/30">
      <div className="flex items-center gap-8">
        <span className="font-headline-md text-primary tracking-tight">Tech/Econ Radar</span>
        {/* <div className="flex gap-3" id="filters">
          <button
            type="button"
            className="bg-surface-variant/50 hover:bg-surface-variant px-4 py-1.5 flex items-center gap-2 rounded-xl transition-all border border-transparent hover:border-outline-variant/50"
          >
            <span className="font-label-md text-on-surface-variant">Category: All</span>
            <ChevronDown size={18} />
          </button>
          <button
            type="button"
            className="bg-surface-variant/50 hover:bg-surface-variant px-4 py-1.5 flex items-center gap-2 rounded-xl transition-all border border-transparent hover:border-outline-variant/50"
          >
            <span className="font-label-md text-on-surface-variant">Sentiment</span>
            <Filter size={18} />
          </button>
          <button
            type="button"
            className="bg-surface-variant/50 hover:bg-surface-variant px-4 py-1.5 flex items-center gap-2 rounded-xl transition-all border border-transparent hover:border-outline-variant/50"
          >
            <span className="font-label-md text-on-surface-variant">Region</span>
            <GlobeIcon size={18} />
          </button>
        </div> */}
      </div>
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end">
          <button
            type="button"
            onClick={onUpdate}
            disabled={isRunning}
            className="bg-primary/10 text-primary border border-primary/20 px-5 py-1.5 font-label-md rounded-xl hover:bg-primary/20 transition-all disabled:opacity-50"
          >
            {isRunning ? "Updating..." : "Update Radar"}
          </button>
          {nextUpdateIn && (
            <span className="text-[11px] font-label-sm text-on-surface-variant mt-1">
              Next update in {nextUpdateIn}
            </span>
          )}
        </div>
        {/* <div className="flex gap-3 text-on-surface-variant">
          <Bell size={20} className="p-0.5 rounded-full hover:bg-surface-variant cursor-pointer transition-colors" />
          <Settings size={20} className="p-0.5 rounded-full hover:bg-surface-variant cursor-pointer transition-colors" />
        </div> */}
      </div>
    </header>
  );
}
