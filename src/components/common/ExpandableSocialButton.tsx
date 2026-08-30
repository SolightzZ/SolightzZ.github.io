import {ArrowUpRight, Github, Mail} from 'lucide-react';
import {motion} from 'motion/react';
import React, {memo, useMemo} from 'react';

interface ExpandableSocialButtonProps {
   label: string;
   expandedText: string;
   iconName?: 'Github' | 'Mail' | string;
   href?: string;
   onClick?: () => void;
   className?: string;
   ariaLabel?: string;
   showArrow?: boolean;
}

const GITHUB_ICON = (
   <Github className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-105" />
);
const MAIL_ICON = (
   <Mail className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-105" />
);

const ExpandableSocialButtonComponent: React.FC<ExpandableSocialButtonProps> = ({
   label,
   expandedText,
   iconName,
   href,
   onClick,
   className = '',
   ariaLabel,
   showArrow = true,
}) => {
   const baseClasses = useMemo(
      () =>
         `group relative inline-flex items-center h-8.5 px-2.5 hover:px-3.5 rounded-[6px] bg-[#FFFFFF] hover:bg-[#F0F9FF] border border-[#D7EAF7] hover:border-[#0284C7] text-[#334155] hover:text-[#0284C7] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-xs select-none overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] ${className}`,
      [className],
   );

   const icon = useMemo(() => {
      switch (iconName) {
         case 'Github':
            return GITHUB_ICON;
         case 'Mail':
            return MAIL_ICON;
         default:
            return GITHUB_ICON;
      }
   }, [iconName]);

   const content = (
      <>
         {/* Icon */}
         <div className="flex items-center justify-center w-4 h-4 shrink-0">{icon}</div>

         {/* Expandable Text */}
         <div className="max-w-0 group-hover:max-w-[150px] opacity-0 group-hover:opacity-100 flex items-center transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden whitespace-nowrap">
            <span className="pl-2 font-mono text-[11.5px] sm:text-xs font-semibold text-[#0F172A] group-hover:text-[#0284C7] transition-colors">
               {expandedText}
            </span>
            {showArrow && (
               <ArrowUpRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#0284C7] ml-1 shrink-0" />
            )}
         </div>
      </>
   );

   if (onClick) {
      return (
         <motion.button
            type="button"
            onClick={onClick}
            whileHover={{scale: 1.04}}
            whileTap={{scale: 0.97}}
            aria-label={ariaLabel || label}
            className={`${baseClasses} cursor-pointer`}>
            {content}
         </motion.button>
      );
   }

   return (
      <motion.a
         href={href}
         target="_blank"
         rel="noopener noreferrer"
         whileHover={{scale: 1.04}}
         whileTap={{scale: 0.97}}
         aria-label={ariaLabel || label}
         className={`${baseClasses} cursor-pointer`}>
         {content}
      </motion.a>
   );
};

export const ExpandableSocialButton = memo(ExpandableSocialButtonComponent);
