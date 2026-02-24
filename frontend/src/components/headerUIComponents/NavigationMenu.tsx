"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { Label } from "@/src/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { MenuIcon } from "lucide-react";

const NavigationMenu = () => {
  return (
    <>
      <div className="hidden lg:block">
        <ul className="flex gap-x-8 items-center h-full text-sm font-bold uppercase tracking-widest text-main/60">
          <li>
            <Link
              href="/#hero"
              className="hover:text-primary transition-colors"
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              href="/#cause"
              className="hover:text-primary transition-colors"
            >
              Réalité
            </Link>
          </li>
          <li>
            <Link
              href="/#mission"
              className="hover:text-primary transition-colors"
            >
              Mission
            </Link>
          </li>
          <li>
            <Link
              href="/#activites"
              className="hover:text-primary transition-colors"
            >
              Activités
            </Link>
          </li>
          {/* <li>
            <Link href="/blog" className="hover:text-primary transition-colors">
              Journal
            </Link>
          </li> */}
          <li>
            <Link
              href="/#donation"
              className="hover:text-primary transition-colors"
            >
              Dons
            </Link>
          </li>
          <li>
            <Link
              href="/#contact"
              className="hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="block lg:hidden ">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="link">
              <MenuIcon className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>Accédez aux sections du site</SheetDescription>
            </SheetHeader>
            <div className="border-b border-border px-6 py-5 space-y-1 bg-muted/30">
              <h3 className="text-sm font-black tracking-tight text-main">
                Makaranta
              </h3>
            </div>
            <nav className="grid flex-1 auto-rows-min gap-6 px-4">
              <ul className="flex flex-col gap-y-4 justify-center items-start px-6">
                {[
                  "Accueil",
                  "Réalité",
                  "Mission",
                  "Activités",
                  "Journal",
                  "Dons",
                  "Contact",
                ].map((label) => (
                  <li key={label}>
                    <Link
                      href={
                        label === "Journal"
                          ? "/blog"
                          : `/#${label.toLowerCase().replace("é", "e") === "dons" ? "donation" : label.toLowerCase().replace("é", "e")}`
                      }
                      className="text-xl font-black text-main hover:text-primary transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <SheetFooter>
              <Button
                type="submit"
                className="bg-foreground text-background rounded-full"
              >
                Faire un don
              </Button>
              <SheetClose asChild>
                <Button variant="outline">Fermer</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default NavigationMenu;
