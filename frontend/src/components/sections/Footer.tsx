import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TwitterIcon, FacebookIcon, InstagramIcon, YoutubeIcon, LinkedinIcon } from "lucide-react";
const Footer = () => {
  return (
    <footer className="pt-16 pb-8 px-6 border-t border-foreground/10 ">
      <div className="flex flex-col items-center gap-y-12 w-full">
        <div className="flex max-md:flex-col gap-y-6 md:justify-between w-full md:px-6">
          <div className="flex gap-x-4 justify-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={128}
              height={128}
              className="h-8 w-auto text-primary"
            />
            <span className="text-main text-2xl font-bold">MKRT</span>
          </div>
          <div className="flex gap-x-4">
            <Link href="/"><TwitterIcon className="text-main" size={24} /></Link>
            <Link href="/cause"><LinkedinIcon className="text-main" size={24} /></Link>
            <Link href="/stats"><InstagramIcon className="text-main" size={24} /></Link>
            <Link href="/donation"><YoutubeIcon className="text-main" size={24} /></Link>
          </div>
        </div>
        <div className="flex max-md:flex-col md:justify-between w-full md:px-6 md:items-center gap-y-4 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground py-2">
            &copy; {new Date().getFullYear()} ONG MKRT. Tous droits réservés.
          </p>
          <div className="flex gap-x-4">
            <Link href="/privacy" className="text-sm ">Politique de confidentialité</Link>
            <Link href="/terms" className="text-sm">Conditions d'utilisation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
