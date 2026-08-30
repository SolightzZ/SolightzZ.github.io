import { Code2, Server, Database, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
import { TECH_CATEGORIES } from '../../data/portfolioData';
import { EASE_SMOOTH } from '../../utils/motion';
import { ScrollRevealHeading } from '../common/ScrollRevealHeading';

export const StackPreview: React.FC = () => {
   const getCategoryIcon = (idx: number) => {
      switch (idx) {
         case 0:
            return <Code2 className="w-5 h-5 text-[#0284C7] transition-transform duration-200 group-hover/cat:scale-110" />;
         case 1:
            return <Server className="w-5 h-5 text-[#0284C7] transition-transform duration-200 group-hover/cat:scale-110" />;
         default:
            return <Database className="w-5 h-5 text-[#0284C7] transition-transform duration-200 group-hover/cat:scale-110" />;
      }
   };

   return (
      <section id="stack" className="container py-20 sm:py-[191px] border-t border-[#D7EAF7]">
         {/* Section Header */}
         <ScrollRevealHeading
            badge="TECHNICAL CAPABILITIES"
            badgeIcon={<Code2 className="w-3.5 h-3.5" />}
            title="Tech Stack & Tooling"
            description="ภาษาโปรแกรม เฟรมเวิร์กสมัยใหม่ ระบบรันไทม์ฝั่งหลังบ้าน และชุดเครื่องมือสำหรับนักพัฒนาที่ใช้ในการทำงานจริง"
         />

         {/* Structured Category Columns */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-[21px]">
            {TECH_CATEGORIES.map((cat, idx) => (
               <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px 0px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: EASE_SMOOTH }}
                  className="p-6 sm:p-[55px] rounded-[8px] bg-[#FFFFFF] border border-[#D7EAF7] shadow-xs flex flex-col justify-between">
                  <div>
                     {/* Category Header */}
                     <div className="flex items-center gap-3 pb-4 border-b border-[#E5F1F8]">
                        <div className="w-8 h-8 rounded-[6px] bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-center">
                           {getCategoryIcon(idx)}
                        </div>
                        <h3 className="text-[17px] font-bold text-[#0F172A]">{cat.title}</h3>
                     </div>

                     {/* Cascading Staggered Skills List with Larger Icons and Text */}
                     <div className="divide-y divide-[#F0F9FF] mt-3">
                        {cat.skills.map((skill, sIdx) => (
                           <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, x: -6 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.25, delay: 0.06 + sIdx * 0.03 }}
                              className="group/skill py-2.5 px-3 -mx-3 rounded-[6px] flex items-center justify-between text-[14px] sm:text-[15px] hover:bg-[#F0F9FF] transition-colors duration-150 cursor-default select-none">
                              <div className="flex items-center gap-3">
                                 {/* Enlarged Skill Icon Box */}
                                 <div
                                    className="w-8 h-8 rounded-[6px] flex items-center justify-center transition-transform duration-200 group-hover/skill:scale-115 group-hover/skill:rotate-3 shadow-2xs shrink-0"
                                    style={{ backgroundColor: skill.bgLight }}>
                                    <img
                                       src={`/tech/${skill.iconName}.svg`}
                                       alt={skill.name}
                                       className="w-5.5 h-5.5"
                                       draggable={false}
                                       loading="lazy"
                                       decoding="async"
                                    />
                                 </div>
                                 {/* Enlarged Skill Name */}
                                 <span className="font-medium text-[#334155] group-hover/skill:text-[#0284C7] group-hover/skill:font-semibold transition-colors">
                                    {skill.name}
                                 </span>
                              </div>

                              {/* Subtle Active Indicator */}
                              <ChevronRight className="w-4 h-4 text-[#94A3B8] opacity-0 group-hover/skill:opacity-100 group-hover/skill:text-[#0284C7] group-hover/skill:translate-x-0.5 transition-all duration-200" />
                           </motion.div>
                        ))}
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>
   );
};
