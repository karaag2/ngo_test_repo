import { Backpack, DraftingCompassIcon, GraduationCap } from "lucide-react";
import MapNiger from "@/src/components/Map";
import React from "react";

const Map = () => {
  return (
    <section className="mx-auto px-6 py-16 md:px-8 md:py-24">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-x-6">
        <div className="flex flex-col gap-y-6 lg:w-full ">
          <div className="flex flex-col gap-4 mb-6">
            <h2 className="text-lg uppercase">Notre Mission</h2>
            <p className="text-main font-extralight text-3xl md:text-4xl  text-left">
              Construire les fondements de l'avenir
            </p>
          </div>
          <div className="flex flex-col gap-y-6 md:grid grid-rows-2 grid-cols-2 gap-x-4 text-jus lg:flex  ">
            <div className="missionCard">
              <div className="">
                <DraftingCompassIcon color="blue" />
              </div>
              <div>
                <h3>Construire des Ecoles</h3>
                <p>
                  Construction de salles de classe sûres et résistantes aux
                  intempéries dans des villages isolés.
                </p>
              </div>
            </div>
            <div className="missionCard">
              <div>
                <GraduationCap color="purple" />
              </div>

              <div>
                <h3>Former des enseignats</h3>
                <p>
                  Autonomisation des acteurs locaux grâce à des formations
                  pédagogiques et des salaires réguliers.
                </p>
              </div>
            </div>
            <div className="missionCard">
              <div>
                <Backpack color="green" />
              </div>

              <div>
                <h3>Fournir du matériel scolaire</h3>
                <p>
                  Garantir à chaque enfant un sac à dos, des livres et un
                  uniforme
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-full">
          <MapNiger />
        </div>
      </div>
    </section>
  );
};

export default Map;
