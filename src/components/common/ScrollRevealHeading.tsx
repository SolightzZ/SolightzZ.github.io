import {motion} from 'motion/react';
import React, {memo, useMemo} from 'react';
import {EASE_SMOOTH} from '../../utils/motion';

interface ScrollRevealHeadingProps {
   badge?: string;
   badgeIcon?: React.ReactNode;
   title: string;
   description?: string;
   className?: string;
}

const ScrollRevealHeadingComponent: React.FC<ScrollRevealHeadingProps> = ({
   badge,
   badgeIcon,
   title,
   description,
   className = 'mb-10',
}) => {
   const words = useMemo(() => title.split(' '), [title]);

   return (
      <div className={className}>
         {badge && (
            <motion.div
               initial={{opacity: 0, y: 10}}
               whileInView={{opacity: 1, y: 0}}
               viewport={{once: true, margin: '-40px 0px'}}
               transition={{duration: 0.45, ease: EASE_SMOOTH}}
               className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.18em] text-[#0284C7] uppercase mb-2">
               {badgeIcon}
               <span>{badge}</span>
            </motion.div>
         )}

         <motion.h2
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true, margin: '-40px 0px'}}
            transition={{duration: 0.35, ease: EASE_SMOOTH}}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0F172A] flex flex-wrap gap-x-2.5">
            {words.map((word, i) => (
               <motion.span
                  key={i}
                  initial={{opacity: 0, y: 14}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true, margin: '-40px 0px'}}
                  transition={{
                     duration: 0.5,
                     delay: i * 0.05,
                     ease: EASE_SMOOTH,
                  }}
                  className="inline-block">
                  {word}
               </motion.span>
            ))}
         </motion.h2>

         {description && (
            <motion.p
               initial={{opacity: 0, y: 10}}
               whileInView={{opacity: 1, y: 0}}
               viewport={{once: true, margin: '-40px 0px'}}
               transition={{duration: 0.5, delay: 0.12, ease: EASE_SMOOTH}}
               className="text-[#64748B] text-sm sm:text-[15px] mt-2 max-w-xl font-normal leading-relaxed">
               {description}
            </motion.p>
         )}
      </div>
   );
};

export const ScrollRevealHeading = memo(ScrollRevealHeadingComponent);
