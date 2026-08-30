import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import {ContactSection} from './ContactSection';
import {PERSONAL_INFO} from '../../data/portfolioData';

describe('<ContactSection />', () => {
   beforeEach(() => {
      Element.prototype.scrollIntoView = vi.fn();
      Object.defineProperty(navigator, 'clipboard', {
         configurable: true,
         value: {writeText: vi.fn().mockResolvedValue(undefined)},
      });
      vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
   });

   afterEach(() => {
      vi.restoreAllMocks();
   });

   it('renders the section with the contact anchor', () => {
      const {container} = render(<ContactSection />);
      const section = container.querySelector('#contact');
      expect(section).not.toBeNull();
   });

   it('renders the personal email, location and university', () => {
      render(<ContactSection />);
      expect(screen.getAllByText(PERSONAL_INFO.email).length).toBeGreaterThan(0);
      expect(screen.getByText(PERSONAL_INFO.location)).toBeInTheDocument();
      expect(screen.getByText(PERSONAL_INFO.university)).toBeInTheDocument();
   });

   it('shows a live local time indicator (Asia/Bangkok)', () => {
      render(<ContactSection />);
      expect(screen.getByText(/GMT\+7/i)).toBeInTheDocument();
   });

   it('invokes onContactClick when the primary button is clicked', () => {
      const onContactClick = vi.fn();
      render(<ContactSection onContactClick={onContactClick} />);
      const buttons = screen.getAllByRole('button');
      const btn = buttons.find((b) => (b.textContent || '').replace(/\s+/g, ' ').includes('SEND DIRECT EMAIL'));
      expect(btn).toBeDefined();
      fireEvent.click(btn!);
      expect(onContactClick).toHaveBeenCalledTimes(1);
   });

   it('renders the secondary mailto anchor when no handler is supplied', () => {
      // window.location is a jsdom object we can spy on.
      const originalHref = window.location.href;
      Object.defineProperty(window, 'location', {
         configurable: true,
         value: {...window.location, href: originalHref, assign: vi.fn()},
      });

      render(<ContactSection />);
      const link = screen.getByText(/open mail app/i).closest('a');
      expect(link).not.toBeNull();
      expect((link as HTMLAnchorElement).href).toContain('mailto:');
      expect((link as HTMLAnchorElement).href).toContain(encodeURIComponent('Portfolio Inquiry'));
   });

   it('primary button does NOT navigate when onContactClick is provided', () => {
      const onContactClick = vi.fn();
      render(<ContactSection onContactClick={onContactClick} />);
      const buttons = screen.getAllByRole('button');
      const btn = buttons.find((b) => (b.textContent || '').replace(/\s+/g, ' ').includes('SEND DIRECT EMAIL'))!;
      fireEvent.click(btn);
      expect(onContactClick).toHaveBeenCalled();
   });
});