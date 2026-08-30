import { ArrowUpRight, Clock, Mail, MapPin, MessageSquare, School, Send } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { EASE_SMOOTH } from '../../utils/motion';
import { InteractiveCopyEmail } from '../common/InteractiveCopyEmail';
import { RollingText } from '../common/RollingText';
import { ScrollRevealHeading } from '../common/ScrollRevealHeading';

interface ContactSectionProps {
   onContactClick?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onContactClick }) => {
   const [localTime, setLocalTime] = useState<string>('');

   useEffect(() => {
      const updateTime = () => {
         const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Bangkok',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
         });
         setLocalTime(formatter.format(new Date()));
      };
      updateTime();
      const interval = setInterval(updateTime, 10000);
      return () => clearInterval(interval);
   }, []);

   const handleDirectEmail = () => {
      if (onContactClick) {
         onContactClick();
      } else {
         const subject = encodeURIComponent('Portfolio Inquiry');
         const body = encodeURIComponent('Hello Paniti,\n\nI would like to get in touch regarding...');
         window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
      }
   };

   return (
      <section id="contact" className="container py-16 sm:py-24 lg:py-28 border-t border-[#D7EAF7]">
         {/* Section Header */}
         <ScrollRevealHeading
            badge="GET IN TOUCH"
            badgeIcon={<MessageSquare className="w-3.5 h-3.5" />}
            title="ช่องทางการติดต่อ"
            description="มีข้อสงสัย สนใจร่วมงาน หรือต้องการพูดคุยแลกเปลี่ยน ติดต่อผมได้ที่นี่"
            className="mb-10 sm:mb-12 [&_p]:!text-[15px] [&_p]:sm:!text-base [&_p]:!leading-[1.7] [&_p]:!text-[#334155]"
         />

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* Left Column: Direct Contact Info (50% Equal Width) */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: '-40px 0px' }}
               transition={{ duration: 0.5, ease: EASE_SMOOTH }}
               className="lg:col-span-1 h-full">
               <div className="h-full p-6 sm:p-7 rounded-[12px] bg-[#FFFFFF] border border-[#D7EAF7] shadow-xs flex flex-col justify-between space-y-4">
                  <div>
                     <div className="flex items-center justify-between pb-4 border-b border-[#E5F1F8]">
                        <h3 className="text-sm sm:text-[15px] font-bold font-mono uppercase tracking-wider text-[#0F172A]">รายละเอียดการติดต่อ</h3>
                        {localTime && (
                           <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#64748B] bg-[#F7FBFF] px-2.5 py-1 rounded-[6px] border border-[#D7EAF7]">
                              <Clock className="w-3.5 h-3.5 text-[#0284C7]" />
                              {localTime} (GMT+7)
                           </span>
                        )}
                     </div>

                     {/* Contact list */}
                     <div className="mt-4 space-y-3.5">
                        {/* Email Row */}
                        <motion.div
                           initial={{ opacity: 0, x: -6 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.3, delay: 0.05 }}
                           className="group flex items-start gap-3.5 p-2.5 -mx-2.5 rounded-[8px] hover:bg-[#F0F9FF] transition-colors duration-150">
                           <div className="w-9 h-9 rounded-[8px] bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-center shrink-0 text-[#0284C7] group-hover:scale-106 transition-transform">
                              <Mail className="w-4.5 h-4.5" />
                           </div>
                           <div>
                              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">อีเมล</span>
                              <div className="mt-0.5">
                                 <InteractiveCopyEmail email={PERSONAL_INFO.email} />
                              </div>
                           </div>
                        </motion.div>

                        {/* Location Row */}
                        <motion.div
                           initial={{ opacity: 0, x: -6 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.3, delay: 0.1 }}
                           className="group flex items-start gap-3.5 p-2.5 -mx-2.5 rounded-[8px] hover:bg-[#F0F9FF] transition-colors duration-150">
                           <div className="w-9 h-9 rounded-[8px] bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-center shrink-0 text-[#0284C7] group-hover:scale-106 transition-transform">
                              <MapPin className="w-4.5 h-4.5" />
                           </div>
                           <div>
                              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">ที่อยู่</span>
                              <span className="block text-[14px] font-medium text-[#1E293B] group-hover:text-[#0284C7] transition-colors mt-0.5">{PERSONAL_INFO.location}</span>
                           </div>
                        </motion.div>

                        {/* Institution Row */}
                        <motion.div
                           initial={{ opacity: 0, x: -6 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.3, delay: 0.15 }}
                           className="group flex items-start gap-3.5 p-2.5 -mx-2.5 rounded-[8px] hover:bg-[#F0F9FF] transition-colors duration-150">
                           <div className="w-9 h-9 rounded-[8px] bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-center shrink-0 text-[#0284C7] group-hover:scale-106 transition-transform">
                              <School className="w-4.5 h-4.5" />
                           </div>
                           <div>
                              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">สถาบัน</span>
                              <span className="block text-[14px] font-medium text-[#1E293B] group-hover:text-[#0284C7] transition-colors mt-0.5">{PERSONAL_INFO.university}</span>
                           </div>
                        </motion.div>
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Right Column: Send a Message Direct Note Card (50% Equal Width) */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: '-40px 0px' }}
               transition={{ duration: 0.5, delay: 0.1, ease: EASE_SMOOTH }}
               className="lg:col-span-1 h-full">
               <div className="h-full p-6 sm:p-7 rounded-[12px] bg-[#FFFFFF] border border-[#D7EAF7] shadow-xs flex flex-col justify-between">
                  <div>
                     <div className="mb-1">
                        <h3 className="text-lg font-bold text-[#0F172A]">เริ่มต้นบทสนทนา</h3>
                     </div>

                     <p className="text-[14px] text-[#64748B] mb-5 font-normal leading-relaxed">ส่งข้อความถึงผมโดยตรง เพื่อพูดคุยหรือสอบถามเกี่ยวกับการพัฒนาเว็บและระบบสารสนเทศ</p>

                     <div className="p-5 sm:p-6 rounded-[10px] bg-[#F7FBFF] border border-[#D7EAF7] space-y-4">
                        <div className="flex items-center gap-2 text-xs sm:text-[13px] font-mono text-[#0284C7] font-semibold">
                           <Send className="w-4 h-4 text-[#0284C7]" />
                           <span>ตอบกลับภายใน 24 ชั่วโมง</span>
                        </div>

                        <p className="text-[14px] sm:text-[15px] text-[#334155] leading-[1.7]">
                           สามารถส่งอีเมลถึงผมได้โดยตรงที่{' '}
                           <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#0284C7] font-medium underline underline-offset-2 hover:text-[#0369A1] transition-colors">
                              {PERSONAL_INFO.email}
                           </a>{' '}
                           สำหรับโอกาสในการร่วมงาน สอบถามข้อมูล หรือโปรเจกต์เกี่ยวกับการพัฒนาระบบ
                        </p>

                        {/* Action Buttons */}
                        <div className="pt-2 flex flex-wrap items-center gap-3">
                           {/* Primary Button: Open Interactive Modal */}
                           <button
                              type="button"
                              onClick={handleDirectEmail}
                              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs sm:text-[13px] font-mono font-semibold transition-colors shadow-xs select-none cursor-pointer">
                              <Mail className="w-4 h-4" />
                              <RollingText text="SEND DIRECT EMAIL" />
                              <ArrowUpRight className="w-4 h-4 text-white/80 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                           </button>

                           {/* Secondary Button: Open Default Mail App with Pre-filled Template */}
                           <a
                              href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent('Portfolio Inquiry')}&body=${encodeURIComponent('Hello Paniti,\n\nI would like to get in touch regarding...')}`}
                              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[8px] bg-[#FFFFFF] hover:bg-[#F0F9FF] border border-[#D7EAF7] hover:border-[#BAE6FD] text-[#334155] hover:text-[#0284C7] text-xs sm:text-[13px] font-mono font-semibold transition-colors shadow-2xs">
                              <span>Open Mail App</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#94A3B8]" />
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>
   );
};
