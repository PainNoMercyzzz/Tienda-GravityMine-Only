import React, { useState, useEffect } from 'react';
import { Page } from './types';
import { KITS, RULES, DISCORD_LINK, OWNER_NICK } from './constants';
import Navbar from './components/Navbar';
import KitCard from './components/KitCard';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);

  useEffect(() => {
    // Log de depuración para producción
    console.log('App loaded - API Key exists:', !!process.env.API_KEY);
  }, []);

  // Validación de seguridad para evitar fallos silenciosos en Vercel
  if (!process.env.API_KEY) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-10 text-center">
        <div className="max-w-md p-8 bg-red-900/20 border border-red-500/50 rounded-3xl">
          <h2 className="text-2xl font-bold text-red-500 mb-4 uppercase">Error de Configuración</h2>
          <p className="text-gray-300 mb-6">
            La variable de entorno <strong>API_KEY</strong> no está configurada en Vercel.
          </p>
          <div className="text-left text-sm text-gray-400 bg-black/50 p-4 rounded-xl font-mono">
            1. Ve a Vercel Settings<br/>
            2. Environment Variables<br/>
            3. Añade API_KEY<br/>
            4. Redeploy
          </div>
        </div>
      </div>
    );
  }

  const Hero = ({ title, subtitle, showButton = false }: { title: string, subtitle: string, showButton?: boolean }) => (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://img.freepik.com/premium-photo/pixelated-landscape-with-snowcapped-mountain-green-tree-small-lake_1075309-27082.jpg"
                className="w-full h-full object-cover scale-[1.02]"
                alt="Cinematic Banner"
            />
            <div className="absolute inset-0 hero-overlay"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 text-center px-6 animate-fade-in-up max-w-5xl flex flex-col items-center">
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-hero-title mb-10 text-white uppercase py-4">
                {title}
            </h1>
            <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed mb-12 tracking-wide drop-shadow-xl">
                {subtitle}
            </p>
            {showButton && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a 
                        href={DISCORD_LINK} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="minecraft-btn-modern px-10 py-5 text-lg inline-block w-full sm:w-auto text-center"
                    >
                        ÚNETE AL DISCORD
                    </a>
                    <button 
                        onClick={() => setCurrentPage(Page.REALM)}
                        className="px-10 py-5 text-lg border border-white/10 rounded-2xl hover:bg-white/5 transition-all text-white font-bold w-full sm:w-auto backdrop-blur-md"
                    >
                        ACCESO REALM
                    </button>
                </div>
            )}
        </div>
    </section>
  );

  const renderContent = () => {
    switch (currentPage) {
      case Page.HOME:
        return (
          <>
            <Hero 
                title="GravityMine" 
                subtitle="El Realm modificado definitivo para Minecraft Bedrock. Vive una experiencia única con mods exclusivos, texturas personalizadas y biomas épicos." 
                showButton={true}
            />
            <section className="max-w-7xl mx-auto py-32 px-6">
                <div className="text-center mb-20">
                  <h2 className="text-3xl md:text-5xl font-epic-title font-bold text-green-500 mb-4 py-4">Experiencia Modificada</h2>
                  <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                      { icon: '🧩', title: 'Addons & Mods', desc: 'Sistemas de maquinaria y nuevos crafteos que transforman totalmente la jugabilidad clásica.' },
                      { icon: '🖌️', title: 'Texturas HD', desc: 'Paquetes de texturas integrados que mejoran el apartado visual y añaden detalles increíbles.' },
                      { icon: '🐉', title: 'Contenido Único', desc: 'Enfréntate a jefes personalizados, explora dimensiones alteradas y descubre tesoros legendarios.' }
                    ].map((feature, i) => (
                      <div key={i} className="p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center hover:bg-white/[0.05] transition-all group">
                          <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:bg-green-500 transition-all duration-500">
                              <span className="text-3xl group-hover:text-black transition-colors">{feature.icon}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-4 text-white uppercase tracking-wider">{feature.title}</h3>
                          <p className="text-gray-400 text-base leading-relaxed">{feature.desc}</p>
                      </div>
                    ))}
                </div>
            </section>
          </>
        );

      case Page.REALM:
        return (
          <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
             <div className="relative rounded-[3rem] overflow-hidden bg-[#0d0d0d] shadow-2xl p-10 md:p-24 border border-white/5 flex flex-col items-center justify-center text-center">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px]"></div>
                <div className="relative z-10 space-y-10 py-10">
                    <div className="w-24 h-24 bg-green-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-green-500/20">
                        <span className="text-5xl">🛠️</span>
                    </div>
                    <h2 className="text-4xl md:text-7xl font-epic-title font-bold text-green-500 py-4">
                        PRÓXIMAMENTE DISPONIBLE
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-pixel uppercase tracking-widest">
                        El Realm se encuentra actualmente en mantenimiento para aplicar nuevas actualizaciones y mods. Vuelve pronto para la apertura oficial.
                    </p>
                    <div className="pt-10">
                        <a href={DISCORD_LINK} className="minecraft-btn-modern px-12 py-5 text-xl">NOTIFICACIONES EN DISCORD</a>
                    </div>
                </div>
             </div>
          </div>
        );

      case Page.SHOP:
        return (
          <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-24 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-epic-title font-bold text-green-500 mb-8 py-6">KITS EXCLUSIVOS</h2>
              <div className="bg-green-500/5 p-6 rounded-[2rem] border border-green-500/10">
                  <p className="text-lg text-green-300 font-medium tracking-wide">Tu apoyo ayuda a mantener el Realm activo. Precios en EUR.</p>
              </div>
            </div>

            {/* Grid dinámico que soporta múltiples kits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
              {KITS.map((kit) => (
                <KitCard key={kit.id} kit={kit} />
              ))}
            </div>

            <div className="p-12 rounded-[3rem] bg-white/[0.01] border border-white/5 text-center max-w-4xl mx-auto relative overflow-hidden">
                <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest">Aviso de Tienda</h3>
                <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                    Los kits que no están marcados como "Próximamente" ya pueden adquirirse contactando con el Staff en Discord.
                </p>
                <a href={DISCORD_LINK} className="text-green-500 font-bold hover:text-green-400 transition-colors uppercase tracking-widest text-sm">SABER MÁS EN DISCORD →</a>
            </div>
          </div>
        );

      case Page.RULES:
        return (
          <div className="pt-40 pb-40 px-6 relative">
             <div className="max-w-4xl mx-auto">
                <div className="relative mb-24 py-16 px-8 rounded-[3rem] bg-[#0d0d0d]/80 border-4 border-red-900/40 shadow-2xl backdrop-blur-md overflow-hidden text-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-8xl font-epic-title font-bold text-red-500 mb-6 py-2" style={{ textShadow: '6px 6px 0px rgba(0,0,0,0.8)' }}>
                            REGLAMENTO
                        </h2>
                        <div className="h-1.5 w-32 bg-red-600 mx-auto rounded-full mb-6"></div>
                        <p className="text-gray-400 text-lg md:text-xl font-pixel uppercase tracking-widest max-w-xl mx-auto">
                            Normas obligatorias para garantizar la supervivencia y el respeto en el Realm.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    {RULES.map((rule) => (
                        <div key={rule.id} className="group relative p-8 rounded-2xl bg-[#0a0a0a] border-2 border-red-900/20 flex flex-col md:flex-row gap-8 items-center transition-all duration-300 hover:bg-[#111] hover:border-red-500/40 hover:-translate-y-1 shadow-lg">
                            <div className="shrink-0 flex items-center justify-center w-20 h-20 bg-red-500/10 rounded-xl border-2 border-red-500/20 group-hover:bg-red-500/20 group-hover:scale-110 transition-all duration-500">
                                <span className="text-3xl font-pixel text-red-500 font-black">{rule.id < 10 ? `0${rule.id}` : rule.id}</span>
                            </div>
                            <div className="flex-grow">
                                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed group-hover:text-red-100 transition-colors">{rule.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
          </div>
        );

      case Page.STAFF:
        return (
          <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-7xl font-epic-title font-bold text-blue-500 mb-24 py-6" style={{ textShadow: '4px 4px 0px rgba(30, 58, 138, 0.9)' }}>EL EQUIPO</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                <div className="bg-[#0d0d0d] p-12 rounded-[2.5rem] border border-blue-500/20 hover:border-blue-500/40 transition-all group relative">
                    <div className="w-32 h-32 bg-blue-500/10 rounded-2xl mx-auto mb-8 flex items-center justify-center border border-blue-500/20 group-hover:scale-105 transition-transform">
                        <span className="text-5xl">👑</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 uppercase">{OWNER_NICK}</h3>
                    <p className="text-blue-500 font-bold uppercase tracking-widest text-xs">Administrador</p>
                </div>
                <div className="bg-white/[0.01] p-12 rounded-[2.5rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center group hover:bg-white/[0.03] transition-all">
                    <p className="text-gray-500 font-bold text-xl italic mb-6">¿Quieres ayudar?</p>
                    <a href={DISCORD_LINK} className="px-8 py-3 bg-white/5 rounded-xl text-white font-bold hover:bg-white/10 transition-all border border-white/10 uppercase tracking-widest text-xs">POSTULAR EN DISCORD</a>
                </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      <main className="flex-grow">{renderContent()}</main>
      <footer className="bg-black py-32 mt-20 border-t border-white/5 relative overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-10">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest">GravityMine &copy; 2026. No oficial de Minecraft.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;