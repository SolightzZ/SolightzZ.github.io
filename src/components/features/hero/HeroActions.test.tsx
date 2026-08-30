import {describe, expect, it, vi} from 'vitest';
import {fireEvent, render} from '@testing-library/react';
import {HeroActions} from './HeroActions';

describe('<HeroActions />', () => {
   it('renders both CTA links', () => {
      const {container} = render(<HeroActions />);
      expect(container.textContent || '').toContain('EXPLORE');
      expect(container.textContent || '').toContain('WORK');
      expect(container.textContent || '').toContain('VIEW');
      expect(container.textContent || '').toContain('PROJECTS');
   });

   it('primary link has the experience anchor', () => {
      const {container} = render(<HeroActions />);
      const links = Array.from(container.querySelectorAll('a'));
      const exploreLink = links.find((l) => (l.textContent || '').replace(/\u00A0/g, ' ').includes('EXPLORE WORK'));
      expect(exploreLink).toBeDefined();
      expect(exploreLink).toHaveAttribute('href', '#experience');
   });

   it('secondary link has the projects anchor', () => {
      const {container} = render(<HeroActions />);
      const links = Array.from(container.querySelectorAll('a'));
      const projectsLink = links.find((l) => (l.textContent || '').replace(/\u00A0/g, ' ').includes('VIEW PROJECTS'));
      expect(projectsLink).toBeDefined();
      expect(projectsLink).toHaveAttribute('href', '#projects');
   });

   it('invokes onExploreWork and prevents default navigation when provided', () => {
      const onExploreWork = vi.fn();
      const onViewProjects = vi.fn();
      const {container} = render(<HeroActions onExploreWork={onExploreWork} onViewProjects={onViewProjects} />);

      const links = Array.from(container.querySelectorAll('a'));
      const exploreLink = links.find((l) => (l.textContent || '').replace(/\u00A0/g, ' ').includes('EXPLORE WORK'))!;
      const evt = new MouseEvent('click', {bubbles: true, cancelable: true});
      const preventDefault = vi.spyOn(evt, 'preventDefault');
      fireEvent(exploreLink, evt);

      expect(onExploreWork).toHaveBeenCalledTimes(1);
      expect(preventDefault).toHaveBeenCalled();
      expect(onViewProjects).not.toHaveBeenCalled();
   });

   it('invokes onViewProjects and prevents default navigation when provided', () => {
      const onExploreWork = vi.fn();
      const onViewProjects = vi.fn();
      const {container} = render(<HeroActions onExploreWork={onExploreWork} onViewProjects={onViewProjects} />);

      const links = Array.from(container.querySelectorAll('a'));
      const projectsLink = links.find((l) => (l.textContent || '').replace(/\u00A0/g, ' ').includes('VIEW PROJECTS'))!;
      const evt = new MouseEvent('click', {bubbles: true, cancelable: true});
      const preventDefault = vi.spyOn(evt, 'preventDefault');
      fireEvent(projectsLink, evt);

      expect(onViewProjects).toHaveBeenCalledTimes(1);
      expect(preventDefault).toHaveBeenCalled();
      expect(onExploreWork).not.toHaveBeenCalled();
   });

   it('does NOT prevent default when handlers are not provided', () => {
      const {container} = render(<HeroActions />);
      const links = Array.from(container.querySelectorAll('a'));
      const exploreLink = links.find((l) => (l.textContent || '').replace(/\u00A0/g, ' ').includes('EXPLORE WORK'))!;
      const evt = new MouseEvent('click', {bubbles: true, cancelable: true});
      const preventDefault = vi.spyOn(evt, 'preventDefault');
      fireEvent(exploreLink, evt);

      expect(preventDefault).not.toHaveBeenCalled();
   });

   it('renders stable ids on both buttons', () => {
      const {container} = render(<HeroActions />);
      expect(container.querySelector('#hero-cta-primary')).not.toBeNull();
      expect(container.querySelector('#hero-cta-secondary')).not.toBeNull();
   });
});