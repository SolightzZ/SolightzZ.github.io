import React from 'react';
import { useScrambleText } from '../../hooks/useScrambleText';

interface ScrambleOnHoverProps {
   text: string;
   className?: string;
   as?: 'span' | 'h3' | 'h4' | 'div';
}

export const ScrambleOnHover: React.FC<ScrambleOnHoverProps> = ({ text, className = '', as: Component = 'span' }) => {
   const { displayText, triggerScramble, stopScramble } = useScrambleText(text, {
      delay: -1, // Manual trigger only on hover
      speed: 25,
      stepIncrement: 1 / 1.8,
   });

   return (
      <Component onMouseEnter={triggerScramble} onMouseLeave={stopScramble} className={className}>
         {displayText}
      </Component>
   );
};
