import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import Header from "@/src/components/sections/header";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Makaranta | L'Éducation pour tous au Sahel",
  description:
    "Makaranta est une ONG dédiée à la transformation de l'avenir des enfants par l'éducation au Niger et dans le Sahel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
