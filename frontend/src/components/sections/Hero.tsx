import Image from "next/image";
import heroImg from "@/public/hero.webp";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative -mt-20 h-screen lg:h-[90vh] min-h-[700px] max-h-[900px] overflow-hidden"
    >
      {/* Image d'Arrière Plan */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={heroImg}
          alt="L'éducation pour tous"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 animate-pulse-slower"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-transparent dark:bg-linear-to-t dark:from-background dark:via-background/80 dark:to-transparent" />
      </div>

      {/* Contenu du Hero */}
      <div className="container mx-auto px-6 h-full flex flex-col justify-center pt-24 min-[380px]:pt-32 lg:pt-12">
        <div className="max-w-3xl space-y-5 min-[380px]:space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
          {/*  Badge Urgent */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-black text-[9px] md:text-xs w-fit border border-primary/10 backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
            </span>
            <span className="tracking-[0.15em]">APPEL URGENT</span>
          </div>

          {/*  Titre et sous-titre */}
          <h1 className="text-[2.5rem] min-[380px]:text-5xl min-[410px]:text-6xl lg:text-7xl font-black text-main leading-[0.95] md:leading-[0.9] tracking-tight">
            Bâtir{" "}
            <span className="text-primary italic font-serif font-medium">
              Ensemble
            </span>{" "}
            <br />
            l'avenir du{" "}
            <span className="relative inline-block px-1">
              Sahel
              <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-0.5 md:h-1.5 bg-primary/30 -z-10"></span>
            </span>
          </h1>

          <p className="text-base min-[380px]:text-lg md:text-2xl text-muted-foreground font-medium max-w-xl md:max-w-2xl leading-relaxed opacity-80 text-pretty">
            Fajr œuvre pour résoudre la crise éducative par des initiatives
            locales. Nous transformons l'avenir des enfants,{" "}
            <span className="text-main font-bold">une école à la fois.</span>
          </p>

          {/* Boutons */}
          <div className="flex flex-col min-[380px]:flex-row items-stretch min-[380px]:items-center gap-3 md:gap-4 pt-2 md:pt-4">
            <Link href={"/#donation"}>
              <button className="px-7 py-3 md:px-8 md:py-3.5 rounded-full font-bold transition-all duration-500 active:scale-95 shadow-lg shadow-primary/15 bg-primary text-primary-foreground hover:shadow-primary/30 hover:-translate-y-1 text-sm uppercase tracking-wider">
                Faire un don
              </button>
            </Link>
            <Link href={"#mission"}>
              <button className="px-7 py-3 md:px-8 md:py-3.5 rounded-full font-bold transition-all duration-500 active:scale-95 shadow-sm bg-card/40 backdrop-blur-xl border border-border/40 text-main hover:bg-card/80 text-sm uppercase tracking-wider">
                Notre mission
              </button>
            </Link>
          </div>

          {/* Aperçu des Contributeurs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-8 md:pt-14 border-t border-border/10">
            <div className="flex items-center -space-x-3 md:-space-x-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="relative h-10 w-10 md:h-12 md:w-12 rounded-full border-[3px] border-background/80 overflow-hidden shadow-sm hover:scale-110 transition-transform cursor-pointer"
                >
                  <Image
                    src={`https://i.pravatar.cc/150?u=ngo${item}`}
                    alt="Donateur"
                    fill
                    sizes="(max-width: 768px) 40px, 48px"
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full border-[3px] border-background/80 bg-primary flex items-center justify-center text-[9px] md:text-xs font-black text-primary-foreground shadow-md">
                +1K
              </div>
            </div>
            <div className="space-y-0.5">
              <p className="text-[11px] md:text-sm font-black text-main/80 tracking-tight uppercase">
                Rejoignez{" "}
                <span className="text-primary tracking-normal font-bold">
                  1,240 donateurs
                </span>
              </p>
              <p className="text-[10px] md:text-xs text-muted-foreground font-medium italic opacity-70">
                Impact direct au Niger.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
