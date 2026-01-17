import React, { useState, useEffect, useRef } from 'react';
import { FaReact, FaCode } from 'react-icons/fa';
import { supabase } from '../../supabaseClient';

const Hero = () => {
  const [profile, setProfile] = useState({ full_name: 'Yusuf Ramadani', avatar_url: null });
  const [displayText, setDisplayText] = useState('');
  const imageRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase.from('profile').select('*').eq('id', 1).single();
        if (data) {
          setProfile(data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    let index = 0;
    const textToType = profile.full_name || "Yusuf Ramadani";
    setDisplayText(''); // Reset before typing
    
    const interval = setInterval(() => {
      setDisplayText(textToType.slice(0, index));
      index++;
      if (index > textToType.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, [profile.full_name]);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    imageRef.current.style.transform = `
      perspective(1000px) 
      rotateY(${x * 20}deg) 
      rotateX(${-y * 20}deg)
      scale3d(1.05, 1.05, 1.05)
    `;
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    imageRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  };

  // Helper to get initials if no image
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 md:pt-20">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6 gap-12 md:gap-0">
        {/* Left Content */}
        <div className="z-10 w-full text-center md:w-1/2 md:text-left">
          <h2 className="mb-2 text-sm md:text-lg font-medium tracking-[0.3em] text-blue-600 dark:text-blue-500 uppercase">
            Frontend Developer
          </h2>
          <h1 className="mb-6 text-slate-900 dark:text-white text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter min-h-[1.2em]">
            {displayText}
            <span className="animate-pulse text-blue-600 dark:text-blue-500">_</span>
          </h1>
          <p className="mb-8 max-w-lg mx-auto md:mx-0 text-base md:text-lg text-slate-600 dark:text-gray-400 font-medium">
            Crafting immersive digital experiences with cutting-edge technology and a passion for clean, high-performance code.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:justify-start">
            <a
              href="#projects"
              className="group relative overflow-hidden rounded-full bg-blue-500 px-8 py-3 font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
            >
              <span className="relative z-10">View Projects</span>
            </a>
            <a
              href="#contact"
              className="rounded-full border border-black/10 dark:border-white/20 bg-black/5 dark:bg-white/5 px-8 py-3 font-bold text-slate-900 dark:text-white backdrop-blur-sm transition-all hover:bg-black/10 dark:hover:bg-white/10"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Right Visual (3D Tilt) */}
        <div className="relative flex w-full items-center justify-center md:w-1/2 animate-[float_6s_ease-in-out_infinite]">
          <div
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative h-52 w-52 transition-transform duration-200 ease-out sm:h-80 sm:w-80 md:h-96 md:w-96 animate-hologram"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Glow Background */}
            <div className="absolute -inset-4 rounded-3xl bg-blue-500/20 blur-2xl transition-all group-hover:bg-blue-500/30"></div>
            
            {/* Image Container */}
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-gray-900 shadow-2xl">
              {profile.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt={profile.full_name} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
              ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-900/40 to-black p-8">
                     {/* Placeholder for Profile Picture */}
                     <div className="text-5xl md:text-8xl font-black text-blue-500/20 select-none drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        {getInitials(profile.full_name)}
                     </div>
                  </div>
              )}

              {/* Scanning Line Overlay (Only visible on hover) */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none animate-[scan_2s_linear_infinite]"></div>
            </div>

            {/* Floating Elements */}
            <div 
              className="absolute -top-4 -right-4 rounded-xl border border-white/10 bg-black/60 p-3 md:p-4 backdrop-blur-md transition-transform duration-300 group-hover:translate-x-4 group-hover:-translate-y-4"
              style={{ transform: 'translateZ(50px)' }}
            >
               <FaReact className="text-2xl md:text-4xl text-blue-400 animate-spin-slow" />
            </div>
            <div 
              className="absolute -bottom-4 -left-4 rounded-xl border border-white/10 bg-black/60 p-3 md:p-4 backdrop-blur-md transition-transform duration-300 group-hover:-translate-x-4 group-hover:translate-y-4"
              style={{ transform: 'translateZ(30px)' }}
            >
               <FaCode className="text-2xl md:text-3xl text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;