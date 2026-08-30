import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {ContactSection} from './ContactSection';
import {PERSONAL_INFO} from '../../data/portfolioData';

describe('<ContactSection /> — integration with InteractiveCopyEmail', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {writeText: vi.fn().mockResolvedValue(undefined)},
    });
  });

it('shows the email address from PERSONAL_INFO', () => {
      render(<ContactSection />);
      expect(screen.getAllByText(PERSONAL_INFO.email).length).toBeGreaterThan(0);
   });

   it('copies the email when the copy button is clicked', async () => {
      render(<ContactSection />);

      const writeText = vi.mocked(navigator.clipboard.writeText);
      fireEvent.click(screen.getByRole('button', {name: /copy email address/i}));

      await waitFor(() => {
         expect(writeText).toHaveBeenCalledWith(PERSONAL_INFO.email);
      });
   });

   const sendDirectEmailButton = () => {
   const all = Array.from(document.querySelectorAll('button'));
   const match = all.find((btn) =>
      /SEND DIRECT EMAIL/i.test(btn.textContent?.replace(/\u00A0/g, ' ') || ''),
   );
   if (!match) throw new Error('send direct email button not found');
   return match as HTMLElement;
};

it('calls onContactClick when "SEND DIRECT EMAIL" is pressed', () => {
      const onContactClick = vi.fn();
      render(<ContactSection onContactClick={onContactClick} />);

      fireEvent.click(sendDirectEmailButton());
      expect(onContactClick).toHaveBeenCalledTimes(1);
   });

   it('falls back to mailto navigation when no onContactClick is provided', () => {
      const originalLocation = window.location;
      Object.defineProperty(window, 'location', {
         configurable: true,
         value: {...originalLocation, href: ''},
      });

      try {
         render(<ContactSection />);
         fireEvent.click(sendDirectEmailButton());
         expect(window.location.href).toContain(`mailto:${PERSONAL_INFO.email}`);
      } finally {
         Object.defineProperty(window, 'location', {configurable: true, value: originalLocation});
      }
   });

   it('renders a "Get in touch" section with id="contact" for navigation', () => {
      render(<ContactSection />);
      expect(document.getElementById('contact')).toBeInTheDocument();
   });
});