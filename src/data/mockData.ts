import { Trip, Seat, Ticket, Parcel } from '../types';

export const CITIES_LIST = [
  'Buenos Aires (Retiro)',
  'Buenos Aires (Liniers)',
  'Córdoba Capital',
  'Mar del Plata',
  'Mendoza Terminal',
  'Rosario',
  'San Carlos de Bariloche',
  'Salta',
];

export const MOCK_TRIPS: Trip[] = [
  {
    id: 'TRIP-101',
    origin: 'Buenos Aires (Retiro)',
    destination: 'Córdoba Capital',
    departureTime: '21:30',
    arrivalTime: '06:45',
    duration: '9h 15m',
    date: '2025-04-18',
    serviceType: 'cama',
    price: 36000,
    availableSeats: 8,
    coachNumber: 'Coche 104',
  },
  {
    id: 'TRIP-102',
    origin: 'Buenos Aires (Retiro)',
    destination: 'Córdoba Capital',
    departureTime: '08:00',
    arrivalTime: '17:15',
    duration: '9h 15m',
    date: '2025-04-18',
    serviceType: 'semicama',
    price: 29500,
    availableSeats: 16,
    coachNumber: 'Coche 112',
  },
  {
    id: 'TRIP-103',
    origin: 'Buenos Aires (Retiro)',
    destination: 'Mar del Plata',
    departureTime: '07:15',
    arrivalTime: '12:00',
    duration: '4h 45m',
    date: '2025-04-18',
    serviceType: 'semicama',
    price: 26000,
    availableSeats: 12,
    coachNumber: 'Coche 115',
  },
  {
    id: 'TRIP-104',
    origin: 'Buenos Aires (Retiro)',
    destination: 'Mar del Plata',
    departureTime: '23:45',
    arrivalTime: '04:30',
    duration: '4h 45m',
    date: '2025-04-18',
    serviceType: 'cama',
    price: 33000,
    availableSeats: 6,
    coachNumber: 'Coche 118',
  },
  {
    id: 'TRIP-105',
    origin: 'Buenos Aires (Retiro)',
    destination: 'Mendoza Terminal',
    departureTime: '19:00',
    arrivalTime: '08:30',
    duration: '13h 30m',
    date: '2025-04-18',
    serviceType: 'cama',
    price: 45000,
    availableSeats: 9,
    coachNumber: 'Coche 120',
  },
];

export const generateSeats = (servicePrice: number): Seat[] => {
  const seats: Seat[] = [];

  // Planta Baja (Deck 1): 8 butacas (1 y 2 son accesibles / CUD)
  for (let i = 1; i <= 8; i++) {
    seats.push({
      id: `seat-${i}`,
      number: i,
      deck: 1,
      isOccupied: i === 3 || i === 4,
      isAccessible: i === 1 || i === 2,
      price: servicePrice,
    });
  }

  // Planta Alta (Deck 2): 24 butacas
  for (let i = 9; i <= 32; i++) {
    seats.push({
      id: `seat-${i}`,
      number: i,
      deck: 2,
      isOccupied: [11, 12, 17, 18, 25, 26].includes(i),
      isAccessible: false,
      price: servicePrice,
    });
  }

  return seats;
};

export const INITIAL_TICKETS: Ticket[] = [
  {
    locator: 'TOR-84920',
    trip: MOCK_TRIPS[0],
    seatNumber: 5,
    deck: 1,
    passenger: {
      fullName: 'Carlos Alberto Bianchi',
      documentType: 'DNI',
      documentNumber: '14.892.402',
      birthDate: '1968-04-26',
      email: 'carlos.bianchi@gmail.com',
      phone: '11 4455-8899',
      isMinor: false,
      hasCUD: false,
    },
    purchaseDate: '14/04/2025 10:15 hs',
    totalPrice: 36000,
    paymentMethod: 'Tarjeta de Débito',
    status: 'confirmado',
  },
  {
    locator: 'TOR-71204',
    trip: MOCK_TRIPS[2],
    seatNumber: 15,
    deck: 2,
    passenger: {
      fullName: 'Lucía Fernández',
      documentType: 'DNI',
      documentNumber: '39.401.882',
      birthDate: '1996-09-12',
      email: 'lucia.f@hotmail.com',
      phone: '11 5566-2211',
      isMinor: false,
      hasCUD: false,
    },
    purchaseDate: '15/04/2025 16:40 hs',
    totalPrice: 26000,
    paymentMethod: 'Mercado Pago / Transferencia',
    status: 'confirmado',
  },
];

export const INITIAL_PARCELS: Parcel[] = [
  {
    trackingCode: 'ENC-2025-0194',
    senderName: 'Marta Gómez',
    senderDni: '23.441.902',
    recipientName: 'Juan Pablo Pérez',
    recipientDni: '34.882.110',
    origin: 'Buenos Aires (Retiro)',
    destination: 'Córdoba Capital',
    weightKg: 4.5,
    dimensions: '30x25x20 cm',
    description: 'Caja con repuestos mecánicos',
    date: '17/04/2025',
    status: 'En Tránsito',
  },
  {
    trackingCode: 'ENC-2025-0195',
    senderName: 'Editorial Sol S.R.L.',
    senderDni: '30-71829304-8',
    recipientName: 'Librería Central',
    recipientDni: '27.319.405',
    origin: 'Buenos Aires (Retiro)',
    destination: 'Mar del Plata',
    weightKg: 12.0,
    dimensions: '50x40x30 cm',
    description: 'Paquete de libros escolares',
    date: '18/04/2025',
    status: 'Listo para Retiro',
  },
];
