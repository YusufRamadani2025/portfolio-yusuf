import React, { useState, useEffect } from 'react';

const Preloader = ({ finishLoading }) => {
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const fullText = "INITIALIZING SYSTEM...";
  
  useEffect(() => {
    // Typing effect
    let index = 0;
    const typeInterval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(typeInterval);
    }, 50);

    // Progress bar effect
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 150);

    // Cleanup
    const timeout = setTimeout(() => {
      if (finishLoading) finishLoading();
    }, 2500);

    return () => {
      clearInterval(typeInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [finishLoading]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-1000">
      <div className="w-64 md:w-96">
        {/* Header Text */}
        <div className="flex justify-between items-end mb-2 font-mono text-xs md:text-sm text-blue-500/80">
          <span>{text}<span className="animate-pulse">_</span></span>
          <span>{Math.min(100, Math.floor(progress))}%</span>
        </div>

        {/* Progress Bar Container */}
        <div className="h-1 w-full bg-gray-900 overflow-hidden relative">
          {/* Progress Fill */}
          <div 
            className="h-full bg-blue-500 transition-all duration-200 ease-out relative"
            style={{ width: `${Math.min(100, progress)}%` }}
          >
             {/* Glowing Tip */}
             <div className="absolute right-0 top-0 h-full w-2 bg-white shadow-[0_0_10px_#fff]"></div>
          </div>
        </div>

        {/* System Details (Random data effect) */}
        <div className="mt-4 font-mono text-[10px] text-gray-600 h-12 overflow-hidden flex flex-col justify-end">
           {progress > 20 && <p>&gt; Loading core modules...</p>}
           {progress > 40 && <p>&gt; Establishing secure connection...</p>}
           {progress > 70 && <p>&gt; Decrypting user interface...</p>}
           {progress > 90 && <p className="text-green-500">&gt; ACCESS GRANTED</p>}
        </div>
      </div>
    </div>
  );
};

export default Preloader;