"use client";
import dynamic from "next/dynamic";

const MapNiger = dynamic(() => import("@/src/components/MapsectionUIcomponents/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-secondary/20 animate-pulse rounded-3xl">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">
          Chargement de la carte...
        </p>
      </div>
    </div>
  ),
});
export default function MapLoader() {
  return <MapNiger />;
}
