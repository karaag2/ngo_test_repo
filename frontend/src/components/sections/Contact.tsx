"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

const Contact = () => {
  return (
    <section
      className="container mx-auto px-6 py-20 relative overflow-hidden"
      id="contact"
    >
      {/* Abstract Background Decoration */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-edu/5 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col gap-y-12 max-w-5xl mx-auto">
        {/* Adjusted Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-black uppercase tracking-[0.3em] text-xs"
          >
            Contactez-nous
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black tracking-tighter text-main leading-tight"
          >
            Bâtissons l'avenir{" "}
            <span className="text-primary italic">Ensemble</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground font-medium text-base italic max-w-xl mx-auto"
          >
            Votre voix compte. Que ce soit pour un partenariat ou une question,
            notre équipe vous répondra avec soin.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Side - Refined Spacing */}
          <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid gap-4"
            >
              {[
                {
                  icon: <MapPin size={20} />,
                  label: "Siège Social",
                  value: "Plateau, Niamey, Niger",
                  color: "bg-primary text-primary",
                },
                {
                  icon: <Phone size={20} />,
                  label: "Téléphone",
                  value: "+227 99 99 99 99",
                  color: "bg-edu text-edu",
                },
                {
                  icon: <Mail size={20} />,
                  label: "Email Officiel",
                  value: "contact@makaranta.org",
                  color: "bg-impact text-impact",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-5 p-5 rounded-2xl bg-secondary/5 border border-border/40 hover:border-primary/20 hover:bg-secondary/10 transition-all duration-300 shadow-sm"
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${item.color.split(" ")[0]}/10 flex items-center justify-center ${item.color.split(" ")[1]} shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    {item.icon}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[9px] uppercase font-black tracking-widest opacity-60">
                      {item.label}
                    </p>
                    <p className="font-bold text-main text-base group-hover:text-primary transition-colors italic">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Compact Trust Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-[2rem] bg-linear-to-br from-primary/5 to-transparent border border-primary/10 relative overflow-hidden group"
            >
              <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:rotate-6 transition-transform duration-1000">
                <ShieldCheck size={120} className="text-primary" />
              </div>
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-[10px] font-black text-main uppercase tracking-widest">
                    Réactivité
                  </p>
                </div>
                <p className="text-muted-foreground font-medium leading-relaxed text-sm italic">
                  Chaque message est précieux. Nous vous répondrons en moins de{" "}
                  <span className="text-primary font-bold">24H</span>.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Form Side - Compact & Clean */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-card border border-border/40 rounded-[2.5rem] p-8 md:p-10 shadow-premium relative order-1 lg:order-2"
          >
            <div className="absolute top-6 right-10 opacity-5 pointer-events-none">
              <MessageSquare size={80} className="text-primary" />
            </div>

            <form action="" className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstname"
                    className="text-[10px] uppercase font-black tracking-widest text-main/60 ml-1"
                  >
                    Prénom
                  </Label>
                  <Input
                    id="firstname"
                    placeholder="Amos"
                    className="h-12 rounded-xl border-border bg-muted/10 focus:bg-background transition-all px-5 font-bold text-main placeholder:font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="lastname"
                    className="text-[10px] uppercase font-black tracking-widest text-main/60 ml-1"
                  >
                    Nom
                  </Label>
                  <Input
                    id="lastname"
                    placeholder="Issa"
                    className="h-12 rounded-xl border-border bg-muted/10 focus:bg-background transition-all px-5 font-bold text-main placeholder:font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-[10px] uppercase font-black tracking-widest text-main/60 ml-1"
                >
                  Email
                </Label>
                <div className="w-full  group flex justify-between items-center h-12 rounded-xl border-border bg-foreground focus:bg-background transition-all px-5 font-bold text-main placeholder:font-medium border">
                  <Mail
                    className="  text-muted-foreground group-focus-within:text-primary transition-colors"
                    size={18}
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="focus-visible:outline-0 focus-visible:ring-0 focus-visible:border-0 text-background"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="text-[10px] uppercase font-black tracking-widest text-main/60 ml-1"
                >
                  Message
                </Label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Comment pouvons-nous vous aider ?"
                  className="w-full rounded-xl border border-border bg-muted/10 focus:bg-background transition-all p-5 outline-none resize-none font-bold text-main min-h-[120px] italic placeholder:font-medium"
                />
              </div>

              <Button className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.2em] text-xs shadow-lg shadow-primary/10 hover:shadow-primary/25 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3">
                C'est envoyé
                <Send size={14} />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
