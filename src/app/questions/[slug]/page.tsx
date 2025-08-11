import { dogParkQuestions } from '@/data/dogParkQuestions';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const question = dogParkQuestions.find((q) => q.slug === params.slug);
  if (!question) {
    return { title: 'Question Not Found' };
  }
  return {
    title: question.seo.title,
    description: question.seo.description,
  };
}

export default function QuestionDetailsPage({ params }: Props) {
  const question = dogParkQuestions.find((q) => q.slug === params.slug);
  if (!question) return notFound();

  const related = dogParkQuestions.filter(q => question.relatedQuestions.includes(q.slug));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className="prose lg:prose-xl">
        <h1>{question.question}</h1>
        <div dangerouslySetInnerHTML={{ __html: question.answer }} />
      </article>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Questions</h2>
        <div className="space-y-4">
          {related.map(q => (
            <Link key={q.id} href={`/questions/${q.slug}`} className="block p-4 rounded-lg bg-white shadow hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900">{q.question}</h3>
              <p className="text-sm text-gray-600 mt-1">{q.quickAnswer}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Link href="/questions" className="text-blue-600 hover:underline">
          &larr; Back to all questions
        </Link>
      </div>
    </div>
  );
} 