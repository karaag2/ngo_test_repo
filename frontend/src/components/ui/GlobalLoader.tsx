import React from "react";
import Image from "next/image";

export const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-background">
      <div className="relative flex flex-col items-center gap-y-8">
        {/* Logo Animation — CSS only */}
        <div className="relative w-20 h-20 flex items-center justify-center bg-primary rounded-2xl shadow-2xl shadow-primary/20 animate-[loader-logo_2s_ease-in-out_infinite]">
          <Image
            src="/logo.svg"
            alt="Logo FJ"
            width={48}
            height={48}
            className="w-12 h-12 invert"
          />
        </div>

        {/* Text & Progress */}
        <div className="flex flex-col items-center gap-y-3 text-center">
          <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] animate-[loader-text_1.5s_ease-in-out_infinite]">
            Fajr
          </span>
          <div className="w-48 h-[2px] bg-muted rounded-full overflow-hidden relative">
            <div className="absolute inset-0 bg-primary animate-[loader-bar_1.5s_ease-in-out_infinite]" />
          </div>
          <p className="text-main font-bold text-xs tracking-tighter opacity-60">
            L'éducation transforme l'avenir...
          </p>
        </div>

        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 animate-pulse" />
      </div>
    </div>
  );
};
