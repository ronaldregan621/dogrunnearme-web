import { dogParkQuestions } from '@/data/dogParkQuestions';
import Link from 'next/link';

export default function QuestionsHubPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Dog Park Q&A
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Your guide to navigating the NYC dog park scene.
        </p>
      </div>

      <div className="space-y-8">
        {dogParkQuestions.map((q) => (
          <div key={q.slug}>
            <Link href={`/questions/${q.slug}`}>
              <h2 className="text-2xl font-semibold text-gray-900 hover:text-blue-700">
                {q.title}
              </h2>
            </Link>
            <p className="mt-2 text-gray-600">
              {q.quickAnswer}
            </p>
            <Link href={`/questions/${q.slug}`} className="text-blue-600 hover:text-blue-700 font-semibold mt-2 inline-block">
              Read More &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
} 