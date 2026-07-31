"use client";

import type { ReactNode } from "react";
import { TopNavBar } from "@/modules/Dashboard/components/TopNavBar";
import { SideNavBar } from "@/modules/Dashboard/components/SideNavBar";
import { StatusFooter } from "@/modules/Dashboard/components/StatusFooter";

interface DashboardShellProps {
  children: ReactNode;
}

/**
 * Layout compartido entre todas las rutas del dashboard (/, /map,
 * /analytics, /feed). Cada pagina trae sus propios datos (hooks) y
 * solo le pasa su contenido especifico.
 */
export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopNavBar />

      <div className="flex flex-1 overflow-hidden">
        <SideNavBar />
        <main className="ml-0 md:ml-24 mr-2 md:mr-4 my-2 md:my-4 pb-20 md:pb-0 flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden">
          {children}
        </main>
      </div>

      <StatusFooter />
    </div>
  );
}
