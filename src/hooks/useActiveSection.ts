import {useEffect, useState} from 'react';
import {getSectionTop} from '../utils/scroll';

const SECTION_IDS = ['projects', 'experience', 'stack', 'about', 'contact'] as const;
type SectionId = (typeof SECTION_IDS)[number];

export const useActiveSection = (): SectionId | '' => {
   const [active, setActive] = useState<SectionId | ''>('');

   useEffect(() => {
      const tops: Record<SectionId, number> = {} as Record<SectionId, number>;
      const measure = () => {
         SECTION_IDS.forEach((id) => {
            const top = getSectionTop(id);
            tops[id] = top === null ? Number.POSITIVE_INFINITY : top;
         });
      };

      measure();

      let ticking = false;
      const update = () => {
         const workTop = tops.projects ?? 500;
         if (window.scrollY < workTop - 180) {
            setActive('');
            return;
         }
         const scrollPosition = window.scrollY + 220;
         for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
            const id = SECTION_IDS[i];
            const top = tops[id];
            if (top !== undefined && scrollPosition >= top) {
               setActive(id);
               return;
            }
         }
      };

      const handleScroll = () => {
         if (ticking) return;
         ticking = true;
         requestAnimationFrame(() => {
            ticking = false;
            update();
         });
      };

      update();
      window.addEventListener('scroll', handleScroll, {passive: true});
      window.addEventListener('resize', measure);
      return () => {
         window.removeEventListener('scroll', handleScroll);
         window.removeEventListener('resize', measure);
      };
   }, []);

   return active;
};
