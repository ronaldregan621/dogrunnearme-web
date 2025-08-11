export interface DogParkQuestion {
  id: string;
  slug: string;
  question: string;
  answer: string;
  tags: string[];
  seo: {
    title: string;
    description: string;
  };
} 