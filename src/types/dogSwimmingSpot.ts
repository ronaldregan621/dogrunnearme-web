export interface DogSwimmingSpot {
  id: string;
  name: string;
  slug: string;
  location: {
    area: string; // e.g., "Brooklyn", "Upstate NY"
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  type: 'Beach' | 'Lake' | 'Pool' | 'River';
  water_quality: 'Good' | 'Fair' | 'Check Before Visiting';
  description: string;
  rules: string; // e.g., "Off-leash allowed before 9am during offseason."
  photos: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
} 