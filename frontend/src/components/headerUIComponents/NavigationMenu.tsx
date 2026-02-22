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
      <div className="hidden md:block">
        <ul className="flex gap-x-8 flex items-center h-full text-header">
          <li>
            <Link href={""}>Accueil</Link>
          </li>
          <li>
            <Link href={""}>Notre cause</Link>
          </li>
          <li>
            <Link href={""}>Projets</Link>
          </li>
          <li>
            <Link href={""}>Contact</Link>
          </li>
        </ul>
      </div>
      <div className="block md:hidden ">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="link">
              <MenuIcon className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sections</SheetTitle>
              <SheetDescription>Explorez les sections du site</SheetDescription>
            </SheetHeader>
            <nav className="grid flex-1 auto-rows-min gap-6 px-4 text-">
              <ul className="flex flex-col gap-y-4 justify-center items-start px-6">
                <li>
                  <Link href={""}>Accueil</Link>
                </li>
                <li>
                  <Link href={""}>Notre cause</Link>
                </li>
                <li>
                  <Link href={""}>Projets</Link>
                </li>
                <li>
                  <Link href={""}>Contact</Link>
                </li>
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
