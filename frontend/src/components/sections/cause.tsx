import React from "react";
import Image from "next/image";
import classRoom from "@/public/Empty classroom with worn furniture.png";
import books from "@/public/Books stacked on a table.png";
import { BookOpenTextIcon, GraduationCapIcon, Meh } from "lucide-react";

const Cause = () => {
  return (
    <section className="py-16 px-6 flex flex-col gap-y-5 bg-white">
      <div className=" mx-auto uppercase flex flex-col gap-y-4 ">
        <h2 className="text-center font-bold">La réalité</h2>
        <p className="text-main font-extralight text-3xl md:text-4xl text-center ">
          pourquoi devons nous agir maintenant ?
        </p>
      </div>
      <div className="md:max-h-[80vh] overflow-clip mx-auto flex flex-col md:grid grid-cols-2 lg:grid-cols-4 gap-4 grid-rows-3 lg:grid-rows-6 w-full">
        <div className="h-75 md:h-full w-full col-span-2 relative rounded-2xl px-6 md:col-span-2 lg:row-span-6 row-span-1">
            <Image
              src={classRoom}
              alt="Hero"
              width={1920}
              height={1080}
              className="absolute top-0 left-0 z-10 w-full h-full object-cover rounded-4xl "
            />
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-t from-black/90 via-black/50 to-black/0 rounded-4xl z-10"></div>
          <div className="relative flex flex-col justify-end h-full py-12 z-10">
            <span className=" top-4 left-4 uppercase bg-red-400 rounded-full px-4 py-1 text-white font-bold w-fit">
              critical
            </span>
            <h3 className="text-white/80 text-3xl font-extralight py-2">
              40% d'enfants non scolarisés
            </h3>
            <p className="text-white/60 text-sm  font-extralight">
              Au Niger, 40% des enfants en âge d'aller à l'école n'y vont pas.
              Pourtant, l'éducation est la clé pour briser le cycle de la
              pauvreté.
            </p>
          </div>
        </div>
        <div className=" h-full sm:h-fit w-full flex flex-col gap-y-3 px-6 py-12 rounded-3xl bg-cardBackground row-span-1 lg:row-span-2">
          <div className="flex items-center gap-x-2 flex-col w-full">
            <div className="flex items-center justify-center rounded-full bg-foreground h-12 w-12 ">
              <GraduationCapIcon color="white" size={24} />
            </div>
            <h3 className="text-2xl text-main/70 text-center">
              Manque d'enseignants
            </h3>
          </div>
          <div className="text-center">
            <p className="text-main/50 text-sm font-extralight">
              Au Niger, il y a un manque d'enseignants qualifiés pour enseigner
              les élèves. On a à peine 1 enseignant pour 40 élèves.
            </p>
          </div>
        </div>
        <div className="bg-foreground rounded-3xl py-9 h-full w-full flex items-center justify-center flex-col px-6  row-span-1 lg:row-span-3">
          <Meh color="white" size={48} />
          <h3 className="text-white text-2xl text-center font-bold py-2">
            Rêves sans éducation
          </h3>
          <p className="text-white/80 text-center">
            Chaque jour déscolarisé, un enfant perd un peu plus une chance de
            changer sa vie.
          </p>
        </div>
        <div className="bg-cardBackground p-6 rounded-3xl h-full w-full flex gap-y-6 gap-x-2 items-center justify-center max-sm:flex-col px-6 col-span-2  row-span-1 lg:row-span-2">
          <div className="flex flex-col items-center md:items-start md:max-w-5/11">
            <div className="flex items-center justify-center rounded-full bg-foreground/20 h-12 w-12 ">
              <BookOpenTextIcon color="blue" size={24} />
            </div>
            <div>
              <h3 className="text-main text-2xl max-sm:text-center font-bold py-2">
                Manque de Fournitures
              </h3>

              <p className="text-main/80 max-sm:text-center ">
                Basic learning materials like books, desks, and writing tools
                are often completely missing from classrooms.
              </p>
            </div>
          </div>
          <div className="md:h-35 md:w-59 h-full w-full">
            <Image
              src={books}
              alt="books stacked on a table"
              width={236}
              height={140}
              className="w-full h-full object-cover rounded-4xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cause;
