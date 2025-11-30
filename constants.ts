import { Event, TicketTier, ChartData, MyTicket } from './types';

export const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Neon Horizon: After Hours',
    date: '2023-11-15',
    time: '23:00',
    venue: 'The Void Deck',
    location: 'Mumbai, IN',
    price: 1500,
    image: 'https://picsum.photos/800/600?random=1',
    category: 'Techno',
    description: 'Immerse yourself in a sonic journey through deep techno and industrial beats. Visuals by CyberPunk Lab.',
    organizer: 'Underground Collective',
    attendees: 342,
  },
  {
    id: '2',
    title: 'Skyline Grooves',
    date: '2023-11-16',
    time: '17:00',
    venue: 'Aura Rooftop',
    location: 'Bangalore, IN',
    price: 2500,
    image: 'https://picsum.photos/800/600?random=2',
    category: 'Rooftop',
    description: 'Sunset sessions with the finest house music. Free cocktails for early birds.',
    organizer: 'High Life Ent',
    attendees: 120,
  },
  {
    id: '3',
    title: 'Bass Temple Vol. 4',
    date: '2023-11-18',
    time: '22:00',
    venue: 'Warehouse 42',
    location: 'Delhi, IN',
    price: 800,
    image: 'https://picsum.photos/800/600?random=3',
    category: 'Hip-Hop',
    description: 'The city\'s biggest hip-hop gathering. Rap battles, graffiti showcase, and heavy bass.',
    organizer: 'Street Culture',
    attendees: 850,
  },
  {
    id: '4',
    title: 'Electric Dreams',
    date: '2023-11-20',
    time: '21:00',
    venue: 'Cyber City Club',
    location: 'Pune, IN',
    price: 1200,
    image: 'https://picsum.photos/800/600?random=4',
    category: 'Indie',
    description: 'Live synth-pop bands and indie electronics. A night of nostalgia and future sounds.',
    organizer: 'Indie Wave',
    attendees: 200,
  }
];

export const TICKET_TIERS: TicketTier[] = [
  {
    id: 'early',
    name: 'Early Bird',
    price: 1000,
    remaining: 0,
    perks: ['Entry before 11PM'],
  },
  {
    id: 'phase1',
    name: 'Phase 1 General',
    price: 1500,
    remaining: 150,
    perks: ['Standard Entry'],
  },
  {
    id: 'vip',
    name: 'VIP Access',
    price: 3500,
    remaining: 20,
    perks: ['Skip the queue', 'VIP Area Access', '1 Free Drink'],
  },
];

export const PROMOTER_DATA: ChartData[] = [
  { name: 'Mon', views: 400, bookings: 24, revenue: 24000 },
  { name: 'Tue', views: 300, bookings: 13, revenue: 13000 },
  { name: 'Wed', views: 550, bookings: 45, revenue: 45000 },
  { name: 'Thu', views: 800, bookings: 90, revenue: 90000 },
  { name: 'Fri', views: 1200, bookings: 150, revenue: 150000 },
  { name: 'Sat', views: 1500, bookings: 200, revenue: 200000 },
  { name: 'Sun', views: 900, bookings: 80, revenue: 80000 },
];

export const MOCK_TICKETS: MyTicket[] = [
  {
    id: 'TK-883920',
    eventId: '1',
    tierName: 'VIP Access',
    price: 3500,
    quantity: 2,
    purchaseDate: '2023-11-10T14:30:00Z',
    status: 'Upcoming'
  },
  {
    id: 'TK-129482',
    eventId: '2',
    tierName: 'Early Bird',
    price: 1000,
    quantity: 1,
    purchaseDate: '2023-11-12T09:15:00Z',
    status: 'Upcoming'
  },
  {
    id: 'TK-992123',
    eventId: '3',
    tierName: 'General',
    price: 800,
    quantity: 3,
    purchaseDate: '2023-10-05T18:20:00Z',
    status: 'Past'
  }
];