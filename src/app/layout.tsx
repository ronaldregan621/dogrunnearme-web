import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dog Run Near Me - Find NYC Dog Parks",
  description: "Discover the best dog parks in NYC. Find dog-friendly parks with real-time status, safety ratings, and community reviews.",
  keywords: "dog parks NYC, dog runs near me, off-leash areas, dog-friendly parks, NYC dog parks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <NavBar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
