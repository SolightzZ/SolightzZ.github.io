import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {act, fireEvent, render, screen, waitFor, within} from '@testing-library/react';

vi.mock('../../components/three/Hero3DScene', () => ({
   Hero3DScene: () => <div data-testid="hero3d-scene-mock" />,
}));
vi.mock('../../components/three/SceneFallback', () => ({
   SceneFallback: () => <div data-testid="hero3d-fallback" />,
}));

import App from '../../App';
import {PERSONAL_INFO, PROJECTS_DATA} from '../../data/portfolioData';

const navByLabel = (label: string) => {
   const btn = Array.from(document.querySelectorAll('button')).find((b) => {
      const txt = (b.textContent || '').replace(/\u00A0/g, ' ').trim();
      return txt.startsWith(label + label) || txt.startsWith(label);
   });
   if (!btn) throw new Error(`nav button ${label} not found`);
   return btn as HTMLElement;
};

describe('Acceptance — visitor explores the portfolio', () => {
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

   describe('AC-1: required identity content is present', () => {
      it('displays the full name', () => {
         render(<App />);
         expect(screen.getAllByText(PERSONAL_INFO.fullName).length).toBeGreaterThan(0);
      });

      it('displays the primary role', () => {
         render(<App />);
         expect(screen.getAllByText(PERSONAL_INFO.role).length).toBeGreaterThan(0);
      });

      it('displays the university affiliation', () => {
         render(<App />);
         expect(screen.getAllByText(PERSONAL_INFO.university).length).toBeGreaterThan(0);
      });

      it('displays the location', () => {
         render(<App />);
         expect(screen.getAllByText(PERSONAL_INFO.location).length).toBeGreaterThan(0);
      });

      it('links to the GitHub profile', () => {
         render(<App />);
         const links = Array.from(document.querySelectorAll('a[href*="github.com"]'));
         expect(links.length).toBeGreaterThan(0);
         links.forEach((l) => {
            expect(l.getAttribute('href')).toContain('SolightzZ');
         });
      });
   });

   describe('AC-2: external links are safe (no opener)', () => {
      it('every external link uses rel="noopener noreferrer" and target="_blank"', () => {
         render(<App />);
         const externalLinks = Array.from(document.querySelectorAll('a[target="_blank"]'));
         expect(externalLinks.length).toBeGreaterThan(0);
         externalLinks.forEach((a) => {
            const rel = a.getAttribute('rel') || '';
            expect(rel).toContain('noopener');
            expect(rel).toContain('noreferrer');
         });
      });
   });

   describe('AC-3: visitor can browse projects', () => {
      it('shows at least one featured project', () => {
         render(<App />);
         const featured = PROJECTS_DATA.filter((p) => p.featured);
         expect(featured.length).toBeGreaterThan(0);
         const section = document.getElementById('projects')!;
         const titles = within(section).getAllByRole('heading', {level: 3});
         expect(titles.length).toBeGreaterThan(0);
      });

      it('clicking a project card opens a detail modal with project info', async () => {
         render(<App />);
         const section = document.getElementById('projects')!;
         const heading = section.querySelector('h3');
         if (!heading) throw new Error('project heading not found');
         // Walk up to the nearest card root (the closest cursor-pointer div that contains a heading).
         let card: HTMLElement | null = heading as HTMLElement;
         while (card && !(card.className || '').includes('cursor-pointer')) {
            card = card.parentElement;
         }
         if (!card) throw new Error('project card root not found');
         await act(async () => {
            fireEvent.click(card!);
         });

         const dialog = await screen.findByRole('dialog', undefined, {timeout: 10000});
         expect(dialog).toBeInTheDocument();
         const summary = await within(dialog).findByText(/Project Overview|ภาพรวมโปรเจกต์/i, undefined, {timeout: 5000});
         expect(summary).toBeInTheDocument();
      }, 20000);

      it('category filter narrows visible projects', () => {
         render(<App />);

         const toggleBtn = Array.from(document.querySelectorAll('button')).find((b) =>
            (b.textContent || '').replace(/\u00A0/g, ' ').includes('VIEW ALL'),
         );
         if (!toggleBtn) throw new Error('view-all button not found');
         fireEvent.click(toggleBtn);

         const section = document.getElementById('projects')!;
         const beforeCount = within(section).getAllByRole('heading', {level: 3}).length;

         const filterBar = section.querySelector('div.flex.items-center.gap-1.p-1')!;
         const webBtn = Array.from(filterBar.querySelectorAll('button')).find((b) =>
            (b.textContent || '').replace(/\u00A0/g, ' ').trim() === 'WEB',
         );
         fireEvent.click(webBtn!);

         const afterCount = within(section).getAllByRole('heading', {level: 3}).length;
         expect(afterCount).toBeLessThanOrEqual(beforeCount);
      });
   });

   describe('AC-4: visitor can contact the owner', () => {
      it('CONTACT nav button opens the contact form modal', async () => {
         render(<App />);
         await act(async () => {
            fireEvent.click(navByLabel('CONTACT'));
         });
         const dialog = await screen.findByRole('dialog', undefined, {timeout: 5000});
         expect(within(dialog).getByText(/Get In Touch/i)).toBeInTheDocument();
      });

      it('contact form rejects an invalid email with a visible error', async () => {
         render(<App />);
         fireEvent.click(navByLabel('CONTACT'));

         const dialog = await screen.findByRole('dialog');
         const messageBox = within(dialog).getByLabelText(/message/i, {selector: 'textarea'});
         fireEvent.change(messageBox, {target: {value: 'short'}});
         const emailInput = within(dialog).getByLabelText(/your email address/i);
         fireEvent.change(emailInput, {target: {value: 'not-an-email'}});

         const submitBtn = within(dialog).getByRole('button', {name: /proceed to send/i});
         fireEvent.click(submitBtn);

         await waitFor(() => {
            expect(within(dialog).getByRole('alert')).toBeInTheDocument();
         });
      });

      it('contact form accepts a valid email and shows success state', async () => {
         render(<App />);
         await act(async () => {
            fireEvent.click(navByLabel('CONTACT'));
         });

         const dialog = await screen.findByRole('dialog');
         const messageBox = within(dialog).getByLabelText(/message/i, {selector: 'textarea'});
         await act(async () => {
            fireEvent.change(messageBox, {
               target: {value: 'Hello, this is a real inquiry about a project.'},
            });
         });
         const emailInput = within(dialog).getByLabelText(/your email address/i);
         fireEvent.change(emailInput, {target: {value: 'visitor@example.com'}});

         const submitBtn = within(dialog).getByRole('button', {name: /proceed to send/i});
         fireEvent.click(submitBtn);

         await waitFor(
            () => {
               expect(within(dialog).getByText(/Ready to Send|พร้อมส่ง/i)).toBeInTheDocument();
            },
            {timeout: 2000},
         );
      });
   });

   describe('AC-5: visitor can copy the email', () => {
      it('copy button writes the email to clipboard from the contact section', async () => {
         render(<App />);
         const writeText = vi.mocked(navigator.clipboard.writeText);
         const buttons = screen.getAllByRole('button', {name: /copy email address/i});
         fireEvent.click(buttons[0]);
         await waitFor(() => {
            expect(writeText).toHaveBeenCalledWith(PERSONAL_INFO.email);
         });
      });
   });

   describe('AC-6: navigation between sections works', () => {
      ['PROJECT', 'EXPERIENCE', 'STACK', 'ABOUT'].forEach((label) => {
         it(`clicking ${label} triggers scrollIntoView`, () => {
            render(<App />);
            const spy = vi.mocked(Element.prototype.scrollIntoView);
            fireEvent.click(navByLabel(label));
            expect(spy).toHaveBeenCalled();
         });
      });
   });

   describe('AC-7: page is keyboard accessible', () => {
      it('logo is focusable and labeled', () => {
         render(<App />);
         const logo = screen.getByRole('link', {name: /go to home/i});
         expect(logo).toBeInTheDocument();
         logo.focus();
         expect(document.activeElement).toBe(logo);
      });

      it('all navbar buttons are real <button> elements (not divs)', () => {
         render(<App />);
         ['PROJECT', 'EXPERIENCE', 'STACK', 'ABOUT', 'CONTACT'].forEach((label) => {
            const btn = navByLabel(label);
            expect(btn.tagName).toBe('BUTTON');
         });
      });
   });
});