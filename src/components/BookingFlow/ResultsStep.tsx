import React from 'react';
import { Trip } from '../../types';

interface ResultsStepProps {
  trips: Trip[];
  origin: string;
  destination: string;
  date: string;
  onSelectTrip: (trip: Trip) => void;
  onBack: () => void;
}

export const ResultsStep: React.FC<ResultsStepProps> = ({
  trips,
  origin,
  destination,
  date,
  onSelectTrip,
  onBack,
}) => {
  return (
    <div className="max-w-4xl mx-auto w-full py-8 px-4 flex flex-col gap-6">
      {/* Route header with back action */}
      <div className="bg-white rounded-xl border border-[#cbd5e1] p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-xs font-bold text-[#00288e] hover:underline cursor-pointer mb-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Modificar búsqueda
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B2545] flex items-center gap-2">
            <span>{origin}</span>
            <span className="material-symbols-outlined text-[#D9261C] text-[20px]">arrow_forward</span>
            <span>{destination}</span>
          </h2>
          <span className="text-xs text-[#64748b]">
            Fecha: <strong>{date}</strong> • Mostrando {trips.length} servicios disponibles
          </span>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-[#eff4ff] border border-[#d3e4fe] text-xs font-semibold text-[#00288e] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>Salidas Garantizadas</span>
        </div>
      </div>

      {/* Trips List */}
      <div className="flex flex-col gap-4">
        {trips.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-[#cbd5e1] flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-[48px] text-[#94a3b8]">
              directions_bus
            </span>
            <h3 className="font-bold text-base text-[#0B2545]">
              No encontramos salidas directas para este trayecto y fecha
            </h3>
            <p className="text-xs text-[#64748b] max-w-md">
              Probá seleccionando otra fecha de salida o modificando las ciudades de origen y destino.
            </p>
            <button
              onClick={onBack}
              className="mt-2 px-5 py-2.5 bg-[#00288e] text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              Volver al buscador
            </button>
          </div>
        ) : (
          trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-xl border border-[#cbd5e1] hover:border-[#00288e] p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6"
            >
              {/* Horarios y Duración */}
              <div className="flex items-center gap-6 flex-1">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-[#0B2545] tabular-nums tracking-tight">
                    {trip.departureTime} hs
                  </span>
                  <span className="text-xs font-bold text-[#0B2545]">{trip.origin}</span>
                  <span className="text-[10px] text-[#64748b]">Terminal Central</span>
                </div>

                {/* Line indicator */}
                <div className="flex flex-col items-center flex-1 max-w-[130px]">
                  <span className="text-[11px] font-bold text-[#495f82] tabular-nums">
                    {trip.duration}
                  </span>
                  <div className="w-full h-0.5 bg-[#cbd5e1] my-1 relative flex items-center justify-between">
                    <div className="w-2 h-2 rounded-full bg-[#0B2545]" />
                    <span className="material-symbols-outlined text-[#D9261C] text-[16px]">
                      directions_bus
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#D9261C]" />
                  </div>
                  <span className="text-[10px] text-[#16a34a] font-semibold">Directo</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-2xl font-black text-[#0B2545] tabular-nums tracking-tight">
                    {trip.arrivalTime} hs
                  </span>
                  <span className="text-xs font-bold text-[#0B2545]">{trip.destination}</span>
                  <span className="text-[10px] text-[#64748b]">Terminal Oficial</span>
                </div>
              </div>

              {/* Servicio y Amenidades */}
              <div className="flex flex-col justify-center md:border-l md:border-r border-[#e2e8f0] md:px-6 gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-[#eff4ff] text-[#00288e] border border-[#d3e4fe]">
                    {trip.serviceType === 'cama' ? 'Cama Ejecutivo 160°' : 'Semicama 120°'}
                  </span>
                </div>
                <span className="text-[11px] text-[#64748b] font-medium">
                  {trip.coachNumber} • Doble Piso
                </span>

                <div className="flex items-center gap-2 text-[#495f82] text-xs pt-0.5">
                  <span className="material-symbols-outlined text-[16px]" title="Climatización">
                    ac_unit
                  </span>
                  <span className="material-symbols-outlined text-[16px]" title="Cargador USB">
                    usb
                  </span>
                  <span className="material-symbols-outlined text-[16px]" title="Wi-Fi">
                    wifi
                  </span>
                </div>
              </div>

              {/* Precio y Botón Seleccionar */}
              <div className="flex md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#f1f5f9]">
                <div className="text-left md:text-right">
                  <span className="text-[10px] text-[#64748b] uppercase block">Precio Final</span>
                  <div className="text-2xl font-black text-[#0B2545] tabular-nums">
                    ${trip.price.toLocaleString('es-AR')}{' '}
                    <span className="text-xs font-normal text-[#64748b]">ARS</span>
                  </div>
                  <span className="text-[11px] text-[#16a34a] font-bold block mt-0.5">
                    ✓ {trip.availableSeats} butacas libres
                  </span>
                </div>

                <button
                  onClick={() => onSelectTrip(trip)}
                  className="px-6 py-2.5 rounded-lg bg-[#00288e] hover:bg-[#001c66] text-white text-xs font-bold transition-all shadow-sm active:scale-98 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Seleccionar Asiento</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
