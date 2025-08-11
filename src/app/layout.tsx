import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    template: '%s | DogRunNearMe',
    default: 'DogRunNearMe - The Best NYC Dog Parks, Voted by Redditors',
  },
  description: "Find the best dog parks in NYC with off-leash hours, user photos, and safety reviews. Your guide to dog-friendly parks in Manhattan, Brooklyn, Queens, and more.",
  keywords: "dog parks NYC, dog runs near me, NYC off-leash hours, best dog parks Brooklyn, dog-friendly parks Manhattan, dog park reviews",
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
        <meta property="og:title" content="Best Dog Parks in NYC 2025 | Voted by r/AskNYC" />
        <meta property="og:description" content="The ultimate guide to NYC's top dog runs, featuring off-leash hours, safety ratings, and user-submitted photos." />
        <meta property="og:image" content="https://www.dogrunnearme.com/og-image.png" />
        <meta property="og:url" content="https://www.dogrunnearme.com" />
        <meta name="twitter:card" content="summary_large_image" />
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
