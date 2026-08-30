import { ArrowRight, Award, CheckCircle2, Code2, GraduationCap, MapPin, ShieldCheck, User, ZoomIn } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState } from 'react';
import { CERTIFICATES_DATA, EDUCATION_DATA, PERSONAL_INFO } from '../../data/portfolioData';
import { CertificateItem } from '../../types/portfolio';
import { EASE_SMOOTH } from '../../utils/motion';
import { CertificateImageModal } from '../common/CertificateImageModal';
import { ScrollRevealHeading } from '../common/ScrollRevealHeading';
import { ScrambleOnHover } from '../common/ScrambleOnHover';
import { AboutIllustration3D } from './AboutIllustration3D';

export const AboutPreview: React.FC = () => {
   const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

   return (
      <section id="about" className="container py-16 sm:py-24 lg:py-28 border-t border-[#D7EAF7]">
         {/* Section Header — Balanced 2-col grid: text (max-width) | 3D illustration */}
         <div className="mb-10 sm:mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 max-w-[680px]">
               <ScrollRevealHeading
                  badge="ABOUT"
                  badgeIcon={<User className="w-3.5 h-3.5" />}
                  title="About Paniti Jahem"
                  description="นักพัฒนาซอฟต์แวร์และนักศึกษาเทคโนโลยีสารสนเทศ ผู้มีความเชี่ยวชาญในการพัฒนาเว็บแอปพลิเคชันแบบ Full-Stack และระบบสารสนเทศระดับองค์กร ผ่านประสบการณ์จริงทั้งส่วนหน้าและส่วนหลัง"
                  className="mb-4 [&_p]:!max-w-full [&_p]:!text-[15px] [&_p]:sm:!text-base [&_p]:!leading-[1.7] [&_p]:!text-[#334155]"
               />
               <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px 0px' }}
                  transition={{ duration: 0.5, delay: 0.1, ease: EASE_SMOOTH }}
                  className="text-[#475569] text-[14px] sm:text-[15px] lg:text-base font-normal leading-[1.75]">
                  มุ่งเน้นการสร้างสรรค์โซลูชันที่มีประสิทธิภาพ ตั้งแต่การออกแบบสถาปัตยกรรมฐานข้อมูล การพัฒนาระบบ REST API การจัดการระบบแคช ตลอดจนการพัฒนาส่วนติดต่อผู้ใช้งาน (UI/UX) ที่ทันสมัย พร้อมต่อยอดทักษะและเรียนรู้เทคโนโลยีใหม่เพื่อส่งมอบงานที่มีคุณภาพสูงสุด
               </motion.p>
            </div>

            {/* 3D Floating Profile & Code Illustration */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
               <AboutIllustration3D />
            </div>
         </div>

         {/* Main Single-Column Flow: Profile → Education → Certifications */}
         <div className="flex flex-col gap-6 sm:gap-7">
            
            {/* 1. Profile Info Card */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: '-40px 0px' }}
               transition={{ duration: 0.5, ease: EASE_SMOOTH }}
               className="p-6 sm:p-7 rounded-[12px] bg-[#FFFFFF] border border-[#D7EAF7] shadow-xs">
               
               {/* Header: Avatar + Full Name + Nickname */}
               <div className="flex items-center gap-4 pb-4 border-b border-[#E5F1F8]">
                  <motion.div
                     whileHover={{ rotate: 90, scale: 1.06 }}
                     transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                     className="w-12 h-12 shrink-0 rounded-[10px] bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD] border border-[#BAE6FD] flex items-center justify-center font-bold text-[#0284C7] font-mono text-lg shadow-2xs cursor-pointer select-none">
                     PJ
                  </motion.div>
                  <div className="min-w-0">
                     <h3 className="text-lg font-bold text-[#0F172A] leading-tight">
                        <ScrambleOnHover text={PERSONAL_INFO.fullName} />
                     </h3>
                     <span className="text-[13px] text-[#0284C7] font-semibold block mt-0.5">
                        Nickname: {PERSONAL_INFO.nickname}
                     </span>
                  </div>
               </div>

               {/* Profile Fields — Icon + Label + Value Hierarchy */}
               <div className="mt-4 space-y-4">
                  {/* Education summary */}
                  <div className="flex items-start gap-3.5">
                     <span className="shrink-0 w-8 h-8 rounded-[8px] bg-[#F0F9FF] border border-[#E5F1F8] flex items-center justify-center text-[#0284C7] mt-0.5">
                        <GraduationCap className="w-4 h-4" />
                     </span>
                     <div className="min-w-0">
                        <span className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-0.5">ข้อมูลทั่วไป</span>
                        <div className="text-[14px] text-[#1E293B] font-medium leading-relaxed">
                           <div>{PERSONAL_INFO.faculty}</div>
                           <div className="text-[#475569]">{PERSONAL_INFO.university}</div>
                        </div>
                     </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3.5">
                     <span className="shrink-0 w-8 h-8 rounded-[8px] bg-[#F0F9FF] border border-[#E5F1F8] flex items-center justify-center text-[#0284C7] mt-0.5">
                        <MapPin className="w-4 h-4" />
                     </span>
                     <div className="min-w-0">
                        <span className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-0.5">ที่อยู่</span>
                        <span className="text-[14px] text-[#1E293B] font-medium">
                           {PERSONAL_INFO.location}
                        </span>
                     </div>
                  </div>

                  {/* Core Interests */}
                  <div className="flex items-start gap-3.5">
                     <span className="shrink-0 w-8 h-8 rounded-[8px] bg-[#F0F9FF] border border-[#E5F1F8] flex items-center justify-center text-[#0284C7] mt-0.5">
                        <Code2 aria-hidden className="w-4 h-4" />
                     </span>
                     <div className="min-w-0">
                        <span className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B] mb-0.5">ความสนใจหลัก</span>
                        <span className="text-[13.5px] sm:text-[14px] text-[#334155] leading-relaxed block">
                           React, Express.js, Material UI, Knex.js, Redis, REST API, JavaScript, และ Minecraft Bedrock Script API.
                        </span>
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* 2. Education Timeline Card */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: '-40px 0px' }}
               transition={{ duration: 0.5, delay: 0.1, ease: EASE_SMOOTH }}
               className="p-6 sm:p-7 rounded-[12px] bg-[#FFFFFF] border border-[#D7EAF7] shadow-xs">
               
               <div className="flex items-center gap-3 pb-4 border-b border-[#E5F1F8]">
                  <span className="shrink-0 w-8 h-8 rounded-[8px] bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-center">
                     <GraduationCap className="w-4.5 h-4.5 text-[#0284C7]" />
                  </span>
                  <h3 className="text-sm sm:text-[15px] font-bold text-[#0F172A] uppercase tracking-wider font-mono">
                     ประวัติการศึกษา
                  </h3>
               </div>

               {/* Timeline with solid dot + connector line */}
               <ol className="mt-5 relative space-y-5">
                  {/* Continuous vertical connector line */}
                  <span className="absolute left-[5px] top-2.5 bottom-2 w-0.5 bg-gradient-to-b from-[#0284C7] via-[#BAE6FD] to-[#E0F2FE]" aria-hidden />
                  
                  {EDUCATION_DATA.map((edu, idx) => (
                     <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-40px 0px' }}
                        transition={{ duration: 0.4, delay: 0.1 + idx * 0.08, ease: EASE_SMOOTH }}
                        className="group/edu relative pl-7">
                        
                        {/* Timeline solid dot */}
                        <span className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[#0284C7] ring-4 ring-white shadow-2xs" />
                        
                        <span className="text-xs font-mono text-[#0284C7] font-bold tracking-wider uppercase block mb-0.5">
                           {edu.period}
                        </span>
                        <h4 className="text-[15px] font-bold text-[#0F172A] group-hover/edu:text-[#0284C7] transition-colors leading-snug">
                           {edu.institution}
                        </h4>
                        <div className="text-[13.5px] text-[#475569] mt-0.5">
                           {edu.degree}
                        </div>
                        {edu.details && (
                           <div className="inline-flex items-center text-xs font-mono font-semibold text-[#0284C7] bg-[#F0F9FF] border border-[#BAE6FD] px-2 py-0.5 rounded-[4px] mt-1.5">
                              {edu.details}
                           </div>
                        )}
                     </motion.li>
                  ))}
               </ol>
            </motion.div>

            {/* 3. Certifications & Credentials Card */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: '-40px 0px' }}
               transition={{ duration: 0.5, delay: 0.1, ease: EASE_SMOOTH }}
               className="p-6 sm:p-7 rounded-[12px] bg-[#FFFFFF] border border-[#D7EAF7] shadow-xs flex flex-col">
               
               {/* Card Header */}
               <div className="flex items-center gap-3 pb-4 border-b border-[#E5F1F8]">
                  <span className="shrink-0 w-8 h-8 rounded-[8px] bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-center">
                     <Award className="w-4.5 h-4.5 text-[#0284C7]" />
                  </span>
                  <h3 className="text-sm sm:text-[15px] font-bold text-[#0F172A] uppercase tracking-wider font-mono">
                     CERTIFICATIONS &amp; CREDENTIALS
                  </h3>
               </div>

               {/* 2 Certificate Cards in a 2-Column Responsive Grid */}
               <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {CERTIFICATES_DATA.map((cert, idx) => (
                     <motion.div
                        key={cert.title}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px 0px' }}
                        transition={{ duration: 0.45, delay: 0.1 + idx * 0.08, ease: EASE_SMOOTH }}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedCert(cert)}
                        onKeyDown={(e) => {
                           if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSelectedCert(cert);
                           }
                        }}
                        aria-label={`View certificate: ${cert.title}`}
                        className="rounded-[10px] bg-[#F7FBFF] border border-[#D7EAF7] hover:border-[#BAE6FD] transition-all duration-200 shadow-2xs group flex flex-col overflow-hidden cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0284C7]">
                        
                        {/* Certificate Preview Frame */}
                        <div className="relative w-full aspect-[16/10] bg-[#EAF5FC] border-b border-[#E5F1F8] p-1.5 flex items-center justify-center overflow-hidden">
                           {cert.image ? (
                              <>
                                 <img
                                    src={cert.image}
                                    alt={cert.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-contain drop-shadow-2xs rounded-[4px] group-hover:scale-102 transition-transform duration-200"
                                    referrerPolicy="no-referrer"
                                 />
                                 <span className="absolute top-2 left-2 text-[9.5px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-[4px] bg-[#0284C7] text-white shadow-xs">
                                    {cert.issuer}
                                 </span>
                                 {/* Hover view hint overlay */}
                                 <div className="absolute inset-0 bg-[#0F172A]/40 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1.5 text-white backdrop-blur-[2px]">
                                    <ZoomIn className="w-4 h-4 text-white" />
                                    <span className="text-[11px] font-mono font-semibold tracking-wider uppercase">ดูประกาศนียบัตร</span>
                                 </div>
                              </>
                           ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-3 text-center text-[#0284C7]">
                                 <ShieldCheck className="w-6 h-6 text-[#0284C7]" />
                                 <span className="text-xs font-mono font-bold uppercase">{cert.issuer}</span>
                              </div>
                           )}
                        </div>

                        {/* Card Body */}
                        <div className="p-4 flex flex-col justify-between flex-1">
                           <div>
                              <h4 className="text-[14px] sm:text-[15px] font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors leading-snug">
                                 {cert.title}
                              </h4>
                              <p className="text-xs sm:text-[13px] text-[#64748B] font-mono font-medium mt-1">
                                 {cert.issuer}
                              </p>
                           </div>

                           {/* Action Footer */}
                           <div className="mt-3.5 pt-2.5 border-t border-[#E5F1F8] flex items-center justify-between">
                              <span className="text-xs font-mono text-[#0284C7] font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                 ดูประกาศนียบัตร <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                              <span className="inline-flex items-center text-[#16A34A]" aria-label="Verified">
                                 <CheckCircle2 className="w-4 h-4" />
                              </span>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </motion.div>
         </div>

         {/* Certificate Image Lightbox Modal */}
         <CertificateImageModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />
      </section>
   );
};
