import { dogParkQuestions } from '@/data/dogParkQuestions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return dogParkQuestions.map((question) => ({
    slug: question.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const question = dogParkQuestions.find(q => q.slug === slug);
  
  if (!question) {
    return {
      title: 'Question Not Found',
    } as any;
  }

  return {
    title: question.title,
    description: question.metaDescription,
    openGraph: {
      title: question.title,
      description: question.metaDescription,
    },
  } as any;
}

export default async function QuestionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const question = dogParkQuestions.find(q => q.slug === slug);
  
  if (!question) {
    notFound();
  }

  const relatedQuestions = dogParkQuestions.filter(q => 
    question.relatedQuestions.includes(q.slug)
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: {
      '@type': 'Question',
      name: question.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: question.fullAnswer,
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <nav className="mb-6">
        <Link href="/questions" className="text-blue-600 hover:underline">
          ← Back to All Questions
        </Link>
      </nav>

      <article>
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          {question.title}
        </h1>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <p className="font-semibold text-gray-800">Quick Answer:</p>
          <p className="text-gray-700 mt-2">{question.quickAnswer}</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed text-lg">
            {question.fullAnswer}
          </p>
        </div>

        <section className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Related Questions</h2>
          <div className="grid gap-4">
            {relatedQuestions.map((related) => (
              <Link
                key={related.slug}
                href={`/questions/${related.slug}`}
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <h3 className="font-semibold text-blue-600 hover:underline">
                  {related.title}
                </h3>
                <p className="text-gray-600 mt-1 text-sm">
                  {related.quickAnswer}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 bg-green-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Find Dog Parks Near You</h2>
          <p className="text-gray-700 mb-4">
            Discover the best dog parks in your area with reviews, photos, and amenities.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Browse Dog Parks Directory
          </Link>
        </section>
      </article>
    </div>
  );
} 