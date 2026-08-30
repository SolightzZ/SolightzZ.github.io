import { useCallback, useEffect, useRef, useState } from 'react';

export const DEFAULT_SCRAMBLE_GLYPHS = '!<>-_\\/[]{}—=+*^?#01~%&$ABCDEF';

interface UseScrambleTextOptions {
   delay?: number;
   speed?: number;
   stepIncrement?: number;
   glyphs?: string;
}

/**
 * Shared reusable hook for Hacker / Matrix Scramble Text Decode Animation
 */
export function useScrambleText(targetText: string, options: UseScrambleTextOptions = {}) {
   const { delay = 0, speed = 32, stepIncrement = 1 / 2.2, glyphs = DEFAULT_SCRAMBLE_GLYPHS } = options;

   const [displayText, setDisplayText] = useState(targetText);
   const [isScrambling, setIsScrambling] = useState(false);
   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

   const triggerScramble = useCallback(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      let iteration = 0;
      setIsScrambling(true);

      intervalRef.current = setInterval(() => {
         setDisplayText(
            targetText
               .split('')
               .map((char, index) => {
                  if (char === ' ') return ' ';
                  if (index < iteration) {
                     return targetText[index];
                  }
                  return glyphs[Math.floor(Math.random() * glyphs.length)];
               })
               .join(''),
         );

         if (iteration >= targetText.length) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setDisplayText(targetText);
            setIsScrambling(false);
         }

         iteration += stepIncrement;
      }, speed);
   }, [targetText, speed, stepIncrement, glyphs]);

   const stopScramble = useCallback(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayText(targetText);
      setIsScrambling(false);
   }, [targetText]);

   useEffect(() => {
      if (delay > 0) {
         const timer = setTimeout(() => {
            triggerScramble();
         }, delay);
         return () => clearTimeout(timer);
      } else if (delay === 0) {
         triggerScramble();
      }
      return () => {
         if (intervalRef.current) clearInterval(intervalRef.current);
      };
   }, [triggerScramble, delay]);

   return { displayText, isScrambling, triggerScramble, stopScramble };
}
