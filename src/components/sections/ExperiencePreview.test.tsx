import {describe, expect, it, vi} from 'vitest';
import {render, screen, within} from '@testing-library/react';
import {ExperiencePreview} from './ExperiencePreview';
import {EXPERIENCE_DATA} from '../../data/portfolioData';

describe('<ExperiencePreview />', () => {
   beforeEach(() => {
      Element.prototype.scrollIntoView = vi.fn();
   });

   it('renders the experience section with the correct id', () => {
      const {container} = render(<ExperiencePreview />);
      expect(container.querySelector('#experience')).not.toBeNull();
   });

   it('renders every experience entry with company, role and period', () => {
      const {container} = render(<ExperiencePreview />);
      EXPERIENCE_DATA.forEach((exp) => {
         const text = container.textContent || '';
         expect(text).toContain(exp.company);
         expect(text).toContain(exp.role);
         expect(text).toContain(exp.period);
         expect(text).toContain(exp.location);
      });
   });

   it('renders every description bullet for each experience', () => {
      const {container} = render(<ExperiencePreview />);
      EXPERIENCE_DATA.forEach((exp) => {
         exp.description.forEach((point) => {
            expect(container.textContent || '').toContain(point);
         });
      });
   });

   it('renders every technology chip', () => {
      const {container} = render(<ExperiencePreview />);
      EXPERIENCE_DATA.forEach((exp) => {
         exp.technologies.forEach((tech) => {
            expect(container.textContent || '').toContain(tech);
         });
      });
   });

   it('renders projects-involved chips when present', () => {
      const {container} = render(<ExperiencePreview />);
      const allText = container.textContent || '';
      const withProjects = EXPERIENCE_DATA.filter((e) => e.projectsInvolved && e.projectsInvolved.length > 0);
      // Skip assertion when no project entries expose projectsInvolved.
      if (withProjects.length === 0) return;
      withProjects.forEach((exp) => {
         exp.projectsInvolved!.forEach((d) => expect(allText).toContain(d));
      });
   });

   it('renders the section badge', () => {
      render(<ExperiencePreview />);
      expect(screen.getByText(/INDUSTRY EXPERIENCE/i)).toBeInTheDocument();
   });
});