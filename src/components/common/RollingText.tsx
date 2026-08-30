import React, {forwardRef, memo, useMemo} from 'react';

interface RollingTextProps {
   text: string;
   className?: string;
}

const RollingTextComponent = forwardRef<HTMLSpanElement, RollingTextProps>(
   ({text, className = ''}, ref) => {
      const letters = useMemo(() => Array.from(text), [text]);

      return (
         <span
            ref={ref}
            className={`relative inline-flex overflow-hidden select-none leading-tight ${className}`}>
            {/* Visible primary line that rolls up on group-hover */}
            <span className="inline-flex">
               {letters.map((char, i) => (
                  <span
                     key={i}
                     className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-full"
                     style={{
                        transitionDelay: `${i * 15}ms`,
                        whiteSpace: char === ' ' ? 'pre' : undefined,
                     }}>
                     {char === ' ' ? '\u00A0' : char}
                  </span>
               ))}
            </span>

            {/* Secondary line that rolls in from bottom on group-hover */}
            <span className="absolute inset-0 inline-flex pointer-events-none" aria-hidden="true">
               {letters.map((char, i) => (
                  <span
                     key={i}
                     className="inline-block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0"
                     style={{
                        transitionDelay: `${i * 15}ms`,
                        whiteSpace: char === ' ' ? 'pre' : undefined,
                     }}>
                     {char === ' ' ? '\u00A0' : char}
                  </span>
               ))}
            </span>
         </span>
      );
   },
);
RollingTextComponent.displayName = 'RollingText';

export const RollingText = memo(RollingTextComponent);
