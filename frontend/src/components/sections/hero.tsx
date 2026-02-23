import React from "react";
import Image from "next/image";
import heroImg from "@/public/hero.png";

const hero = () => {
  return (
    <section
      id="hero"
      className="relative -mt-16 h-screen py-px lg:max-h-[960px]"
    >
      <div className="">
        <div className="absolute inset-0 -z-20 max-w-[1920px] mx-auto">
          <Image
            src={heroImg}
            alt="Hero"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="absolute max-w-[1920px] mx-auto inset-0 -z-20 bg-linear-to-r from-(--layout-background)/85 via-(--layout-background)/70 to-(--layout-background)/0 h-full w-full"
          style={{ "--layout-background": "#F6F8F8" } as React.CSSProperties}
        />

        <div className="mx-auto px-7 mt-24  py-4 gap-y-6 flex flex-col sm:max-w-1/2 sm:ml-0 md:mt-48">
          <div className="flex items-center rounded-full bg-foreground/10 text-foreground font-medium px-4 py-2 w-fit">
            <span className="w-3 h-3 rounded-full bg-foreground mr-2 animate-pulse"></span>
            Appel Urgent
          </div>
          <div>
            <h2 className="font-extralight text-4xl capitalize gap-y-2 flex flex-col">
              <span className="text-main">Bâtir Emsemble</span> l'avenir
            </h2>
          </div>
          <div className="text-main/75 lg:max-w-9/10">
            <p>
              {" "}
              MKRT (Makaranta) œuvre pour résoudre la crise éducative par des
              initiatives locales. Des millions d'enfants sont privés d'école :
              nous agissons pour changer leur histoire.
            </p>
          </div>
          <div className="flex items-center gap-4 max-sm:flex-col mt-4">
            <button className="px-4 py-2 rounded-full bg-foreground text-background font-medium w-full sm:w-fit sm:px-8 sm:py-3 drop-shadow-md drop-shadow-foreground/60">
              Faire un don
            </button>
            <button className="px-4 py-2 rounded-full bg-background text-foreground font-medium w-full sm:w-fit sm:px-8 sm:py-3 drop-shadow-md ">
              En savoir plus
            </button>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center -space-x-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-12 w-12 rounded-full border-4 border-background  overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/150?u=devweek${item}`}
                    alt="user"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
              <div className="h-12 w-12 rounded-full border-4 border-background bg-foreground flex items-center justify-center text-[12px] font-black text-primary-foreground uppercase shadow-lg">
                +1k
              </div>
            </div>
            <p className="text-black">Ont rejoint la cause ce mois-ci</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default hero;
