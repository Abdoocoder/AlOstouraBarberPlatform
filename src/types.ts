export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: 'hair' | 'beard' | 'spa' | 'packages';
}

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  date: string; // ISO string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
}
