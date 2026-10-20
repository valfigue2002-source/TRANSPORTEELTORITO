import React from 'react';

export const OFFICIAL_TORITO_LOGO_URL = '/assets/aistudio/Logotipo_de_El_Torito_Transportes_d728d3ad.png';

interface ToritoLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const ToritoLogo: React.FC<ToritoLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
}) => {
  // Height presets for the exact image
  const sizeClasses = {
    sm: 'h-10 sm:h-11',
    md: 'h-14 sm:h-16',
    lg: 'h-20 sm:h-24',
    xl: 'h-28 sm:h-32',
  }[size];

  const isLight = variant === 'light';

  return (
    <div
      className={`inline-flex items-center justify-center select-none ${
        isLight
          ? 'bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-xs border border-white/30'
          : ''
      } ${className}`}
    >
      <img
        src={OFFICIAL_TORITO_LOGO_URL}
        alt="Transportes Automotores El Torito"
        className={`w-auto object-contain max-w-full ${sizeClasses}`}
        loading="eager"
      />
    </div>
  );
};
