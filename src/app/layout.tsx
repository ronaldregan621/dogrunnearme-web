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
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Best Dog Parks in NYC 2025" />
        <meta property="og:description" content="NYC dog-run directory voted by Reddit's r/AskNYC community." />
        <meta property="og:image" content="/og.jpg" />
        <meta property="og:url" content="https://dogrunnearme.com" />
      </head>
      <body className="antialiased font-sans">
        <NavBar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
