import React, { useState } from 'react';
import { Trip, Seat, PassengerData, Ticket } from '../../types';
import { ToritoLogo } from '../ToritoLogo';

interface PaymentAndTicketStepProps {
  trip: Trip;
  seat: Seat;
  passenger: PassengerData;
  onConfirmPurchase: (ticket: Ticket) => void;
  onNewBooking: () => void;
  onBack: () => void;
}

export const PaymentAndTicketStep: React.FC<PaymentAndTicketStepProps> = ({
  trip,
  seat,
  passenger,
  onConfirmPurchase,
  onNewBooking,
  onBack,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'debito' | 'credito' | 'transferencia'>('debito');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState<Ticket | null>(null);
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  // Beneficio CUD: costo bonificado al 100%
  const finalPrice = passenger.hasCUD ? 0 : seat.price;

  const handleConfirm = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const locator = `TOR-${randomNum}`;
    const paymentLabel =
      paymentMethod === 'debito'
        ? 'Tarjeta de Débito'
        : paymentMethod === 'credito'
        ? 'Tarjeta de Crédito'
        : 'Transferencia / QR';

    const newTicket: Ticket = {
      locator,
      trip,
      seatNumber: seat.number,
      deck: seat.deck,
      passenger,
      purchaseDate: new Date().toLocaleString('es-AR'),
      totalPrice: finalPrice,
      paymentMethod: paymentLabel,
      status: 'confirmado',
    };

    setGeneratedTicket(newTicket);
    setIsConfirmed(true);
    onConfirmPurchase(newTicket);
  };

  // Función para Descargar como PDF (utiliza el diálogo de impresión con layout optimizado)
  const handleDownloadPdf = () => {
    if (!generatedTicket) return;
    const originalTitle = document.title;
    document.title = `Boleto-ElTorito-${generatedTicket.locator}`;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  // IF CONFIRMED: Render Confirmation and Action Buttons
  if (isConfirmed && generatedTicket) {
    return (
      <div className="max-w-2xl mx-auto w-full py-8 px-4 flex flex-col gap-6">
        {/* Success Alert (oculto en impresión) */}
        <div className="no-print p-4 rounded-xl bg-[#f0fdf4] border border-[#86efac] flex items-center gap-3 text-[#166534]">
          <span className="material-symbols-outlined text-[28px] text-[#16a34a]">check_circle</span>
          <div>
            <h3 className="font-bold text-sm">¡Compra Confirmada con Éxito!</h3>
            <p className="text-xs text-[#15803d]">
              Tu boleto electrónico nominativo ha sido emitido y enviado a {passenger.email}.
            </p>
          </div>
        </div>

        {/* Digital Boarding Pass Ticket (Vista en Pantalla) */}
        <div className="no-print bg-white rounded-2xl border border-[#cbd5e1] shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-[#0b2545] p-5 text-white flex items-center justify-between flex-wrap gap-3">
            <ToritoLogo size="md" variant="light" />
            <div className="text-right">
              <span className="text-[10px] text-[#b1c7f0] uppercase tracking-wider block">
                Código de Reserva
              </span>
              <span className="text-xl font-bold font-mono text-[#ffedd5]">
                {generatedTicket.locator}
              </span>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-6 flex flex-col gap-5">
            {/* Itinerary */}
            <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
              <div>
                <span className="text-[10px] text-[#64748b] uppercase font-bold block">Origen</span>
                <span className="text-lg font-bold text-[#0b2545]">{trip.origin}</span>
                <span className="text-xs font-semibold text-[#00288e] block mt-0.5">
                  Salida: {trip.date} • {trip.departureTime} hs
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#64748b] uppercase font-bold block">Destino</span>
                <span className="text-lg font-bold text-[#0b2545]">{trip.destination}</span>
                <span className="text-xs text-[#64748b] block mt-0.5">
                  Llegada est.: {trip.arrivalTime} hs
                </span>
              </div>
            </div>

            {/* Passenger and Seat Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#f8fafc] p-4 rounded-lg border border-[#e2e8f0]">
              <div>
                <span className="text-[10px] text-[#64748b] uppercase font-bold block">Pasajero</span>
                <span className="font-bold text-[#0b2545]">{passenger.fullName}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#64748b] uppercase font-bold block">Documento</span>
                <span className="font-bold text-[#0b2545] font-mono">{passenger.documentNumber}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#64748b] uppercase font-bold block">Butaca</span>
                <span className="font-bold text-[#00288e] text-sm">
                  #{seat.number} ({seat.deck === 1 ? 'P. Baja' : 'P. Alta'})
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#64748b] uppercase font-bold block">Servicio</span>
                <span className="font-bold text-[#0b2545] capitalize">{trip.serviceType}</span>
              </div>
            </div>

            {/* QR Gate & Instructions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-2">
              <div className="flex flex-col items-center">
                {/* Clean Vector QR Code */}
                <div className="p-2.5 bg-white border-2 border-[#0b2545] rounded-xl shadow-xs">
                  <svg className="w-28 h-28" viewBox="0 0 100 100" fill="none">
                    <rect width="100" height="100" fill="white" />
                    <rect x="6" y="6" width="26" height="26" rx="2" fill="#0b2545" />
                    <rect x="10" y="10" width="18" height="18" fill="white" />
                    <rect x="14" y="14" width="10" height="10" fill="#0b2545" />
                    <rect x="68" y="6" width="26" height="26" rx="2" fill="#0b2545" />
                    <rect x="72" y="10" width="18" height="18" fill="white" />
                    <rect x="76" y="14" width="10" height="10" fill="#0b2545" />
                    <rect x="6" y="68" width="26" height="26" rx="2" fill="#0b2545" />
                    <rect x="10" y="72" width="18" height="18" fill="white" />
                    <rect x="14" y="76" width="10" height="10" fill="#0b2545" />
                    <rect x="38" y="12" width="6" height="6" fill="#00288e" />
                    <rect x="50" y="12" width="6" height="6" fill="#00288e" />
                    <rect x="38" y="40" width="24" height="24" rx="2" fill="#00288e" />
                    <rect x="68" y="42" width="8" height="8" fill="#0b2545" />
                    <rect x="80" y="52" width="8" height="8" fill="#0b2545" />
                    <rect x="42" y="72" width="8" height="8" fill="#0b2545" />
                    <rect x="68" y="72" width="22" height="6" fill="#0b2545" />
                    <rect x="68" y="84" width="22" height="6" fill="#0b2545" />
                  </svg>
                </div>
                <span className="text-[10px] text-[#64748b] font-mono mt-1">
                  {generatedTicket.locator}
                </span>
              </div>

              <div className="text-xs text-[#475569] flex flex-col gap-1.5 flex-1">
                <span className="font-bold text-[#0b2545]">Requisitos para el abordaje:</span>
                <p className="text-[11px] leading-relaxed">
                  Presentate en dársena con tu DNI físico y este código QR en pantalla o impreso.
                </p>
                <div className="text-[11px] text-[#00288e] font-semibold mt-1">
                  Total Abonado: {finalPrice === 0 ? '$0 (Pase CUD Gratuito)' : `$${finalPrice.toLocaleString('es-AR')} ARS`} ({generatedTicket.paymentMethod})
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons (Botón Descargar como PDF destacado) */}
          <div className="bg-[#f8fafc] p-4 border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Botón principal: Descargar como PDF */}
              <button
                onClick={handleDownloadPdf}
                className="w-full sm:w-auto px-4 py-2 bg-[#00288e] hover:bg-[#001c66] text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                title="Generar y descargar boleto en formato PDF optimizado para impresión"
              >
                <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                <span>Descargar como PDF</span>
              </button>

              {/* Botón secundario: Vista previa del boleto simplificado */}
              <button
                onClick={() => setShowPrintPreview(true)}
                className="w-full sm:w-auto px-3 py-2 bg-white border border-[#cbd5e1] hover:bg-[#f1f5f9] text-[#0b2545] rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1"
                title="Ver versión simplificada optimizada para impresión"
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span className="hidden sm:inline">Vista Previa</span>
              </button>
            </div>

            <button
              onClick={onNewBooking}
              className="w-full sm:w-auto px-5 py-2 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#00288e] border border-[#d3e4fe] rounded-lg text-xs font-bold transition-colors cursor-pointer text-center"
            >
              Realizar Otra Compra
            </button>
          </div>
        </div>

        {/* VERSIÓN SIMPLIFICADA OPTIMIZADA PARA IMPRESIÓN (Print-only container) */}
        <div className="hidden print:block print-voucher-container">
          {/* Encabezado formal con logotipo oficial de El Torito */}
          <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
            <div className="flex items-center gap-3">
              <ToritoLogo size="md" variant="dark" />
              <div>
                <div className="text-base font-black tracking-tight text-[#0B2545]">
                  TRANSPORTES AUTOMOTORES EL TORITO S.A.
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-700">
                  Boleto Electrónico de Pasaje • Validez Oficial de Abordaje CNRT H-429
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase text-gray-600 font-bold">Localizador</div>
              <div className="text-xl font-bold font-mono text-[#0B2545]">{generatedTicket.locator}</div>
            </div>
          </div>

          {/* Cuadrícula de datos del viaje */}
          <div className="border border-black p-3 mb-4 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="font-bold block uppercase text-[10px] text-gray-600">Trayecto:</span>
              <span className="text-sm font-bold">{trip.origin} → {trip.destination}</span>
            </div>
            <div>
              <span className="font-bold block uppercase text-[10px] text-gray-600">Fecha y Hora de Salida:</span>
              <span className="text-sm font-bold">{trip.date} • {trip.departureTime} hs</span>
            </div>
            <div>
              <span className="font-bold block uppercase text-[10px] text-gray-600">Pasajero Titular:</span>
              <span className="text-sm font-bold">{passenger.fullName} ({passenger.documentType}: {passenger.documentNumber})</span>
            </div>
            <div>
              <span className="font-bold block uppercase text-[10px] text-gray-600">Butaca Asignada:</span>
              <span className="text-sm font-bold">Asiento #{seat.number} ({seat.deck === 1 ? 'Planta Baja' : 'Planta Alta'})</span>
            </div>
            <div>
              <span className="font-bold block uppercase text-[10px] text-gray-600">Categoría de Servicio:</span>
              <span className="font-bold uppercase">{trip.serviceType} • {trip.coachNumber}</span>
            </div>
            <div>
              <span className="font-bold block uppercase text-[10px] text-gray-600">Importe Abonado:</span>
              <span className="text-sm font-bold font-mono">
                {finalPrice === 0 ? '$0 (Pase CUD Gratuito)' : `$${finalPrice.toLocaleString('es-AR')} ARS`} ({generatedTicket.paymentMethod})
              </span>
            </div>
          </div>

          {/* Bloque QR centralizado y nítido para escáner */}
          <div className="flex items-center justify-between border-2 border-black p-4 mb-4">
            <div className="flex flex-col items-center">
              <div className="border-2 border-black p-2 bg-white">
                <svg className="w-32 h-32" viewBox="0 0 100 100" fill="none">
                  <rect width="100" height="100" fill="white" />
                  <rect x="6" y="6" width="26" height="26" rx="1" fill="black" />
                  <rect x="10" y="10" width="18" height="18" fill="white" />
                  <rect x="14" y="14" width="10" height="10" fill="black" />
                  <rect x="68" y="6" width="26" height="26" rx="1" fill="black" />
                  <rect x="72" y="10" width="18" height="18" fill="white" />
                  <rect x="76" y="14" width="10" height="10" fill="black" />
                  <rect x="6" y="68" width="26" height="26" rx="1" fill="black" />
                  <rect x="10" y="72" width="18" height="18" fill="white" />
                  <rect x="14" y="76" width="10" height="10" fill="black" />
                  <rect x="38" y="12" width="6" height="6" fill="black" />
                  <rect x="50" y="12" width="6" height="6" fill="black" />
                  <rect x="38" y="40" width="24" height="24" rx="1" fill="black" />
                  <circle cx="50" cy="52" r="5" fill="white" />
                  <rect x="68" y="42" width="8" height="8" fill="black" />
                  <rect x="80" y="52" width="8" height="8" fill="black" />
                  <rect x="42" y="72" width="8" height="8" fill="black" />
                  <rect x="68" y="72" width="22" height="6" fill="black" />
                  <rect x="68" y="84" width="22" height="6" fill="black" />
                </svg>
              </div>
              <div className="text-[11px] font-mono mt-1 font-bold">{generatedTicket.locator}</div>
            </div>

            <div className="flex-1 pl-6 text-xs text-black flex flex-col gap-1.5">
              <div className="font-bold uppercase text-[11px] tracking-wide">
                Condiciones de Abordaje y Fiscalización
              </div>
              <p className="leading-snug text-[11px]">
                1. Presentar este comprobante impreso o digital junto con el <strong>DNI físico original</strong> del pasajero registrado.
              </p>
              <p className="leading-snug text-[11px]">
                2. Presentarse en dársena con <strong>20 minutos de anticipación</strong> a la partida.
              </p>
              <p className="leading-snug text-[11px]">
                3. Franquicia de equipaje incluida: 15 kg en bodega + bolso de mano.
              </p>
              <div className="text-[10px] text-gray-600 mt-1 border-t border-gray-400 pt-1">
                Transportes Automotores El Torito S.A. • CUIT 30-58492019-4 • Emisión: {generatedTicket.purchaseDate}
              </div>
            </div>
          </div>
        </div>

        {/* Modal de Vista Previa del Boleto Simplificado */}
        {showPrintPreview && (
          <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b2545]/60 backdrop-blur-xs">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 border border-[#cbd5e1] max-h-[90vh] overflow-y-auto flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00288e] text-[22px]">print</span>
                  <h3 className="font-bold text-sm text-[#0b2545]">
                    Vista Previa de Impresión / PDF
                  </h3>
                </div>
                <button
                  onClick={() => setShowPrintPreview(false)}
                  className="p-1 rounded text-[#64748b] hover:bg-[#f1f5f9]"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              {/* Versión simplificada simulada para el usuario */}
              <div className="border-2 border-black p-4 bg-white text-black rounded-md flex flex-col gap-3 font-sans">
                <div className="flex items-center justify-between border-b border-black pb-2 gap-2">
                  <div className="flex items-center gap-2">
                    <ToritoLogo size="sm" variant="dark" />
                    <div>
                      <div className="font-black text-xs tracking-tight text-[#0B2545]">
                        TRANSPORTES AUTOMOTORES EL TORITO
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-gray-600">
                        Boleto Oficial de Pasaje • CNRT H-429
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase block text-gray-600">Localizador</span>
                    <span className="font-bold font-mono text-sm text-[#0B2545]">{generatedTicket.locator}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] border-b border-black pb-2">
                  <div>
                    <span className="text-[9px] text-gray-600 block">Trayecto:</span>
                    <strong>{trip.origin} → {trip.destination}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-600 block">Fecha y Hora:</span>
                    <strong>{trip.date} • {trip.departureTime} hs</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-600 block">Pasajero:</span>
                    <strong>{passenger.fullName} ({passenger.documentType} {passenger.documentNumber})</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-gray-600 block">Asiento:</span>
                    <strong>#{seat.number} ({seat.deck === 1 ? 'P. Baja' : 'P. Alta'})</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <div className="w-20 h-20 border border-black p-1 bg-white shrink-0">
                    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                      <rect width="100" height="100" fill="white" />
                      <rect x="6" y="6" width="26" height="26" rx="1" fill="black" />
                      <rect x="10" y="10" width="18" height="18" fill="white" />
                      <rect x="14" y="14" width="10" height="10" fill="black" />
                      <rect x="68" y="6" width="26" height="26" rx="1" fill="black" />
                      <rect x="72" y="10" width="18" height="18" fill="white" />
                      <rect x="76" y="14" width="10" height="10" fill="black" />
                      <rect x="6" y="68" width="26" height="26" rx="1" fill="black" />
                      <rect x="10" y="72" width="18" height="18" fill="white" />
                      <rect x="14" y="76" width="10" height="10" fill="black" />
                      <rect x="38" y="40" width="24" height="24" rx="1" fill="black" />
                      <circle cx="50" cy="52" r="5" fill="white" />
                    </svg>
                  </div>

                  <div className="text-[10px] text-gray-700 leading-tight flex-1">
                    <p className="font-bold text-black mb-1">Instrucciones de Abordaje:</p>
                    <p>Presentarse 20 minutos antes en dársena con este comprobante y DNI físico original del pasajero.</p>
                    <p className="mt-1 font-mono font-bold text-black">
                      Total: {finalPrice === 0 ? '$0 (CUD)' : `$${finalPrice.toLocaleString('es-AR')} ARS`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal footer buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e2e8f0]">
                <button
                  onClick={() => setShowPrintPreview(false)}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold text-[#64748b] hover:bg-[#f1f5f9] cursor-pointer"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    setShowPrintPreview(false);
                    handleDownloadPdf();
                  }}
                  className="px-4 py-2 rounded-lg bg-[#00288e] hover:bg-[#001c66] text-white text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                  <span>Guardar / Descargar PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // IF NOT CONFIRMED: Payment summary and confirmation
  return (
    <div className="max-w-2xl mx-auto w-full py-6 px-4 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-xs font-bold text-[#00288e] hover:underline cursor-pointer mb-1"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Modificar datos del pasajero
          </button>
          <h2 className="text-lg sm:text-xl font-bold text-[#0b2545]">
            Resumen de la Compra y Pago
          </h2>
          <span className="text-xs text-[#495f82]">
            Verificá los datos antes de confirmar la emisión del pasaje
          </span>
        </div>
      </div>

      {/* Resumen de la compra */}
      <div className="bg-white rounded-xl border border-[#cbd5e1] p-5 shadow-xs flex flex-col gap-4">
        <h3 className="text-xs font-bold text-[#0b2545] uppercase tracking-wider pb-2 border-b border-[#f1f5f9]">
          Detalle del Viaje y Pasajero
        </h3>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[10px] text-[#64748b] uppercase block">Trayecto</span>
            <span className="font-bold text-[#0b2545]">{trip.origin} → {trip.destination}</span>
          </div>

          <div>
            <span className="text-[10px] text-[#64748b] uppercase block">Fecha y Salida</span>
            <span className="font-bold text-[#0b2545]">{trip.date} • {trip.departureTime} hs</span>
          </div>

          <div>
            <span className="text-[10px] text-[#64748b] uppercase block">Pasajero</span>
            <span className="font-bold text-[#0b2545]">{passenger.fullName} ({passenger.documentType} {passenger.documentNumber})</span>
          </div>

          <div>
            <span className="text-[10px] text-[#64748b] uppercase block">Asiento Asignado</span>
            <span className="font-bold text-[#00288e]">
              Butaca #{seat.number} ({seat.deck === 1 ? 'Planta Baja' : 'Planta Alta'})
            </span>
          </div>
        </div>

        {/* Total a Pagar */}
        <div className="p-3 bg-[#eff4ff] rounded-lg border border-[#d3e4fe] flex items-center justify-between text-xs">
          <span className="font-bold text-[#0b2545]">Monto Final con Impuestos:</span>
          <span className="text-lg font-bold text-[#00288e] font-mono">
            {finalPrice === 0 ? '$0 (Pase CUD Bonificado)' : `$${finalPrice.toLocaleString('es-AR')} ARS`}
          </span>
        </div>
      </div>

      {/* Selección del Medio de Pago */}
      <div className="bg-white rounded-xl border border-[#cbd5e1] p-5 shadow-xs flex flex-col gap-4">
        <h3 className="text-xs font-bold text-[#0b2545] uppercase tracking-wider pb-2 border-b border-[#f1f5f9]">
          Seleccionar Medio de Pago
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => setPaymentMethod('debito')}
            className={`p-3 rounded-lg border text-left transition-colors cursor-pointer flex flex-col gap-1 ${
              paymentMethod === 'debito'
                ? 'border-[#00288e] bg-[#eff4ff]'
                : 'border-[#cbd5e1] hover:bg-[#f8fafc]'
            }`}
          >
            <span className="text-xs font-bold text-[#0b2545]">Tarjeta de Débito</span>
            <span className="text-[10px] text-[#64748b]">Acreditación instantánea</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('credito')}
            className={`p-3 rounded-lg border text-left transition-colors cursor-pointer flex flex-col gap-1 ${
              paymentMethod === 'credito'
                ? 'border-[#00288e] bg-[#eff4ff]'
                : 'border-[#cbd5e1] hover:bg-[#f8fafc]'
            }`}
          >
            <span className="text-xs font-bold text-[#0b2545]">Tarjeta de Crédito</span>
            <span className="text-[10px] text-[#64748b]">1 pago sin recargo</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('transferencia')}
            className={`p-3 rounded-lg border text-left transition-colors cursor-pointer flex flex-col gap-1 ${
              paymentMethod === 'transferencia'
                ? 'border-[#00288e] bg-[#eff4ff]'
                : 'border-[#cbd5e1] hover:bg-[#f8fafc]'
            }`}
          >
            <span className="text-xs font-bold text-[#0b2545]">Transferencia / QR</span>
            <span className="text-[10px] text-[#64748b]">Mercado Pago / CVU</span>
          </button>
        </div>

        {/* Botón Confirmar Compra */}
        <button
          onClick={handleConfirm}
          className="mt-3 w-full py-3 px-4 rounded-lg bg-[#00288e] hover:bg-[#001c66] text-white font-bold text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span>Confirmar Compra y Emitir Pasaje</span>
        </button>
      </div>
    </div>
  );
};
