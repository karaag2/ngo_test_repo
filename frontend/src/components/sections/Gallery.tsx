import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
      {/*Titre et sous-titre */}
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
      {/*Grille d'activités  */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={`gallery-card relative rounded-4xl overflow-hidden shadow-premium border border-border/50 cursor-pointer ${activity.className}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Link
              href={`/blog/${activity.title.toLowerCase().replace(/ /g, "-").replace(/'/g, "").replace(/é/g, "e").replace(/à/g, "a")}`}
              className="block w-full h-full relative"
            >
              {/* Image d'arrière-plan */}
              <div className="absolute inset-0 w-full h-full transition-transform duration-600 ease-out hover-parent-scale">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-60 transition-opacity duration-300" />

              {/* Contenu textuel */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-2 opacity-90 transition-all duration-300">
                <span className="text-primary text-[10px] font-black uppercase tracking-widest bg-primary/10 backdrop-blur-md px-3 py-1 rounded-full w-fit mb-2 border border-primary/20">
                  {activity.category}
                </span>
                <h3 className="text-white text-xl md:text-2xl font-black italic leading-tight">
                  {activity.title}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {/*Bouton Voir tous les articles */}
      <div className="mt-16 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-x-2 bg-primary text-white px-10 py-4 rounded-full font-black uppercase tracking-[0.2em] text-xs shadow-premium hover:shadow-primary/40 hover:-translate-y-1 transition-all group"
        >
          Voir tous nos articles
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default Gallery;
