import { ArrowUpRight, FolderGit2, Layers } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useMemo, useState } from 'react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { ProjectItem } from '../../types/portfolio';
import { filterProjects, PROJECT_CATEGORIES } from '../../utils/projectFilters';
import { EASE_SMOOTH } from '../../utils/motion';
import { RollingText } from '../common/RollingText';
import { ScrambleOnHover } from '../common/ScrambleOnHover';
import { ScrollRevealHeading } from '../common/ScrollRevealHeading';

interface SelectedWorkPreviewProps {
   onSelectProject: (project: ProjectItem) => void;
}

export const SelectedWorkPreview: React.FC<SelectedWorkPreviewProps> = ({ onSelectProject }) => {
   const [showAllProjects, setShowAllProjects] = useState<boolean>(false);
   const [activeCategory, setActiveCategory] = useState<string>('ALL');

   const filteredProjects = useMemo(
      () => filterProjects(PROJECTS_DATA, activeCategory, !showAllProjects, showAllProjects ? undefined : 6),
      [showAllProjects, activeCategory],
   );

   return (
       <section id="projects" className="container py-20 sm:py-[191px] border-t border-[#D7EAF7]">
         {/* Section Header */}
         <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-[80px] gap-6 md:gap-[21px]">
            <ScrollRevealHeading
               badge="PROJECTS"
               badgeIcon={<Layers className="w-3.5 h-3.5" />}
               title="Projects"
               description="รวบรวมผลงานด้านการพัฒนาระบบ เครื่องมือสำหรับนักพัฒนา และเว็บแอปพลิเคชัน"
               className="mb-0"
            />

            {/* Category Filters: Mobile Optimized [ALL, WEB, TOOLS] */}
            <div className="relative flex items-center gap-1 p-1 bg-[#F0F9FF]/70 border border-[#D7EAF7] rounded-[8px] select-none w-fit">
               {PROJECT_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                     <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveCategory(cat)}
                        className={`relative shrink-0 px-3.5 py-1.5 rounded-[6px] text-xs font-mono tracking-wider transition-colors cursor-pointer select-none ${
                           isActive ? 'text-[#0284C7] font-bold' : 'text-[#64748B] hover:text-[#0F172A]'
                        }`}>
                        {isActive && (
                           <motion.div
                              layoutId="activeCategoryPill"
                              className="absolute inset-0 bg-[#FFFFFF] border border-[#BAE6FD] rounded-[6px] shadow-xs"
                              transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                           />
                        )}
                        <span className="relative z-10">{cat}</span>
                     </button>
                  );
               })}
            </div>
         </div>

         {/* Clean Grid Layout */}
         <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-[21px]">
            <AnimatePresence mode="popLayout">
               {filteredProjects.map((project, idx) => (
                  <motion.div
                     layout
                     key={project.id}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: '-40px 0px' }}
                     exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                     transition={{
                        duration: 0.5,
                        delay: (idx % 3) * 0.08,
                        ease: EASE_SMOOTH,
                        layout: { duration: 0.35, ease: 'easeOut' },
                     }}
                     onClick={() => onSelectProject(project)}
                     className="group relative flex flex-col justify-between rounded-[8px] bg-[#FFFFFF] border border-[#D7EAF7] cursor-pointer shadow-xs overflow-hidden">
                     {/* Top Project Preview Image */}
                     {project.image && (
                        <div className="relative w-full h-44 overflow-hidden bg-[#F0F9FF] border-b border-[#E5F1F8]">
                           <img
                              src={project.image}
                              alt={project.title}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover"
                              style={project.objectPosition ? { objectPosition: project.objectPosition } : undefined}
                              referrerPolicy="no-referrer"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                           <span className="absolute top-3 left-3 font-mono text-[10px] font-semibold text-[#0284C7] bg-[#FFFFFF]/90 backdrop-blur-xs px-2.5 py-1 rounded-[4px] border border-[#BAE6FD] shadow-xs">
                              {project.category}
                           </span>
                           <span className="absolute top-3 right-3 font-mono text-[10px] text-[#334155] bg-[#FFFFFF]/90 backdrop-blur-xs px-2 py-0.5 rounded-[4px] border border-[#D7EAF7]">
                              {project.year}
                           </span>
                        </div>
                     )}

                     {/* Content Body */}
                     <div className="p-6 md:p-[46px] flex-1 flex flex-col justify-between">
                        <div>
                           {!project.image && (
                              <div className="flex items-center justify-between text-xs mb-3">
                                 <span className="font-mono text-[11px] font-medium text-[#0284C7] bg-[#E0F2FE]/60 px-2 py-0.5 rounded-[4px]">{project.category}</span>
                                 {project.year && <span className="font-mono text-[10px] text-[#94A3B8]">{project.year}</span>}
                              </div>
                           )}

                           {/* Title */}
                           <h3 className="text-base sm:text-lg font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors flex items-center justify-between">
                              <ScrambleOnHover text={project.title} />
                              <ArrowUpRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#0284C7] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                           </h3>

                           {/* Description */}
                           <p className="text-[#64748B] text-[13px] leading-relaxed mt-2 line-clamp-2">{project.description}</p>
                        </div>

                        {/* Bottom Meta & Tags */}
                        <div className="mt-5 pt-3.5 border-t border-[#E5F1F8]">
                           <div className="flex flex-wrap gap-1.5 mb-3">
                              {project.tags.slice(0, 3).map((tag) => (
                                 <span
                                    key={tag}
                                    className="px-2 py-0.5 rounded-[4px] bg-[#F7FBFF] border border-[#D7EAF7] text-[10px] sm:text-[11px] font-mono text-[#475569] select-none">
                                    {tag}
                                 </span>
                              ))}
                              {project.tags.length > 3 && (
                                 <span className="px-1.5 py-0.5 rounded-[4px] bg-[#F0F9FF] border border-[#D7EAF7] text-[10px] font-mono text-[#0284C7]">+{project.tags.length - 3}</span>
                              )}
                           </div>

                           <div className="flex items-center justify-between text-xs pt-1">
                              {project.stats ? (
                                 <span className="inline-flex items-center font-mono text-[11px] font-semibold text-[#0284C7] bg-[#E0F2FE] border border-[#BAE6FD] px-2 py-0.5 rounded-[5px]">
                                    {project.stats}
                                 </span>
                              ) : (
                                 <span className="font-mono text-[11px] text-[#94A3B8]">{project.category.charAt(0) + project.category.slice(1).toLowerCase()}</span>
                              )}

                              <span className="font-mono text-[11px] font-semibold text-[#0284C7] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                 ดูรายละเอียด <span>→</span>
                              </span>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </AnimatePresence>
         </motion.div>

         {/* Toggle View More Projects Button */}
         <div className="mt-10 flex justify-center">
            <button
               type="button"
               onClick={() => setShowAllProjects(!showAllProjects)}
               className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-[7px] bg-[#FFFFFF] border border-[#D7EAF7] hover:border-[#BAE6FD] hover:bg-[#F0F9FF] text-xs font-mono font-medium text-[#0284C7] transition-colors shadow-xs cursor-pointer">
               <FolderGit2 className="w-4 h-4" />
               <RollingText text={showAllProjects ? 'SHOW FEATURED ONLY' : 'VIEW ALL PROJECTS'} />
            </button>
         </div>
      </section>
   );
};
