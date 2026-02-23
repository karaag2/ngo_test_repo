"use client";

import { useState } from "react";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
} from "@/src/components/ui/map";
import { locations, type EtablissementType } from "@/src/data/NigerPoints";

const TYPE_COLOR: Record<EtablissementType, string> = {
  "École primaire": "#F59E0B",
  Collège: "#60A5FA",
  "Lycée technique": "#A78BFA",
  "Centre de formation": "#34D399",
};

export default function MapNiger() {
  const [activeId, setActiveId] = useState<number | null>(null);

  const totalEleves = locations.reduce((sum, l) => sum + l.eleves, 0);

  return (
    <div className="flex flex-col md:flex-row h-[700px] md:h-[560px] w-full overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 shadow-sm transition-all">
      {/* ── Sidebar ── */}
      <div className="flex w-full md:w-72 lg:w-80 shrink-0 flex-col border-b md:border-b-0 md:border-r border-stone-200 dark:border-stone-800 order-2 md:order-1 h-[300px] md:h-auto md:max-w-1/3">
        {/* En-tête ONG */}
        <div className="border-b border-stone-200 dark:border-stone-800 px-4 py-3.5 space-y-1 bg-stone-50/50 dark:bg-stone-900/20">
          <h3 className="text-sm font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Lumière du Sahel
          </h3>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-stone-500">
            <span className="tabular-nums">{locations.length}</span>{" "}
            établissements
            <span className="opacity-30">|</span>
            <span className="tabular-nums">
              {totalEleves.toLocaleString()}
            </span>{" "}
            élèves
          </div>
        </div>

        {/* Liste avec scrollbar stylisée */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-stone-200 dark:scrollbar-thumb-stone-800">
          {locations.map((loc) => {
            const isActive = activeId === loc.id;
            const color = TYPE_COLOR[loc.type];
            return (
              <button
                key={loc.id}
                onClick={() => setActiveId(isActive ? null : loc.id)}
                className={`group flex w-full items-start gap-3 border-b border-stone-100 dark:border-stone-800/40 px-4 py-3.5 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500 ${
                  isActive
                    ? "bg-stone-100/80 dark:bg-stone-800/60"
                    : "hover:bg-stone-50 dark:hover:bg-stone-900/40"
                }`}
                aria-pressed={isActive}
              >
                <span
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full transition-transform duration-300 ${isActive ? "scale-125 shadow-sm" : "group-hover:scale-110"}`}
                  style={{ background: color }}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-xs font-semibold tracking-tight transition-colors ${
                      isActive
                        ? "text-stone-950 dark:text-stone-50"
                        : "text-stone-700 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100"
                    }`}
                  >
                    {loc.short}
                  </p>
                  <p className="truncate text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">
                    {loc.ville} · {loc.region}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Légende Compacte */}
        <div className="border-t border-stone-200 dark:border-stone-800 bg-stone-50/30 dark:bg-stone-900/10 px-4 py-3 gap-y-2 flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-4">
          {Object.entries(TYPE_COLOR).map(([label, color]) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: color }}
                aria-hidden="true"
              />
              <span className="text-[9px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 whitespace-nowrap">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Carte ── */}
      <div className="relative flex-1 order-1 md:order-2 h-full min-h-[400px]">
        <Map center={[8.0, 17.5]} zoom={4.5} className="touch-manipulation">
          {locations.map((loc) => {
            const color = TYPE_COLOR[loc.type];
            const isActive = activeId === loc.id;
            return (
              <MapMarker key={loc.id} longitude={loc.lng} latitude={loc.lat}>
                <MarkerContent>
                  <button
                    onClick={() => setActiveId(isActive ? null : loc.id)}
                    className="outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-full"
                    aria-label={`Voir les détails de ${loc.short}`}
                    style={{
                      width: isActive ? 22 : 14,
                      height: isActive ? 22 : 14,
                      borderRadius: "50%",
                      background: color,
                      border: "2px solid white",
                      boxShadow: isActive
                        ? `0 0 0 4px ${color}44, 0 4px 12px rgba(0,0,0,0.4)`
                        : "0 1px 4px rgba(0,0,0,0.25)",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                </MarkerContent>

                <MarkerTooltip className="text-[10px] font-medium">
                  {loc.short}
                </MarkerTooltip>

                <MarkerPopup>
                  <div className="w-[280px] sm:w-72 space-y-4 p-1">
                    {/* En-tête */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                          style={{ background: color + "15", color }}
                        >
                          {loc.type}
                        </span>
                        <span className="text-[10px] font-medium text-stone-500 dark:text-stone-400">
                          Fondé en{" "}
                          <span className="tabular-nums">{loc.ouverture}</span>
                        </span>
                      </div>
                      <h4 className="text-sm font-bold leading-snug text-stone-900 dark:text-stone-50 text-pretty">
                        {loc.name}
                      </h4>
                      <p className="text-[11px] font-medium text-stone-500">
                        {loc.ville}, région {loc.region}
                      </p>
                    </div>

                    {/* Description */}
                    <div className="border-t border-stone-100 dark:border-stone-800 pt-3">
                      <p className="text-[11px] leading-relaxed text-stone-600 dark:text-stone-400 text-pretty italic">
                        "{loc.description}"
                      </p>
                    </div>

                    {/* Dashboard Stats */}
                    <div className="grid grid-cols-2 gap-2.5 border-t border-stone-100 dark:border-stone-800 pt-3">
                      <div className="rounded-lg bg-stone-50 dark:bg-stone-900/50 px-3 py-2 border border-stone-100 dark:border-stone-800">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-1">
                          Élèves
                        </p>
                        <p className="text-base font-black text-stone-900 dark:text-stone-50 tabular-nums">
                          {loc.eleves.toLocaleString()}
                        </p>
                      </div>
                      <div className="rounded-lg bg-stone-50 dark:bg-stone-900/50 px-3 py-2 border border-stone-100 dark:border-stone-800">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-1">
                          Services
                        </p>
                        <p className="text-base font-black text-stone-900 dark:text-stone-50 tabular-nums">
                          {loc.services.length}
                        </p>
                      </div>
                    </div>

                    {/* Tags Services */}
                    <div className="space-y-2">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400">
                        Services inclus
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {loc.services.map((s) => (
                          <span
                            key={s}
                            className="rounded bg-stone-100 dark:bg-stone-800 px-2 py-0.5 text-[9px] font-medium text-stone-600 dark:text-stone-400 "
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Coords footer */}
                    <div className="flex items-center justify-between border-t border-stone-100 dark:border-stone-800 pt-3 font-mono text-[9px] text-stone-400">
                      <span>{loc.lat.toFixed(4)}°N</span>
                      <span className="opacity-30">/</span>
                      <span>{loc.lng.toFixed(4)}°E</span>
                    </div>
                  </div>
                </MarkerPopup>
              </MapMarker>
            );
          })}
        </Map>
      </div>
    </div>
  );
}
