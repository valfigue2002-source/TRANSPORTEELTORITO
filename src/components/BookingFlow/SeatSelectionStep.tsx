import React, { useState, useEffect } from 'react';
import { Trip, Seat } from '../../types';
import { generateSeats } from '../../data/mockData';

interface SeatSelectionStepProps {
  trip: Trip;
  onSeatConfirmed: (seat: Seat) => void;
  onBack: () => void;
}

export const SeatSelectionStep: React.FC<SeatSelectionStepProps> = ({
  trip,
  onSeatConfirmed,
  onBack,
}) => {
  const [seats, setSeats] = useState<Seat[]>(() => generateSeats(trip.price));
  const [activeDeck, setActiveDeck] = useState<1 | 2>(1);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  // 5-Minute Hold Timer
  const [countdown, setCountdown] = useState<number>(300);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerStarted && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && timerStarted) {
      setSelectedSeat(null);
      setTimerStarted(false);
      alert('El tiempo de reserva temporal de 5 minutos ha finalizado. Por favor seleccioná nuevamente tu asiento.');
    }
    return () => clearInterval(interval);
  }, [timerStarted, countdown]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleToggleSeat = (seat: Seat) => {
    if (seat.isOccupied) return;

    if (selectedSeat?.id === seat.id) {
      setSelectedSeat(null);
      setTimerStarted(false);
    } else {
      setSelectedSeat(seat);
      setTimerStarted(true);
      setCountdown(300);
    }
  };

  const handleContinue = () => {
    if (selectedSeat) {
      onSeatConfirmed(selectedSeat);
    }
  };

  const currentDeckSeats = seats.filter((s) => s.deck === activeDeck);

  return (
    <div className="max-w-3xl mx-auto w-full py-8 px-4 flex flex-col gap-6">
      {/* Route and Header */}
      <div className="bg-white rounded-xl border border-[#cbd5e1] p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-xs font-bold text-[#00288e] hover:underline cursor-pointer mb-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Volver a horarios
          </button>
          <h2 className="text-xl font-bold text-[#0B2545]">
            Plano de Asientos • {trip.coachNumber}
          </h2>
          <span className="text-xs text-[#64748b]">
            {trip.origin} → {trip.destination} • Salida: {trip.departureTime} hs
          </span>
        </div>

        {/* 5-Min Timer Pill */}
        {timerStarted && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#fff1f2] border border-[#D9261C] text-[#D9261C] text-xs font-bold shadow-xs animate-pulse">
            <span className="material-symbols-outlined text-[18px]">timer</span>
            <span>Bloqueo asegurado: {formatTimer(countdown)}</span>
          </div>
        )}
      </div>

      {/* Main Bus Schematic Card */}
      <div className="bg-white rounded-2xl border border-[#cbd5e1] p-6 shadow-xs flex flex-col gap-6">
        {/* Deck Switch Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-[#f1f5f9]">
          <div className="flex bg-[#f1f5f9] p-1 rounded-xl gap-1">
            <button
              onClick={() => setActiveDeck(1)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDeck === 1
                  ? 'bg-white text-[#0B2545] shadow-xs'
                  : 'text-[#495f82] hover:text-[#0B2545]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">accessible</span>
              <span>Planta Baja (Accesible / Prioritario)</span>
            </button>

            <button
              onClick={() => setActiveDeck(2)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDeck === 2
                  ? 'bg-white text-[#0B2545] shadow-xs'
                  : 'text-[#495f82] hover:text-[#0B2545]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>Planta Alta (Panorámico)</span>
            </button>
          </div>

          <span className="text-xs font-semibold text-[#00288e] bg-[#eff4ff] px-3 py-1 rounded-full border border-[#d3e4fe]">
            {activeDeck === 1 ? 'Butacas 1 a 8' : 'Butacas 9 a 32'}
          </span>
        </div>

        {/* Coach Graphic Canvas */}
        <div className="bg-[#f8fafc] rounded-xl border border-[#e2e8f0] p-6 flex flex-col items-center">
          {/* Front of bus banner */}
          <div className="w-full max-w-sm flex items-center justify-between pb-3 mb-3 border-b border-[#e2e8f0] text-xs font-bold text-[#64748b]">
            <span className="flex items-center gap-1 text-[#0B2545]">
              <span className="material-symbols-outlined text-[18px]">sports_motorsports</span>
              Cabina Chofer
            </span>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-[#cbd5e1]">
              {activeDeck === 1 ? 'Deck 1 • Piso Inferior' : 'Deck 2 • Piso Superior'}
            </span>
            <span className="flex items-center gap-1">
              Parabrisas
              <span className="material-symbols-outlined text-[16px]">expand_less</span>
            </span>
          </div>

          {/* Lower deck accessibility & restroom note */}
          {activeDeck === 1 && (
            <div className="w-full max-w-sm mb-4 p-3 rounded-lg bg-[#eff4ff] border border-[#d3e4fe] text-xs text-[#00288e] flex items-center justify-between font-medium">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">accessible</span>
                Butacas 1 y 2 reservadas Ley 22.431 CUD
              </span>
              <span className="text-[11px] text-[#495f82] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">wc</span>
                Sanitario
              </span>
            </div>
          )}

          {/* Seat Grid */}
          <div className="grid grid-cols-4 gap-3 max-w-xs w-full py-3 justify-items-center">
            {currentDeckSeats.map((seat) => {
              const isSelected = selectedSeat?.id === seat.id;
              const isOccupied = seat.isOccupied;
              const isAccessible = seat.isAccessible;

              return (
                <button
                  key={seat.id}
                  disabled={isOccupied}
                  onClick={() => handleToggleSeat(seat)}
                  className={`w-12 h-12 rounded-lg font-bold text-xs flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                    isOccupied
                      ? 'bg-[#e2e8f0] text-[#94a3b8] border border-[#cbd5e1] cursor-not-allowed opacity-60'
                      : isSelected
                      ? 'bg-[#00288e] text-white border-2 border-[#00288e] shadow-md scale-105'
                      : isAccessible
                      ? 'bg-[#f0f9ff] text-[#0284c7] border-2 border-[#0284c7] hover:bg-[#e0f2fe]'
                      : 'bg-white text-[#0B2545] border border-[#94a3b8] hover:border-[#00288e] hover:shadow-xs'
                  }`}
                  title={
                    isOccupied
                      ? `Asiento ${seat.number}: Ocupado`
                      : isAccessible
                      ? `Asiento ${seat.number}: Cupo Prioritario Accesible CUD`
                      : `Asiento ${seat.number}: Disponible ($${seat.price.toLocaleString('es-AR')})`
                  }
                >
                  <div
                    className={`w-5 h-1 rounded-t-xs mb-0.5 ${
                      isSelected ? 'bg-white/80' : isOccupied ? 'bg-[#cbd5e1]' : 'bg-[#cbd5e1]'
                    }`}
                  />
                  <div className="flex items-center gap-0.5">
                    {isAccessible && (
                      <span className="material-symbols-outlined text-[12px] leading-none">
                        accessible
                      </span>
                    )}
                    <span className="tabular-nums">{seat.number}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider mt-3">
            ── Pasillo Central / Salida de Emergencia ──
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-around flex-wrap gap-4 pt-2 text-xs text-[#495f82] border-t border-[#f1f5f9]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-white border border-[#94a3b8]" />
            <span>Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#00288e]" />
            <span className="font-bold text-[#00288e]">Seleccionado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#e2e8f0] border border-[#cbd5e1]" />
            <span>Ocupado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#f0f9ff] border-2 border-[#0284c7]" />
            <span className="text-[#0284c7] font-semibold">Accesible (P. Baja)</span>
          </div>
        </div>

        {/* Bottom Action Strip */}
        <div className="pt-4 border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            {selectedSeat ? (
              <div>
                <span className="text-[11px] text-[#64748b] uppercase font-bold block">
                  Asiento Seleccionado
                </span>
                <div className="text-base font-bold text-[#0B2545]">
                  Butaca #{selectedSeat.number} ({selectedSeat.deck === 1 ? 'Planta Baja' : 'Planta Alta'})
                  {selectedSeat.isAccessible && ' • Beneficio CUD'}
                </div>
              </div>
            ) : (
              <span className="text-xs text-[#64748b]">
                Hacé clic en una butaca disponible para continuar con la reserva
              </span>
            )}
          </div>

          <button
            disabled={!selectedSeat}
            onClick={handleContinue}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#00288e] hover:bg-[#001c66] text-white font-bold text-xs shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Continuar a Datos del Pasajero</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
