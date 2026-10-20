import React, { useState } from 'react';
import { Parcel } from '../types';
import { CITIES_LIST } from '../data/mockData';
import { ToritoLogo } from './ToritoLogo';

interface ParcelManagementProps {
  parcels: Parcel[];
  onAddParcel: (newParcel: Parcel) => void;
}

export const ParcelManagement: React.FC<ParcelManagementProps> = ({
  parcels,
  onAddParcel,
}) => {
  const [activeTab, setActiveTab] = useState<'listado' | 'nuevo' | 'rastreo'>('listado');
  const [searchTerm, setSearchTerm] = useState('');
  const [parcelsState, setParcelsState] = useState<Parcel[]>(parcels);

  // Form states
  const [senderName, setSenderName] = useState('');
  const [senderDni, setSenderDni] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientDni, setRecipientDni] = useState('');
  const [origin, setOrigin] = useState(CITIES_LIST[0]);
  const [destination, setDestination] = useState(CITIES_LIST[2]);
  const [weightKg, setWeightKg] = useState<number>(4.0);
  const [dimensions, setDimensions] = useState('30x20x15 cm');
  const [description, setDescription] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Quick tracking query
  const [trackCode, setTrackCode] = useState('ENC-2025-0194');
  const [trackedParcel, setTrackedParcel] = useState<Parcel | null>(parcels[0] || null);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !recipientName || !description) return;

    const randomId = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `ENC-2025-${randomId}`;

    const newParcel: Parcel = {
      trackingCode,
      senderName,
      senderDni,
      recipientName,
      recipientDni,
      origin,
      destination,
      weightKg,
      dimensions,
      description,
      date: new Date().toLocaleDateString('es-AR'),
      status: 'En Agencia',
    };

    onAddParcel(newParcel);
    setParcelsState((prev) => [newParcel, ...prev]);
    setFeedback(`¡Encomienda registrada con éxito! Código asignado: ${trackingCode}`);

    // Reset fields & switch to list
    setSenderName('');
    setSenderDni('');
    setRecipientName('');
    setRecipientDni('');
    setDescription('');
    setActiveTab('listado');
    setTimeout(() => setFeedback(null), 5000);
  };

  // Change status cycle for demonstration
  const handleAdvanceStatus = (trackingCode: string) => {
    setParcelsState((prev) =>
      prev.map((p) => {
        if (p.trackingCode === trackingCode) {
          const nextStatus: Parcel['status'] =
            p.status === 'En Agencia'
              ? 'En Tránsito'
              : p.status === 'En Tránsito'
              ? 'Listo para Retiro'
              : p.status === 'Listo para Retiro'
              ? 'Entregado'
              : 'En Agencia';
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = trackCode.trim().toUpperCase();
    const found = parcelsState.find((p) => p.trackingCode.toUpperCase() === clean);
    if (found) {
      setTrackedParcel(found);
    } else {
      setTrackedParcel(null);
    }
  };

  const filteredParcels = parcelsState.filter((p) => {
    const s = searchTerm.toLowerCase();
    return (
      p.trackingCode.toLowerCase().includes(s) ||
      p.recipientName.toLowerCase().includes(s) ||
      p.senderName.toLowerCase().includes(s) ||
      p.destination.toLowerCase().includes(s)
    );
  });

  return (
    <div className="max-w-6xl mx-auto w-full py-8 px-4 flex flex-col gap-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e2e8f0]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0B2545] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <span className="text-xs uppercase tracking-wider text-[#D9261C] font-bold">
              Panel de Operador • Logística y Bodega
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#0B2545]">
            Gestión de Encomiendas y Cartas de Porte
          </h1>
          <p className="text-xs text-[#64748b]">
            Registro de paquetería para bodegas de ómnibus de larga distancia y seguimiento de guías fiscales.
          </p>
        </div>
        <div className="hidden sm:block">
          <ToritoLogo size="sm" variant="dark" />
        </div>
      </div>

      {feedback && (
        <div className="p-3.5 bg-[#f0fdf4] text-[#166534] text-xs font-semibold rounded-lg border border-[#86efac] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{feedback}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-[#166534] hover:opacity-75">
            ✕
          </button>
        </div>
      )}

      {/* Main Container: Compact Sidebar + Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Compact Sidebar Menu */}
        <div className="md:col-span-3 bg-white rounded-xl border border-[#cbd5e1] p-3 shadow-xs flex flex-col gap-1.5">
          <span className="text-[10px] uppercase font-bold text-[#64748b] tracking-wider px-3 py-1">
            Menú de Operación
          </span>

          <button
            onClick={() => setActiveTab('listado')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
              activeTab === 'listado'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'text-[#0B2545] hover:bg-[#eff4ff]'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              <span>Encomiendas</span>
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeTab === 'listado' ? 'bg-white/20 text-white' : 'bg-[#e2e8f0] text-[#0B2545]'
              }`}
            >
              {parcelsState.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('nuevo')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'nuevo'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'text-[#0B2545] hover:bg-[#eff4ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">add_box</span>
            <span>Registrar Envío</span>
          </button>

          <button
            onClick={() => setActiveTab('rastreo')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'rastreo'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'text-[#0B2545] hover:bg-[#eff4ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">travel_explore</span>
            <span>Rastreo Rápido</span>
          </button>

          <div className="mt-4 pt-3 border-t border-[#f1f5f9] px-2 text-[11px] text-[#64748b]">
            <span className="font-semibold block text-[#0B2545]">Franquicia Oficial:</span>
            Hasta 50 kg por pieza con precinto y seguro de valor declarado.
          </div>
        </div>

        {/* Content Area */}
        <div className="md:col-span-9 flex flex-col gap-4">
          {/* TAB 1: LISTADO DE ENCOMIENDAS (TABLA CON ETIQUETAS VISUALES) */}
          {activeTab === 'listado' && (
            <div className="bg-white rounded-xl border border-[#cbd5e1] p-5 shadow-xs flex flex-col gap-4">
              {/* Header and Filter */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-[#f1f5f9]">
                <div>
                  <h3 className="font-bold text-sm text-[#0B2545]">
                    Cartas de Porte Registradas
                  </h3>
                  <span className="text-[11px] text-[#64748b]">
                    Hacé clic en el estado para actualizar el avance del envío
                  </span>
                </div>

                <div className="relative w-full sm:w-64">
                  <span className="material-symbols-outlined absolute left-2.5 top-2 text-[#94a3b8] text-[18px]">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Filtrar por código, persona..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs border border-[#cbd5e1] rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f8fafc] text-[#495f82] border-b border-[#e2e8f0]">
                      <th className="py-2.5 px-3 font-bold uppercase text-[10px]">Guía / Código</th>
                      <th className="py-2.5 px-3 font-bold uppercase text-[10px]">Remitente</th>
                      <th className="py-2.5 px-3 font-bold uppercase text-[10px]">Destinatario</th>
                      <th className="py-2.5 px-3 font-bold uppercase text-[10px]">Trayecto</th>
                      <th className="py-2.5 px-3 font-bold uppercase text-[10px]">Bulto</th>
                      <th className="py-2.5 px-3 font-bold uppercase text-[10px]">Estado (Clic para avanzar)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f5f9]">
                    {filteredParcels.map((parcel) => (
                      <tr key={parcel.trackingCode} className="hover:bg-[#f8fafc] transition-colors">
                        <td className="py-3 px-3 font-bold font-mono text-[#00288e] whitespace-nowrap">
                          {parcel.trackingCode}
                          <span className="block text-[10px] text-[#64748b] font-sans font-normal">
                            {parcel.date}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-semibold text-[#0B2545]">{parcel.senderName}</span>
                          <span className="block text-[10px] text-[#64748b] font-mono">
                            DNI: {parcel.senderDni}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-semibold text-[#0B2545]">{parcel.recipientName}</span>
                          <span className="block text-[10px] text-[#64748b] font-mono">
                            DNI: {parcel.recipientDni}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-[#444653]">
                          <span className="font-semibold">{parcel.origin}</span>
                          <span className="text-[#94a3b8] mx-1">→</span>
                          <span className="font-semibold text-[#0B2545]">{parcel.destination}</span>
                        </td>
                        <td className="py-3 px-3 text-[#444653] whitespace-nowrap">
                          <span className="font-bold text-[#0B2545]">{parcel.weightKg} kg</span>
                          <span className="block text-[10px] text-[#64748b]">{parcel.dimensions}</span>
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleAdvanceStatus(parcel.trackingCode)}
                            title="Hacé clic para avanzar el estado del envío"
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-transform hover:scale-105 border ${
                              parcel.status === 'Entregado'
                                ? 'bg-[#dcfce7] text-[#166534] border-[#86efac]'
                                : parcel.status === 'Listo para Retiro'
                                ? 'bg-[#eff4ff] text-[#00288e] border-[#d3e4fe]'
                                : parcel.status === 'En Tránsito'
                                ? 'bg-[#fff7ed] text-[#c2410c] border-[#ffedd5]'
                                : 'bg-[#f1f5f9] text-[#475569] border-[#cbd5e1]'
                            }`}
                          >
                            {parcel.status} ↻
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: FORMULARIO DE REGISTRO */}
          {activeTab === 'nuevo' && (
            <div className="bg-white rounded-xl border border-[#cbd5e1] p-6 shadow-xs flex flex-col gap-4">
              <h3 className="font-bold text-sm text-[#0B2545] pb-2 border-b border-[#f1f5f9]">
                Registrar Nueva Encomienda en Bodega
              </h3>

              <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
                {/* Remitente y Destinatario */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#f8fafc] p-3 rounded-lg border border-[#e2e8f0] flex flex-col gap-2">
                    <span className="text-xs font-bold text-[#0B2545] uppercase">Datos del Remitente</span>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#64748b] mb-1">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Laura Martínez"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#cbd5e1] rounded focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#64748b] mb-1">DNI / CUIT</label>
                      <input
                        type="text"
                        placeholder="Ej: 28.491.029"
                        value={senderDni}
                        onChange={(e) => setSenderDni(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#cbd5e1] rounded font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="bg-[#f8fafc] p-3 rounded-lg border border-[#e2e8f0] flex flex-col gap-2">
                    <span className="text-xs font-bold text-[#0B2545] uppercase">Datos del Destinatario</span>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#64748b] mb-1">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Marcos Benítez"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#cbd5e1] rounded focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#64748b] mb-1">DNI / CUIT</label>
                      <input
                        type="text"
                        placeholder="Ej: 34.910.281"
                        value={recipientDni}
                        onChange={(e) => setRecipientDni(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#cbd5e1] rounded font-mono focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Trayecto y Dimensiones */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#0B2545] uppercase mb-1">Origen</label>
                    <select
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-[#cbd5e1] rounded bg-white"
                    >
                      {CITIES_LIST.map((c) => (
                        <option key={`p-orig-${c}`} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#0B2545] uppercase mb-1">Destino</label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-[#cbd5e1] rounded bg-white"
                    >
                      {CITIES_LIST.map((c) => (
                        <option key={`p-dest-${c}`} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#0B2545] uppercase mb-1">Peso (kg) *</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0.5"
                      max="50"
                      required
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs border border-[#cbd5e1] rounded font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#0B2545] uppercase mb-1">Dimensiones</label>
                    <input
                      type="text"
                      placeholder="30x20x15 cm"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-[#cbd5e1] rounded font-mono"
                    />
                  </div>
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-[11px] font-bold text-[#0B2545] uppercase mb-1">
                    Descripción del Contenido *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Paquete de indumentaria, repuestos para maquinaria, etc."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#cbd5e1] rounded focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-[#00288e] hover:bg-[#001c66] text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">save</span>
                    <span>Guardar y Emitir Guía</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: RASTREO RÁPIDO */}
          {activeTab === 'rastreo' && (
            <div className="bg-white rounded-xl border border-[#cbd5e1] p-6 shadow-xs flex flex-col gap-5">
              <h3 className="font-bold text-sm text-[#0B2545]">
                Consulta y Seguimiento en Vivo de Guía Fiscal
              </h3>

              <form onSubmit={handleTrackSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ej: ENC-2025-0194"
                  value={trackCode}
                  onChange={(e) => setTrackCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#cbd5e1] rounded-lg font-mono uppercase focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00288e] hover:bg-[#001c66] text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Consultar
                </button>
              </form>

              {trackedParcel ? (
                <div className="p-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] flex flex-col gap-4 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#cbd5e1]">
                    <div>
                      <span className="font-bold font-mono text-base text-[#00288e]">
                        {trackedParcel.trackingCode}
                      </span>
                      <span className="block text-[11px] text-[#64748b]">
                        Registrado el {trackedParcel.date}
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#eff4ff] text-[#00288e] border border-[#d3e4fe]">
                      Estado: {trackedParcel.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] text-[#64748b] uppercase block">Origen y Destino:</span>
                      <span className="font-bold text-[#0B2545]">{trackedParcel.origin} → {trackedParcel.destination}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#64748b] uppercase block">Bulto:</span>
                      <span className="font-bold text-[#0B2545]">{trackedParcel.weightKg} kg ({trackedParcel.dimensions})</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#64748b] uppercase block">Remitente:</span>
                      <span className="font-bold text-[#0B2545]">{trackedParcel.senderName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#64748b] uppercase block">Destinatario:</span>
                      <span className="font-bold text-[#0B2545]">{trackedParcel.recipientName}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#e2e8f0] text-[#64748b]">
                    Descripción declarada: <strong>{trackedParcel.description}</strong>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-[#64748b]">
                  No se encontró encomienda con ese código de guía.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
