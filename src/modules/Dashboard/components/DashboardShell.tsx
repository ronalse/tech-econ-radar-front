"use client";

import type { ReactNode } from "react";
import { TopNavBar } from "@/modules/Dashboard/components/TopNavBar";
import { SideNavBar } from "@/modules/Dashboard/components/SideNavBar";
import { StatusFooter } from "@/modules/Dashboard/components/StatusFooter";

interface DashboardShellProps {
  isRunning: boolean;
  nextUpdateIn: string | null;
  onUpdate: () => void;
  children: ReactNode;
}

/**
 * Layout compartido entre todas las rutas del dashboard (/, /map,
 * /analytics, /feed). Cada pagina trae sus propios datos (hooks) y
 * solo le pasa el estado de ingesta + su contenido especifico.
 */
export function DashboardShell({ isRunning, nextUpdateIn, onUpdate, children }: DashboardShellProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopNavBar isRunning={isRunning} nextUpdateIn={nextUpdateIn} onUpdate={onUpdate} />

      <div className="flex flex-1 overflow-hidden">
        <SideNavBar />
        <main className="ml-24 mr-4 my-4 flex-1 flex gap-4 overflow-hidden">{children}</main>
      </div>

      <StatusFooter />
    </div>
  );
}
