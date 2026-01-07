import React, { useState, useEffect, useMemo } from 'react';
import { Page } from './types';
import { KITS, RULES, DISCORD_LINK, OWNER_NICK } from './constants';
import Navbar from './components/Navbar';
import KitCard from './components/KitCard';

const Snowfall = () => {
  const snowflakes = useMemo(() => {
    // Aumentamos la cantidad para que se sienta realmente nevado (60 copos)
    return Array.from({ length: 65 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 20}s`,
      // Profundidad: diferentes velocidades y desenfoques
      duration: `${12 + Math.random() * 18}s`,
      opacity: 0.15 + Math.random() * 0.8,
      size: `${0.3 + Math.random() * 2}rem`,
      blur: Math.random() > 0.8 ? 'blur(1px)' : 'none',
      content: ['❅', '❄', '❆', '•', '❄️'][Math.floor(Math.random() * 5)]
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.left,
            animationDelay: `${flake.delay}, ${Math.random() * 5}s`,
            animationDuration: `${flake.duration}, ${3 + Math.random() * 2}s`,
            opacity: flake.opacity,
            fontSize: flake.size,
            filter: flake.blur
          }}
        >
          {flake.content}
        </div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);

  useEffect(() => {
    console.log('App loaded - API Key exists:', !!process.env.API_KEY);
  }, []);

  if (!process.env.API_KEY) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center p-10 text-center">
        <div className="max-w-md p-8 bg-red-900/20 border border-red-500/50 rounded-3xl">
          <h2 className="text-2xl font-bold text-red-500 mb-4 uppercase">Error de Configuración</h2>
          <p className="text-gray-300 mb-6">
            La variable de entorno <strong>API_KEY</strong> no está configurada.
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
        <div className="absolute inset-0 z-0">
            <img 
                src="https://img.freepik.com/premium-photo/pixelated-landscape-with-snowcapped-mountain-green-tree-small-lake_1075309-27082.jpg"
                className="w-full h-full object-cover scale-[1.02]"
                alt="Cinematic Banner"
            />
            <div className="absolute inset-0 hero-overlay"></div>
        </div>
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
                      <div key={i} className="p-10 rounded-[2rem] bg-[#111]/80 border-2 border-green-500/20 text-center hover:bg-green-500/5 hover:border-green-500 transition-all group backdrop-blur-sm shadow-xl hover:-translate-y-2 duration-300">
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
             <div className="relative rounded-[3rem] overflow-hidden bg-[#0a0a0a] shadow-2xl p-10 md:p-24 border-4 border-green-500/30 flex flex-col items-center justify-center text-center">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px]"></div>
                <div className="relative z-10 space-y-10 py-10">
                    <div className="w-24 h-24 bg-green-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-green-500/20">
                        <span className="text-5xl">🛠️</span>
                    </div>
                    <h2 className="text-4xl md:text-7xl font-epic-title font-bold text-green-500 py-4">
                        PRÓXIMAMENTE DISPONIBLE
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-pixel uppercase tracking-widest">
                        El Realm se encuentra actualmente en mantenimiento para aplicar nuevas actualizaciones y mods.
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
          <div className="pt-32 pb-32 relative">
            {/* Solo en la tienda: Animación de Nieve Épica */}
            <Snowfall />

            {/* Banner Profesional Estilo YouTube Gaming */}
            <div className="w-full bg-transparent py-16 md:py-32 mb-10 flex items-center justify-center overflow-visible">
                <div className="max-w-[1500px] w-full px-8 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20">
                    
                    {/* IZQUIERDA: KITS EXCLUSIVOS */}
                    <div className="flex flex-col items-center transform -rotate-2 hover:rotate-0 transition-all duration-700 shrink-0 select-none">
                        <h2 className="text-7xl md:text-8xl lg:text-[10rem] font-['Bangers'] text-yellow-400 uppercase tracking-tight leading-[0.75] [text-shadow:_0_8px_0_#b45309,_0_12px_0_#000,_0_20px_40px_rgba(0,0,0,0.5)]">
                            KITS
                        </h2>
                        <h2 className="text-5xl md:text-6xl lg:text-[6.5rem] font-['Bangers'] text-yellow-500 uppercase mt-[-5px] tracking-normal [text-shadow:_0_6px_0_#b45309,_0_10px_0_#000,_0_15px_30px_rgba(0,0,0,0.4)] italic">
                            EXCLUSIVOS
                        </h2>
                        <div className="w-3/4 h-2 bg-yellow-500/20 blur-xl mt-4 rounded-full"></div>
                    </div>

                    {/* BARRA DIVISORA */}
                    <div className="hidden md:block w-1.5 h-48 bg-gradient-to-b from-transparent via-white/80 to-transparent rounded-full"></div>

                    {/* CENTRO/DERECHA */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
                        <h3 className="text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none font-['Inter'] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                            EQUIPAMIENTO OP,
                        </h3>
                        <h3 className="text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none font-['Inter'] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                            ARMAS MÍSTICAS
                        </h3>
                        <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
                           <p className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-blue-400 uppercase tracking-tight font-['Inter'] drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
                              REBAJAS INVERNALES
                           </p>
                           <span className="hidden sm:block text-white/40 text-3xl">&bull;</span>
                           <p className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white/90 uppercase tracking-tight font-['Inter'] drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
                              & VIP!
                           </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Aviso de Rebajas - Estilo Navideño Profesional */}
            <div className="max-w-7xl mx-auto px-6 mb-24 relative z-10">
              <div className="bg-gradient-to-r from-red-600/20 to-blue-600/10 border-2 border-white/20 backdrop-blur-xl p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                {/* Elementos decorativos internos */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-600/5 rounded-full -ml-16 -mb-16 blur-3xl"></div>
                
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 bg-white text-black rounded-3xl flex items-center justify-center shadow-[0_10px_20px_rgba(255,255,255,0.2)] group-hover:rotate-12 transition-all duration-500">
                    <span className="text-4xl">🎁</span>
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-3xl font-black text-white uppercase tracking-tighter font-['Inter'] mb-1">VENTA DE NAVIDAD</h4>
                    <p className="text-blue-300 font-bold text-sm md:text-base uppercase tracking-widest font-pixel">Del 10/01/2026 al 13/01/2026</p>
                  </div>
                </div>
                
                <div className="px-8 py-3 bg-red-600 text-white font-minecraft text-xs rounded-2xl uppercase tracking-[0.2em] shadow-[0_6px_0_#991b1b] transform hover:scale-105 transition-transform cursor-default">
                  15% OFF EN TODO
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mb-24">
                  {KITS.map((kit) => (
                    <KitCard key={kit.id} kit={kit} />
                  ))}
                </div>
                <div className="p-12 rounded-[2.5rem] bg-white/5 border-2 border-white/10 text-center max-w-4xl mx-auto relative overflow-hidden shadow-2xl backdrop-blur-md">
                    <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest font-minecraft">Canje de Kits</h3>
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto font-pixel tracking-widest uppercase">
                        Habla con nuestro Staff en Discord para reclamar tus beneficios.
                    </p>
                    <a href={DISCORD_LINK} className="inline-block px-10 py-4 bg-white text-black font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-[0_6px_0_#cbd5e1] active:translate-y-1 active:shadow-none uppercase text-xs tracking-widest">ABRIR TICKET</a>
                </div>
            </div>
          </div>
        );

      case Page.RULES:
        return (
          <div className="pt-40 pb-40 px-6 relative">
             <div className="max-w-4xl mx-auto">
                <div className="max-w-4xl mx-auto mb-20 p-10 md:p-14 bg-gradient-to-br from-green-950/80 via-black/90 to-black/90 backdrop-blur-md border-4 border-green-600/50 rounded-[2.5rem] shadow-2xl shadow-green-900/20 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-30"></div>
                    <h2 className="text-4xl md:text-6xl font-['Pixelify_Sans'] font-bold text-green-400 mb-6 tracking-[0.15em] uppercase" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
                        Reglamento
                    </h2>
                    <div className="w-32 h-1 bg-green-600/40 mx-auto rounded-full mb-6"></div>
                    <p className="text-green-300 font-minecraft text-xs md:text-sm uppercase tracking-[0.4em] opacity-80">Normas para una convivencia épica</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {RULES.map((rule) => (
                        <div key={rule.id} className="group relative p-8 rounded-xl bg-[#0d0d0d] border-2 border-green-500/20 flex flex-col md:flex-row gap-8 items-center transition-all duration-300 hover:bg-green-500/5 hover:border-green-500 hover:scale-[1.03] shadow-lg hover:shadow-green-500/10">
                            <div className="shrink-0 flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-xl border-2 border-green-500/40 group-hover:bg-green-500 group-hover:border-green-400 transition-all duration-300 shadow-inner">
                                <span className="text-4xl font-pixel text-green-400 font-bold group-hover:text-black">{rule.id < 10 ? `0${rule.id}` : rule.id}</span>
                            </div>
                            <div className="flex-grow text-center md:text-left">
                                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed font-pixel tracking-wider uppercase group-hover:text-green-100 transition-colors">{rule.text}</p>
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
            <div className="max-w-4xl mx-auto mb-20 p-10 md:p-14 bg-gradient-to-br from-green-950/80 via-black/90 to-black/90 backdrop-blur-md border-4 border-green-600/50 rounded-[2.5rem] shadow-2xl shadow-green-900/20 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-30"></div>
              <h2 className="text-4xl md:text-6xl font-['Pixelify_Sans'] font-bold text-green-400 mb-6 tracking-[0.15em] uppercase" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
                El Equipo
              </h2>
              <div className="w-32 h-1 bg-green-600/40 mx-auto rounded-full mb-6"></div>
              <p className="text-green-300 font-minecraft text-xs md:text-sm uppercase tracking-[0.4em] opacity-80">Guardianes de GravityMine</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                <div className="bg-[#0d0d0d]/80 backdrop-blur-md p-12 rounded-2xl border-4 border-green-500 shadow-2xl hover:scale-105 transition-all duration-300 group">
                    <div className="w-32 h-32 bg-green-500/10 rounded-2xl mx-auto mb-8 flex items-center justify-center border-2 border-green-500/40 group-hover:bg-green-500 transition-all">
                        <span className="text-5xl group-hover:scale-110 transition-transform">👑</span>
                    </div>
                    <h3 className="text-2xl font-epic-title text-white mb-2 uppercase tracking-widest">{OWNER_NICK}</h3>
                    <p className="text-green-400 font-minecraft uppercase tracking-widest text-sm">Administrador</p>
                </div>

                <div className="bg-black/40 p-12 rounded-2xl border-4 border-dashed border-green-500/30 flex flex-col items-center justify-center group hover:bg-green-500/5 hover:border-green-500 transition-all duration-300 shadow-xl">
                    <p className="text-gray-400 font-pixel text-2xl uppercase tracking-widest mb-8">¿Quieres ayudar?</p>
                    <a href={DISCORD_LINK} className="px-10 py-4 bg-green-600 text-white font-minecraft rounded-xl shadow-[0_6px_0_#15803d] hover:brightness-110 active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest text-xs">POSTULAR AHORA</a>
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
      <footer className="bg-black py-20 mt-20 border-t border-green-500/10 text-center">
        <div className="max-w-7xl mx-auto px-10">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-minecraft">GravityMine &copy; 2026. No oficial de Minecraft.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;