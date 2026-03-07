import Image from "next/image";
import classRoom from "@/public/Empty classroom with worn furniture.webp";
import books from "@/public/Books stacked on a table.webp";
import {
  BookOpenTextIcon,
  GraduationCapIcon,
  Meh,
  AlertCircle,
} from "lucide-react";

const Cause = () => {
  return (
    <section className="container mx-auto px-6 py-24" id="cause">
      {/* Titre et sous-titre */}
      <div className="flex flex-col gap-y-4 mb-12">
        <h2 className="text-primary font-black uppercase tracking-[0.3em] text-sm text-center">
          La Réalité
        </h2>
        <p className="text-4xl md:text-5xl font-black text-center tracking-tighter text-main">
          Pourquoi Agir <span className="text-primary">Maintenant ?</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6 min-h-[600px]">
        {/* Carte Principale */}
        <div className="md:col-span-1 md:row-span-2 lg:col-span-2 lg:row-span-2 relative rounded-4xl overflow-hidden group shadow-premium aspect-square md:aspect-auto">
          <Image
            src={classRoom}
            alt="Classe délabrée"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 space-y-4">
            <div className="flex items-center gap-2 bg-destructive text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit animate-pulse">
              <AlertCircle size={12} />
              Critique
            </div>
            <h3 className="text-white text-3xl md:text-4xl font-black leading-tight">
              40% des enfants <br />
              non scolarisés
            </h3>
            <p className="text-white/70 text-sm max-w-md font-medium">
              Au Niger, l'éducation est un luxe pour beaucoup. Agir aujourd'hui,
              c'est offrir un avenir à ces enfants et briser le cycle de la
              précarité.
            </p>
          </div>
        </div>

        {/* Cartes secondaire */}
        <div className="bg-card p-8 rounded-4xl border border-border flex flex-col items-center text-center gap-y-4 shadow-premium hover:-translate-y-1 transition-all">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <GraduationCapIcon size={28} />
          </div>
          <h3 className="text-xl font-bold text-main">
            Pénurie de Professeurs
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Le ratio est alarmant : 1 enseignant pour 40 élèves. La qualité de
            l'apprentissage en souffre directement.
          </p>
        </div>

        <div className="bg-primary p-8 rounded-4xl flex flex-col items-center text-center justify-center gap-y-4 shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all">
          <Meh className="text-white/40" size={48} />
          <h3 className="text-white text-xl font-bold">Rêves Suspendus</h3>
          <p className="text-white/80 text-sm leading-relaxed">
            Chaque jour hors de l'école est une ambition qui s'éteint. Nous ne
            pouvons plus attendre.
          </p>
        </div>

        <div className="md:col-span-2 bg-secondary/50 backdrop-blur-sm p-8 rounded-4xl border border-border flex flex-col md:flex-row items-center gap-8 shadow-premium hover:-translate-y-1 transition-all">
          <div className="flex-1 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-growth/10 flex items-center justify-center text-growth">
              <BookOpenTextIcon size={24} />
            </div>
            <h3 className="text-2xl font-bold text-main">
              Absence de Matériel
            </h3>
            <p className="text-sm text-muted-foreground">
              Les fournitures de base — livres, pupitres, outils d'écriture —
              font souvent cruellement défaut dans les classes rurales.
            </p>
          </div>
          <div className="w-full md:w-1/2 h-48 relative rounded-2xl overflow-hidden shadow-inner">
            <Image
              src={books}
              alt="Livres scolaires"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cause;
