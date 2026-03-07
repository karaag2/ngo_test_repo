import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="pt-24 pb-12 px-6 border-t border-border bg-secondary/30 backdrop-blur-md">
      <div className="container mx-auto flex flex-col gap-y-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col gap-y-6">
            <div className="flex items-center gap-x-4 group cursor-pointer w-fit">
              <div className="relative w-10 h-10 flex items-center justify-center bg-primary rounded-xl rotate-3 group-hover:rotate-0 transition-transform duration-300">
                <Image
                  src="/logo.svg"
                  alt="Logo FJ"
                  width={32}
                  height={32}
                  className="w-6 h-6 invert"
                />
              </div>
              <span className="text-2xl font-black tracking-tighter text-main">
                FJ
              </span>
            </div>
            <p className="text-sm font-medium text-muted-foreground leading-relaxed max-w-xs">
              Fajr œuvre pour transformer l'avenir des enfants au Niger par
              l'éducation de qualité et des infrastructures durables.
            </p>
            <div className="flex gap-x-4">
              {[TwitterIcon, FacebookIcon, InstagramIcon, LinkedinIcon].map(
                (Icon, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="p-2.5 rounded-full bg-card border border-border text-main hover:bg-primary hover:text-white hover:-translate-y-1 transition-all shadow-sm"
                  >
                    <Icon size={18} />
                  </Link>
                ),
              )}
            </div>
          </div>
          {/* Sitemap */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-main">
              Sitemap
            </h4>
            <ul className="grid gap-y-3 text-sm font-bold text-main/60">
              <li>
                <Link
                  href="#hero"
                  className="hover:text-primary transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="#cause"
                  className="hover:text-primary transition-colors"
                >
                  La Réalité
                </Link>
              </li>
              <li>
                <Link
                  href="#mission"
                  className="hover:text-primary transition-colors"
                >
                  Notre Mission
                </Link>
              </li>
              <li>
                <Link
                  href="#activites"
                  className="hover:text-primary transition-colors"
                >
                  Les Activités
                </Link>
              </li>
              <li>
                <Link
                  href="#donation"
                  className="hover:text-primary transition-colors"
                >
                  Faire un don
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-main">
              Projets
            </h4>
            <ul className="grid gap-y-3 text-sm font-bold text-main/60">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Construction d'écoles
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Formation enseignants
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Kits scolaires
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Bourses d'études
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-main">
              Contact
            </h4>
            <ul className="grid gap-y-3 text-sm font-medium text-main/60">
              <li className="flex items-start gap-2">
                <span className="text-primary font-black uppercase text-[10px] mt-1 shrink-0">
                  Email:
                </span>
                <span className="break-all text-xs">contact@Fajr-ong.org</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-black uppercase text-[10px] mt-1 shrink-0">
                  Tel:
                </span>
                <span>+227 99 99 99 99</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-black uppercase text-[10px] mt-1 shrink-0">
                  Siège:
                </span>
                <span>Niamey, Plateau, Niger</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-y-6 pt-12 border-t border-border/50">
          <p className="text-sm font-medium text-muted-foreground">
            &copy; 2026 Fajr ONG. Design for Change.
          </p>
          <div className="flex gap-x-8 text-xs font-black uppercase tracking-[0.2em] text-main/40">
            <Link href="#privacy" className="hover:text-main transition-colors">
              Confidentialité
            </Link>
            <Link href="#terms" className="hover:text-main transition-colors">
              Mentions Légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
