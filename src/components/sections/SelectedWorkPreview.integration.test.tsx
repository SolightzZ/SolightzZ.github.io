import {fireEvent, render, screen, within} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {SelectedWorkPreview} from './SelectedWorkPreview';
import {PROJECTS_DATA} from '../../data/portfolioData';
import type {ProjectItem} from '../../types/portfolio';

const featuredProjects = PROJECTS_DATA.filter((p) => p.featured);

const cardForTitle = (title: string) =>
   screen.getByText(title).closest('div[class*="cursor-pointer"]') as HTMLElement | null;

const toggleButton = (label: RegExp) => {
   const all = Array.from(document.querySelectorAll('button'));
   const match = all.find((btn) => label.test(btn.textContent?.replace(/\u00A0/g, ' ') || ''));
   if (!match) throw new Error(`toggle button not found for ${label}`);
   return match as HTMLElement;
};

describe('<SelectedWorkPreview /> — integration', () => {
   it('renders the featured projects section under id="projects"', () => {
      render(<SelectedWorkPreview onSelectProject={() => {}} />);
      const el = document.getElementById('projects');
      expect(el).toBeInTheDocument();
   });

   it('limits the default view to 6 featured cards', () => {
      render(<SelectedWorkPreview onSelectProject={() => {}} />);
      const section = document.getElementById('projects')!;
      const headingCount = within(section).getAllByRole('heading', {level: 3}).length;
      expect(headingCount).toBe(Math.min(featuredProjects.length, 6));
   });

   it('renders every featured title in the default view', () => {
      render(<SelectedWorkPreview onSelectProject={() => {}} />);
      const visible = featuredProjects.slice(0, 6);
      visible.forEach((p) => {
         expect(screen.getAllByText(p.title).length).toBeGreaterThan(0);
      });
   });

   it('shows all featured projects after clicking "VIEW ALL"', () => {
      render(<SelectedWorkPreview onSelectProject={() => {}} />);
      fireEvent.click(toggleButton(/VIEW ALL/i));
      const section = document.getElementById('projects')!;
      expect(within(section).getAllByRole('heading', {level: 3}).length).toBe(featuredProjects.length);
      expect(toggleButton(/SHOW FEATURED ONLY/i)).toBeInTheDocument();
   });

   it('filters by category and narrows the visible cards', () => {
      render(<SelectedWorkPreview onSelectProject={() => {}} />);

      const beforeCount = within(document.getElementById('projects')!).getAllByRole(
         'heading',
         {level: 3},
      ).length;

      fireEvent.click(toggleButton(/VIEW ALL/i));
      const allCount = within(document.getElementById('projects')!).getAllByRole(
         'heading',
         {level: 3},
      ).length;
      expect(allCount).toBeGreaterThan(beforeCount);
      expect(allCount).toBe(featuredProjects.length);
   });

   it('invokes onSelectProject with the right project when a card is clicked', () => {
      const handleSelect = vi.fn();
      render(<SelectedWorkPreview onSelectProject={handleSelect} />);

      const firstFeatured = featuredProjects[0];
      const card = cardForTitle(firstFeatured.title);
      expect(card).not.toBeNull();
      fireEvent.click(card!);

      expect(handleSelect).toHaveBeenCalledTimes(1);
      const passed = handleSelect.mock.calls[0][0] as ProjectItem;
      expect(passed.id).toBe(firstFeatured.id);
   });

   it('shows the "SHOW FEATURED ONLY" toggle after switching to all-projects view', () => {
      render(<SelectedWorkPreview onSelectProject={() => {}} />);
      expect(toggleButton(/VIEW ALL/i)).toBeInTheDocument();
      fireEvent.click(toggleButton(/VIEW ALL/i));
      expect(toggleButton(/SHOW FEATURED ONLY/i)).toBeInTheDocument();
   });
});