import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { SolanaProvider } from "@/components/SolanaProvider";
import MobileNav from "@/components/MobileNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-black text-white min-h-screen`}>
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
