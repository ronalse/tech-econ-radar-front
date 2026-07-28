"use client";

import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import "echarts-gl";
import type { MapPin } from "@/services/articles/ArticlesAdapter";
import {
  categoryDisplayName,
  relativeTime,
  sentimentColorToken,
  sentimentLabel,
} from "@/services/articles/ArticlesAdapter";
import type { EarthquakePoint } from "@/services/earthquakes/EarthquakesAdapter";
import { MapSkeleton } from "@/modules/Dashboard/components/MapSkeleton";

const SENTIMENT_HEX: Record<"primary" | "secondary" | "outline", string> = {
  primary: "#6ee591",
  secondary: "#ffb3b1",
  outline: "#879487",
};

const GLOBE_BASE_TEXTURE = "/textures/world.topo.bathy.200401.jpg";
const GLOBE_HEIGHT_TEXTURE = "/textures/bathymetry_bw_composite_4k.jpg";

interface NewsMeta {
  kind: "news";
  category: string;
  sentiment: string;
  relevance: string;
  relativeTime: string;
  url: string;
}

interface EarthquakeMeta {
  kind: "earthquake";
  place: string;
  magnitude: string;
  depth: string;
  time: string;
  url: string;
}

function tooltipFormatter(params: { name?: string; data?: { meta?: NewsMeta | EarthquakeMeta } }): string {
  const meta = params.data?.meta;
  if (!meta) return params.name ?? "";

  if (meta.kind === "news") {
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

  return `
    <div style="max-width:220px;white-space:normal;overflow-wrap:break-word;line-height:1.5">
      <strong>M${meta.magnitude} earthquake</strong><br/>
      ${meta.place}<br/>
      Depth: ${meta.depth} km<br/>
      ${meta.time}
    </div>
  `;
}

interface Globe3DProps {
  pins: MapPin[];
  earthquakes: EarthquakePoint[];
  showEarthquakes: boolean;
}

export function Globe3D({ pins, earthquakes, showEarthquakes }: Globe3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    let hasFinishedOnce = false;

    chartRef.current = echarts.init(containerRef.current, undefined, { renderer: "canvas" });
    chartRef.current.setOption({
      backgroundColor: "transparent",
      tooltip: { formatter: tooltipFormatter },
      globe: {
        baseTexture: GLOBE_BASE_TEXTURE,
        heightTexture: GLOBE_HEIGHT_TEXTURE,
        displacementScale: 0.02,
        shading: "lambert",
        light: {
          ambient: { intensity: 0.4 },
          main: { intensity: 1.2 },
        },
        viewControl: {
          autoRotate: true,
          autoRotateSpeed: 3,
          // Sensibilidad del arrastre con mouse - default es 1, esto lo
          // hace bastante mas agil sin volverse incontrolable.
          rotateSensitivity: 4,
          zoomSensitivity: 2,
          panSensitivity: 2,
        },
      },
    });

    chartRef.current.on("click", (params) => {
      const data = params.data as { meta?: NewsMeta | EarthquakeMeta } | undefined;
      const url = data?.meta?.url;
      if (url) window.open(url, "_blank", "noopener,noreferrer");
    });

    // "finished" se dispara cuando ECharts termina de dibujar el frame,
    // incluyendo la carga de las texturas del globo. Solo nos importa
    // la primera vez, para quitar el skeleton.
    chartRef.current.on("finished", () => {
      if (!hasFinishedOnce) {
        hasFinishedOnce = true;
        setIsLoading(false);
      }
    });

    const handleResize = () => chartRef.current?.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartRef.current?.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    const series: echarts.SeriesOption[] = [
      {
        type: "scatter3D",
        coordinateSystem: "globe",
        data: pins.map((pin) => {
          const meta: NewsMeta = {
            kind: "news",
            category: categoryDisplayName(pin.category ?? "other"),
            sentiment: sentimentLabel(pin.sentiment),
            relevance: pin.relevanceScore.toFixed(2),
            relativeTime: relativeTime(pin.publishedAt),
            url: pin.url,
          };
          return {
            name: pin.title,
            value: [pin.lng, pin.lat, 0],
            symbolSize: 10 + pin.relevanceScore * 16,
            itemStyle: { color: SENTIMENT_HEX[sentimentColorToken(pin.sentiment)] },
            meta,
          };
        }),
      } as echarts.SeriesOption,
    ];

    if (showEarthquakes) {
      series.push({
        type: "scatter3D",
        coordinateSystem: "globe",
        data: earthquakes.map((eq) => {
          const meta: EarthquakeMeta = {
            kind: "earthquake",
            place: eq.place,
            magnitude: eq.magnitude.toFixed(1),
            depth: eq.depthKm.toFixed(1),
            time: new Date(eq.time).toLocaleString(),
            url: eq.url,
          };
          return {
            name: `M${eq.magnitude.toFixed(1)} - ${eq.place}`,
            value: [eq.lng, eq.lat, 0],
            symbolSize: Math.max(6, eq.magnitude * 4),
            itemStyle: { color: "#ffb347" },
            meta,
          };
        }),
      } as echarts.SeriesOption);
    }

    chartRef.current.setOption({ series }, { replaceMerge: ["series"] });
  }, [pins, earthquakes, showEarthquakes]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      {isLoading && <MapSkeleton />}
    </div>
  );
}
