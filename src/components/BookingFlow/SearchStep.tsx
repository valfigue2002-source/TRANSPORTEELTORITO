import React, { useState } from 'react';
import { CITIES_LIST } from '../../data/mockData';
import { ServiceType, MainSection } from '../../types';
import { ToritoLogo } from '../ToritoLogo';

interface SearchStepProps {
  onSearch: (params: {
    origin: string;
    destination: string;
    date: string;
    serviceType: ServiceType | 'todos';
  }) => void;
  onNavigateSection?: (section: MainSection) => void;
}

export const SearchStep: React.FC<SearchStepProps> = ({ onSearch, onNavigateSection }) => {
  const [origin, setOrigin] = useState(CITIES_LIST[0]);
  const [destination, setDestination] = useState(CITIES_LIST[2]);
  const [date, setDate] = useState('2025-04-18');
  const [serviceType, setServiceType] = useState<ServiceType | 'todos'>('todos');
  const [error, setError] = useState<string | null>(null);

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (origin === destination) {
      setError('El origen y el destino no pueden ser iguales.');
      return;
    }
    setError(null);
    onSearch({ origin, destination, date, serviceType });
  };

  return (
    <div className="w-full flex flex-col pb-12">
      {/* ==================================================== */}
      {/* HERO SECTION CON FOTOGRAFÍA DESTACADA DE ÓMNIBUS */}
      {/* ==================================================== */}
      <section className="relative w-full bg-[#0B2545] text-white overflow-hidden py-14 sm:py-20 px-4">
        {/* Background Image with Scrim Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAqtyFiZrWrlXxccjo517M8e0_qtPqydSKo8jmQmDgklag-pmuzLViflzbDdRLZmfk0x1fWieqiQNMrdVDEaaWA8inV-B6MN-1JyGEqfbxGyHiujyWF7zag1Gd8PtelPvIgqIGimGMVPzTSXQHd622U88EHUuEeNztw0f0Qcd6g3jGbzChVhP49IUkdXblV5KaTRua5-S8tIQoKgkMUii8iwErt1uAoM-hIkfOBsJ6wHCF8tFm30tJ5')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2545] via-[#0B2545]/90 to-transparent" />

        <div className="relative max-w-5xl mx-auto flex flex-col items-start gap-4">
          {/* Official trust tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ffedd5] text-xs font-semibold">
            <span className="material-symbols-outlined text-[#D9261C] text-[16px]">verified</span>
            <span>Flota Homologada CNRT • Salidas Federales</span>
          </div>

          {/* Title & Subtitle exactos pedidos por el usuario */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Viajá cómodo, viajá con El Torito
          </h1>

          <p className="text-sm sm:text-base text-[#dce9ff] max-w-xl leading-relaxed">
            Más de 45 años conectando los principales destinos del país con la mayor seguridad, puntualidad y el confort que te merecés.
          </p>

          {/* Key perks strip */}
          <div className="flex items-center gap-6 pt-2 text-xs text-[#b1c7f0] flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#D9261C] text-[18px]">verified_user</span>
              <span className="font-semibold text-white">99.4% Puntualidad</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#D9261C] text-[18px]">airline_seat_recline_extra</span>
              <span className="font-semibold text-white">Butacas Semicama y Cama</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#D9261C] text-[18px]">qr_code_scanner</span>
              <span className="font-semibold text-white">Boleto Digital QR</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* FORMULARIO DE BÚSQUEDA INTEGRADO EN TARJETA DESTACADA */}
      {/* ==================================================== */}
      <section className="max-w-5xl mx-auto w-full px-4 -mt-10 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-2xl border border-[#cbd5e1] p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-[#f1f5f9] mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0B2545] flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#0B2545]">
                Consultá y Comprá tus Pasajes
              </h2>
            </div>
            <span className="text-xs text-[#64748b] hidden sm:inline">
              Elección de asiento incluida sin cargo extra
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="p-3 bg-[#fee2e2] text-[#991b1b] rounded-lg text-xs font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
              {/* Origen */}
              <div className="md:col-span-4 bg-[#f8fafc] p-2.5 rounded-xl border border-[#e2e8f0] hover:border-[#00288e] transition-colors">
                <label className="block text-[11px] font-bold text-[#495f82] uppercase tracking-wider mb-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#00288e] text-[15px]">trip_origin</span>
                  Origen
                </label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full bg-transparent font-bold text-sm text-[#0B2545] focus:outline-none cursor-pointer"
                >
                  {CITIES_LIST.map((city) => (
                    <option key={`orig-${city}`} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botón Swap / Invertir */}
              <div className="hidden md:flex md:col-span-1 justify-center pb-2">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="w-9 h-9 rounded-full bg-[#eff4ff] hover:bg-[#00288e] hover:text-white text-[#0B2545] flex items-center justify-center transition-all shadow-xs border border-[#d3e4fe] cursor-pointer"
                  title="Invertir origen y destino"
                >
                  <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
                </button>
              </div>

              {/* Destino */}
              <div className="md:col-span-4 bg-[#f8fafc] p-2.5 rounded-xl border border-[#e2e8f0] hover:border-[#00288e] transition-colors">
                <label className="block text-[11px] font-bold text-[#495f82] uppercase tracking-wider mb-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#D9261C] text-[15px]">location_on</span>
                  Destino
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent font-bold text-sm text-[#0B2545] focus:outline-none cursor-pointer"
                >
                  {CITIES_LIST.map((city) => (
                    <option key={`dest-${city}`} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fecha */}
              <div className="md:col-span-3 bg-[#f8fafc] p-2.5 rounded-xl border border-[#e2e8f0] hover:border-[#00288e] transition-colors">
                <label className="block text-[11px] font-bold text-[#495f82] uppercase tracking-wider mb-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#00288e] text-[15px]">calendar_today</span>
                  Fecha de Salida
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent font-bold text-sm text-[#0B2545] focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Fila Inferior: Tipo de servicio & Botón Buscar Pasajes */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-[#f1f5f9]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">
                  Categoría de Servicio:
                </span>
                <div className="flex items-center bg-[#f1f5f9] p-1 rounded-lg gap-1">
                  <button
                    type="button"
                    onClick={() => setServiceType('todos')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      serviceType === 'todos'
                        ? 'bg-[#0B2545] text-white shadow-xs'
                        : 'text-[#495f82] hover:text-[#0B2545]'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType('semicama')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      serviceType === 'semicama'
                        ? 'bg-[#0B2545] text-white shadow-xs'
                        : 'text-[#495f82] hover:text-[#0B2545]'
                    }`}
                  >
                    Semicama
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType('cama')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      serviceType === 'cama'
                        ? 'bg-[#0B2545] text-white shadow-xs'
                        : 'text-[#495f82] hover:text-[#0B2545]'
                    }`}
                  >
                    Cama Ejecutivo
                  </button>
                </div>
              </div>

              {/* Botón Principal Buscar Pasajes */}
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-[#D9261C] hover:bg-[#b91c1c] text-white font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">directions_bus</span>
                <span>Buscar Pasajes</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECCIÓN DE SERVICIOS Y BENEFICIOS (CON ÍCONOS) */}
      {/* ==================================================== */}
      <section className="max-w-5xl mx-auto w-full px-4 pt-14">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-[#D9261C] font-bold">
            Por Qué Elegirnos
          </span>
          <h2 className="text-2xl font-bold text-[#0B2545] mt-1">
            Servicios y Beneficios en Cada Viaje
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#eff4ff] text-[#00288e] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">schedule</span>
            </div>
            <h3 className="font-bold text-sm text-[#0B2545]">Puntualidad en Salidas</h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              Cumplimiento estricto de horarios desde dársenas oficiales en todo el país.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#fff1f2] text-[#D9261C] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">airline_seat_recline_extra</span>
            </div>
            <h3 className="font-bold text-sm text-[#0B2545]">Máximo Confort</h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              Butacas con reclinación de hasta 160°, climatización y puertos USB individuales.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#f0fdf4] text-[#16a34a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">qr_code_2</span>
            </div>
            <h3 className="font-bold text-sm text-[#0B2545]">Boleto Digital QR</h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              Subí directamente presentando el código QR en tu celular, sin necesidad de imprimir.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#eff6ff] text-[#0284c7] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">accessible</span>
            </div>
            <h3 className="font-bold text-sm text-[#0B2545]">Accesibilidad Total</h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              Unidades con planta baja adaptada y cupos legales garantizados (Ley 22.431 / CUD).
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* ACCESOS VISIBLES A MIS PASAJES, DEVOLUCIONES Y ENCOMIENDAS */}
      {/* ==================================================== */}
      <section className="max-w-5xl mx-auto w-full px-4 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Tarjeta 1: Mis Pasajes */}
          <button
            type="button"
            onClick={() => onNavigateSection && onNavigateSection('consulta')}
            className="bg-white rounded-xl border border-[#cbd5e1] p-5 shadow-xs hover:border-[#00288e] hover:shadow-md transition-all text-left flex flex-col justify-between gap-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#00288e] flex items-center justify-center group-hover:bg-[#00288e] group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[22px]">qr_code_scanner</span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0B2545] group-hover:text-[#00288e]">
                  Mis Pasajes
                </h3>
                <span className="text-[11px] text-[#64748b]">Consultar reserva con DNI o código</span>
              </div>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">
              Descargá tu voucher electrónico con código QR para abordar directamente en dársena.
            </p>
            <span className="text-xs text-[#00288e] font-bold flex items-center gap-1 mt-1">
              Ver mis pasajes
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </span>
          </button>

          {/* Tarjeta 2: Devoluciones Online */}
          <button
            type="button"
            onClick={() => onNavigateSection && onNavigateSection('consulta')}
            className="bg-white rounded-xl border border-[#cbd5e1] p-5 shadow-xs hover:border-[#D9261C] hover:shadow-md transition-all text-left flex flex-col justify-between gap-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fff1f2] text-[#D9261C] flex items-center justify-center group-hover:bg-[#D9261C] group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[22px]">assignment_return</span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0B2545] group-hover:text-[#D9261C]">
                  Devoluciones Online
                </h3>
                <span className="text-[11px] text-[#64748b]">Cancelaciones según anticipación</span>
              </div>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">
              Gestión transparente de cancelaciones con acreditación y retención reglamentaria del 10%.
            </p>
            <span className="text-xs text-[#D9261C] font-bold flex items-center gap-1 mt-1">
              Gestionar reintegro
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </span>
          </button>

          {/* Tarjeta 3: Encomiendas */}
          <button
            type="button"
            onClick={() => onNavigateSection && onNavigateSection('encomiendas')}
            className="bg-white rounded-xl border border-[#cbd5e1] p-5 shadow-xs hover:border-[#0B2545] hover:shadow-md transition-all text-left flex flex-col justify-between gap-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#0B2545] flex items-center justify-center group-hover:bg-[#0B2545] group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[22px]">local_shipping</span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0B2545]">
                  Torito Encomiendas
                </h3>
                <span className="text-[11px] text-[#64748b]">Cargas en bodega de ómnibus</span>
              </div>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">
              Despacho y rastreo en tiempo real de bultos y encomiendas a todo el territorio nacional.
            </p>
            <span className="text-xs text-[#0B2545] font-bold flex items-center gap-1 mt-1">
              Ir a encomiendas
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};
