import React, { useState, useEffect } from 'react';
import { FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 md:top-6 left-0 md:left-1/2 z-50 w-full md:w-[90%] md:-translate-x-1/2 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-white/70 dark:bg-black/80 py-4 md:py-3 backdrop-blur-xl md:border border-slate-200 dark:border-white/10 md:rounded-2xl shadow-lg dark:shadow-2xl'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          <a href="#home" className="text-2xl font-black tracking-tighter text-blue-600 dark:text-blue-500 z-50 transition-transform hover:scale-105 active:scale-95">
            YR<span className="text-slate-800 dark:text-white">.</span>
          </a>

          {/* Desktop Menu */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="relative text-sm font-medium tracking-wide text-slate-800 dark:text-gray-300 transition-colors hover:text-blue-500 dark:hover:text-blue-500 group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <a
              href="https://github.com/YusufRamadani2025"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black/5 dark:bg-white/5 p-2 text-xl text-slate-900 dark:text-white transition-all duration-300 hover:bg-blue-500 hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] dark:hover:bg-blue-500 hover:text-white"
            >
              <FaGithub />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="block md:hidden text-2xl text-slate-900 dark:text-white z-50 focus:outline-none transition-transform active:scale-90"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="relative w-6 h-6">
               <span className={`absolute block w-6 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
               <span className={`absolute block w-6 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300 top-3 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
               <span className={`absolute block w-6 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-white/98 dark:bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-10'
      }`}>
        <ul className="flex flex-col items-center gap-10">
          {navLinks.map((link, index) => (
            <li 
              key={link.name}
              className={`transition-all duration-500 delay-[${index * 100}ms] ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <a
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-bold tracking-widest text-slate-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-500 transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        
        <div 
          className={`mt-16 flex gap-8 transition-all duration-500 delay-500 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
           <ThemeToggle />
           <a
              href="https://github.com/YusufRamadani2025"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black/5 dark:bg-white/5 p-5 text-3xl text-slate-900 dark:text-white hover:bg-blue-500 hover:text-white transition-all hover:scale-110"
            >
              <FaGithub />
            </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
