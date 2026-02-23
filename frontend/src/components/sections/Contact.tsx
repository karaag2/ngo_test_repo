"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Mail, Phone, MapPin, Send, Globe, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <section className="container mx-auto px-6 py-24" id="contact">
      <div className="flex flex-col gap-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-primary font-black uppercase tracking-[0.3em] text-sm">
            Contact
          </h2>
          <p className="text-4xl md:text-5xl font-black tracking-tighter text-main">
            Restons en <span className="text-primary italic">Contact</span>
          </p>
          <p className="text-muted-foreground font-medium">
            Une question, un partenariat ou simplement l'envie de nous soutenir
            ? Notre équipe est à votre écoute.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 bg-secondary/20 rounded-[3rem] p-8 md:p-12 border border-border/50 backdrop-blur-sm shadow-premium">
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-10 order-2 lg:order-1">
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-main">Informations</h3>
              <p className="text-muted-foreground leading-relaxed">
                Notre siège social est basé à Niamey, mais nos équipes
                interviennent sur l'ensemble du territoire nigérien.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-primary tracking-widest">
                    Siège Social
                  </p>
                  <p className="font-bold text-main">
                    Niamey, Quartier Plateau, Niger
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-edu/10 text-edu group-hover:bg-edu group-hover:text-white transition-all duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-edu tracking-widest">
                    Téléphone
                  </p>
                  <p className="font-bold text-main">+227 99 99 99 99</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-impact/10 text-impact group-hover:bg-impact group-hover:text-white transition-all duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-impact tracking-widest">
                    Email
                  </p>
                  <p className="font-bold text-main">
                    contact@makaranta-ong.org
                  </p>
                </div>
              </div>
            </div>

            {/* Social Proof/Stat */}
            <div className="p-6 rounded-3xl bg-card border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-xs font-black text-main uppercase tracking-widest">
                  Equipe active
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Réponse moyenne en moins de{" "}
                <span className="text-main font-bold">24 heures</span> les jours
                ouvrés.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3 bg-card rounded-[2.5rem] p-8 md:p-10 border border-border shadow-premium order-1 lg:order-2">
            <form action="" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstname"
                    className="text-[10px] uppercase font-black tracking-widest text-main/60 ml-2"
                  >
                    Prénom
                  </Label>
                  <Input
                    id="firstname"
                    placeholder="Amos"
                    className="h-14 rounded-2xl border-border bg-muted/30 focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all px-6 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="lastname"
                    className="text-[10px] uppercase font-black tracking-widest text-main/60 ml-2"
                  >
                    Nom
                  </Label>
                  <Input
                    id="lastname"
                    placeholder="Issa"
                    className="h-14 rounded-2xl border-border bg-muted/30 focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all px-6 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-[10px] uppercase font-black tracking-widest text-main/60 ml-2"
                >
                  Adresse Email
                </Label>
                <div className="relative">
                  <Mail
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                    size={18}
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="h-14 pl-14 rounded-2xl border-border bg-muted/30 focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all px-6 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="subject"
                  className="text-[10px] uppercase font-black tracking-widest text-main/60 ml-2"
                >
                  Sujet
                </Label>
                <Input
                  id="subject"
                  placeholder="Devenir partenaire, Faire un don spécifique..."
                  className="h-14 rounded-2xl border-border bg-muted/30 focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all px-6 outline-none"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-[10px] uppercase font-black tracking-widest text-main/60 ml-2"
                >
                  Message
                </Label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Comment pouvons-nous vous aider ?"
                  className="w-full rounded-2xl border border-border bg-muted/30 focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all p-6 outline-none resize-none font-medium text-main min-h-[150px]"
                />
              </div>

              <Button className="w-full h-14 rounded-2xl btn-premium bg-primary text-white text-lg font-bold shadow-primary/20 hover:shadow-primary/40 flex items-center justify-center gap-3">
                Envoyer le message
                <Send size={18} className="translate-y-px" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
