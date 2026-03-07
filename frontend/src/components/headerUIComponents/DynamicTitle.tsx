"use client";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

const titles: Record<string, { text: string; message: string; href: string }> =
  {
    "/login": {
      text: "Créer un compte",
      message: "Vous voulez ajouter un nouvel administrateur pour le site ? ",
      href: "/admin/auth/signup",
    },
    "/signup": {
      text: "Se connecter",
      message: "Vous avez déjà un compte ? ",
      href: "/admin/auth/login",
    },
  };

export default function DynamicTitle() {
  const pathname = usePathname();
  let path = pathname.split("/");
  let newpath = path[path.length - 1];
  const title = titles["/" + newpath] || {
    text: "Portail",
    message: "Retour au site public ? ",
    href: "/",
  };

  return (
    <>
      <p className="hidden md:flex">{title.message}</p>
      <Link href={title.href}>
        <Button className="min-[390px]:px-8 px-4 btn-premium bg-primary text-white shadow-primary/20 hover:shadow-primary/40 py-2 h-auto text-sm rounded-full">
          {title.text}
        </Button>
      </Link>
    </>
  );
}
