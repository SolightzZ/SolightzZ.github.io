export const scrollToSection = (targetId: string): void => {
   const el = document.getElementById(targetId);
   if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
   }
};

export const scrollToTop = (): void => {
   window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const getSectionTop = (id: string): number | null => {
   const el = document.getElementById(id);
   return el ? el.offsetTop : null;
};
