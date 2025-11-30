export interface Event {
  id: string;
  title: string;
  date: string; // ISO string
  time: string;
  venue: string;
  location: string;
  price: number;
  image: string;
  category: 'Techno' | 'House' | 'Rooftop' | 'Hip-Hop' | 'Indie';
  description: string;
  organizer: string;
  attendees: number;
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  remaining: number;
  perks: string[];
}

export enum AppRoute {
  HOME = 'home',
  EVENT_DETAILS = 'event-details',
  PROMOTER = 'promoter',
  TICKETS = 'tickets',
}

export interface ChartData {
  name: string;
  views: number;
  bookings: number;
  revenue: number;
}

export interface MyTicket {
  id: string;
  eventId: string;
  tierName: string;
  price: number;
  quantity: number;
  purchaseDate: string;
  status: 'Upcoming' | 'Past' | 'Cancelled';
}