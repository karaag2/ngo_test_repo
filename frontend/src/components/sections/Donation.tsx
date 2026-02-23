import React from "react";
import { Label } from "@/src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Input } from "@/src/components/ui/input";
import { HandCoins, ShieldCheck } from "lucide-react";

const Donation = () => {
  return (
    <section className="container mx-auto px-6 py-24" id="donation">
      <div className="max-w-xl mx-auto flex flex-col gap-y-10 p-8 md:p-12 rounded-[2.5rem] bg-card border border-border shadow-premium relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />

        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-main tracking-tight">
            Soutenez <span className="text-primary italic">Makaranta</span>
          </h2>
          <p className="text-muted-foreground font-medium">
            Votre générosité est le moteur du changement. Chaque don transforme
            une vie.
          </p>
        </div>

        <form action="" className="space-y-8 relative">
          <div className="space-y-4">
            <Label className="text-xs uppercase tracking-widest font-black text-main/60 px-2">
              Montant du don
            </Label>
            <RadioGroup defaultValue="2500" className="grid grid-cols-3 gap-3">
              {[1500, 2500, 5000].map((amount) => (
                <div key={amount} className="w-full">
                  <RadioGroupItem
                    value={amount.toString()}
                    id={`amount-${amount}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`amount-${amount}`}
                    className="flex h-14 w-full cursor-pointer items-center justify-center rounded-2xl border border-border bg-card text-sm font-bold text-main transition-all 
                    hover:bg-accent peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white peer-data-[state=checked]:border-primary peer-data-[state=checked]:shadow-lg active:scale-95"
                  >
                    {amount.toLocaleString()} F
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
              <HandCoins size={20} />
            </div>
            <input
              type="number"
              placeholder="Montant personnalisé"
              className="w-full pl-12 pr-16 py-4 rounded-2xl border border-border bg-muted/30 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none font-bold text-main"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-xs text-muted-foreground uppercase tracking-widest">
              FCFA
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Nom complet"
                className="h-14 rounded-2xl border-border bg-muted/30 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all px-6 outline-none"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Adresse email"
                className="h-14 rounded-2xl border-border bg-muted/30 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all px-6 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-premium bg-primary text-white text-lg hover:shadow-primary/25 hover:-translate-y-1"
          >
            Confirmer le don
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 pt-4 border-t border-border">
          <ShieldCheck className="text-growth" size={16} />
          <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">
            Paiement 100% Sécurisé · Stripe & Mobile Money
          </p>
        </div>
      </div>
    </section>
  );
};

export default Donation;
