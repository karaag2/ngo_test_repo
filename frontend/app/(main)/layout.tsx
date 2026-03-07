import type { Metadata } from "next";
import Header from "@/src/components/sections/Header";
import PageLayout from "@/src/components/Layouts/GlobalLayout";
import Footer from "@/src/components/sections/Footer";

export const metadata: Metadata = {
  title: "Fajr | L'Éducation pour tous au Sahel",
  description:
    "Fajr est une ONG dédiée à la transformation de l'avenir des enfants par l'éducation au Niger et dans le Sahel.",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageLayout>
      <Header />
      <main>{children}</main>
      <Footer />
    </PageLayout>
  );
}
