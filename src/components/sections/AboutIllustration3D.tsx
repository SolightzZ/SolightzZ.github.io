import { motion } from 'motion/react';
import React from 'react';
import { EASE_SMOOTH } from '../../utils/motion';

export const AboutIllustration3D: React.FC<{ className?: string }> = ({ className = '' }) => {
   return (
      <div
         className={`relative w-full max-w-[400px] aspect-[4/3] mx-auto flex items-center justify-center select-none pointer-events-none ${className}`}
         aria-hidden="true">
         
         {/* Floating Sparkle Stars */}
         {/* Top Left Star */}
         <motion.div
            animate={{
               scale: [1, 1.2, 1],
               rotate: [0, 45, 0],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-3 left-16 text-[#38BDF8]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
         </motion.div>

         {/* Top Right Big Star */}
         <motion.div
            animate={{
               scale: [1, 1.25, 1],
               rotate: [0, 90, 0],
            }}
            transition={{ duration: 4.2, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1 right-14 text-[#0284C7]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
         </motion.div>

         {/* Right Medium Star */}
         <motion.div
            animate={{
               scale: [0.9, 1.15, 0.9],
            }}
            transition={{ duration: 3.8, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-24 right-4 text-[#38BDF8]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
         </motion.div>

         {/* Left Small Star */}
         <motion.div
            animate={{
               scale: [0.8, 1.1, 0.8],
            }}
            transition={{ duration: 3.2, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-6 left-10 text-[#7DD3FC]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
         </motion.div>

         {/* Main Composition Root */}
         <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px 0px' }}
            transition={{ duration: 0.7, ease: EASE_SMOOTH }}
            animate={{
               y: [-4, 4, -4],
            }}
            className="relative w-[280px] sm:w-[320px] h-[190px] sm:h-[210px] flex items-center justify-center">

            {/* Back Card: Isometric Tilted Profile Document */}
            <div
               style={{
                  transform: 'rotate(-5deg) skew(-4deg, 2deg)',
               }}
               className="w-[230px] sm:w-[255px] h-[155px] sm:h-[170px] rounded-[22px] bg-white border border-[#D7EAF7] p-5 flex flex-col justify-between shadow-[0_12px_28px_-6px_rgba(15,23,42,0.08)]">
               
               {/* Card Header: Avatar & Lines */}
               <div className="flex items-center gap-3">
                  {/* Circular Avatar */}
                  <div className="w-10 h-10 rounded-full bg-[#38BDF8] flex items-center justify-center shrink-0">
                     <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                     </svg>
                  </div>

                  {/* Header text placeholder bars */}
                  <div className="flex-1 space-y-2">
                     <div className="h-2.5 w-3/4 rounded-full bg-[#BAE6FD]" />
                     <div className="h-2 w-1/2 rounded-full bg-[#E0F2FE]" />
                  </div>
               </div>

               {/* Card Divider */}
               <div className="h-px w-full bg-[#F1F5F9]" />

               {/* Card Body Lines */}
               <div className="space-y-2">
                  <div className="h-2 w-5/6 rounded-full bg-[#E2E8F0]" />
                  <div className="h-2 w-2/3 rounded-full bg-[#F1F5F9]" />
                  <div className="h-2 w-1/2 rounded-full bg-[#F1F5F9]" />
               </div>
            </div>

            {/* Floating Stylus / Cylinder on the right */}
            <motion.div
               animate={{
                  y: [-3, 3, -3],
               }}
               transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
               style={{
                  transform: 'rotate(18deg)',
               }}
               className="absolute right-1 top-6 w-3.5 h-16 rounded-full bg-gradient-to-b from-[#BAE6FD] to-[#38BDF8] shadow-[0_8px_16px_rgba(15,23,42,0.06)]"
            />

            {/* Front Floating Code Badge `</>` — Perfectly centered, in front, no clip */}
            <motion.div
               animate={{
                  y: [3, -3, 3],
               }}
               transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
               style={{
                  transform: 'rotate(-4deg)',
               }}
               className="absolute -bottom-2 right-6 sm:right-8 w-16 h-16 sm:w-18 sm:h-18 rounded-[16px] bg-gradient-to-br from-[#38BDF8] via-[#0284C7] to-[#0369A1] border-2 border-white flex items-center justify-center text-white shadow-[0_12px_24px_-4px_rgba(15,23,42,0.18)] z-20">
               
               {/* Code Icon `</>` */}
               <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-white select-none text-center">
                  &lt;/&gt;
               </span>
            </motion.div>
         </motion.div>
      </div>
   );
};
