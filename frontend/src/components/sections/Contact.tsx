"use client";

import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Mail, Phone, MapPin, Send, ShieldCheck, Loader2 } from "lucide-react";
import { submitPublicContact } from "@/src/services/admin.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactInput } from "@/src/lib/public.validators";

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("idle");
    const res = await submitPublicContact(data);
    if (res.success) {
      setStatus("success");
      setServerMessage(
        "Votre message a été envoyé avec succès ! Nous vous répondrons bientôt.",
      );
      reset();
    } else {
      setStatus("error");
      setServerMessage(
        res.message || "Une erreur est survenue lors de l'envoi.",
      );
    }
  };

  return (
    <section
      className="container mx-auto px-6 py-20 relative overflow-hidden"
      id="contact"
    >
      {/* Arrière Plan Flou */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-edu/5 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col gap-y-12 max-w-5xl mx-auto">
        {/* Titre et sous-titre */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-primary font-black uppercase tracking-[0.3em] text-xs">
            Contactez-nous
          </h2>
          <p className="text-3xl md:text-5xl font-black tracking-tighter text-main leading-tight">
            Bâtissons l'avenir{" "}
            <span className="text-primary italic">Ensemble</span>
          </p>
          <p className="text-muted-foreground font-medium text-base italic max-w-xl mx-auto">
            Votre voix compte. Que ce soit pour un partenariat ou une question,
            notre équipe vous répondra avec soin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/*  Cartes d'Informations */}
          <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
            <div className="grid gap-4">
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
                  value: "contact@Fajr.org",
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
            </div>

            {/* Carte secondaire */}
            <div className="p-6 rounded-4xl bg-linear-to-br from-primary/5 to-transparent border border-primary/10 relative overflow-hidden group">
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
            </div>
          </div>

          {/* Formulaire de Contact */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-8 md:p-10 rounded-[3rem] bg-card border border-border shadow-premium relative overflow-hidden group/form"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover/form:bg-primary/10 transition-colors duration-500" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-[10px] uppercase font-black tracking-widest text-main/60 px-2"
                  >
                    Prénom
                  </Label>
                  <Input
                    id="firstName"
                    {...register("firstName")}
                    placeholder="Amadou"
                    autoComplete="given-name"
                    className={`h-14 rounded-2xl border ${errors.firstName ? "border-destructive" : "border-border"} bg-secondary/5 focus:bg-background transition-all px-6 font-bold text-main placeholder:font-medium`}
                  />
                  {errors.firstName && (
                    <p className="text-[10px] text-destructive font-semibold px-2">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-[10px] uppercase font-black tracking-widest text-main/60 px-2"
                  >
                    Nom de famille
                  </Label>
                  <Input
                    id="lastName"
                    {...register("lastName")}
                    placeholder="Moumouni"
                    autoComplete="family-name"
                    className={`h-14 rounded-2xl border ${errors.lastName ? "border-destructive" : "border-border"} bg-secondary/5 focus:bg-background transition-all px-6 font-bold text-main placeholder:font-medium`}
                  />
                  {errors.lastName && (
                    <p className="text-[10px] text-destructive font-semibold px-2">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <Label
                  htmlFor="email"
                  className="text-[10px] uppercase font-black tracking-widest text-main/60 px-2"
                >
                  Adresse Email Professionnelle
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="amadou@exemple.com"
                    autoComplete="email"
                    className={`h-14 rounded-2xl border ${errors.email ? "border-destructive" : "border-border"} bg-secondary/5 focus:bg-background transition-all pl-12 pr-6 font-bold text-main placeholder:font-medium`}
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
                {errors.email && (
                  <p className="text-[10px] text-destructive font-semibold px-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 mb-8">
                <Label
                  htmlFor="message"
                  className="text-[10px] uppercase font-black tracking-widest text-main/60 px-2"
                >
                  Votre Message
                </Label>
                <textarea
                  id="message"
                  {...register("message")}
                  rows={5}
                  placeholder="Décrivez votre projet ou votre question..."
                  aria-label="Votre message"
                  className={`w-full p-6 rounded-4xl border ${errors.message ? "border-destructive" : "border-border"} bg-secondary/5 focus:bg-background transition-all font-bold text-main placeholder:font-medium outline-none resize-none min-h-[160px]`}
                />
                {errors.message && (
                  <p className="text-[10px] text-destructive font-semibold px-2">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto min-w-[200px] h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all group"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Envoyer le message
                      <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
