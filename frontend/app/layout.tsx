import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/components/Layouts/theme-provider";

export const metadata: Metadata = {
  title: "Fajr  · Fajr",
  description: "Fajr — L'éducation pour tous au Sahel",
};
const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr-NE"
      className={`${lexend.className} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className={` antialiased selection:bg-primary/20 selection:text-primary`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
