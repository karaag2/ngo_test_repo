"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const activities = [
  {
    title: "Distribution de kits",
    category: "Éducation",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Construction d'école",
    category: "Infrastructure",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000&auto=format&fit=crop",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Formation pédagogique",
    category: "Savoir-faire",
    image:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Accès à l'eau",
    category: "Vie Quotidienne",
    image:
      "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=1974&auto=format&fit=crop",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Consultation médicale",
    category: "Santé",
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2064&auto=format&fit=crop",
    className: "md:col-span-1 md:row-span-1",
  },
];

const Gallery = () => {
  return (
    <section className="container mx-auto px-6 py-24" id="activites">
      <div className="flex flex-col gap-y-4 mb-16 text-center">
        <h2 className="text-primary font-black uppercase tracking-[0.3em] text-sm">
          Nos Activités
        </h2>
        <p className="text-4xl md:text-5xl font-black tracking-tighter text-main">
          L'impact en <span className="text-primary">Images</span>
        </p>
        <p className="text-muted-foreground font-medium max-w-2xl mx-auto italic">
          Chaque image raconte une histoire de résilience et d'espoir. Suivez
          nos déploiements sur le terrain.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-4xl overflow-hidden group shadow-premium border border-border/50 ${activity.className}`}
          >
            <Image
              src={activity.image}
              alt={activity.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform">
              <span className="text-primary text-[10px] font-black uppercase tracking-widest bg-primary/10 backdrop-blur-md px-3 py-1 rounded-full w-fit mb-2">
                {activity.category}
              </span>
              <h3 className="text-white text-xl md:text-2xl font-black">
                {activity.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
