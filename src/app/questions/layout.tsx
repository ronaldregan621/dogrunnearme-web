import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dog Park Q&A | DogRunNearMe',
  description: 'Find answers to common questions about NYC dog parks, including rules, etiquette, and how to find the best spots for your pup.',
};

export default function QuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50">
      {children}
    </div>
  );
} 