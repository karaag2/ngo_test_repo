const Stats = () => {
  return (
    <section className="container mx-auto px-6 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="statCard group">
          <h3 className="text-primary group-hover:drop-shadow-[0_0_15px_oklch(var(--primary)/0.3)] transition-all">
            10k+
          </h3>
          <h4>Élèves Impactés</h4>
          <p>Ayant accès à une éducation de qualité grâce à vos dons</p>
        </div>

        <div className="statCard lg:-translate-y-8 group border-edu/20">
          <h3 className="text-edu">50+</h3>
          <h4>Écoles construites</h4>
          <p>Des environnements d'apprentissage modernes et sécurisés</p>
        </div>

        <div className="statCard group border-growth/20">
          <h3 className="text-impact">100%</h3>
          <h4>Transparence</h4>
          <p>Chaque centime investi directement sur le terrain</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
