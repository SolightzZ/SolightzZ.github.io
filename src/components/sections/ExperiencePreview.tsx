import { Briefcase, Calendar, CheckCircle2, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
import { EXPERIENCE_DATA } from '../../data/portfolioData';
import { EASE_SMOOTH } from '../../utils/motion';
import { ScrollRevealHeading } from '../common/ScrollRevealHeading';
import { ScrambleOnHover } from '../common/ScrambleOnHover';

export const ExperiencePreview: React.FC = () => {
   return (
      <section id="experience" className="container py-20 sm:py-[191px] border-t border-[#D7EAF7]">
         {/* Section Header */}
         <ScrollRevealHeading
            badge="INDUSTRY EXPERIENCE"
            badgeIcon={<Briefcase className="w-3.5 h-3.5" />}
            title="Development Experience"
            description="ประสบการณ์จริงในการพัฒนาเว็บแอปพลิเคชัน แดชบอร์ด และระบบสารสนเทศระดับองค์กร"
         />

         {/* Experience Timeline Card */}
         <div className="space-y-6">
            {EXPERIENCE_DATA.map((exp, idx) => (
               <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px 0px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: EASE_SMOOTH }}
                  className="relative p-5 sm:p-[55px] rounded-[8px] bg-[#FFFFFF] border border-[#D7EAF7] shadow-xs">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-[10px] pb-4 md:pb-[31px] border-b border-[#E5F1F8]">
                     <div>
                        <span className="text-[12px] font-mono text-[#0284C7] font-semibold tracking-wider block">
                           <ScrambleOnHover text={exp.company} />
                        </span>
                        <h3 className="text-xl font-bold text-[#0F172A] mt-0.5">{exp.role}</h3>
                     </div>
                     <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#64748B]">
                        <span className="inline-flex items-center gap-1.5 bg-[#F0F9FF] px-2.5 py-1 rounded-[4px] border border-[#D7EAF7] text-[#0284C7] font-semibold">
                           <Calendar className="w-3.5 h-3.5" /> {exp.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[#64748B]">
                           <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" /> {exp.location}
                        </span>
                     </div>
                  </div>

                  {/* Key Contributions List */}
                  <div className="mt-4 space-y-1.5">
                     {exp.description.map((point, pIdx) => (
                        <div
                           key={pIdx}
                           className="group/point flex items-start gap-2.5 p-1.5 -mx-1.5 rounded-[5px] hover:bg-[#F0F9FF] transition-colors duration-150 text-sm text-[#334155] leading-relaxed cursor-default">
                           <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5 group-hover/point:scale-115 transition-transform" />
                           <span className="group-hover/point:text-[#0F172A] transition-colors">{point}</span>
                        </div>
                     ))}
                  </div>

                  {/* Projects & Engineering Context */}
                  <div className="mt-5 pt-4 border-t border-[#E5F1F8] flex flex-col gap-4">
                     {exp.projectsInvolved && (
                        <div className="flex flex-col gap-1.5">
                           <span className="text-[10px] font-mono font-semibold tracking-[0.16em] text-[#0284C7] uppercase">Development Work</span>
                           <div className="flex flex-wrap gap-1.5">
                              {exp.projectsInvolved.map((d) => (
                                 <span
                                    key={d}
                                    className="px-2.5 py-0.5 rounded-[4px] bg-[#E0F2FE] border border-[#BAE6FD] text-[11px] font-mono font-semibold text-[#0284C7] select-none">
                                    {d}
                                 </span>
                              ))}
                           </div>
                        </div>
                     )}
                     <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                        <span className="font-semibold text-[#0F172A] uppercase tracking-[0.14em]">ทักษะและเทคโนโลยีหลัก</span>
                        <span className="px-2 py-0.5 rounded-[4px] bg-[#F0F9FF] border border-[#D7EAF7] text-[#0284C7]">Frontend</span>
                        <span className="px-2 py-0.5 rounded-[4px] bg-[#F0F9FF] border border-[#D7EAF7] text-[#0284C7]">Backend</span>
                        <span className="px-2 py-0.5 rounded-[4px] bg-[#F0F9FF] border border-[#D7EAF7] text-[#0284C7]">API Integration</span>
                        <span className="px-2 py-0.5 rounded-[4px] bg-[#F0F9FF] border border-[#D7EAF7] text-[#0284C7]">Caching</span>
                        <span className="px-2 py-0.5 rounded-[4px] bg-[#F0F9FF] border border-[#D7EAF7] text-[#0284C7]">Database</span>
                        <span className="px-2 py-0.5 rounded-[4px] bg-[#F0F9FF] border border-[#D7EAF7] text-[#0284C7]">MUI</span>
                     </div>
                     <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                           <span
                              key={tech}
                              className="px-2 py-0.5 rounded-[4px] bg-[#F7FBFF] border border-[#D7EAF7] text-[10px] sm:text-[11px] font-mono text-[#64748B] select-none">
                              {tech}
                           </span>
                        ))}
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>
   );
};
