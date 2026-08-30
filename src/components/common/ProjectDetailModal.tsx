import { Dialog, DialogContent, IconButton } from '@mui/material';
import { ArrowUpRight, ExternalLink, Github, Sparkles, Tag, X } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
import { ProjectItem } from '../../types/portfolio';

interface ProjectDetailModalProps {
   project: ProjectItem | null;
   onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
   if (!project) return null;

   return (
      <Dialog
         open={!!project}
         onClose={onClose}
         maxWidth="md"
         fullWidth
         slotProps={{
            paper: {
               sx: {
                  backgroundColor: '#FFFFFF',
                  backgroundImage: 'none',
                  border: '1px solid #D7EAF7',
                  borderRadius: '8px',
                  color: '#0F172A',
                  p: { xs: 2.5, sm: 3.6 },
                  boxShadow: '0 20px 40px -15px rgba(2, 132, 199, 0.15)',
               },
            },
         }}>
         {/* Header */}
         <div className="flex items-start justify-between border-b border-[#E5F1F8] pb-4 mb-5">
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
               <div className="flex items-center gap-2 text-xs font-mono text-[#0284C7] mb-1 font-semibold">
                  <span className="bg-[#E0F2FE] px-2 py-0.5 rounded-[4px] border border-[#BAE6FD]">{project.category}</span>
                  {project.year && (
                     <>
                        <span className="text-[#CBD5E1]">•</span>
                        <span className="text-[#64748B]">{project.year}</span>
                     </>
                  )}
               </div>
               <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">{project.title}</h3>
            </motion.div>

            <IconButton size="small" onClick={onClose} sx={{ color: '#64748B' }} aria-label="Close project modal">
               <X className="w-5 h-5" />
            </IconButton>
         </div>

         <DialogContent sx={{ p: 0 }}>
            <div className="space-y-5">
               {/* Project Preview Banner Image if present */}
               {project.image && (
                  <motion.div
                     initial={{ opacity: 0, scale: 0.98 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.35, delay: 0.05 }}
                     className="relative w-full h-48 sm:h-64 rounded-[6px] overflow-hidden bg-[#F0F9FF] border border-[#D7EAF7] flex items-center justify-center">
                     <img src={project.image} alt={project.title} className="w-full h-full object-contain" referrerPolicy="no-referrer" decoding="async" />
                  </motion.div>
               )}

               {/* Main Description */}
               <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }} className="p-4 rounded-[6px] bg-[#F7FBFF] border border-[#D7EAF7]">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#64748B] mb-2 font-semibold">ภาพรวมโปรเจกต์ (Project Overview)</h4>
                  <p className="text-sm sm:text-[15px] leading-relaxed text-[#334155]">{project.description}</p>
               </motion.div>

               {/* Key Metrics / Status if exists */}
               {project.stats && (
                  <motion.div
                     initial={{ opacity: 0, x: -6 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.3, delay: 0.15 }}
                     className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[6px] bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7] text-xs font-mono font-semibold">
                     <Sparkles className="w-3.5 h-3.5" />
                     <span>{project.stats}</span>
                  </motion.div>
               )}

               {/* Tech Stack List */}
               <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.18 }}>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#64748B] mb-2.5 flex items-center gap-1.5 font-semibold">
                     <Tag className="w-3.5 h-3.5 text-[#0284C7]" /> เทคโนโลยีและเครื่องมือ
                  </h4>
                  <div className="flex flex-wrap gap-2">
                     {project.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-[4px] bg-[#F7FBFF] border border-[#D7EAF7] text-xs font-mono text-[#334155]">
                           {tag}
                        </span>
                     ))}
                  </div>
               </motion.div>

               {/* Action Links */}
               <div className="flex items-center gap-3 pt-4 border-t border-[#E5F1F8] flex-wrap">
                  {project.githubUrl && (
                     <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] bg-[#FFFFFF] hover:bg-[#F0F9FF] border border-[#D7EAF7] hover:border-[#BAE6FD] text-xs font-mono font-medium text-[#0284C7] transition-colors shadow-xs">
                        <Github className="w-3.5 h-3.5" />
                        <span>ดูบน GitHub</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                     </a>
                  )}

                  {project.demoUrl && (
                     <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-mono font-medium tracking-wider transition-colors shadow-xs">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>ดูตัวอย่าง (Live Demo)</span>
                     </a>
                  )}
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
};
