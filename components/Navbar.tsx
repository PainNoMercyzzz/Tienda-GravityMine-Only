
import React, { useState, useEffect } from 'react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: Page.HOME, label: 'Inicio' },
    { id: Page.REALM, label: 'Realm' },
    { id: Page.SHOP, label: 'Tienda' },
    { id: Page.RULES, label: 'Reglas' },
    { id: Page.STAFF, label: 'Staff' },
  ];

  const handleNavigation = (id: Page) => {
    setPage(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled ? 'glass-nav py-3' : 'bg-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => handleNavigation(Page.HOME)}
        >
          <div className="relative w-11 h-11 bg-green-600 rounded-xl mr-4 flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform">
              <span className="text-white font-pixel text-2xl font-bold">G</span>
              <div className="absolute inset-0 bg-green-400 opacity-20 blur-lg group-hover:opacity-40 transition-opacity"></div>
          </div>
          <span className="text-2xl md:text-4xl font-pixel font-bold tracking-widest text-white group-hover:text-green-400 transition-colors drop-shadow-md">
            GRAVITY<span className="text-green-500">MINE</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                currentPage === item.id 
                  ? 'bg-green-500/15 text-green-400 border border-green-500/30' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 text-white bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-3xl transition-all duration-500 ease-in-out overflow-hidden border-b border-white/10 ${
        isOpen ? 'max-h-screen opacity-100 py-10 shadow-2xl' : 'max-h-0 opacity-0 py-0'
      }`}>
        <div className="px-8 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`block w-full text-left font-bold py-5 px-8 rounded-2xl transition-all text-xl ${
                currentPage === item.id 
                  ? 'bg-green-500 text-white shadow-2xl shadow-green-900/40' 
                  : 'text-gray-400 bg-white/5 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
