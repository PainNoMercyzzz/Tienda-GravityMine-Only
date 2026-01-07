import React from 'react';
import { Kit } from '../types';

interface KitCardProps {
  kit: Kit;
}

const KitCard: React.FC<KitCardProps> = ({ kit }) => {
  // Mantenemos isUpcoming en true para conservar el estado de "Próximamente" solicitado anteriormente.
  const isUpcoming = true;

  return (
    <div className={`bg-[#0a0a0a] p-6 md:p-8 rounded-[2rem] border-4 ${isUpcoming ? 'border-green-500/30' : 'border-white/5'} hover:border-green-500 shadow-2xl transition-all duration-500 flex flex-col items-center group overflow-hidden relative h-full`}>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

      {/* Main Image Container */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-white/5 mb-8 bg-black/40">
        <img 
            src={kit.image} 
            alt={kit.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] pixelated"
            onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/111/22c55e?text=' + kit.name;
            }}
        />
        {/* Etiqueta superior verde con el precio exacto */}
        <div className="absolute top-4 right-4 bg-green-600 text-white font-bold px-4 py-2 rounded-lg shadow-lg z-20 font-minecraft text-[10px] uppercase">
          {kit.price}€
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>

      {/* Content Block */}
      <div className="text-center relative z-10 w-full flex flex-col flex-grow">
        <h3 className="text-2xl font-epic-title text-white mb-4 uppercase tracking-wider">{kit.name}</h3>
        
        <div className="flex-grow flex flex-col items-center justify-between py-4">
          <span className="text-2xl md:text-3xl font-pixel text-green-500/60 animate-pulse uppercase tracking-[0.2em] mb-8">
            Próximamente
          </span>
          
          {/* Botón de acción refinado: Se mejoró el estado deshabilitado (No disponible) */}
          <button 
            disabled={isUpcoming}
            className={`
              w-full py-4 rounded-xl font-minecraft text-[11px] uppercase tracking-widest font-bold transition-all duration-75 relative outline-none
              ${isUpcoming 
                ? 'bg-[#121212] border border-green-900/20 text-green-900/60 cursor-not-allowed shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] opacity-90' 
                : 'bg-gradient-to-b from-[#55ff55] via-[#22c55e] to-[#15803d] text-white shadow-[0_8px_0_#052e16] hover:brightness-110 hover:-translate-y-0.5 active:translate-y-[6px] active:shadow-[0_2px_0_#052e16]'
              }
            `}
          >
            <span className={`relative z-10 ${!isUpcoming ? 'drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]' : ''}`}>
              {isUpcoming ? 'No disponible' : 'Comprar ahora'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default KitCard;