import { useState, useCallback } from 'react';

const useHackerEffect = (originalText) => {
  const [text, setText] = useState(originalText);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

  const triggerEffect = useCallback(() => {
    let iteration = 0;
    let interval = null;
    
    clearInterval(interval);

    interval = setInterval(() => {
      setText(prev => 
        prev.split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  }, [originalText]);

  return { text, triggerEffect };
};

export default useHackerEffect;
