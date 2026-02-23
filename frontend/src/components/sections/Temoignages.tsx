import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
      level: "Elève 5e Année médecine",
      message:
        "Avant que MKRT ne construises notre école je devais marcher 10Km. Maintenant mon rêve de devenir médecin est plus proche que jamais grâce à MKRT j'aurai l'opportuniter de soigner les enfants de mon village.",
    },
    {
      id: 2,
      nom: "Mamadou Diallo",
      image: "https://i.pravatar.cc/150?u=ngo8",
      level: "Professeur de mathématiques",
      message:
        "C'est grâce à MKRT que j'ai pu avoir une éducation de qualité. Je suis très reconnaissante envers cette organisation elle m'a permi d'avoir l'auportunité de transmettre mon savoir aux enfants de mon village.",
    },
    {
      id: 3,
      nom: "Enfants du villade de Ndioum",
      image: "https://i.pravatar.cc/150?u=grok1",
      level: "Elèves Primaire",
      message:
        "Nous les enfants de ce village n'avions pas de lieu pour étudier. Maintenant nous avons une école grâce à MKRT. Nous sommes très reconnaissants envers cette organisation. ",
    },
    {
      id: 4,
      nom: "Alassane Kebe",
      image: "https://i.pravatar.cc/150?u=gpt",
      level: "Professeur de philosophie",
      message:
        "Grâce à MKRT j'ai pu avoir une éducation de qualité. Je suis très reconnaissante envers cette organisation elle m'a permi d'avoir l'auportunité de transmettre mon savoir aux enfants de mon village.",
    },
    {
      id: 5,
      nom: "Abdoulaye Barry",
      image: "https://i.pravatar.cc/150?u=tony13156",
      level: "Elève en classe de terminale",
      message:
        "Grâce à MKRT j'ai pu avoir une éducation de qualité. Je suis très reconnaissante envers cette organisation elle m'a permi d'avoir l'auportunité de transmettre mon savoir aux enfants de mon village.",
    },
  ];
  return (
    <section className="mx-auto px-6 py-16 ">
      <div className="flex flex-col gap-y-10">
        <div className="">
          <h1 className="text-3xl md:text-4xl font-bold text-main text-center">
            Histoires inspirantes
          </h1>
        </div>
        <Carousel className="w-full  max-w-5xl flex flex-col gap-y-8 mx-auto">
          <CarouselContent>
            {temoignages.map((_, index) => (
              <CarouselItem key={index}>
                <Card className="bg-white  border-none  ">
                  <CardHeader>
                    <div className="flex justify-center relative w-full items-center">
                      <Quote className="absolute left-0 rotate-180 text-foreground/30" />

                      <div className="w-24 h-24 border-4 border-foreground/30 rounded-full  ">
                        <Image
                          src={temoignages[index].image}
                          alt={temoignages[index].nom}
                          width={100}
                          height={100}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap ">
                    <CardDescription>
                      <p className="text-center text-main/80 text-lg">
                        {temoignages[index].message}
                      </p>
                    </CardDescription>
                    <CardFooter className="flex flex-col gap-y-2 py-6 mt-auto">
                      <p className="text-center text-main text-lg font-bold">
                        {temoignages[index].nom}
                      </p>
                      <p className="text-center  text-lg font-light text-foreground ">
                        {temoignages[index].level}
                      </p>
                    </CardFooter>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center">
            <CarouselPrevious className="relative bg-white size-12 w-32" />
            <CarouselNext className="relative bg-white size-12 w-32" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

export default Temoignages;
