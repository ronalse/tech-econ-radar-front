"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LineChart, Globe, Rss } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/analytics", icon: LineChart, label: "Analytics" },
  { href: "/map", icon: Globe, label: "Global Map" },
  { href: "/feed", icon: Rss, label: "Signal Feed" },
];

export function SideNavBar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-4 top-20 bottom-4 w-16 group hover:w-64 transition-all duration-300 z-40 bg-surface-container-high rounded-xl border border-outline-variant/20 shadow-xl flex flex-col overflow-hidden">
      <nav className="flex flex-col gap-2 p-2 pt-4">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`w-full rounded-xl p-3 flex items-center gap-4 transition-all ${
                isActive
                  ? "bg-primary text-on-primary shadow-lg shadow-primary/10"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-variant"
              }`}
            >
              <Icon size={20} className="shrink-0" />
              <span className="font-label-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border-t border-outline-variant/10">
        <p className="font-label-sm text-primary mb-1">Radar v1.0.0</p>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <p className="font-label-sm text-on-surface-variant">System Nominal</p>
        </div>
      </div>
    </aside>
  );
}
