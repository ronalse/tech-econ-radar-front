"use client";

import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts/core";
import { MapChart, ScatterChart } from "echarts/charts";
import { GeoComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { MapPin } from "@/services/articles/ArticlesAdapter";
import {
  categoryDisplayName,
  relativeTime,
  sentimentColorToken,
  sentimentLabel,
} from "@/services/articles/ArticlesAdapter";
import { MapSkeleton } from "@/modules/Dashboard/components/MapSkeleton";

echarts.use([MapChart, ScatterChart, GeoComponent, TooltipComponent, CanvasRenderer]);

const SENTIMENT_HEX: Record<"primary" | "secondary" | "outline", string> = {
  primary: "#6ee591",
  secondary: "#ffb3b1",
  outline: "#879487",
};

let worldMapRegistered: Promise<void> | null = null;

function ensureWorldMapRegistered(): Promise<void> {
  if (!worldMapRegistered) {
    worldMapRegistered = fetch("/world.json")
      .then((res) => res.json())
      .then((geoJson) => {
        echarts.registerMap("world", geoJson);
      });
  }
  return worldMapRegistered;
}

interface PinMeta {
  category: string;
  sentiment: string;
  relevance: string;
  relativeTime: string;
  url: string;
}

function tooltipFormatter(params: { name?: string; data?: { meta?: PinMeta } }): string {
  const meta = params.data?.meta;
  if (!meta) return params.name ?? "";
  return `
    <div style="max-width:220px;white-space:normal;overflow-wrap:break-word;line-height:1.5">
      <strong>${params.name}</strong><br/>
      Category: ${meta.category}<br/>
      Sentiment: ${meta.sentiment}<br/>
      Relevance: ${meta.relevance}<br/>
      ${meta.relativeTime}
    </div>
  `;
}

interface WorldMapProps {
  pins: MapPin[];
}

export function WorldMap({ pins }: WorldMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    let disposed = false;
    chartRef.current = echarts.init(containerRef.current, undefined, { renderer: "canvas" });

    ensureWorldMapRegistered().then(() => {
      if (disposed || !chartRef.current) return;
      chartRef.current.setOption({
        backgroundColor: "transparent",
        tooltip: { trigger: "item", formatter: tooltipFormatter },
        geo: {
          map: "world",
          roam: true,
          itemStyle: { areaColor: "#171f33", borderColor: "#2d3449" },
          emphasis: { itemStyle: { areaColor: "#222a3d" } },
        },
      });
      setIsLoading(false);
    });

    chartRef.current.on("click", (params) => {
      const data = params.data as { meta?: PinMeta } | undefined;
      const url = data?.meta?.url;
      if (url) window.open(url, "_blank", "noopener,noreferrer");
    });

    const handleResize = () => chartRef.current?.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      disposed = true;
      window.removeEventListener("resize", handleResize);
      chartRef.current?.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    const data = pins.map((pin) => {
      const meta: PinMeta = {
        category: categoryDisplayName(pin.category ?? "other"),
        sentiment: sentimentLabel(pin.sentiment),
        relevance: pin.relevanceScore.toFixed(2),
        relativeTime: relativeTime(pin.publishedAt),
        url: pin.url,
      };
      return {
        name: pin.title,
        value: [pin.lng, pin.lat, pin.relevanceScore],
        symbolSize: 12 + pin.relevanceScore * 18,
        itemStyle: { color: SENTIMENT_HEX[sentimentColorToken(pin.sentiment)] },
        meta,
      };
    });

    chartRef.current.setOption(
      { series: [{ type: "scatter", coordinateSystem: "geo", data }] },
      { replaceMerge: ["series"] },
    );
  }, [pins]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      {isLoading && <MapSkeleton />}
    </div>
  );
}
