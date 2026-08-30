import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { HeroContent } from './HeroContent';
import { HeroActions } from './HeroActions';
import { HeroSocials } from './HeroSocials';
import { Hero3DContainer } from '../../three';

interface HeroContainerProps {
   onExploreWork?: () => void;
   onViewProjects?: () => void;
   onContactClick?: () => void;
}

export const HeroContainer: React.FC<HeroContainerProps> = ({ onExploreWork, onViewProjects, onContactClick }) => {
   return (
      <section
         id="hero"
         className="container relative min-h-[auto] md:h-[100dvh] md:max-h-[820px] md:min-h-[580px] flex flex-col justify-between pt-16 sm:pt-[161px] md:pt-[111px] lg:pt-[127px] pb-4 sm:pb-[40px]">
         {/* Background Soft Sky Blue / Ice White Lighting Atmosphere */}
         <div className="absolute top-[10%] right-[8%] w-[550px] lg:w-[650px] h-[550px] lg:h-[650px] bg-[#E0F2FE]/70 rounded-full blur-[140px] pointer-events-none -z-20" />
         <div className="absolute bottom-[15%] left-[8%] w-[450px] h-[450px] bg-[#BAE6FD]/40 rounded-full blur-[130px] pointer-events-none -z-20" />

         {/* Main 12-Column Layout */}
         <div className="w-full flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-[18px] md:gap-[21px] lg:gap-[36px] items-center pt-2 md:pt-[10px] md:-translate-y-4 lg:-translate-y-5">
            {/* Left Column: Hero Content, CTAs, Socials (Mobile: order-1 in natural document flow; Desktop: 5 cols with 24-40px breathing room) */}
            <div className="order-1 flex flex-col justify-center z-10 space-y-3.5 sm:space-y-[14px] md:col-span-6 lg:col-span-5 md:pr-[26px] lg:pr-[39px]">
               <HeroContent />
               <HeroActions onExploreWork={onExploreWork} onViewProjects={onViewProjects} />
               <HeroSocials onContactClick={onContactClick} />
            </div>

            {/* Right Column: 3D Transparent Glass Sphere (Mobile: order-2, natural flow, fully visible; Desktop: 7 cols with top breathing room) */}
            <div className="order-2 w-full flex items-center justify-center md:col-span-6 lg:col-span-7 h-[390px] sm:h-[378px] md:h-[390px] lg:h-[387px] xl:h-[460px] max-w-[440px] sm:max-w-[432px] md:max-w-none mx-auto pt-1 md:pt-[10px]">
               <Hero3DContainer />
            </div>
         </div>

         {/* Hero Bottom Bar: Scroll Indicators */}
         <div className="w-full pt-4 md:pt-[18px] flex items-center justify-between border-t border-[#D7EAF7] text-[10px] sm:text-[11px] font-mono text-[#64748B] select-none">
            {/* Left: SCROLL TO EXPLORE */}
            <motion.a
                href="#projects"
               onClick={(e) => {
                  if (onViewProjects) {
                     e.preventDefault();
                     onViewProjects();
                  }
               }}
               className="inline-flex items-center gap-2.5 text-[#64748B] hover:text-[#0284C7] transition-colors cursor-pointer group">
               <span className="tracking-[0.16em] uppercase font-semibold">เลื่อนเพื่อดูผลงาน</span>
               <span className="w-8 sm:w-12 h-px bg-[#CBD5E1] group-hover:bg-[#0284C7] transition-colors inline-block" />
            </motion.a>

            {/* Center: Location & Timezone Indicator */}
            <div className="hidden sm:flex items-center text-[#64748B] text-[10px] sm:text-[11px] font-mono select-none">
               <span className="tracking-[0.14em] uppercase font-medium text-[#475569]">THAILAND BANGKOK GMT+7</span>
            </div>

            {/* Right: SCROLL DOWN ↓ */}
            <motion.a
                href="#projects"
               onClick={(e) => {
                  if (onViewProjects) {
                     e.preventDefault();
                     onViewProjects();
                  }
               }}
               animate={{ y: [0, 3, 0] }}
               transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
               className="inline-flex items-center gap-1.5 text-[#64748B] hover:text-[#0284C7] transition-colors cursor-pointer font-medium">
               <span className="tracking-[0.16em] uppercase font-semibold">เลื่อนลง</span>
               <ArrowDown className="w-3 h-3 text-[#0284C7]" />
            </motion.a>
         </div>
      </section>
   );
};
