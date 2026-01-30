import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { SolanaProvider } from "@/components/SolanaProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GRAIN | The Everything Canvas",
  description: "Discover, create, and share visual ideas on the decentralized Pinterest. Built with Web3 technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-black text-white`}>
        <SolanaProvider>
          {children}
        </SolanaProvider>
      </body>
    </html>
  );
}
