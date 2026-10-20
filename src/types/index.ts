export type ServiceType = 'semicama' | 'cama';

export interface Trip {
  id: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  date: string;
  serviceType: ServiceType;
  price: number;
  availableSeats: number;
  coachNumber: string;
}

export interface Seat {
  id: string;
  number: number;
  deck: 1 | 2; // 1: Planta Baja (Accesible), 2: Planta Alta
  isOccupied: boolean;
  isAccessible: boolean; // Butaca accesible para movilidad reducida / CUD
  price: number;
}

export interface PassengerData {
  fullName: string;
  documentType: 'DNI' | 'Pasaporte' | 'Cédula';
  documentNumber: string;
  birthDate: string;
  email: string;
  phone: string;
  isMinor: boolean;
  hasCUD: boolean;
  cudNumber?: string;
  minorAuthorization?: string;
}

export interface Ticket {
  locator: string;
  trip: Trip;
  seatNumber: number;
  deck: number;
  passenger: PassengerData;
  purchaseDate: string;
  totalPrice: number;
  paymentMethod: string;
  status: 'confirmado' | 'cancelado';
  refundAmount?: number;
  refundDate?: string;
}

export interface Parcel {
  trackingCode: string;
  senderName: string;
  senderDni: string;
  recipientName: string;
  recipientDni: string;
  origin: string;
  destination: string;
  weightKg: number;
  dimensions: string; // ej. 30x20x15 cm
  description: string;
  date: string;
  status: 'En Agencia' | 'En Tránsito' | 'Listo para Retiro' | 'Entregado';
}

export type MainSection = 'compra' | 'consulta' | 'encomiendas';
export type BookingStep = 'busqueda' | 'resultados' | 'asientos' | 'pasajero' | 'pago' | 'confirmacion';
