import React, {memo, useEffect, useMemo, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';

interface RotatingTextProps {
   words: string[];
   interval?: number;
   className?: string;
}

const EASE = [0.2, 0.65, 0.3, 0.9] as const;

const RotatingTextComponent: React.FC<RotatingTextProps> = ({words, interval = 2800, className = ''}) => {
   const [index, setIndex] = useState(0);

   useEffect(() => {
      if (words.length <= 1) return;

      const timer = setInterval(() => {
         setIndex((prev) => (prev + 1) % words.length);
      }, interval);

      return () => clearInterval(timer);
   }, [words.length, interval]);

   const current = useMemo(() => words[index] ?? '', [words, index]);

   return (
      <span className={`inline-flex items-center h-[1.4em] relative align-bottom ${className}`}>
         <AnimatePresence mode="wait">
            <motion.span
               key={current}
               initial={{opacity: 0, y: 14, filter: 'blur(3px)'}}
               animate={{opacity: 1, y: 0, filter: 'blur(0px)'}}
               exit={{opacity: 0, y: -14, filter: 'blur(3px)'}}
               transition={{duration: 0.35, ease: EASE}}
               className="inline-block whitespace-nowrap text-[#0284C7] font-semibold">
               {current}
            </motion.span>
         </AnimatePresence>
         <motion.span
            animate={{opacity: [1, 0, 1]}}
            transition={{duration: 0.8, repeat: Infinity, ease: 'linear'}}
            className="inline-block w-[1.5px] h-[1em] bg-[#0284C7] ml-1 self-center"
         />
      </span>
   );
};

export const RotatingText = memo(RotatingTextComponent);
