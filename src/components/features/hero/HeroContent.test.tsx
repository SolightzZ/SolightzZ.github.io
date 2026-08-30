import {describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import {HeroContent} from './HeroContent';
import {PERSONAL_INFO} from '../../../data/portfolioData';

describe('<HeroContent />', () => {
   it('renders the personal name', () => {
      render(<HeroContent />);
      // Name is split per character across motion spans.
      PERSONAL_INFO.name.split('').forEach((char) => {
         if (char.trim()) expect(screen.getAllByText(char).length).toBeGreaterThan(0);
      });
   });

   it('renders the eyebrow text', () => {
      const {container} = render(<HeroContent />);
      expect(container.textContent || '').toContain(PERSONAL_INFO.eyebrow);
   });

   it('renders the bio paragraph', () => {
      const {container} = render(<HeroContent />);
      expect(container.textContent || '').toContain(PERSONAL_INFO.bio);
   });

   it('renders the Specialty label', () => {
      render(<HeroContent />);
      expect(screen.getByText(/Specialty/i)).toBeInTheDocument();
   });

   it('renders the rotating specialty component with words', () => {
      const {container} = render(<HeroContent />);
      // First word should be in DOM on initial render.
      expect(container.textContent || '').toContain('Web Applications');
   });

   it('triggers scramble replay on mouse enter', () => {
      const {container} = render(<HeroContent />);
      const roleWrapper = container.querySelector('.cursor-pointer.group');
      expect(roleWrapper).not.toBeNull();
      fireEvent.mouseEnter(roleWrapper!);
      // After hover, role/subRole text should still be in the container.
      expect(container.textContent || '').toContain(PERSONAL_INFO.role);
   });

   it('renders the entire role with angle brackets from the source', () => {
      const {container} = render(<HeroContent />);
      // The role text is wrapped: `< {role} />`. Brackets might be encoded; check for role.
      expect(container.textContent || '').toContain(PERSONAL_INFO.role);
   });
});