export interface DogParkQuestion {
  id: string;
  slug: string;
  question: string;
  quickAnswer: string;
  answer: string;
  relatedQuestions: string[];
  seo: {
    title: string;
    description: string;
  };
} 