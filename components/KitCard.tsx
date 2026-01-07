import React from 'react';
import { Kit } from '../types';

interface KitCardProps {
  kit: Kit;
}

const KitCard: React.FC<KitCardProps> = ({ kit }) => {
  return (
    <div className="card-dark p-8 group flex flex-col h-full relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 bg-green-500/10 blur-[80px] rounded-full group-hover:bg-green-500/20 transition-all duration-700`}></div>

      {/* Image Showcase */}
      <div className="relative aspect-square w-full rounded-[1.5rem] overflow-hidden mb-10 bg-black/50 flex items-center justify-center border border-white/5 group-hover:border-green-500/20 transition-colors">
        <img 
            src={kit.image} 
            alt={kit.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 pixelated"
            onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/111/22c55e?text=' + kit.name;
            }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        {/* Hover Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-green-500 text-xs font-bold uppercase tracking-[0.3em] mb-1">Kit Especial</p>
              <h3 className="text-2xl font-minecraft font-bold text-white uppercase tracking-tight leading-tight">{kit.name}</h3>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-3xl font-black text-green-400 leading-none">{kit.price}€</span>
                <span className="text-[11px] text-gray-500 uppercase font-extrabold tracking-widest mt-1">EUR</span>
            </div>
        </div>

        {/* Reemplazo de descripción por Próximamente */}
        <div className="flex-grow flex items-center justify-center py-8 mb-10 border-2 border-dashed border-white/5 rounded-2xl bg-black/20">
          <p className="text-2xl md:text-3xl font-epic-title text-green-500/50 animate-pulse tracking-widest">
            PRÓXIMAMENTE
          </p>
        </div>

        <button
          disabled
          className="w-full py-5 text-center text-sm uppercase tracking-[0.25em] font-black bg-white/5 text-gray-500 rounded-xl cursor-not-allowed border border-white/5"
        >
          No disponible
        </button>
      </div>
    </div>
  );
};

export default KitCard;