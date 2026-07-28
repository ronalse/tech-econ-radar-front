"use client";

import { useCallback, useState } from "react";
import { ArticlesService } from "@/services/articles/ArticlesService";

interface UseIngestionResult {
  isRunning: boolean;
  statusMessage: string | null;
  nextUpdateIn: string | null;
  triggerUpdate: () => Promise<void>;
}

/**
 * Maneja el boton "Update Radar": llama al POST /ingestion/run
 * (que ya tiene su propio cooldown de 1h en el backend), y si la
 * actualizacion se aplico de verdad, dispara onUpdated para que el
 * Dashboard vuelva a pedir articulos/filtros frescos.
 */
export function useIngestion(onUpdated?: () => void): UseIngestionResult {
  const [isRunning, setIsRunning] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [nextUpdateIn, setNextUpdateIn] = useState<string | null>(null);

  const triggerUpdate = useCallback(async () => {
    setIsRunning(true);
    try {
      const response = await ArticlesService.triggerIngestion();
      setStatusMessage(response.message);
      setNextUpdateIn(response.next_update_in);
      if (response.status === "updated") {
        onUpdated?.();
      }
    } catch {
      setStatusMessage("Error al actualizar.");
    } finally {
      setIsRunning(false);
    }
  }, [onUpdated]);

  return { isRunning, statusMessage, nextUpdateIn, triggerUpdate };
}
