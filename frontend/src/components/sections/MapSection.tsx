import { Backpack, DraftingCompassIcon, GraduationCap } from "lucide-react";
import MapNiger from "@/src/components/Map";
import React from "react";

const Map = () => {
  return (
    <section className="container mx-auto px-6 py-24" id="mission">
      <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-y-10 lg:w-1/2">
          <div className="space-y-4">
            <h2 className="text-primary font-black uppercase tracking-[0.3em] text-sm">
              Notre Mission
            </h2>
            <p className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter">
              Construire les fondements <br />
              <span className="text-primary">de l'avenir.</span>
            </p>
          </div>

          <div className="grid gap-6">
            <div className="missionCard group">
              <div className="icon-wrapper bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <DraftingCompassIcon size={24} />
              </div>
              <div className="content-wrapper">
                <h3>Construire des Écoles</h3>
                <p>
                  Salles de classe sûres et résistantes aux intempéries dans les
                  villages isolés.
                </p>
              </div>
            </div>

            <div className="missionCard group">
              <div className="icon-wrapper bg-edu/10 text-edu group-hover:bg-edu group-hover:text-white transition-all">
                <GraduationCap size={24} />
              </div>
              <div className="content-wrapper">
                <h3>Former des Enseignants</h3>
                <p>
                  Autonomisation locale par des formations pédagogiques et un
                  soutien continu.
                </p>
              </div>
            </div>

            <div className="missionCard group">
              <div className="icon-wrapper bg-growth/10 text-growth group-hover:bg-growth group-hover:text-white transition-all">
                <Backpack size={24} />
              </div>
              <div className="content-wrapper">
                <h3>Matériel Scolaire</h3>
                <p>
                  Garantir à chaque enfant les outils nécessaires pour apprendre
                  et s'épanouir.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 w-full h-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/20">
          <MapNiger />
        </div>
      </div>
    </section>
  );
};

export default Map;
