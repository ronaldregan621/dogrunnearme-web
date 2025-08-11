export interface DogFriendlyTrail {
  id: string;
  name: string;
  slug: string;
  location: {
    area: string; // e.g., "The Bronx" or "Upstate NY"
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  length: string; // e.g., "3.5 miles"
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  description: string;
  leash_rules: string;
  photos: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
} 