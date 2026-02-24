"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Backpack, DraftingCompassIcon, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

// Lazy load Map to reduce Total Blocking Time (TBT)
const MapNiger = dynamic(() => import("@/src/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-secondary/20 animate-pulse rounded-3xl">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-primary/60">
          Chargement de la carte...
        </p>
      </div>
    </div>
  ),
});

const MapSection = () => {
  return (
    <section className="container mx-auto px-6 py-24" id="mission">
      <div className="flex flex-col gap-16 lg:flex-row lg:items-center max-w-6xl mx-auto">
        <div className="flex flex-col gap-y-10 lg:w-1/2">
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-black uppercase tracking-[0.3em] text-sm"
            >
              Notre Mission
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter"
            >
              Construire les fondements <br />
              <span className="text-primary italic">de l'avenir.</span>
            </motion.p>
          </div>

          <div className="grid gap-6">
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
              <motion.div
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
              </motion.div>
            ))}
          </div>
        </div>

        {/* Map Container with reserved height to minimize CLS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="lg:w-1/2 w-full aspect-square md:aspect-auto md:h-[560px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-border/50 bg-secondary/10"
        >
          <MapNiger />
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
