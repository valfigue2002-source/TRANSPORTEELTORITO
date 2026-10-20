import React, { useState } from 'react';
import { Ticket } from '../types';
import { ToritoLogo } from './ToritoLogo';

interface TicketLookupAndRefundProps {
  tickets: Ticket[];
  onCancelTicket: (locator: string, refundAmount: number) => void;
}

export const TicketLookupAndRefund: React.FC<TicketLookupAndRefundProps> = ({
  tickets,
  onCancelTicket,
}) => {
  const [query, setQuery] = useState('TOR-84920');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(tickets[0] || null);
  const [notification, setNotification] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim().toUpperCase();
    const cleanDni = query.trim().replace(/\D/g, '');

    const found = tickets.find(
      (t) =>
        t.locator.toUpperCase() === clean ||
        t.passenger.documentNumber.replace(/\D/g, '') === cleanDni
    );

    if (found) {
      setSelectedTicket(found);
      setNotification(`Reserva encontrada: ${found.locator}`);
    } else {
      setSelectedTicket(null);
      setNotification('No se encontró ninguna reserva con ese código o DNI.');
    }
  };

  // Cálculo de devolución según anticipación legal
  const calculateRefund = (ticket: Ticket) => {
    // Escala general: 90% reintegro (10% retención por anticipación > 48h)
    const refundAmount = Math.round(ticket.totalPrice * 0.9);
    const retention = ticket.totalPrice - refundAmount;
    return { refundAmount, retention };
  };

  const handleConfirmCancellation = () => {
    if (selectedTicket) {
      const { refundAmount } = calculateRefund(selectedTicket);
      onCancelTicket(selectedTicket.locator, refundAmount);
      setSelectedTicket({
        ...selectedTicket,
        status: 'cancelado',
        refundAmount,
        refundDate: new Date().toLocaleDateString('es-AR'),
      });
      setShowConfirmModal(false);
      setNotification(
        `Cancelación procesada. Reintegro acreditado: $${refundAmount.toLocaleString('es-AR')} ARS (Retención administrativa 10%).`
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full py-8 px-4 flex flex-col gap-6">
      {/* Screen Title */}
      <div className="pb-4 border-b border-[#e2e8f0]">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0b2545]">
          Consulta y Devolución de Pasajes
        </h2>
        <p className="text-xs sm:text-sm text-[#495f82] mt-0.5">
          Consultá el estado de tu boleto con tu código de reserva o DNI y gestioná cancelaciones con reintegro según normativa vigente.
        </p>
      </div>

      {/* Notification banner */}
      {notification && (
        <div className="p-3 bg-[#eff4ff] text-[#00288e] text-xs font-semibold rounded-lg border border-[#d3e4fe] flex items-center justify-between">
          <span>{notification}</span>
          <button
            onClick={() => setNotification(null)}
            className="text-[#495f82] hover:text-[#0b2545]"
          >
            ✕
          </button>
        </div>
      )}

      {/* Query Form */}
      <div className="bg-white p-5 rounded-xl border border-[#cbd5e1] shadow-xs">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <label className="block text-xs font-bold text-[#0b2545] uppercase tracking-wider mb-1">
              Código de Reserva o DNI del Pasajero
            </label>
            <input
              type="text"
              required
              placeholder="Ej: TOR-84920 o 14892402"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-[#cbd5e1] rounded-lg font-mono uppercase focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="sm:self-end px-5 py-2.5 rounded-lg bg-[#00288e] hover:bg-[#001c66] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">search</span>
            <span>Consultar</span>
          </button>
        </form>

        {/* Quick Demo Links */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#f1f5f9] text-xs text-[#64748b]">
          <span>Ejemplos:</span>
          {tickets.map((t) => (
            <button
              key={t.locator}
              type="button"
              onClick={() => {
                setQuery(t.locator);
                setSelectedTicket(t);
                setNotification(null);
              }}
              className="text-[#00288e] font-mono hover:underline cursor-pointer"
            >
              {t.locator}
            </button>
          ))}
        </div>
      </div>

      {/* Result Card */}
      {selectedTicket && (
        <div className="bg-white rounded-xl border border-[#cbd5e1] p-6 shadow-xs flex flex-col gap-4">
          {/* Header of Ticket */}
          <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0] flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <ToritoLogo size="sm" variant="dark" />
              <div>
                <span className="text-[10px] text-[#64748b] uppercase font-bold block">
                  Localizador de Pasaje
                </span>
                <span className="text-lg font-bold font-mono text-[#00288e]">
                  {selectedTicket.locator}
                </span>
              </div>
            </div>

            {/* Status Badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                selectedTicket.status === 'confirmado'
                  ? 'bg-[#dcfce7] text-[#166534]'
                  : 'bg-[#fee2e2] text-[#991b1b]'
              }`}
            >
              {selectedTicket.status === 'confirmado' ? 'Boleto Válido para Abordar' : 'Boleto Cancelado'}
            </span>
          </div>

          {/* Ticket Information */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] text-[#64748b] uppercase block">Origen y Destino</span>
              <span className="font-bold text-[#0b2545]">
                {selectedTicket.trip.origin} → {selectedTicket.trip.destination}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-[#64748b] uppercase block">Fecha y Horario</span>
              <span className="font-bold text-[#0b2545]">
                {selectedTicket.trip.date} • {selectedTicket.trip.departureTime} hs
              </span>
            </div>

            <div>
              <span className="text-[10px] text-[#64748b] uppercase block">Pasajero</span>
              <span className="font-bold text-[#0b2545]">
                {selectedTicket.passenger.fullName} (DNI: {selectedTicket.passenger.documentNumber})
              </span>
            </div>

            <div>
              <span className="text-[10px] text-[#64748b] uppercase block">Asiento</span>
              <span className="font-bold text-[#00288e]">
                Butaca #{selectedTicket.seatNumber} ({selectedTicket.deck === 1 ? 'P. Baja' : 'P. Alta'})
              </span>
            </div>

            <div>
              <span className="text-[10px] text-[#64748b] uppercase block">Monto Abonado</span>
              <span className="font-bold text-[#0b2545] font-mono">
                ${selectedTicket.totalPrice.toLocaleString('es-AR')} ARS
              </span>
            </div>

            <div>
              <span className="text-[10px] text-[#64748b] uppercase block">Emisión</span>
              <span className="font-bold text-[#0b2545]">{selectedTicket.purchaseDate}</span>
            </div>
          </div>

          {/* If cancelled, show refund info */}
          {selectedTicket.status === 'cancelado' && (
            <div className="p-3 bg-[#fef2f2] rounded-lg border border-[#fca5a5] text-xs text-[#991b1b]">
              <span className="font-bold block">Pasaje Cancelado</span>
              <span>
                Monto reintegrado: ${selectedTicket.refundAmount?.toLocaleString('es-AR')} ARS acreditado a la cuenta origen.
              </span>
            </div>
          )}

          {/* Cancellation Button (Only if still confirmed) */}
          {selectedTicket.status === 'confirmado' && (
            <div className="pt-4 border-t border-[#e2e8f0] flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-[#64748b]">
                Reintegro estimado: ${calculateRefund(selectedTicket).refundAmount.toLocaleString('es-AR')} ARS (10% retención legal).
              </span>

              <button
                onClick={() => setShowConfirmModal(true)}
                className="px-4 py-2 bg-[#fee2e2] hover:bg-[#fca5a5] text-[#991b1b] rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Solicitar Cancelación y Reintegro
              </button>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b2545]/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-[#cbd5e1] flex flex-col gap-4">
            <h3 className="font-bold text-base text-[#0b2545]">
              Confirmar Cancelación de Pasaje
            </h3>

            <p className="text-xs text-[#475569] leading-relaxed">
              ¿Estás seguro de cancelar la reserva <strong>{selectedTicket.locator}</strong> a nombre de <strong>{selectedTicket.passenger.fullName}</strong>?
            </p>

            <div className="p-3 bg-[#eff4ff] rounded-lg border border-[#d3e4fe] text-xs flex flex-col gap-1">
              <div className="flex justify-between">
                <span>Monto original:</span>
                <span className="font-mono">${selectedTicket.totalPrice.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between text-[#dc2626]">
                <span>Retención legal (10%):</span>
                <span className="font-mono">-${calculateRefund(selectedTicket).retention.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between font-bold text-[#00288e] pt-1 border-t border-[#d3e4fe]">
                <span>Monto a reintegrar:</span>
                <span className="font-mono">${calculateRefund(selectedTicket).refundAmount.toLocaleString('es-AR')} ARS</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-[#64748b] hover:bg-[#f1f5f9] cursor-pointer"
              >
                Volver
              </button>
              <button
                type="button"
                onClick={handleConfirmCancellation}
                className="px-4 py-2 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-bold cursor-pointer"
              >
                Confirmar Cancelación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
