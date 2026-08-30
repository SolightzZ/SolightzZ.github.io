import { motion } from 'motion/react';
import React from 'react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../../data/portfolioData';
import { ExpandableSocialButton } from '../../common/ExpandableSocialButton';

interface HeroSocialsProps {
   onContactClick?: () => void;
}

export const HeroSocials: React.FC<HeroSocialsProps> = ({ onContactClick }) => {
   const getHandleLabel = (label: string) => {
      if (label === 'GitHub') return '@SolightzZ';
      if (label === 'Email') return 'Contact Email';
      return label;
   };

   return (
      <motion.div
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.45, delay: 0.35 }}
         className="flex items-center gap-2.5 pt-2">
         {SOCIAL_LINKS.map((link) => {
            const handleText = getHandleLabel(link.label);
            const isEmail = link.label === 'Email';

            return (
               <ExpandableSocialButton
                  key={link.label}
                  label={link.label}
                  expandedText={handleText}
                  iconName={link.iconName}
                  href={isEmail ? (onContactClick ? undefined : `mailto:${PERSONAL_INFO.email}`) : link.href}
                  onClick={isEmail && onContactClick ? onContactClick : undefined}
                  ariaLabel={link.ariaLabel}
               />
            );
         })}
      </motion.div>
   );
};
