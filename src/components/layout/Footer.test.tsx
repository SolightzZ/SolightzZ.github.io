import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {Footer} from './Footer';
import {PERSONAL_INFO} from '../../data/portfolioData';

const FOOTER_LABELS = [
   {contains: 'Projects'},
   {contains: 'Development'},
   {contains: 'Tech'},
   {contains: 'Certificates'},
   {contains: 'Get in Touch'},
];

describe('<Footer />', () => {
   const onNavClick = vi.fn();
   const onContactClick = vi.fn();

   beforeEach(() => {
      onNavClick.mockClear();
      onContactClick.mockClear();
      Element.prototype.scrollIntoView = vi.fn();
      window.scrollTo = vi.fn();
      Object.defineProperty(navigator, 'clipboard', {
         configurable: true,
         value: {writeText: vi.fn().mockResolvedValue(undefined)},
      });
   });

   afterEach(() => {
      vi.restoreAllMocks();
   });

   it('renders the footer element', () => {
      const {container} = render(<Footer activeSection="hero" onNavClick={onNavClick} onContactClick={onContactClick} />);
      expect(container.querySelector('footer')).not.toBeNull();
   });

   it('shows the personal full name and role', () => {
      render(<Footer activeSection="hero" onNavClick={onNavClick} onContactClick={onContactClick} />);
      expect(screen.getAllByText(PERSONAL_INFO.fullName).length).toBeGreaterThan(0);
      expect(screen.getByText(PERSONAL_INFO.role)).toBeInTheDocument();
   });

   it('renders every footer nav link', () => {
      const {container} = render(<Footer activeSection="hero" onNavClick={onNavClick} onContactClick={onContactClick} />);
      // Normalize non-breaking spaces from RollingText.
      const text = (container.textContent || '').replace(/\u00A0/g, ' ');
      FOOTER_LABELS.forEach(({contains}) => {
         expect(text).toContain(contains);
      });
   });

   it('calls onNavClick when a non-contact footer link is clicked', () => {
      render(<Footer activeSection="hero" onNavClick={onNavClick} onContactClick={onContactClick} />);
      const buttons = screen.getAllByRole('button');
      const projectsBtn = buttons.find((b) => (b.textContent || '').includes('Projects'))!;
      fireEvent.click(projectsBtn);
      expect(onNavClick).toHaveBeenCalledWith('projects');
      expect(onContactClick).not.toHaveBeenCalled();
   });

   it('calls onContactClick when the Get in Touch footer link is clicked', () => {
      const {baseElement} = render(<Footer activeSection="hero" onNavClick={onNavClick} onContactClick={onContactClick} />);
      const buttons = Array.from(baseElement.querySelectorAll('button'));
      const contactBtn = buttons.find((b) => (b.textContent || '').replace(/\u00A0/g, ' ').includes('Get in Touch'));
      expect(contactBtn).toBeDefined();
      fireEvent.click(contactBtn!);
      expect(onContactClick).toHaveBeenCalled();
      expect(onNavClick).not.toHaveBeenCalled();
   });

   it('highlights the active section link with the brand color', () => {
      render(<Footer activeSection="projects" onNavClick={onNavClick} onContactClick={onContactClick} />);
      const buttons = screen.getAllByRole('button');
      const projectsBtn = buttons.find((b) => (b.textContent || '').includes('Projects'))!;
      expect(projectsBtn.className).toContain('text-[#0284C7]');
      expect(projectsBtn.className).toContain('font-bold');
   });

   it('copy-email button writes the email to clipboard', async () => {
      const writeText = vi.mocked(navigator.clipboard.writeText);
      render(<Footer activeSection="hero" onNavClick={onNavClick} onContactClick={onContactClick} />);
      const btn = screen.getByRole('button', {name: /copy email address/i});
      fireEvent.click(btn);
      await waitFor(() => {
         expect(writeText).toHaveBeenCalledWith(PERSONAL_INFO.email);
      });
   });

   it('copy-email button flips to Copied state then resets', async () => {
      render(<Footer activeSection="hero" onNavClick={onNavClick} onContactClick={onContactClick} />);
      const btn = screen.getByRole('button', {name: /copy email address/i});
      fireEvent.click(btn);
      await waitFor(() => {
         expect(screen.getByText(/^Copied$/)).toBeInTheDocument();
      });
      // Wait for the 2s reset timeout to elapse.
      await waitFor(
         () => {
            expect(screen.queryByText(/^Copied$/)).not.toBeInTheDocument();
         },
         {timeout: 3000},
      );
   });

   it('back-to-top button scrolls to the top of the page', () => {
      render(<Footer activeSection="hero" onNavClick={onNavClick} onContactClick={onContactClick} />);
      const btn = screen.getByRole('button', {name: /back to top/i});
      fireEvent.click(btn);
      expect(window.scrollTo).toHaveBeenCalled();
   });

   it('shows the local time when available', () => {
      render(<Footer activeSection="hero" onNavClick={onNavClick} onContactClick={onContactClick} />);
      // Time is set after first useEffect tick — allow it via waitFor to handle the race
      expect(screen.getByText(/Thailand/i)).toBeInTheDocument();
   });
});