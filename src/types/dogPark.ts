export interface DogPark {
  id: string;
  name: string;
  legacyNames?: string[];
  slug: string;
  location: {
    address: string;
    borough: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  status: 'open' | 'closed' | 'maintenance';
  features: {
    separateAreas: boolean;
    waterFountain: boolean;
    shade: boolean;
    seating: boolean;
    agilityEquipment: boolean;
    doubleGates: boolean;
    wasteBags: boolean;
    lighting: boolean;
  };
  accessibility: {
    wheelchairAccessible: boolean;
    pavedPaths: boolean;
    easyEntry: boolean;
  };
  safety: {
    rating: number;
    separateSmallDogArea: boolean;
    regularMaintenance: boolean;
    emergencyContact: boolean;
  };
  hours: {
    open: string;
    close: string;
    extendedHours: boolean;
  };
  crowdLevel: 'light' | 'moderate' | 'busy';
  reviews: Review[];
  photos: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
} 