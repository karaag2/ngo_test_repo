"use client";

import React from "react";
import { m } from "framer-motion";
import Image from "next/image";

export const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-background">
      <div className="relative flex flex-col items-center gap-y-8">
        {/* Logo Animation */}
        <m.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.1, 1],
            opacity: 1,
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-20 h-20 flex items-center justify-center bg-primary rounded-2xl shadow-2xl shadow-primary/20"
        >
          <Image
            src="/logo.svg"
            alt="Logo FJ"
            width={48}
            height={48}
            className="w-12 h-12 invert"
          />
        </m.div>

        {/* Text & Progress */}
        <div className="flex flex-col items-center gap-y-3 text-center">
          <m.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-primary font-black uppercase tracking-[0.4em] text-[10px]"
          >
            Fajr
          </m.span>
          <div className="w-48 h-[2px] bg-muted rounded-full overflow-hidden relative">
            <m.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-primary"
            />
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
