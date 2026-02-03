import type { Metadata } from "next";
import { Space_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";

import { SolanaProvider } from "@/components/SolanaProvider";
import MobileNav from "@/components/MobileNav";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "COMMON PEOPLE",
  description: "By the people, for the people. A decentralized visual platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${fraunces.variable} antialiased min-h-screen`}>
        <div className="page-ambient" aria-hidden="true">
          <div className="ambient-orb orb-a" />
          <div className="ambient-orb orb-b" />
          <div className="ambient-grid" />
        </div>
        <div className="app-container pb-32">
          <SolanaProvider>
            {children}
            <MobileNav />
          </SolanaProvider>
        </div>
      </body>
    </html>
  );
}
