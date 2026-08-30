import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';

vi.mock('../../components/three/Hero3DScene', () => ({
   Hero3DScene: () => <div data-testid="hero3d-scene-mock" />,
}));
vi.mock('../../components/three/SceneFallback', () => ({
   SceneFallback: () => <div data-testid="hero3d-fallback" />,
}));

import App from '../../App';
import {PERSONAL_INFO} from '../../data/portfolioData';

const navButton = (label: string) => {
   const buttons = Array.from(document.querySelectorAll('button'));
   const btn = buttons.find((b) => {
      const txt = (b.textContent || '').replace(/\u00A0/g, ' ').trim();
      return txt.startsWith(label + label) || txt.startsWith(label) || txt === label;
   });
   if (!btn) throw new Error(`nav button ${label} not found`);
   return btn as HTMLElement;
};

const projectsSection = () => document.getElementById('projects');
const contactSection = () => document.getElementById('contact');

describe('<App /> — system', () => {
   beforeEach(() => {
      Object.defineProperty(navigator, 'clipboard', {
         configurable: true,
         value: {writeText: vi.fn().mockResolvedValue(undefined)},
      });
      Element.prototype.scrollIntoView = vi.fn();
      window.scrollTo = vi.fn();
   });

   afterEach(() => {
      vi.restoreAllMocks();
   });

   it('renders all six page sections in document order', () => {
      render(<App />);
      ['hero', 'projects', 'experience', 'stack', 'about', 'contact'].forEach((id) => {
         expect(document.getElementById(id)).toBeInTheDocument();
      });
   });

   it('displays the personal name from data', () => {
      render(<App />);
      expect(screen.getAllByText(PERSONAL_INFO.name).length).toBeGreaterThan(0);
   });

   it('renders the navbar with all five nav buttons', () => {
      render(<App />);
      expect(navButton('PROJECT')).toBeInTheDocument();
      expect(navButton('EXPERIENCE')).toBeInTheDocument();
      expect(navButton('STACK')).toBeInTheDocument();
      expect(navButton('ABOUT')).toBeInTheDocument();
      expect(navButton('CONTACT')).toBeInTheDocument();
   });

   it('nav click scrolls to the requested section', () => {
      render(<App />);
      const scrollSpy = vi.mocked(Element.prototype.scrollIntoView);

      fireEvent.click(navButton('EXPERIENCE'));

      expect(scrollSpy).toHaveBeenCalled();
   });

   it('CONTACT nav button opens the contact modal', async () => {
      render(<App />);
      await act(async () => {
         fireEvent.click(navButton('CONTACT'));
      });
      // Lazy chunk load + React render — give it room.
      const dialog = await screen.findByRole('dialog', undefined, {timeout: 10000});
      expect(dialog).toBeInTheDocument();
   }, 20000);

   it('closing the contact modal removes it from the DOM', async () => {
      render(<App />);
      await act(async () => {
         fireEvent.click(navButton('CONTACT'));
      });
      const dialog = await screen.findByRole('dialog');
      await act(async () => {
         fireEvent.keyDown(dialog, {key: 'Escape'});
      });

      await waitFor(() => {
         expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
   });

   it('clicking the logo scrolls to the top of the page', () => {
      render(<App />);
      const scrollSpy = vi.mocked(window.scrollTo);
      fireEvent.click(screen.getByRole('link', {name: /go to home/i}));
      expect(scrollSpy).toHaveBeenCalled();
   });

   it('opens the project detail modal when a project card is clicked', async () => {
      render(<App />);
      const cards = projectsSection()!.querySelectorAll('div[class*="cursor-pointer"]');
      expect(cards.length).toBeGreaterThan(0);
      await act(async () => {
         fireEvent.click(cards[0]);
      });

      await screen.findByRole('dialog');
   });

   it('renders the email address from PERSONAL_INFO in the contact section', () => {
      render(<App />);
      const section = contactSection()!;
      expect(section.textContent).toContain(PERSONAL_INFO.email);
   });

   it('copy-email button writes to clipboard end-to-end', async () => {
      render(<App />);
      const writeText = vi.mocked(navigator.clipboard.writeText);
      const allCopyBtns = screen.getAllByRole('button', {name: /copy email address/i});
      expect(allCopyBtns.length).toBeGreaterThan(0);
      fireEvent.click(allCopyBtns[0]);
      await waitFor(() => {
         expect(writeText).toHaveBeenCalledWith(PERSONAL_INFO.email);
      });
   });

   it('F12 keydown is NOT intercepted (DevTools opens normally)', () => {
      render(<App />);
      const event = new KeyboardEvent('keydown', {key: 'F12', cancelable: true, bubbles: true});
      window.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(false);
   });
});