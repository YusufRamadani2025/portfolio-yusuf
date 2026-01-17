import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppBtn = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "6285936555091";
  const message = "Hello Yusuf! I saw your portfolio and I'd like to chat.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      // Only attach hover handlers for desktop to prevent mobile glitches
      onMouseEnter={() => window.innerWidth >= 768 && setIsHovered(true)}
      onMouseLeave={() => window.innerWidth >= 768 && setIsHovered(false)}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] group flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      {/* 1. Sonar/Ripple Effect (Cyan Theme) */}
      <span className="absolute inset-0 rounded-full border border-cyan-500/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
      <span className="absolute inset-0 rounded-full border border-blue-500/20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] delay-300"></span>

      {/* 2. Main Container */}
      <div 
        className={`
          relative flex items-center bg-black/60 dark:bg-black/40 backdrop-blur-xl border border-white/10
          shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]
          transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          overflow-hidden
          /* Mobile: Always Circle (w-12 h-12) */
          w-12 h-12 justify-center rounded-full
          /* Desktop: Dynamic Width (Circle to Capsule) */
          md:w-16 md:h-16
          ${isHovered ? 'md:!w-40 md:!rounded-2xl md:px-4' : ''}
        `}
      >
        {/* Tech Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10 opacity-50"></div>

        {/* 3. Icon Wrapper */}
        <div className={`relative z-10 flex items-center justify-center transition-all duration-500 ${isHovered ? 'md:mr-3' : ''}`}>
           <FaWhatsapp className="text-2xl md:text-3xl text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
           
           {/* Online Status Dot (Cyan) */}
           <span className="absolute -top-1 -right-1 flex h-2 w-2 md:h-3 md:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-cyan-500"></span>
           </span>
        </div>

        {/* 4. Text (Desktop Only & Visible on Hover) */}
        <div 
           className={`hidden md:block relative z-10 whitespace-nowrap overflow-hidden transition-all duration-500 ${isHovered ? 'opacity-100 max-w-[100px]' : 'opacity-0 max-w-0'}`}
        >
          <div className="flex flex-col leading-tight">
            <span className="text-white font-bold text-sm tracking-wide">Signal Link</span>
            <span className="text-cyan-400 text-[9px] uppercase font-mono tracking-widest">Available</span>
          </div>
        </div>
        
        {/* Subtle Scan Line (Decorative) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-1/2 w-full animate-pulse"></div>
      </div>
    </a>
  );
};

export default WhatsAppBtn;