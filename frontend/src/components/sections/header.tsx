import React from "react";
import NavigationMenu from "@/src/components/headerUIComponents/NavigationMenu";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white/70 sticky top-0 flex items-center justify-between border px-6 py-3 backdrop-blur-xs z-10">
      <div className="flex gap-x-4">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={128}
          height={128}
          className="h-8 w-auto text-primary"
        />
        <span className="text-2xl font-bold">MKRT</span>
      </div>
      
      <div className="flex gap-x-2 md:flex-row-reverse md:gap-x-6">
        <div className=" ml-auto">
          <Button variant="outline" className="bg-foreground text-background rounded-full">
              Participer
          </Button>
        </div>
        <NavigationMenu />
      </div>
    </header>
  );
};

export default Header;
