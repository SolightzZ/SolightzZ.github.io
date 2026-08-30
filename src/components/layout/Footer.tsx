import { ArrowUp, Check, Copy, Globe, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { scrollToTop } from '../../utils/scroll';
import { ExpandableSocialButton } from '../common/ExpandableSocialButton';
import { RollingText } from '../common/RollingText';
import { ScrambleOnHover } from '../common/ScrambleOnHover';

interface FooterProps {
   activeSection: string;
   onNavClick: (targetId: string) => void;
   onContactClick: () => void;
}

const FOOTER_NAV = [
   { label: 'Projects', id: 'projects' },
   { label: 'Development Experience', id: 'experience' },
   { label: 'Tech Stack & Tools', id: 'stack' },
   { label: 'About & Certificates', id: 'about' },
   { label: 'Get in Touch', id: 'contact' },
];

export const Footer: React.FC<FooterProps> = ({ activeSection, onNavClick, onContactClick }) => {
   const [localTime, setLocalTime] = useState<string>('');
   const [copied, setCopied] = useState(false);
   const prefersReduced = useReducedMotion();

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

   const handleCopyEmail = async () => {
      try {
         await navigator.clipboard.writeText(PERSONAL_INFO.email);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch {
         /* clipboard not available */
      }
   };

   return (
      <footer className="w-full bg-[#FFFFFF] border-t border-[#D7EAF7] pt-[64px] pb-[40px]">
         <motion.div
            className="container"
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}>
            {/* Top Grid: Identity | Navigation | Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-[28px] lg:gap-[36px]">
               {/* Identity */}
               <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                     <motion.div
                        whileHover={{ rotate: 90, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                        className="w-5 h-5 rounded-[2px] bg-[#E0F2FE] border border-[#38BDF8] flex items-center justify-center rotate-45 cursor-pointer shadow-2xs">
                        <div className="w-2 h-2 rounded-[0.5px] bg-[#0284C7]" />
                     </motion.div>
                     <span className="text-base font-bold tracking-tight text-[#0F172A] font-mono uppercase">
                        <ScrambleOnHover text={PERSONAL_INFO.fullName} />
                     </span>
                  </div>

                  <div className="space-y-1">
                     <p className="text-xs sm:text-[13px] font-semibold text-[#0F172A]">
                        {PERSONAL_INFO.role} <span className="text-[#0284C7] font-normal">({PERSONAL_INFO.subRole})</span>
                     </p>
                     <p className="text-xs text-[#64748B] leading-relaxed">
                        {PERSONAL_INFO.faculty} · {PERSONAL_INFO.university}
                     </p>
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                     <ExpandableSocialButton label="GitHub" expandedText="@SolightzZ" iconName="Github" href={PERSONAL_INFO.github} ariaLabel="GitHub" />
                     <ExpandableSocialButton label="Email" expandedText="Direct Email" iconName="Mail" href={`mailto:${PERSONAL_INFO.email}`} ariaLabel="Email" />
                  </div>
               </div>

               {/* Navigation */}
               <div className="space-y-3">
                  <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#0284C7] flex items-center gap-1.5">
                     <Globe className="w-3.5 h-3.5" /> Navigation
                  </h4>
                  <nav className="flex flex-col gap-2 text-[13px] font-mono">
                     {FOOTER_NAV.map((item) => {
                        const isActive = activeSection === item.id;
                        const handleClick = item.id === 'contact' ? onContactClick : () => onNavClick(item.id);
                        return (
                           <button
                              key={item.label}
                              type="button"
                              onClick={handleClick}
                              className={`group text-left transition-all duration-200 hover:translate-x-1 outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] focus-visible:ring-offset-1 rounded-[3px] w-fit ${
                                 isActive ? 'text-[#0284C7] font-bold' : 'text-[#64748B] hover:text-[#0284C7]'
                              }`}>
                              <RollingText text={item.label} />
                           </button>
                        );
                     })}
                  </nav>
               </div>

               {/* Contact & Location */}
               <div className="space-y-3">
                  <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#0284C7]">Contact</h4>
                  <div className="space-y-2 text-xs">
                     <div className="flex items-center gap-2">
                        <a
                           href={`mailto:${PERSONAL_INFO.email}`}
                           className="text-[#334155] hover:text-[#0284C7] transition-colors w-fit outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] focus-visible:ring-offset-1 rounded-[3px]">
                           {PERSONAL_INFO.email}
                        </a>
                        <button
                           type="button"
                           onClick={handleCopyEmail}
                           aria-label="Copy email address"
                           className="inline-flex items-center gap-1 px-2 py-1 rounded-[5px] border border-[#D7EAF7] text-[#64748B] hover:text-[#0284C7] hover:border-[#BAE6FD] transition-colors text-[11px] font-mono outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] focus-visible:ring-offset-1">
                           {copied ? (
                              <>
                                 <Check className="w-3 h-3" /> Copied
                              </>
                           ) : (
                              <>
                                 <Copy className="w-3 h-3" /> Copy
                              </>
                           )}
                        </button>
                     </div>
                     <div className="flex items-center gap-1.5 text-[#0F172A]">
                        {!prefersReduced && (
                           <span className="relative flex h-2 w-2">
                              <span className="absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75 animate-ping" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]" />
                           </span>
                        )}
                        {prefersReduced && <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]" />}
                        <span>Thailand {localTime && `· ${localTime}`}</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-10 sm:mt-[80px] pt-5 sm:pt-[18px] border-t border-[#E5F1F8] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-[10px] text-[11px] font-mono text-[#94A3B8]">
               <div>
                  © {PERSONAL_INFO.currentYear} {PERSONAL_INFO.fullName}. All rights reserved.
               </div>
               <motion.button
                  type="button"
                  onClick={scrollToTop}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] bg-[#F7FBFF] hover:bg-[#F0F9FF] border border-[#D7EAF7] hover:border-[#BAE6FD] text-[11px] font-mono font-medium text-[#0284C7] transition-colors cursor-pointer select-none shadow-2xs">
                  <span>Back to Top</span>
                  <span className="inline-flex transition-transform duration-200 group-hover:-translate-y-0.5">
                     <ArrowUp className="w-3 h-3 text-[#0284C7]" />
                  </span>
               </motion.button>
            </div>
         </motion.div>
      </footer>
   );
};
