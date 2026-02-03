import type { Metadata } from "next";
import { Inter, Poly } from "next/font/google";
import "./globals.css";

import { SolanaProvider } from "@/components/SolanaProvider";
import MobileNav from "@/components/MobileNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poly = Poly({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poly",
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
      <body className={`${inter.variable} ${poly.variable} font-sans antialiased bg-[#F7F9FC] text-[#0A0A0A] min-h-screen`}>
        <div className="app-container pb-20">
          <SolanaProvider>
            {children}
            <MobileNav />
          </SolanaProvider>
        </div>
      </body>
    </html>
  );
}
