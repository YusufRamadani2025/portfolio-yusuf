import React, { useState } from 'react';
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaCode, FaFingerprint, FaUserCheck, FaLockOpen } from 'react-icons/fa';
import useHackerEffect from '../../hooks/useHackerEffect';

const About = () => {
  const { text: hackerName, triggerEffect: triggerNameEffect } = useHackerEffect("Yusuf Ramadani");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleUnlock = () => {
    if (isExpanded || isScanning || isVerified) return;

    // 1. Start Scanning
    setIsScanning(true);

    // 2. Verified Success (after 1.5s)
    setTimeout(() => {
      setIsScanning(false);
      setIsVerified(true);
      
      // 3. Expand Content (after another 1s)
      setTimeout(() => {
        setIsVerified(false);
        setIsExpanded(true);
      }, 1200);
    }, 1500);
  };

  return (
    <section id="about" className="relative min-h-screen py-20 overflow-hidden flex items-center justify-center bg-slate-50/50 dark:bg-black/20">
      
      {/* Background Floating Icons */}
      <div className={`absolute inset-0 -z-10 overflow-hidden pointer-events-none transition-opacity duration-1000 ${isExpanded ? 'opacity-100' : 'opacity-10'}`}>
        <FaReact className="floating-icon text-4xl md:text-6xl text-blue-400" style={{ top: '10%', right: '5%', animationDelay: '0s' }} />
        <FaJs className="floating-icon text-3xl md:text-5xl text-yellow-400" style={{ bottom: '15%', right: '10%', animationDelay: '1s' }} />
        <FaHtml5 className="floating-icon text-3xl md:text-5xl text-orange-500" style={{ top: '20%', left: '5%', animationDelay: '2s' }} />
        <FaCss3Alt className="floating-icon text-3xl md:text-5xl text-blue-500" style={{ bottom: '10%', left: '8%', animationDelay: '3s' }} />
        <FaCode className="floating-icon text-2xl md:text-4xl text-gray-500" style={{ top: '40%', left: '40%', animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-6 h-full relative flex items-center">
        
        {/* 1. LEFT CONTENT: Text Area */}
        <div 
           className={`absolute left-0 z-20 w-full md:w-1/2 px-6 md:px-0 transition-all duration-1000 ease-out 
           ${isExpanded 
              ? 'opacity-100 translate-x-0 pointer-events-auto delay-300' 
              : 'opacity-0 -translate-x-10 pointer-events-none'}`}
        >
            <div className="glass p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-white/10 backdrop-blur-xl bg-white/80 dark:bg-white/5 relative shadow-2xl">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:text-gray-500 dark:hover:text-white transition-colors p-2 z-50 text-xl"
                title="Minimize System"
              >
                ✕
              </button>

              <h2 className="text-blue-500 font-mono mb-4 tracking-widest uppercase text-sm md:text-base">/ Identity Verified</h2>
              <h1 
                className="text-3xl md:text-5xl font-black mb-6 cursor-default inline-block break-words max-w-full text-slate-900 dark:text-white"
                onMouseOver={triggerNameEffect}
              >
                {hackerName}
              </h1>
              <div className="space-y-4 text-slate-700 dark:text-gray-400 text-base md:text-lg leading-relaxed">
                <p>
                  Hello! I'm Yusuf, a passionate Web Developer who loves bridging the gap between design and technology.
                </p>
                <p>
                  My journey in tech is driven by curiosity and a constant desire to create things that live on the internet. I specialize in building high-performance, interactive, and visually stunning web applications.
                </p>
                <div className="mt-8">
                   <button className="px-8 py-3 rounded-full bg-blue-500 text-white font-bold hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:scale-105 transition-all">
                     Download CV
                   </button>
                </div>
              </div>
            </div>
        </div>

        {/* 2. RIGHT CONTENT: Orbit System */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-30
            ${isExpanded 
               ? 'left-1/2 -translate-x-1/2 md:left-[75%] scale-50 md:scale-100 opacity-10 md:opacity-100 blur-[2px] md:blur-0' 
               : 'left-1/2 -translate-x-1/2 scale-50 md:scale-75 opacity-100 blur-0'} 
          `}
        >
            {/* The Clickable Trigger Area */}
            <div 
               className={`orbit-container cursor-pointer group ${isExpanded ? 'pointer-events-none md:pointer-events-auto' : ''}`}
               onClick={handleUnlock}
            >
              
              {/* CENTER: Morphing Icon Container */}
              <div className={`
                relative z-30 flex items-center justify-center 
                w-56 h-56 md:w-80 md:h-80 
                rounded-full border transition-all duration-500 bg-black overflow-hidden
                ${isScanning ? 'border-blue-400 shadow-[0_0_50px_rgba(59,130,246,0.8)]' : ''}
                ${isVerified ? 'border-green-500 shadow-[0_0_80px_rgba(34,197,94,0.8)]' : ''}
                ${!isScanning && !isVerified ? 'border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_50px_rgba(59,130,246,0.6)]' : ''}
              `}>
                 
                 {/* 1. Fingerprint Icon */}
                 <FaFingerprint 
                    className={`absolute text-[8rem] md:text-[12rem] transition-all duration-700
                      ${isExpanded ? 'opacity-0 scale-0 rotate-180' : 'opacity-100 scale-100 rotate-0'}
                      ${isScanning ? 'text-blue-300 animate-pulse' : 'text-blue-500'}
                      ${isVerified ? 'text-green-500 opacity-0 scale-50' : ''} 
                    `} 
                 />

                 {/* 2. Success Icon (Lock Open / User Check) */}
                 <div className={`absolute flex flex-col items-center justify-center transition-all duration-500 ${isVerified ? 'opacity-100 scale-110' : 'opacity-0 scale-50'}`}>
                    <FaLockOpen className="text-[6rem] md:text-[8rem] text-green-500 mb-4 drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]" />
                    <div className="bg-green-500/20 border border-green-500/50 px-4 py-1 rounded-full backdrop-blur-md">
                      <span className="text-green-400 font-mono text-sm md:text-xl tracking-widest font-bold">ACCESS GRANTED</span>
                    </div>
                 </div>

                 {/* 3. React Icon (Final State) */}
                 <FaReact 
                    className={`absolute text-[8rem] md:text-[12rem] text-blue-400 transition-all duration-700 ${isExpanded ? 'opacity-100 scale-100 rotate-0 animate-spin-slow' : 'opacity-0 scale-0 -rotate-180'}`} 
                 />

                 {/* SCANNING EFFECT: Laser Line */}
                 {isScanning && (
                   <div className="absolute top-0 left-0 w-full h-2 bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,1)] animate-[scan_1.5s_ease-in-out_infinite]"></div>
                 )}
                 
                 {/* SCANNING GRID OVERLAY */}
                 {isScanning && (
                   <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/3o7TKsAds5eE16XpXa/giphy.gif')] opacity-10 mix-blend-screen pointer-events-none"></div> 
                 )}

              </div>

              {/* TEXT HINT (Only visible when collapsed & idle) */}
              <div className={`absolute top-64 md:top-96 w-80 text-center transition-all duration-500 
                  ${isExpanded || isScanning || isVerified ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
                 <h2 className="text-xl md:text-3xl font-bold tracking-widest uppercase text-slate-900 dark:text-white mb-1">Identity Protected</h2>
                 <p className="text-blue-400 text-xs md:text-base font-mono tracking-wide flex items-center justify-center gap-2">
                   <span className="animate-ping w-2 h-2 rounded-full bg-blue-500"></span>
                   Click to Decrypt
                 </p>
              </div>
              
              {/* STATUS TEXT DURING SCAN */}
              {isScanning && (
                 <div className="absolute top-64 md:top-96 w-80 text-center animate-pulse">
                    <p className="text-blue-400 font-mono text-lg tracking-[0.2em]">SCANNING BIOMETRICS...</p>
                 </div>
              )}

              {/* RINGS - Expanding logic */}
              <div className={`orbit-ring transition-all duration-1000 ease-in-out ${isExpanded ? 'w-48 h-48 md:w-80 md:h-80 opacity-100' : 'w-24 h-24 opacity-0'}`} style={{ '--duration': '15s' }}>
                <div className="orbit-planet w-10 h-10 md:w-16 md:h-16 top-0 left-1/2 -translate-x-1/2" style={{ '--duration': '15s' }}>
                  <FaJs className="text-yellow-400 text-xl md:text-4xl" />
                </div>
              </div>

              <div className={`orbit-ring transition-all duration-1000 ease-in-out delay-75 ${isExpanded ? 'w-72 h-72 md:w-[28rem] md:h-[28rem] opacity-100' : 'w-24 h-24 opacity-0'}`} style={{ '--duration': '25s' }}>
                <div className="orbit-planet w-12 h-12 md:w-20 md:h-20 top-0 left-1/2 -translate-x-1/2" style={{ '--duration': '25s' }}>
                  <FaNodeJs className="text-green-500 text-2xl md:text-5xl" />
                </div>
                <div className="orbit-planet w-12 h-12 md:w-20 md:h-20 bottom-0 left-1/2 -translate-x-1/2" style={{ '--duration': '25s' }}>
                  <FaHtml5 className="text-orange-500 text-2xl md:text-5xl" />
                </div>
              </div>

              <div className={`orbit-ring transition-all duration-1000 ease-in-out delay-150 ${isExpanded ? 'w-96 h-96 md:w-[42rem] md:h-[42rem] opacity-100' : 'w-24 h-24 opacity-0'}`} style={{ '--duration': '35s' }}>
                <div className="orbit-planet w-14 h-14 md:w-24 md:h-24 top-1/2 left-0 -translate-y-1/2" style={{ '--duration': '35s' }}>
                  <FaCss3Alt className="text-blue-500 text-2xl md:text-5xl" />
                </div>
                <div className="orbit-planet w-14 h-14 md:w-24 md:h-24 top-1/2 right-0 -translate-y-1/2" style={{ '--duration': '35s' }}>
                  <FaCode className="text-gray-400 text-2xl md:text-5xl" />
                </div>
              </div>

            </div>
        </div>

      </div>
    </section>
  );
};

export default About;
