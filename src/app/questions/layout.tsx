import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dog Park Q&A | DogRunNearMe',
  description: 'Find answers to common questions about NYC dog parks, including rules, etiquette, and how to find the best spots for your pup.',
};

// This layout provides a focused, distraction-free reading experience for the Q&A section.
export default function QuestionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-green-600">
            Dog Park Directory
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
} 