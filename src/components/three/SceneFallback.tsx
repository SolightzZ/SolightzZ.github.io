import React from 'react';
import { motion } from 'motion/react';

/**
 * Clean Minimal Atmosphere Fallback & Loading Placeholder
 * for the 3D Hero Scene matching image.png styling.
 */
export const SceneFallback: React.FC = () => {
   return (
      <div className="relative w-full h-full min-h-[380px] flex items-center justify-center select-none">
         {/* Soft pastel ambient glow */}
         <div className="absolute w-72 h-72 rounded-full bg-[#38BDF8]/15 blur-3xl pointer-events-none" />
         <div className="absolute w-48 h-48 rounded-full bg-[#2563EB]/10 blur-2xl pointer-events-none translate-y-6" />

         {/* Minimalist smooth pulsing aura placeholder */}
         <motion.div
            animate={{
               scale: [0.96, 1.04, 0.96],
               opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
               duration: 3.5,
               repeat: Infinity,
               ease: 'easeInOut',
            }}
            className="w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-sky-200/20 via-sky-100/30 to-lime-200/20 border border-sky-200/40 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-sky-500/5"
         >
            <div className="w-24 h-24 rounded-full bg-sky-400/10 blur-xl animate-pulse" />
         </motion.div>
      </div>
   );
};
