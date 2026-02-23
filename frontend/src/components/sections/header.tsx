"use client";

import React from "react";
import NavigationMenu from "@/src/components/headerUIComponents/NavigationMenu";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ThemeToggle } from "@/src/components/theme-toggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-x-4 group cursor-pointer">
        <div className="relative w-10 h-10 flex items-center justify-center bg-primary rounded-xl rotate-3 group-hover:rotate-0 transition-transform duration-300">
          <Image
            src="/logo.svg"
            alt="Logo MKRT"
            width={32}
            height={32}
            className="w-6 h-6 invert"
          />
        </div>
        <span className="text-2xl font-black tracking-tighter text-main">
          MKRT
        </span>
      </div>

      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        <NavigationMenu />
        <Button className="hidden md:flex btn-premium bg-primary text-white shadow-primary/20 hover:shadow-primary/40 px-8 py-2 h-auto text-sm">
          Participer
        </Button>
      </div>
    </header>
  );
};

export default Header;
