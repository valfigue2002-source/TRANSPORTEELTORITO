import React, { useState } from 'react';
import { MainSection, BookingStep, Trip, Seat, PassengerData, Ticket, Parcel, ServiceType } from './types';
import { MOCK_TRIPS, INITIAL_TICKETS, INITIAL_PARCELS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchStep } from './components/BookingFlow/SearchStep';
import { ResultsStep } from './components/BookingFlow/ResultsStep';
import { SeatSelectionStep } from './components/BookingFlow/SeatSelectionStep';
import { PassengerDataStep } from './components/BookingFlow/PassengerDataStep';
import { PaymentAndTicketStep } from './components/BookingFlow/PaymentAndTicketStep';
import { TicketLookupAndRefund } from './components/TicketLookupAndRefund';
import { ParcelManagement } from './components/ParcelManagement';

export default function App() {
  const [activeSection, setActiveSection] = useState<MainSection>('compra');
  const [bookingStep, setBookingStep] = useState<BookingStep>('busqueda');

  // Search parameters
  const [searchParams, setSearchParams] = useState<{
    origin: string;
    destination: string;
    date: string;
    serviceType: ServiceType | 'todos';
  }>({
    origin: 'Buenos Aires (Retiro)',
    destination: 'Córdoba Capital',
    date: '2025-04-18',
    serviceType: 'todos',
  });

  // Booking Flow selections
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [passengerData, setPassengerData] = useState<PassengerData | null>(null);

  // Tickets & Parcels Database in state
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [parcels, setParcels] = useState<Parcel[]>(INITIAL_PARCELS);

  // 1. Handle search submission
  const handleSearchSubmit = (params: {
    origin: string;
    destination: string;
    date: string;
    serviceType: ServiceType | 'todos';
  }) => {
    setSearchParams(params);
    setBookingStep('resultados');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter trips for results step
  const filteredTrips = MOCK_TRIPS.filter((t) => {
    if (searchParams.serviceType !== 'todos' && t.serviceType !== searchParams.serviceType) {
      return false;
    }
    return true;
  });

  // 2. Handle trip selection
  const handleSelectTrip = (trip: Trip) => {
    setSelectedTrip(trip);
    setBookingStep('asientos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. Handle seat confirmation
  const handleSeatConfirmed = (seat: Seat) => {
    setSelectedSeat(seat);
    setBookingStep('pasajero');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 4. Handle passenger confirmation
  const handlePassengerConfirmed = (data: PassengerData) => {
    setPassengerData(data);
    setBookingStep('pago');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 5. Handle successful ticket purchase
  const handleConfirmPurchase = (newTicket: Ticket) => {
    setTickets((prev) => [newTicket, ...prev]);
  };

  // Start a new booking
  const handleNewBooking = () => {
    setSelectedTrip(null);
    setSelectedSeat(null);
    setPassengerData(null);
    setBookingStep('busqueda');
    setActiveSection('compra');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 6. Handle ticket cancellation & refund
  const handleCancelTicket = (locator: string, refundAmount: number) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.locator === locator
          ? {
              ...t,
              status: 'cancelado',
              refundAmount,
              refundDate: new Date().toLocaleDateString('es-AR'),
            }
          : t
      )
    );
  };

  // 7. Handle parcel addition
  const handleAddParcel = (newParcel: Parcel) => {
    setParcels((prev) => [newParcel, ...prev]);
  };

  // Step indicator steps
  const stepsList = [
    { id: 'busqueda', label: '1. Búsqueda' },
    { id: 'resultados', label: '2. Horarios' },
    { id: 'asientos', label: '3. Asientos' },
    { id: 'pasajero', label: '4. Pasajero' },
    { id: 'pago', label: '5. Pago y Boleto' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      {/* Header */}
      <Header
        activeSection={activeSection}
        onNavigate={(section) => {
          setActiveSection(section);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* COMPRA DE PASAJES (Steps 1 to 5) */}
        {activeSection === 'compra' && (
          <div className="flex-1 flex flex-col">
            {/* Step Breadcrumb Guide (shown after initial search step) */}
            {bookingStep !== 'busqueda' && (
              <div className="bg-white border-b border-[#e2e8f0] py-3 px-4">
                <div className="max-w-2xl mx-auto flex items-center justify-between text-xs">
                  {stepsList.map((st, idx) => {
                    const isCurrent = bookingStep === st.id;
                    const isPast =
                      stepsList.findIndex((s) => s.id === bookingStep) > idx;
                    return (
                      <span
                        key={st.id}
                        className={`font-semibold ${
                          isCurrent
                            ? 'text-[#00288e] font-bold underline underline-offset-4'
                            : isPast
                            ? 'text-[#16a34a]'
                            : 'text-[#94a3b8]'
                        }`}
                      >
                        {st.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 1: Búsqueda */}
            {bookingStep === 'busqueda' && (
              <SearchStep
                onSearch={handleSearchSubmit}
                onNavigateSection={(sec) => setActiveSection(sec)}
              />
            )}

            {/* Step 2: Resultados */}
            {bookingStep === 'resultados' && (
              <ResultsStep
                trips={filteredTrips}
                origin={searchParams.origin}
                destination={searchParams.destination}
                date={searchParams.date}
                onSelectTrip={handleSelectTrip}
                onBack={() => setBookingStep('busqueda')}
              />
            )}

            {/* Step 3: Selección de Asientos */}
            {bookingStep === 'asientos' && selectedTrip && (
              <SeatSelectionStep
                trip={selectedTrip}
                onSeatConfirmed={handleSeatConfirmed}
                onBack={() => setBookingStep('resultados')}
              />
            )}

            {/* Step 4: Datos del Pasajero */}
            {bookingStep === 'pasajero' && selectedTrip && selectedSeat && (
              <PassengerDataStep
                trip={selectedTrip}
                seat={selectedSeat}
                onPassengerConfirmed={handlePassengerConfirmed}
                onBack={() => setBookingStep('asientos')}
              />
            )}

            {/* Step 5: Pago y Emisión del Pasaje */}
            {bookingStep === 'pago' && selectedTrip && selectedSeat && passengerData && (
              <PaymentAndTicketStep
                trip={selectedTrip}
                seat={selectedSeat}
                passenger={passengerData}
                onConfirmPurchase={handleConfirmPurchase}
                onNewBooking={handleNewBooking}
                onBack={() => setBookingStep('pasajero')}
              />
            )}
          </div>
        )}

        {/* 6. CONSULTA Y DEVOLUCIÓN DE PASAJES */}
        {activeSection === 'consulta' && (
          <TicketLookupAndRefund
            tickets={tickets}
            onCancelTicket={handleCancelTicket}
          />
        )}

        {/* 7. GESTIÓN BÁSICA DE ENCOMIENDAS */}
        {activeSection === 'encomiendas' && (
          <ParcelManagement
            parcels={parcels}
            onAddParcel={handleAddParcel}
          />
        )}
      </main>

      {/* Clean Footer */}
      <Footer
        onNavigate={(section) => {
          setActiveSection(section);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
