/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {lazy, Suspense, useState} from 'react';
import {HeroContainer} from './components/features/hero/HeroContainer';
import {Footer} from './components/layout/Footer';
import {Navbar} from './components/layout/Navbar';
import {AboutPreview} from './components/sections/AboutPreview';
import {ContactSection} from './components/sections/ContactSection';
import {ExperiencePreview} from './components/sections/ExperiencePreview';
import {SelectedWorkPreview} from './components/sections/SelectedWorkPreview';
import {StackPreview} from './components/sections/StackPreview';
import {useActiveSection} from './hooks/useActiveSection';
import {ProjectItem} from './types/portfolio';
import {scrollToSection} from './utils/scroll';

const ContactModal = lazy(() =>
   import('./components/common/ContactModal').then((m) => ({default: m.ContactModal})),
);
const ProjectDetailModal = lazy(() =>
   import('./components/common/ProjectDetailModal').then((m) => ({default: m.ProjectDetailModal})),
);

export default function App() {
   const [contactOpen, setContactOpen] = useState(false);
   const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
   const activeSection = useActiveSection();

   const handleNavClick = (targetId: string) => {
      scrollToSection(targetId);
   };

   const openContact = () => {
      (document.activeElement as HTMLElement | null)?.blur();
      setContactOpen(true);
   };

   const openProject = (project: ProjectItem) => {
      (document.activeElement as HTMLElement | null)?.blur();
      setSelectedProject(project);
   };

   return (
      <div className="min-h-screen bg-[#F7FBFF] text-[#0F172A] relative selection:bg-[#BAE6FD] selection:text-[#0284C7] overflow-x-hidden font-sans">
         {/* Background Atmosphere: Light Blue / Ice White Soft Radiance */}
         <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden">
            {/* Top Right Atmospheric Radial Light Blue */}
            <div className="absolute -top-32 -right-32 w-[600px] sm:w-[850px] h-[600px] sm:h-[850px] rounded-full bg-radial from-[#E0F2FE]/70 via-[#F0F9FF]/40 to-transparent blur-[140px]" />

            {/* Center / Lower Left Atmospheric Soft Sky Blue */}
            <div className="absolute top-1/2 -left-32 w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full bg-radial from-[#BAE6FD]/30 via-[#F0F9FF]/30 to-transparent blur-[130px]" />
         </div>

         {/* Global Navbar */}
         <Navbar activeSection={activeSection} onNavClick={handleNavClick} onContactClick={openContact} />

         {/* Main Flow */}
         <main className="relative z-10">
            {/* 1. Hero Viewport (Asymmetric with 3D Glass Sphere Workspace) */}
            <HeroContainer onExploreWork={() => handleNavClick('experience')} onViewProjects={() => handleNavClick('projects')} onContactClick={openContact} />

            {/* 2. Selected Work */}
            <SelectedWorkPreview onSelectProject={openProject} />

            {/* 3. Industry Experience */}
            <ExperiencePreview />

            {/* 4. Tech Stack */}
            <StackPreview />

            {/* 5. About SolightzZ */}
            <AboutPreview />

            {/* 6. Contact / Get In Touch */}
            <ContactSection onContactClick={openContact} />
         </main>

         {/* Footer */}
         <Footer activeSection={activeSection} onNavClick={handleNavClick} onContactClick={openContact} />

{/* Interactive Modals (lazy-loaded MUI Dialogs) */}
      <Suspense fallback={null}>
         <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
         <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </Suspense>
   </div>
   );
}
