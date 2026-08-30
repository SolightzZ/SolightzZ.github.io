import { motion } from 'motion/react';
import React from 'react';
import { PERSONAL_INFO } from '../../../data/portfolioData';
import { useScrambleText } from '../../../hooks/useScrambleText';
import { RotatingText } from '../../common/RotatingText';

export const HeroContent: React.FC = () => {
   // Name characters for crisp staggered reveal on mount
   const nameLetters = Array.from(PERSONAL_INFO.name);

   // Hacker Matrix Scramble Decode for Role & SubRole
   const roleTarget = `< ${PERSONAL_INFO.role} />`;
   const subRoleTarget = `{ ${PERSONAL_INFO.subRole.replace('& ', '')} }`;

   const { displayText: roleText, isScrambling: roleScrambling, triggerScramble: triggerRole } = useScrambleText(roleTarget, { delay: 300, speed: 32 });

   const { displayText: subRoleText, isScrambling: subRoleScrambling, triggerScramble: triggerSubRole } = useScrambleText(subRoleTarget, { delay: 550, speed: 32 });

   const handleHoverReplay = () => {
      triggerRole();
      triggerSubRole();
   };

   return (
      <div className="space-y-4 sm:space-y-[18px]">
         {/* Eyebrow */}
         <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[12px] sm:text-[13px] font-mono font-medium tracking-[0.2em] text-[#64748B] uppercase select-none">
            {PERSONAL_INFO.eyebrow}
         </motion.div>

         {/* Main Name Heading with Staggered Letter Spring Animation */}
         <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-[clamp(2.4rem,5.5vw,4.25rem)] font-semibold font-[650] tracking-tight text-[#0F172A] leading-[0.98] select-none flex flex-wrap">
            {nameLetters.map((char, index) => (
               <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                     duration: 0.4,
                     delay: 0.18 + index * 0.035,
                     ease: [0.2, 0.65, 0.3, 0.9],
                  }}
                  className={char === ' ' ? 'inline-block w-[0.25em]' : 'inline-block hover:text-[#0284C7] transition-colors duration-200 cursor-default'}>
                  {char}
               </motion.span>
            ))}
         </motion.h1>

         {/* Role: Hacker Scramble Text Decode Animation with Interactive Replay */}
         <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            onMouseEnter={handleHoverReplay}
            className="text-[17px] sm:text-[19px] lg:text-[21px] font-mono font-semibold leading-tight pt-1 select-none space-y-1.5 cursor-pointer group">
            {/* Primary Role Scramble */}
            <div className="flex items-center gap-2">
               <span className={`transition-colors duration-150 ${roleScrambling ? 'text-[#0284C7] font-bold' : 'text-[#0284C7] group-hover:text-[#0369A1]'}`}>{roleText}</span>
            </div>

            {/* Secondary Role Scramble */}
            <div className="flex items-center gap-2">
               <span className={`text-[15px] sm:text-[17px] font-medium transition-colors duration-150 ${subRoleScrambling ? 'text-[#0284C7]' : 'text-[#475569] group-hover:text-[#0F172A]'}`}>
                  &amp; {subRoleText}
               </span>
            </div>
         </motion.div>

         {/* Supporting Bio Description */}
         <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.4 }}
            className="text-[14px] text-[#64748B] font-normal leading-[1.6] max-w-[360px] pt-1">
            {PERSONAL_INFO.bio}
         </motion.p>

         {/* Continuous Animated Rotating Specialty Text with Blinking Cursor */}
         <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.48 }}
            className="flex items-center gap-2 text-xs font-mono text-[#64748B] pt-0.5 select-none">
            <span className="text-[#0284C7] font-semibold tracking-wider uppercase text-[11px]">Specialty :</span>
            <RotatingText words={['Web Applications', 'Minecraft Bedrock Script API', 'Game Development', 'Mobile Development', 'Service Development']} interval={3000} />
         </motion.div>
      </div>
   );
};
