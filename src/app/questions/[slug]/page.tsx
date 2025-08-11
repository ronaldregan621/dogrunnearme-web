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

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className="prose lg:prose-xl">
        <h1>{question.question}</h1>
        <div dangerouslySetInnerHTML={{ __html: question.answer }} />
        <div className="mt-8">
          <Link href="/questions" className="text-blue-600 hover:underline">
            &larr; Back to all questions
          </Link>
        </div>
      </article>
    </div>
  );
} 