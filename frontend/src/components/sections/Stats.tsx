const Stats = () => {
  return (
    <section className="container mx-auto px-6 py-24" id="stats">
      {/* Titre et sous-titre */}
      <div className="flex flex-col gap-y-4 mb-16 text-center">
        <h2 className="text-primary font-black uppercase tracking-[0.3em] text-sm">
          Notre Impact
        </h2>
        <p className="text-4xl md:text-5xl font-black tracking-tighter text-main">
          Des Résultats <span className="text-primary italic">Concrets</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {[
          {
            value: "10k+",
            label: "Élèves Impactés",
            desc: "Ayant accès à une éducation de qualité grâce à vos dons",
            color: "text-primary",
            borderColor: "border-primary/15",
          },
          {
            value: "50+",
            label: "Écoles construites",
            desc: "Des environnements d'apprentissage modernes et sécurisés",
            color: "text-edu",
            borderColor: "border-edu/15",
          },
          {
            value: "100%",
            label: "Transparence",
            desc: "Chaque centime investi directement sur le terrain",
            color: "text-impact",
            borderColor: "border-impact/15",
          },
        ].map((stat, idx) => (
          <div key={idx} className={`statCard group ${stat.borderColor}`}>
            <h3
              className={`${stat.color} group-hover:drop-shadow-[0_0_15px_oklch(var(--primary)/0.3)] transition-all`}
            >
              {stat.value}
            </h3>
            <h4>{stat.label}</h4>
            <p>{stat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
