import React, { useMemo } from 'react';
import { Kit } from '../types';

interface KitCardProps {
  kit: Kit;
}

const KitCard: React.FC<KitCardProps> = ({ kit }) => {
  const isUpcoming = true;
  const discountPercent = 15;
  const discountedPrice = (kit.price * (1 - discountPercent / 100)).toFixed(2);

  // Generamos un set de copos de nieve específicos para cada tarjeta
  const flakes = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${8 + Math.random() * 8}s`,
      size: `${2 + Math.random() * 3}px`,
      drift: `${(Math.random() * 40) - 20}px`,
      opacity: 0.4 + Math.random() * 0.5
    }));
  }, []);

  return (
    <div className={`bg-[#0a0a0a] p-6 md:p-8 rounded-2xl border-4 ${isUpcoming ? 'border-blue-400/20' : 'border-blue-400/40'} hover:border-blue-300 shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-blue-300/10 transition-all duration-500 flex flex-col items-center group overflow-hidden relative h-full hover:-translate-y-2 snow-glow`}>
      
      {/* EFECTO DE NIEVE PROFESIONAL (CRISTAL CSS) */}
      <div className="absolute inset-0 pointer-events-none z-[15] overflow-hidden">
        {flakes.map((f) => (
          <div 
            key={f.id}
            className="card-snow-flake"
            style={{
              left: f.left,
              width: f.size,
              height: f.size,
              animationDelay: f.delay,
              animationDuration: f.duration,
              // @ts-ignore
              '--drift': f.drift,
              '--op': f.opacity
            } as React.CSSProperties}
          />
        ))}
        {/* Sutil glow de escarcha en la parte superior */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white/10 to-transparent"></div>
      </div>
      
      {/* Brillo helado de fondo (detrás de la imagen) */}
      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl z-0"></div>

      {/* Main Image Container (z-10) */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-white/10 mb-8 bg-black/60 z-10 shadow-inner">
        <img 
            src={kit.image} 
            alt={kit.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s] pixelated"
            onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/111/44aaff?text=' + kit.name;
            }}
        />
        
        {/* Precio y Descuento (z-20) - Garantiza visibilidad total */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-20">
          <div className="bg-gradient-to-r from-red-600 to-red-500 text-white font-bold px-3 py-1 rounded-lg text-[10px] font-minecraft uppercase shadow-[0_4px_0_#991b1b] border border-white/20 animate-bounce">
            -{discountPercent}%
          </div>
          <div className="bg-[#f0f9ff]/90 text-blue-900 font-bold px-4 py-2 rounded-xl shadow-xl flex flex-col items-center border-b-4 border-blue-200 backdrop-blur-sm">
            <span className="text-[9px] line-through opacity-40">{kit.price}€</span>
            <span className="font-minecraft text-sm">{discountedPrice}€</span>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
      </div>

      {/* Content Block (z-10) */}
      <div className="text-center relative z-10 w-full flex flex-col flex-grow">
        <h3 className="text-2xl font-epic-title text-white mb-4 uppercase tracking-wider group-hover:text-blue-300 transition-colors drop-shadow-md">{kit.name}</h3>
        
        <div className="flex-grow flex flex-col items-center justify-between py-4">
          <span className="text-2xl md:text-3xl font-pixel text-blue-400/80 animate-pulse uppercase tracking-[0.2em] mb-8">
            Próximamente
          </span>
          
          <button 
            disabled={isUpcoming}
            className={`
              w-full py-4 rounded-xl font-minecraft text-[11px] uppercase tracking-widest font-bold transition-all duration-150 relative outline-none z-[25]
              ${isUpcoming 
                ? 'bg-[#1a1a1a] border-2 border-blue-900/30 text-blue-900/50 cursor-not-allowed' 
                : 'bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700 text-white shadow-[0_8px_0_#1e3a8a] hover:brightness-110 active:translate-y-[6px] active:shadow-[0_2px_0_#1e3a8a]'
              }
            `}
          >
            <span className={`relative z-10 ${!isUpcoming ? 'drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]' : ''}`}>
              {isUpcoming ? 'Congelado' : 'Comprar ahora'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default KitCard;