import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/src/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { Quote } from "lucide-react";
import Image from "next/image";

export function Temoignages() {
  const temoignages = [
    {
      id: 1,
      nom: "Awa Traoré",
      image: "https://i.pravatar.cc/150?u=ngo7",
      level: "Élève 5e Année médecine",
      message:
        "Avant que MKRT ne construise notre école, je devais marcher 10km. Aujourd'hui, mon rêve de devenir médecin est à portée de main. Je pourrai bientôt soigner les enfants de mon village.",
    },
    {
      id: 2,
      nom: "Mamadou Diallo",
      image: "https://i.pravatar.cc/150?u=ngo8",
      level: "Professeur de mathématiques",
      message:
        "Grâce à MKRT, j'ai pu recevoir une éducation de qualité. Je suis honoré de transmettre aujourd'hui mon savoir aux nouvelles générations de ma communauté.",
    },
    {
      id: 3,
      nom: "Enfants de Ndioum",
      image: "https://i.pravatar.cc/150?u=grok1",
      level: "Élèves Primaire",
      message:
        "Nous n'avions pas de lieu pour apprendre. Maintenant, nous avons une école magnifique. Nous sommes tellement heureux d'aller en classe chaque matin !",
    },
  ];

  return (
    <section className="container mx-auto px-6 py-24">
      <div className="flex flex-col gap-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-main tracking-tight">
            Histoires <span className="text-primary italic">Inspirantes</span>
          </h2>
          <p className="text-muted-foreground font-medium max-w-2xl mx-auto">
            Découvrez l'impact réel de vos contributions à travers les
            témoignages de ceux qui vivent le changement au quotidien.
          </p>
        </div>

        <Carousel className="w-full max-w-4xl mx-auto group">
          <CarouselContent>
            {temoignages.map((t) => (
              <CarouselItem key={t.id}>
                <Card className="bg-card/50 backdrop-blur-sm border border-border rounded-[2.5rem] p-8 md:p-12 shadow-premium">
                  <CardHeader className="p-0 mb-8">
                    <div className="flex flex-col items-center gap-6 relative">
                      <Quote className="text-primary/20 absolute -top-4 -left-4 md:-left-8 size-16 md:size-24 -z-10" />

                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-125 opacity-50" />
                        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-card shadow-lg overflow-hidden">
                          <Image
                            src={t.image}
                            alt={t.nom}
                            fill
                            sizes="(max-width: 768px) 112px, 128px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0 text-center space-y-8">
                    <p className="text-xl md:text-2xl font-medium leading-relaxed text-main italic">
                      "{t.message}"
                    </p>

                    <div className="space-y-1">
                      <p className="text-xl font-black text-main">{t.nom}</p>
                      <p className="text-sm font-bold uppercase tracking-widest text-primary">
                        {t.level}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex items-center justify-center gap-4 mt-12">
            <CarouselPrevious className="static translate-y-0 size-14 border-border hover:bg-card hover:text-primary transition-all shadow-sm" />
            <CarouselNext className="static translate-y-0 size-14 border-border hover:bg-card hover:text-primary transition-all shadow-sm" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

export default Temoignages;
