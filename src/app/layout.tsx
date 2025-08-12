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
  keywords: "dog park near me, dog parks NYC, dog parks within 5 mi, NYC off-leash hours, best dog parks Brooklyn, dog-friendly parks Manhattan, dog park reviews, local dog parks",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'DogRunNearMe',
              url: 'https://www.dogrunnearme.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://www.dogrunnearme.com/parks?near={search_term_string}',
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
      </head>
      <body className="antialiased font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-3 py-2 rounded">Skip to content</a>
        <NavBar />
        <main id="main" role="main">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
