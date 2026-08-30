import { Drawer, IconButton } from '@mui/material';
import { ArrowUpRight, Github, Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { scrollToTop } from '../../utils/scroll';
import { ExpandableSocialButton } from '../common/ExpandableSocialButton';
import { RollingText } from '../common/RollingText';

interface NavbarProps {
   activeSection: string;
   onNavClick: (targetId: string) => void;
   onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavClick, onContactClick }) => {
   const [isScrolled, setIsScrolled] = useState(false);
   const [isMobileOpen, setIsMobileOpen] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY > 20);
      };
      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const navItems = [
       { label: 'PROJECT', id: 'projects' },
      { label: 'EXPERIENCE', id: 'experience' },
      { label: 'STACK', id: 'stack' },
      { label: 'ABOUT', id: 'about' },
      { label: 'CONTACT', id: 'contact' },
   ];

   const handleItemClick = (id: string) => {
      if (id === 'contact') {
         onContactClick();
      } else {
         onNavClick(id);
      }
      setIsMobileOpen(false);
   };

   return (
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
         {/* Main Editorial Navbar */}
         <div className={`w-full transition-all duration-300 ${isScrolled ? 'bg-[#F7FBFF]/90 backdrop-blur-md border-b border-[#D7EAF7] py-4 shadow-sm' : 'bg-transparent py-6'}`}>
            <div className="container flex items-center justify-between h-10">
               {/* Left: Logo Wordmark + Small Geometric Blue Mark */}
               <a
                  href="/"
                  onClick={(e) => {
                     e.preventDefault();
                     scrollToTop();
                  }}
                  aria-label="Go to home"
                  className="flex items-center gap-2.5 group cursor-pointer rounded-[3px] outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] focus-visible:ring-offset-1"
                  id="nav-logo">
                  {/* Small Geometric Blue Diamond Mark */}
                  <div className="w-4 h-4 rounded-[2px] bg-[#E0F2FE] border border-[#38BDF8] flex items-center justify-center rotate-45 transition-transform duration-300 group-hover:rotate-90 group-hover:bg-[#BAE6FD]">
                     <div className="w-1.5 h-1.5 rounded-[1px] bg-[#0284C7]" />
                  </div>
                  <span className="font-mono text-sm font-bold tracking-tight text-[#0F172A] group-hover:text-[#0284C7] transition-colors">{PERSONAL_INFO.name}</span>
               </a>

               {/* Center Desktop Navigation Links */}
               <nav className="hidden md:flex items-center gap-6 md:gap-[21px]" aria-label="Main Navigation">
                  {navItems.map((item) => {
                     const isActive = activeSection === item.id;
                     return (
                        <button
                           key={item.id}
                           type="button"
                           onClick={() => handleItemClick(item.id)}
                           className={`group relative text-[14px] font-mono tracking-widest transition-colors py-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] focus-visible:ring-offset-1 ${
                              isActive ? 'text-[#0284C7] font-semibold' : 'text-[#64748B] hover:text-[#0F172A]'
                           }`}>
                           <RollingText text={item.label} />
                           {isActive && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0284C7] rounded-full" />}
                        </button>
                     );
                  })}
               </nav>

               {/* Right: Desktop GitHub Icon Button & Mobile Menu */}
               <div className="flex items-center gap-3">
                  {/* GitHub Expandable Button */}
                  <div className="hidden sm:block">
                     <ExpandableSocialButton label="GitHub" expandedText="GitHub" iconName="Github" href={PERSONAL_INFO.github} showArrow={false} />
                  </div>

                  {/* Mobile Menu Button */}
                  <button
                     type="button"
                     onClick={() => setIsMobileOpen(true)}
                     aria-label="Toggle navigation menu"
                     aria-expanded={isMobileOpen}
                     aria-controls="mobile-navigation"
                     className="md:hidden p-1.5 rounded-[6px] bg-[#FFFFFF] border border-[#D7EAF7] text-[#334155] hover:text-[#0284C7] outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] focus-visible:ring-offset-1">
                     <Menu className="w-4 h-4" />
                  </button>
               </div>
            </div>
         </div>

          {/* Mobile Drawer */}
          <Drawer
             anchor="right"
             open={isMobileOpen}
             onClose={() => setIsMobileOpen(false)}
             disablePortal
             disableScrollLock
             slotProps={{
               paper: {
                  sx: {
                     width: '80%',
                     maxWidth: '320px',
                     backgroundColor: '#FFFFFF',
                     color: '#0F172A',
                     padding: '24px',
                     borderLeft: '1px solid #D7EAF7',
                  },
               },
            }}>
            <div className="flex flex-col h-full justify-between">
               <div>
                  <div className="flex items-center justify-between pb-6 border-b border-[#E5F1F8]">
                     <span className="font-mono text-sm font-bold text-[#0F172A]">{PERSONAL_INFO.name}</span>
                     <IconButton size="small" onClick={() => setIsMobileOpen(false)} sx={{ color: '#64748B' }}>
                        <X className="w-4 h-4" />
                     </IconButton>
                  </div>

                  <nav className="flex flex-col gap-4 mt-6">
                     {navItems.map((item) => (
                        <button
                           key={item.id}
                           type="button"
                           onClick={() => handleItemClick(item.id)}
                           className={`text-left font-mono text-xs tracking-wider py-2 transition-colors ${
                              activeSection === item.id ? 'text-[#0284C7] font-bold' : 'text-[#64748B] hover:text-[#0F172A]'
                           }`}>
                           {item.label}
                        </button>
                     ))}
                  </nav>
               </div>

               <div className="pt-6 border-t border-[#E5F1F8]">
                  <a
                     href={PERSONAL_INFO.github}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center justify-center gap-2 w-full py-2.5 rounded-[6px] border border-[#D7EAF7] bg-[#F7FBFF] text-[#0F172A] hover:text-[#0284C7] text-xs font-mono transition-colors">
                     <Github className="w-4 h-4" />
                     <span>GitHub Profile</span>
                     <ArrowUpRight className="w-3.5 h-3.5 text-[#94A3B8]" />
                  </a>
               </div>
            </div>
         </Drawer>
      </header>
   );
};
