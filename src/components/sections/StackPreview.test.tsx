import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {StackPreview} from './StackPreview';
import {TECH_CATEGORIES} from '../../data/portfolioData';

describe('<StackPreview />', () => {
   beforeEach(() => {
      Element.prototype.scrollIntoView = vi.fn();
   });

   it('renders the stack section with the correct id', () => {
      const {container} = render(<StackPreview />);
      expect(container.querySelector('#stack')).not.toBeNull();
   });

   it('renders every tech category', () => {
      render(<StackPreview />);
      TECH_CATEGORIES.forEach((cat) => {
         expect(screen.getByRole('heading', {name: cat.title})).toBeInTheDocument();
      });
   });

   it('renders every skill name within its category', () => {
      render(<StackPreview />);
      TECH_CATEGORIES.forEach((cat) => {
         cat.skills.forEach((skill) => {
            expect(screen.getByText(skill.name)).toBeInTheDocument();
         });
      });
   });

   it('renders a skill icon for every skill with the right iconName', () => {
      const {baseElement} = render(<StackPreview />);
      TECH_CATEGORIES.forEach((cat) => {
         cat.skills.forEach((skill) => {
            const imgs = baseElement.querySelectorAll(`img[src$="/tech/${skill.iconName}.svg"]`);
            expect(imgs.length).toBeGreaterThan(0);
         });
      });
   });

   it('renders the section badge and title', () => {
      const {container} = render(<StackPreview />);
      expect(container.textContent || '').toContain('TECHNICAL CAPABILITIES');
      expect(container.textContent || '').toContain('Tech');
      expect(container.textContent || '').toContain('Stack');
      expect(container.textContent || '').toContain('Tooling');
   });
});