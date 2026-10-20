import React from 'react';
import { MainSection } from '../types';
import { ToritoLogo } from './ToritoLogo';

interface FooterProps {
  onNavigate: (section: MainSection) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#0B2545] text-white mt-auto border-t border-[#1E3A8A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Logo & Company Description */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <ToritoLogo size="md" variant="light" />
            <p className="text-xs text-[#b1c7f0] leading-relaxed max-w-sm mt-1">
              Líderes federales con más de 45 años garantizando salidas seguras, confortables y puntuales hacia los principales corredores de la República Argentina.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-[#ffedd5]">
              <span className="material-symbols-outlined text-[18px] text-[#D9261C]">call</span>
              <span className="font-bold font-mono text-sm">0810-888-TORITO (8674)</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-2.5 text-xs">
            <span className="font-bold text-[#ffedd5] uppercase tracking-wider text-[11px]">
              Accesos Directos
            </span>
            <ul className="flex flex-col gap-2 text-[#b1c7f0]">
              <li>
                <button
                  onClick={() => onNavigate('compra')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Comprar Pasajes Online
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('consulta')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Consulta de Reserva y QR
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('consulta')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Devoluciones y Cancelaciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('encomiendas')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Recepción y Cargas en Bodega
                </button>
              </li>
            </ul>
          </div>

          {/* Fictional Academic Note & CNRT Frame */}
          <div className="md:col-span-4 flex flex-col gap-2.5 text-xs">
            <span className="font-bold text-[#ffedd5] uppercase tracking-wider text-[11px]">
              Información del Sistema
            </span>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-[11px] text-[#cbd5e1] leading-relaxed flex flex-col gap-1.5">
              <span className="text-[#D9261C] font-bold uppercase text-[10px] tracking-wider">
                Prototipo Demostrativo
              </span>
              <p>
                Este sistema y sus datos son ficticios, desarrollados exclusivamente con fines demostrativos y académicos conforme a los requisitos de la ERS de Transporte Automotor.
              </p>
              <span className="text-[#ffedd5] font-semibold text-[10px] pt-1 border-t border-white/10">
                Operador Ficticio CNRT N° H-429 • Retiro Dársenas 1-12
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94a3b8]">
          <span>
            © 2025 Transportes Automotores El Torito S.A. • Todos los derechos reservados.
          </span>
          <div className="flex items-center gap-1.5 text-[#b1c7f0] text-[11px]">
            <span className="material-symbols-outlined text-[16px] text-[#D9261C]">verified_user</span>
            <span>Sistema Seguro de Boletos Digitales</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
