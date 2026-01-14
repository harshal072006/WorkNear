
export enum WorkerCategory {
  ELECTRICIAN = 'Electrician',
  PLUMBER = 'Plumber',
  PAINTER = 'Painter',
  CARPENTER = 'Carpenter',
  CLEANER = 'Cleaner',
  OTHER = 'Other'
}

export interface PortfolioItem {
  id: string;
  imageUrl: string;
  description: string;
}

export interface WorkerProfile {
  id: string;
  name: string;
  phone: string;
  category: WorkerCategory;
  rating: number;
  hourlyRate: number;
  location: string;
  description: string;
  imageUrl: string;
  reviews: number;
  availability: {
    days: string[];
    hours: string;
  };
  subSpecializations: string[];
  portfolio: PortfolioItem[];
  status: 'pending' | 'approved' | 'rejected';
  mapPosition?: { top: string; left: string }; // Position for the demo map view
}

export type BookingStatus = 'pending' | 'confirmed' | 'on_way' | 'arrived' | 'in_progress' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  workerId: string;
  workerName: string;
  category: WorkerCategory;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  status: BookingStatus;
  price: number;
  imageUrl: string;
  location: string;
  problemDescription?: string;
  hasReview: boolean;
}