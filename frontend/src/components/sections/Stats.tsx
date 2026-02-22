import React from "react";

const Stats = () => {
  return (
    <section className="mx-auto px-6 py-16 bg-[#f6f8f8]">
      <div className="flex max-sm:flex-col gap-y-6  md:grid md:grid-cols-2 md:grid-rows-2 md:gap-6 lg:flex">
        <div className=" statCard md:col-span-1 md:row-span-1">
          <h3 className="text-foreground">10k+</h3>
          <h4>Elèves Impactés</h4>
          <p>On directement accès à une éducation de qualité</p>
        </div>
        <div className=" statCard md:col-span-1 md:row-span-1 lg:-translate-y-8">
          <h3 className="text-green-500">50+</h3>
          <h4>Etablissements Scolaires construits</h4>
          <p>
            Environnements d'apprentissage propices, modernes et accessibles mis
            en place
          </p>
        </div>{" "}
        <div className="statCard md:col-span-2 md:row-span-1">
          <h3 className="text-purple-600">100%</h3>
          <h4>Impact des dons</h4>
          <p>Chaque denier publique a servi a faire avancer la cause</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
