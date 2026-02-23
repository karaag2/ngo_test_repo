import React from "react";
import { Label } from "@/src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Input } from "@/src/components/ui/input";
import { HandCoins } from "lucide-react";

const Donation = () => {
  return (
    <section className="mx-auto px-6 py-16 md:px-8 md:py-24 bg-foreground/5">
      <div className="flex flex-col gap-y-6 gap-x-4 border-2 rounded-4xl py-8 bg-[#fcfcfc]  px-8 lg:max-w-xl lg:mx-auto">
        <div className="px-4 flex flex-col gap-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-main text-center py-1">
            Raliez Le Mouvement
          </h2>
          <p className="text-main/80 text-sm font-extralight text-center py-px">
            Chaque don, petit ou grand, fait une différence dans la vie d'un
            enfant.
          </p>
        </div>
        <div className=" overflow-hidden">
          <form action="" className="flex flex-col gap-y-6 mx-auto ">
            <RadioGroup
              defaultValue="50"
              className="flex gap-x-3 justify-between"
            >
              {["100", "1500", "2500"].map((amount) => (
                <div key={amount} className="w-full">
                  <RadioGroupItem
                    value={amount}
                    id={`amount-${amount}`}
                    className="peer sr-only " // "sr-only" cache le petit cercle tout en restant accessible
                  />
                  <Label
                    htmlFor={`amount-${amount}`}
                    className="flex h-12 w-full cursor-pointer items-center justify-center rounded-3xl md:rounded-2xl border border-gray-200 bg-white text-sm font-bold text-slate-900 transition-all shadow-sm 
                    hover:bg-slate-50 
            peer-data-[state=checked]:bg-[#2fbbed] peer-data-[state=checked]:text-white peer-data-[state=checked]:border-[#2fbbed] peer-data-[state=checked]:shadow-md"
                  >
                    {amount} F
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="inline-flex gap-x-2 items-center justify-evenly md:justify-start border border-main/20 rounded-full py-1 px-2 md:px-8">
              <div className="">
                <HandCoins className="text-main" size={24} />
              </div>
              <input
                type="text"
                placeholder="Custom Amount"
                className="py-2 inline shadow-none max-sm:max-w-3/5 max-w-2/5 outline-none placeholder:text-main/30 h-fit focus:outline-none focus:ring-0 focus:border-none focus:shadow-none"
              />
              <p className="text-main/60 ml-auto">FCFA</p>
            </div>
            <div className="my-4 border-b" />
            <div className="flex flex-col md:flex-row gap-y-6 md:gap-x-2">
              <Input
                type="text"
                placeholder="Nom et Prenom"
                className="border focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none border-main/20 rounded-full px-4 py-6"
              />
              <Input
                type="email"
                placeholder="Addresse Mail"
                className="border focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none border-main/20 rounded-full px-4 py-6"
              />
            </div>

            <button
              type="submit"
              className="bg-main text-white rounded-4xl px-4 py-4"
            >
              Faire un don
            </button>
          </form>
        </div>
        <p className="text-main/60 text-sm font-extralight text-center py-px px-4">
          Payment sécurisé par Stripe, Vous pouvez payer par Orange Money, Moov
          Money, Wave et Carte Bancaire
        </p>
      </div>
    </section>
  );
};

export default Donation;
