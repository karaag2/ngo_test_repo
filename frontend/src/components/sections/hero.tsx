import React from "react";
import Image from "next/image";
import heroImg from "@/public/hero.png";

const hero = () => {
  return (
    <section
      id="hero"
      className="relative min-[375px]:-mt-20  -mt-12 h-[90vh] max-[375px]:h-screen lg:h-[90vh] min-h-[600px] max-h-[850px] overflow-hidden"
    >
      <div className="absolute inset-0 -z-20">
        <Image
          src={heroImg}
          alt="L'éducation pour tous"
          fill
          priority
          className="object-cover object-center scale-105 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/70 to-transparent dark:bg-linear-to-t dark:from-background dark:via-background/80 dark:to-transparent" />
      </div>

      <div className="container mx-auto px-6 h-full flex flex-col justify-center">
        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm w-fit border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            Appel Urgent
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-main leading-[0.9] tracking-tighter">
            Bâtir <span className="text-primary italic">Ensemble</span> <br />
            l'avenir du Sahel
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-xl leading-relaxed">
            Makaranta œuvre pour résoudre la crise éducative par des initiatives
            locales. Nous transformons l'avenir des enfants, une école à la
            fois.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button className="btn-premium bg-primary text-primary-foreground hover:shadow-primary/20 hover:-translate-y-1">
              Faire un don
            </button>
            <button className="btn-premium bg-card/80 backdrop-blur-md border border-border text-main hover:bg-card">
              Notre mission
            </button>
          </div>

          <div className="flex items-center gap-6 pt-8">
            <div className="flex items-center -space-x-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-12 w-12 rounded-full border-4 border-background overflow-hidden shadow-sm"
                >
                  <img
                    src={`https://i.pravatar.cc/150?u=ngo${item}`}
                    alt="Donateur"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
              <div className="h-12 w-12 rounded-full border-4 border-background bg-primary flex items-center justify-center text-xs font-black text-primary-foreground shadow-lg">
                +1K
              </div>
            </div>
            <p className="text-sm font-bold text-main/80 tracking-tight">
              Rejoignez{" "}
              <span className="text-primary underline underline-offset-4 font-black">
                1,240
              </span>{" "}
              donateurs actifs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default hero;
