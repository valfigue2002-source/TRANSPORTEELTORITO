import React, { useState } from 'react';
import { Trip, Seat, PassengerData } from '../../types';

interface PassengerDataStepProps {
  trip: Trip;
  seat: Seat;
  onPassengerConfirmed: (data: PassengerData) => void;
  onBack: () => void;
}

export const PassengerDataStep: React.FC<PassengerDataStepProps> = ({
  trip,
  seat,
  onPassengerConfirmed,
  onBack,
}) => {
  const [fullName, setFullName] = useState('');
  const [documentType, setDocumentType] = useState<'DNI' | 'Pasaporte' | 'Cédula'>('DNI');
  const [documentNumber, setDocumentNumber] = useState('');
  const [birthDate, setBirthDate] = useState('1995-05-15');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Menores de 18 años y CUD
  const [isMinor, setIsMinor] = useState(false);
  const [minorAuthorization, setMinorAuthorization] = useState('Acompañado por padre/madre');
  const [hasCUD, setHasCUD] = useState(seat.isAccessible);
  const [cudNumber, setCudNumber] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Ingrese nombre y apellido completo.';
    if (!documentNumber.trim() || documentNumber.length < 6) errs.documentNumber = 'Ingrese número de documento válido.';
    if (!birthDate) errs.birthDate = 'Ingrese fecha de nacimiento.';
    if (!email.includes('@')) errs.email = 'Ingrese correo electrónico válido.';
    if (!phone.trim() || phone.length < 7) errs.phone = 'Ingrese teléfono de contacto.';

    if (hasCUD && (!cudNumber.trim() || cudNumber.length < 6)) {
      errs.cud = 'Para acceder a butaca accesible CUD es necesario ingresar el número de certificado.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onPassengerConfirmed({
      fullName,
      documentType,
      documentNumber,
      birthDate,
      email,
      phone,
      isMinor,
      hasCUD,
      cudNumber: hasCUD ? cudNumber : undefined,
      minorAuthorization: isMinor ? minorAuthorization : undefined,
    });
  };

  return (
    <div className="max-w-2xl mx-auto w-full py-6 px-4 flex flex-col gap-6">
      {/* Step Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-xs font-bold text-[#00288e] hover:underline cursor-pointer mb-1"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Modificar asiento
          </button>
          <h2 className="text-lg sm:text-xl font-bold text-[#0b2545]">
            Datos del Pasajero
          </h2>
          <span className="text-xs text-[#495f82]">
            Viaje: {trip.origin} → {trip.destination} • Asiento #{seat.number} ({seat.deck === 1 ? 'P. Baja' : 'P. Alta'})
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#cbd5e1] p-6 shadow-xs">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Nombre y Apellido */}
          <div>
            <label className="block text-xs font-bold text-[#0b2545] uppercase tracking-wider mb-1">
              Nombre y Apellido *
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Juan Manuel Fangio"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-[#cbd5e1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00288e]/20"
            />
            {errors.fullName && (
              <span className="text-xs text-[#dc2626] mt-0.5 block">{errors.fullName}</span>
            )}
          </div>

          {/* Tipo de Documento y Número */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0b2545] uppercase tracking-wider mb-1">
                Tipo Doc.
              </label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value as any)}
                className="w-full px-3.5 py-2 text-sm border border-[#cbd5e1] rounded-lg focus:outline-none bg-white"
              >
                <option value="DNI">DNI</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="Cédula">Cédula</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#0b2545] uppercase tracking-wider mb-1">
                Número de Documento *
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 34882190"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-[#cbd5e1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00288e]/20"
              />
              {errors.documentNumber && (
                <span className="text-xs text-[#dc2626] mt-0.5 block">{errors.documentNumber}</span>
              )}
            </div>
          </div>

          {/* Fecha de Nacimiento */}
          <div>
            <label className="block text-xs font-bold text-[#0b2545] uppercase tracking-wider mb-1">
              Fecha de Nacimiento *
            </label>
            <input
              type="date"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-[#cbd5e1] rounded-lg focus:outline-none"
            />
            {errors.birthDate && (
              <span className="text-xs text-[#dc2626] mt-0.5 block">{errors.birthDate}</span>
            )}
          </div>

          {/* Correo y Teléfono */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0b2545] uppercase tracking-wider mb-1">
                Correo Electrónico *
              </label>
              <input
                type="email"
                required
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-[#cbd5e1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00288e]/20"
              />
              {errors.email && (
                <span className="text-xs text-[#dc2626] mt-0.5 block">{errors.email}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0b2545] uppercase tracking-wider mb-1">
                Teléfono de Contacto *
              </label>
              <input
                type="tel"
                required
                placeholder="Ej: 11 4455-6677"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-[#cbd5e1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00288e]/20"
              />
              {errors.phone && (
                <span className="text-xs text-[#dc2626] mt-0.5 block">{errors.phone}</span>
              )}
            </div>
          </div>

          {/* Validación para Menores de Edad */}
          <div className="p-3.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#0b2545]">
              <input
                type="checkbox"
                checked={isMinor}
                onChange={(e) => setIsMinor(e.target.checked)}
                className="rounded text-[#00288e]"
              />
              El pasajero es menor de 18 años
            </label>

            {isMinor && (
              <div className="pt-2 border-t border-[#e2e8f0] flex flex-col gap-1.5">
                <span className="text-[11px] text-[#495f82] font-semibold">
                  Autorización de viaje según normativa CNRT:
                </span>
                <select
                  value={minorAuthorization}
                  onChange={(e) => setMinorAuthorization(e.target.value)}
                  className="w-full p-2 text-xs border border-[#cbd5e1] rounded bg-white"
                >
                  <option value="Acompañado por padre/madre">Viaja acompañado por padre, madre o tutor legal</option>
                  <option value="Autorización ante escribano">Viaja solo con autorización firmada ante escribano o juez de paz</option>
                  <option value="Acompañado por tercero autorizado">Viaja acompañado por un tercero debidamente autorizado</option>
                </select>
              </div>
            )}
          </div>

          {/* Validación para Asientos Accesibles / CUD */}
          <div className="p-3.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#0b2545]">
              <input
                type="checkbox"
                checked={hasCUD}
                onChange={(e) => setHasCUD(e.target.checked)}
                className="rounded text-[#00288e]"
              />
              Requiere asiento accesible / Pase por discapacidad (CUD Ley 22.431)
            </label>

            {hasCUD && (
              <div className="pt-2 border-t border-[#e2e8f0] flex flex-col gap-1.5">
                <label className="text-[11px] text-[#495f82] font-semibold">
                  Número de Certificado Único de Discapacidad (CUD):
                </label>
                <input
                  type="text"
                  placeholder="Ej: 0482910384"
                  value={cudNumber}
                  onChange={(e) => setCudNumber(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-[#cbd5e1] rounded bg-white font-mono"
                />
                {errors.cud && (
                  <span className="text-xs text-[#dc2626]">{errors.cud}</span>
                )}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-[#e2e8f0] flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-[#00288e] hover:bg-[#001c66] text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Continuar al Pago</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
