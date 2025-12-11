export enum VenueType {
  WEDDING = 'Wedding',
  CORPORATE = 'Corporate',
  PARTY = 'Party',
  STUDIO = 'Studio',
  OUTDOOR = 'Outdoor'
}

export interface Venue {
  id: string;
  name: string;
  description: string;
  location: string;
  pricePerHour: number;
  capacity: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  type: VenueType;
  amenities: string[];
  features: string[]; // For AI matching
}

export interface Booking {
  id: string;
  venueId: string;
  venueName: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  guestCount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface AIRecommendation {
  venueIds: string[];
  reasoning: string;
}
