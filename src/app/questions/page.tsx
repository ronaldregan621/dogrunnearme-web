import Link from 'next/link';
import { dogParkQuestions } from '@/data/dogParkQuestions';

export const metadata = {
  title: 'Dog Park Questions & Answers - Complete Guide',
  description: 'Find answers to the most common dog park questions. Learn about safety, alternatives, socialization, and whether dog parks are right for your dog.',
};

export default function QuestionsHub() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">
        Dog Park Questions & Answers
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Everything you need to know about dog parks, socialization, and alternatives
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {dogParkQuestions.map((question) => (
          <Link
            key={question.slug}
            href={`/questions/${question.slug}`}
            className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-3 text-blue-600 hover:underline">
              {question.title}
            </h2>
            <p className="text-gray-600">
              {question.quickAnswer}
            </p>
            <span className="inline-block mt-3 text-sm text-blue-500 hover:underline">
              Read full answer →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
} 