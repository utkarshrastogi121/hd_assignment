export interface Experience {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string;
  availableSlots: string[];
}

export interface Booking {
  experienceId: string;
  name: string;
  email: string;
  date: string;
  slot: string;
  promoCode?: string;
}
