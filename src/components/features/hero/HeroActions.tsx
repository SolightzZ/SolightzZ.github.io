import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
import { RollingText } from '../../common/RollingText';

interface HeroActionsProps {
   onExploreWork?: () => void;
   onViewProjects?: () => void;
}

export const HeroActions: React.FC<HeroActionsProps> = ({ onExploreWork, onViewProjects }) => {
   return (
      <motion.div
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.45, delay: 0.3 }}
         className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3 w-full sm:w-auto">
         {/* Primary CTA: สำรวจผลงาน → Development Experience */}
         <a
            href="#experience"
            onClick={(e) => {
               if (onExploreWork) {
                  e.preventDefault();
                  onExploreWork();
               }
            }}
             id="hero-cta-primary"
             className="group inline-flex items-center justify-center gap-2 px-4.5 h-[38px] sm:h-[40px] w-full sm:w-auto rounded-[6px] bg-[#0284C7] hover:bg-[#0369A1] text-[#FFFFFF] text-[12.5px] sm:text-[13px] font-medium tracking-[0.02em] transition-all duration-150 shadow-sm hover:shadow-[0_4px_12px_rgba(2,132,199,0.25)] hover:-translate-y-px active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7FBFF] cursor-pointer">
            <RollingText text="EXPLORE WORK" />
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
         </a>

         {/* Secondary CTA: ดูโปรเจกต์ทั้งหมด → Projects */}
         <a
             href="#projects"
            onClick={(e) => {
               if (onViewProjects) {
                  e.preventDefault();
                  onViewProjects();
               }
            }}
             id="hero-cta-secondary"
             className="group inline-flex items-center justify-center gap-2 px-4.5 h-[38px] sm:h-[40px] w-full sm:w-auto rounded-[6px] bg-[#FFFFFF] border border-[#BAE6FD] hover:border-[#0284C7] text-[#0284C7] text-[12.5px] sm:text-[13px] font-medium tracking-[0.02em] transition-all duration-150 shadow-xs hover:bg-[#F0F9FF] hover:-translate-y-px active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7FBFF] cursor-pointer">
            <RollingText text="VIEW PROJECTS" />
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
         </a>
      </motion.div>
   );
};
