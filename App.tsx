
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
            {/* Título Principal ajustado de tamaño */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-minecraft font-bold mb-8 text-white drop-shadow-[0_6px_0_rgba(21,128,61,0.8)]">
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
                  <h2 className="text-3xl md:text-5xl font-pixel font-bold text-white mb-4 uppercase">Experiencia Modificada</h2>
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
             <div className="relative rounded-[3rem] overflow-hidden bg-[#0d0d0d] shadow-2xl p-10 md:p-20 border border-white/5">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px]"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-6xl font-pixel font-bold text-white mb-6 uppercase">Entra al Mundo</h2>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            Disfruta de la mejor estabilidad y rendimiento en Minecraft Bedrock. Sigue los pasos para conectarte a nuestra comunidad.
                        </p>
                        
                        <div className="bg-black/60 p-8 rounded-3xl border border-white/5">
                            <p className="text-green-500 font-bold mb-4 uppercase tracking-widest text-xs">Código de Invitación</p>
                            <div className="flex flex-col gap-4">
                                <span className="text-2xl md:text-4xl font-mono text-white font-black tracking-widest bg-green-500/10 px-6 py-4 rounded-xl border border-green-500/20 text-center break-all shadow-inner">
                                    [TU_CÓDIGO_REAL_AQUÍ]
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            {[
                              "Abre Minecraft & Jugar",
                              "Ve a Pestaña Amigos",
                              "Unirse a Realm",
                              "Pega el código de arriba"
                            ].map((step, idx) => (
                              <div key={idx} className="flex items-center gap-3 text-gray-400 bg-white/5 p-4 rounded-xl border border-white/5">
                                <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold shrink-0 text-xs">{idx + 1}</span>
                                <span className="font-medium text-sm">{step}</span>
                              </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="rounded-3xl overflow-hidden border border-white/10 shadow-xl relative group h-full min-h-[300px]">
                        <img 
                            src="https://media.craiyon.com/2025-07-31/TQwLGV13SNC28-FRuyHsEw.webp" 
                            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[3s]"
                            alt="Preview"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    </div>
                </div>
             </div>
          </div>
        );

      case Page.SHOP:
        return (
          <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-24 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-pixel font-bold text-white mb-6 uppercase text-glow-green">KITS EXCLUSIVOS</h2>
              <div className="bg-green-500/5 p-6 rounded-[2rem] border border-green-500/10">
                  <p className="text-lg text-green-300 font-medium tracking-wide">Precios en EUR. Tu apoyo ayuda a mantener el Realm activo.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
              {KITS.map((kit) => (
                <KitCard key={kit.id} kit={kit} />
              ))}
            </div>

            <div className="p-12 rounded-[3rem] bg-white/[0.01] border border-white/5 text-center max-w-4xl mx-auto relative overflow-hidden">
                <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest">Activación Directa</h3>
                <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                    Tras el pago por PayPal, abre un ticket en Discord con el comprobante. Activaremos tu kit manualmente al instante.
                </p>
                <a href={DISCORD_LINK} className="text-green-500 font-bold hover:text-green-400 transition-colors uppercase tracking-widest text-sm">
                    IR A DISCORD →
                </a>
            </div>
          </div>
        );

      case Page.RULES:
        return (
          <div className="pt-40 pb-32 px-6 max-w-4xl mx-auto">
             <div className="space-y-16">
                <div className="text-center">
                    <h2 className="text-4xl md:text-7xl font-pixel font-bold text-red-500 mb-6 uppercase tracking-widest">REGLAMENTO</h2>
                    <p className="text-gray-500 text-xl font-medium italic">Reglas claras para una comunidad sana.</p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                    {RULES.map((rule) => (
                        <div key={rule.id} className="p-8 rounded-2xl bg-[#0d0d0d] border border-white/5 flex gap-8 hover:bg-white/[0.02] transition-all group items-center">
                            <div className="text-3xl font-pixel text-red-900 group-hover:text-red-500 font-bold shrink-0 transition-colors">0{rule.id}</div>
                            <p className="text-xl text-gray-300 font-medium">{rule.text}</p>
                        </div>
                    ))}
                </div>
             </div>
          </div>
        );

      case Page.STAFF:
        return (
          <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-7xl font-pixel font-bold text-blue-500 mb-24 uppercase tracking-widest">EL EQUIPO</h2>
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
                    <a href={DISCORD_LINK} className="px-8 py-3 bg-white/5 rounded-xl text-white font-bold hover:bg-white/10 transition-all border border-white/10 uppercase tracking-widest text-xs">
                        POSTULAR EN DISCORD
                    </a>
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
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <footer className="bg-black py-32 mt-20 border-t border-white/5 relative overflow-hidden">
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-start gap-16 relative z-10">
            <div className="space-y-6 max-w-md">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center shadow-lg">
                        <span className="text-white font-minecraft font-bold text-lg">G</span>
                    </div>
                    <span className="text-2xl font-minecraft font-bold text-white tracking-widest">GravityMine</span>
                </div>
                <p className="text-gray-500 text-lg leading-relaxed font-medium">
                    Realm modificado para Minecraft Bedrock. Innovando en cada bioma desde 2026.
                </p>
                <div className="flex gap-4">
                  <a href={DISCORD_LINK} className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-green-500 group transition-all">
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.091 14.091 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.125-.094.252-.192.37-.29a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .077.01c.118.098.246.196.37.29a.077.077 0 0 1-.006.127 12.29 12.29 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993.023.032.063.046.084.028a19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.182 0-2.156-1.085-2.156-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.156 2.419 0 1.334-.946 2.419-2.156 2.419zm7.974 0c-1.182 0-2.156-1.085-2.156-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.156 2.419 0 1.334-.946 2.419-2.156 2.419z"/></svg>
                  </a>
                </div>
            </div>
            
            <div className="flex gap-16">
                <div className="space-y-6">
                    <h4 className="text-white font-bold uppercase tracking-widest text-[10px]">Mapa del Sitio</h4>
                    <div className="flex flex-col gap-3 text-sm">
                        <button onClick={() => setCurrentPage(Page.SHOP)} className="text-gray-500 hover:text-green-500 text-left transition-colors">Tienda</button>
                        <button onClick={() => setCurrentPage(Page.REALM)} className="text-gray-500 hover:text-green-500 text-left transition-colors">Entrar</button>
                        <button onClick={() => setCurrentPage(Page.RULES)} className="text-gray-500 hover:text-green-500 text-left transition-colors">Reglas</button>
                    </div>
                </div>
                <div className="space-y-6">
                    <h4 className="text-white font-bold uppercase tracking-widest text-[10px]">Legal</h4>
                    <div className="flex flex-col gap-3 text-sm">
                        <span className="text-gray-700">GravityMine &copy; 2026</span>
                        <a href={DISCORD_LINK} className="text-gray-500 hover:text-green-500 transition-colors">Contacto</a>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-10 pt-16 mt-16 border-t border-white/5 text-gray-700 text-[10px] text-center uppercase tracking-widest">
            <p>Este sitio no es oficial de Minecraft. No afiliado con Mojang AB.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
