import { Backpack, DraftingCompassIcon, GraduationCap } from "lucide-react";
import MapLoader from "@/src/components/MapsectionUIcomponents/MapLoader";

const MapSection = () => {
  return (
    <section className="container mx-auto px-6 py-24" id="mission">
      {/* Titre et sous-titre */}
      <div className="flex flex-col gap-y-4 mb-16">
        <h2 className="text-primary font-black uppercase tracking-[0.3em] text-sm">
          Notre Mission
        </h2>
        <p className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter">
          Construire les fondements <br />
          <span className="text-primary italic">de l&apos;avenir.</span>
        </p>
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
            },
            {
              icon: <GraduationCap size={24} />,
              title: "Former des Enseignants",
              desc: "Autonomisation locale par des formations pédagogiques et un soutien continu.",
              color: "bg-edu/10 text-edu",
            },
            {
              icon: <Backpack size={24} />,
              title: "Matériel Scolaire",
              desc: "Garantir à chaque enfant les outils nécessaires pour apprendre et s'épanouir.",
              color: "bg-growth/10 text-growth",
            },
          ].map((item, idx) => (
            <div
              key={idx}
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
            </div>
          ))}
        </div>

        {/* Conteneur de la Carte Interactive — hauteur fixe pour éviter CLS */}
        <div className="lg:w-1/2 w-full h-[500px] sm:h-[560px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-border/50 bg-secondary/10">
          <MapLoader />
        </div>
      </div>
    </section>
  );
};

export default MapSection;
