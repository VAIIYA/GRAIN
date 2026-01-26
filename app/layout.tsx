import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Using Outfit as a close, high-quality alternative to Google Sans
import "./globals.css";

import { SolanaProvider } from "@/components/SolanaProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "GRAIN | Pinterest Clone",
  description: "A premium Pinterest clone built with Next.js, Turso, and Vercel Blob.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <SolanaProvider>
          {children}
        </SolanaProvider>
      </body>
    </html>
  );
}
