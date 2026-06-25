import type { Metadata } from "next";
import { Fraunces, Source_Serif_4, Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// Display — Fraunces (variable: opsz, soft, wght). Editorial, characterful.
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
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
      className={`${fraunces.variable} ${serif.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
