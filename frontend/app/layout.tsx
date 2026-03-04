import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/sections/header";
import PageLayout from "@/src/components/GlobalLayout";
import Footer from "@/src/components/sections/Footer";
import { ThemeProvider } from "@/src/components/theme-provider";

const lexend = Lexend({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-NE" className="scroll-smooth">
      <body
        className={`${lexend.className} antialiased selection:bg-primary/20 selection:text-primary`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageLayout>
            {children}
            <Footer />
          </PageLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
