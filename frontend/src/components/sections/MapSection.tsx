"use client";

import { Backpack, DraftingCompassIcon, GraduationCap } from "lucide-react";
import { m } from "framer-motion";
import MapLoader from "@/src/components/MapsectionUIcomponents/MapLoader";

const MapSection = () => {
  return (
    <section className="container mx-auto px-6 py-24" id="mission">
      {/* Titre et sous-titre */}
      <div className="flex flex-col gap-y-4 mb-16">
        <m.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-primary font-black uppercase tracking-[0.3em] text-sm"
        >
          Notre Mission
        </m.h2>
        <m.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter"
        >
          Construire les fondements <br />
          <span className="text-primary italic">de l&apos;avenir.</span>
        </m.p>
      </div>

      <div className="flex flex-col gap-12 lg:flex-row lg:items-start max-w-6xl mx-auto">
        {/* Cartes mission */}
        <div className="flex flex-col gap-y-5 lg:w-1/2">
          {[
            {
              icon: <DraftingCompassIcon size={24} />,
              title: "Construire des Écoles",
              desc: "Salles de classe sûres et résistantes aux intempéries dans les villages isolés.",
              color: "bg-primary/10 text-primary",
              delay: 0.2,
            },
            {
              icon: <GraduationCap size={24} />,
              title: "Former des Enseignants",
              desc: "Autonomisation locale par des formations pédagogiques et un soutien continu.",
              color: "bg-edu/10 text-edu",
              delay: 0.3,
            },
            {
              icon: <Backpack size={24} />,
              title: "Matériel Scolaire",
              desc: "Garantir à chaque enfant les outils nécessaires pour apprendre et s'épanouir.",
              color: "bg-growth/10 text-growth",
              delay: 0.4,
            },
          ].map((item, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay }}
              className="missionCard group hover:shadow-xl transition-all duration-500"
            >
              <div
                className={`icon-wrapper ${item.color} group-hover:scale-110 transition-transform duration-500 shadow-sm`}
              >
                {item.icon}
              </div>
              <div className="content-wrapper">
                <h3 className="group-hover:text-primary transition-colors italic">
                  {item.title}
                </h3>
                <p>{item.desc}</p>
              </div>
            </m.div>
          ))}
        </div>

        {/* Conteneur de la Carte Interactive */}
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="lg:w-1/2 w-full h-[500px] sm:h-[560px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-border/50 bg-secondary/10"
        >
          <MapLoader />
        </m.div>
      </div>
    </section>
  );
};

export default MapSection;
