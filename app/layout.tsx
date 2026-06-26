import type { Metadata } from "next";
import { Cinzel, Source_Serif_4, Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Display — Cinzel. Classical Roman inscriptions, engraved stone character.
const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

// Body — Source Serif 4. Calm, readable, faith-publication-feel.
const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

// Utility — Manrope. Geometric, low-key, doesn't compete with the serifs.
const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SanctuaryMind™ — A Virtual Spiritual Hospital",
  description:
    "Faith-integrated mental wellness — connecting members to spiritual care, community, and licensed mental health pathways.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${serif.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
