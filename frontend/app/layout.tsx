import type { Metadata } from "next";
// import { Lexend } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/components/Layouts/theme-provider";
import { LazyMotion, domMax } from "framer-motion";

// const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fajr  · Fajr",
  description: "Fajr — L'éducation pour tous au Sahel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-NE" className="scroll-smooth">
      <body
        className={` antialiased selection:bg-primary/20 selection:text-primary`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LazyMotion features={domMax} strict>
            {children}
          </LazyMotion>
        </ThemeProvider>
      </body>
    </html>
  );
}
