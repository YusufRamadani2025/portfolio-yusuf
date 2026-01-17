import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white overflow-hidden transition-all hover:bg-black/10 dark:hover:bg-white/10 hover:border-blue-500/50 group"
      aria-label="Toggle Theme"
    >
      <div className="relative z-10 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
        {/* Sun Icon (Visible in Light Mode) */}
        <FaSun 
            className={`absolute transition-all duration-500 ${theme === 'light' ? 'rotate-0 opacity-100 scale-100 text-orange-500' : 'rotate-90 opacity-0 scale-0'}`} 
        />
        
        {/* Moon Icon (Visible in Dark Mode) */}
        <FaMoon 
            className={`absolute transition-all duration-500 ${theme === 'dark' ? 'rotate-0 opacity-100 scale-100 text-blue-400' : '-rotate-90 opacity-0 scale-0'}`} 
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
