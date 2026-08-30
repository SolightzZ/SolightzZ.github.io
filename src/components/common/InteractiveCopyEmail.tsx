import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface InteractiveCopyEmailProps {
   email: string;
   className?: string;
}

export const InteractiveCopyEmail: React.FC<InteractiveCopyEmailProps> = ({ email, className = '' }) => {
   const [copied, setCopied] = useState(false);

   const handleCopy = async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      try {
         await navigator.clipboard.writeText(email);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch {
         // Fallback
         window.location.href = `mailto:${email}`;
      }
   };

   return (
      <div className={`relative inline-flex items-center gap-2 group ${className}`}>
         <a href={`mailto:${email}`} className="text-xs sm:text-[13px] font-medium text-[#0F172A] hover:text-[#0284C7] transition-colors flex items-center gap-1.5" title="Click to email or copy">
            <span>{email}</span>
         </a>

         <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy email address"
            className="p-1 rounded-[4px] bg-[#F0F9FF] hover:bg-[#E0F2FE] text-[#64748B] hover:text-[#0284C7] transition-colors border border-[#D7EAF7] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]">
            {copied ? <Check className="w-3.5 h-3.5 text-[#16A34A]" /> : <Copy className="w-3.5 h-3.5" />}
         </button>

         {/* Animated Tooltip */}
         <AnimatePresence>
            {copied && (
               <motion.span
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -top-7 left-0 px-2 py-0.5 rounded-[4px] bg-[#0F172A] text-white text-[10px] font-mono whitespace-nowrap shadow-md pointer-events-none z-20">
                  Copied to clipboard!
               </motion.span>
            )}
         </AnimatePresence>
      </div>
   );
};
