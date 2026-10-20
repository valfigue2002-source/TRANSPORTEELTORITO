import React, { useState } from 'react';
import { MainSection } from '../types';
import { ToritoLogo } from './ToritoLogo';

interface HeaderProps {
  activeSection: MainSection;
  onNavigate: (section: MainSection) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#e2e8f0] shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => {
            onNavigate('compra');
            setMobileMenuOpen(false);
          }}
          className="flex items-center text-left cursor-pointer focus:outline-none group py-1"
          title="Transportes Automotores El Torito - Inicio"
        >
          <ToritoLogo size="md" variant="dark" />
        </button>

        {/* Center/Right Navigation */}
        <div className="hidden md:flex items-center gap-1.5">
          <button
            onClick={() => onNavigate('compra')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'compra'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'text-[#444653] hover:text-[#0B2545] hover:bg-[#eff4ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">directions_bus</span>
            <span>Comprar Pasajes</span>
          </button>

          <button
            onClick={() => onNavigate('consulta')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'consulta'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'text-[#444653] hover:text-[#0B2545] hover:bg-[#eff4ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">assignment_return</span>
            <span>Mis Pasajes / Devolución</span>
          </button>

          <button
            onClick={() => onNavigate('encomiendas')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSection === 'encomiendas'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'text-[#444653] hover:text-[#0B2545] hover:bg-[#eff4ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            <span>Encomiendas</span>
          </button>
        </div>

        {/* Right Info: Trust Badge & Phone */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex flex-col items-end text-right">
            <span className="text-[10px] text-[#D9261C] font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9261C]" />
              Atención Telefónica
            </span>
            <span className="text-xs font-bold text-[#0B2545] font-mono">
              0810-888-TORITO (8674)
            </span>
          </div>

          <div className="h-7 w-px bg-[#cbd5e1]" />

          <div className="px-2.5 py-1 rounded bg-[#eff4ff] text-[#00288e] border border-[#d3e4fe] flex items-center gap-1 text-[11px] font-bold">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            <span>CNRT H-429</span>
          </div>
        </div>

        {/* Mobile menu hamburger button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#0B2545] hover:bg-[#f1f5f9] focus:outline-none"
          aria-label="Menú"
        >
          <span className="material-symbols-outlined text-[24px]">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#e2e8f0] px-4 py-3 space-y-1.5 shadow-md">
          <button
            onClick={() => {
              onNavigate('compra');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between ${
              activeSection === 'compra' ? 'bg-[#0B2545] text-white' : 'text-[#0B2545] hover:bg-[#eff4ff]'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">directions_bus</span>
              Comprar Pasajes
            </span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>

          <button
            onClick={() => {
              onNavigate('consulta');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between ${
              activeSection === 'consulta' ? 'bg-[#0B2545] text-white' : 'text-[#0B2545] hover:bg-[#eff4ff]'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">assignment_return</span>
              Mis Pasajes / Devolución
            </span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>

          <button
            onClick={() => {
              onNavigate('encomiendas');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between ${
              activeSection === 'encomiendas' ? 'bg-[#0B2545] text-white' : 'text-[#0B2545] hover:bg-[#eff4ff]'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              Gestión de Encomiendas
            </span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>

          <div className="pt-2 border-t border-[#e2e8f0] text-xs text-[#64748b] flex justify-between items-center px-1">
            <span>Atención: 0810-888-8674</span>
            <span className="font-bold text-[#00288e]">CNRT H-429</span>
          </div>
        </div>
      )}
    </header>
  );
};
