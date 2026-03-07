import { Button } from "@/src/components/ui/button";
import Link from "next/link";
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
import { Sections } from "@/src/data/navigation";

const NavigationMenu = () => {
  return (
    <>
      {/* Menu desktop et Tablette */}
      <div className="hidden lg:block">
        <ul className="flex gap-x-8 items-center h-full text-sm font-bold uppercase tracking-widest text-main/60">
          {Sections.map((section) => (
            <li key={section.href}>
              <Link
                href={section.href}
                className="hover:text-primary transition-colors"
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Menu mobile */}
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
                Fajr
              </h3>
            </div>
            <nav className="grid flex-1 auto-rows-min gap-6 px-4">
              <ul className="flex flex-col gap-y-4 justify-center items-start px-6">
                {Sections.map((section) => (
                  <li key={section.href}>
                    <Link
                      href={section.href}
                      className="text-xl font-black text-main hover:text-primary transition-colors"
                    >
                      {section.label}
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
