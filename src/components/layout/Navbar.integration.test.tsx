import {fireEvent, render, screen, within} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import {Navbar} from './Navbar';

const renderNavbar = (activeSection = '') => {
   const onNavClick = vi.fn();
   const onContactClick = vi.fn();
   const utils = render(
      <Navbar
         activeSection={activeSection}
         onNavClick={onNavClick}
         onContactClick={onContactClick}
      />,
   );
   return {onNavClick, onContactClick, ...utils};
};

const nav = (label: string) => screen.getByRole('button', {name: new RegExp(`^${label}$`)});

describe('<Navbar /> — integration', () => {
   it('renders the logo and five navigation labels', () => {
      renderNavbar();
      expect(screen.getByRole('link', {name: /go to home/i})).toBeInTheDocument();
      ['PROJECT', 'EXPERIENCE', 'STACK', 'ABOUT', 'CONTACT'].forEach((label) => {
         expect(nav(label)).toBeInTheDocument();
      });
   });

   it('marks the active nav button with the brand color', () => {
      renderNavbar('stack');
      const activeBtn = nav('STACK');
      expect(activeBtn.className).toMatch(/text-\[#0284C7\]/);
   });

   it('calls onNavClick with the right id when a nav button is pressed', () => {
      const {onNavClick} = renderNavbar();
      fireEvent.click(nav('EXPERIENCE'));
      expect(onNavClick).toHaveBeenCalledWith('experience');
   });

   it('routes the CONTACT button to onContactClick, not onNavClick', () => {
      const {onContactClick, onNavClick} = renderNavbar();
      fireEvent.click(nav('CONTACT'));
      expect(onContactClick).toHaveBeenCalledTimes(1);
      expect(onNavClick).not.toHaveBeenCalled();
   });

   it('opens the mobile drawer when the menu button is clicked', () => {
      renderNavbar();
      fireEvent.click(screen.getByRole('button', {name: /toggle navigation menu/i}));
      expect(screen.getByText('GitHub Profile')).toBeInTheDocument();
   });

   it('clicking the logo triggers scrollToTop', () => {
      const spy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
      const {onNavClick} = renderNavbar();
      fireEvent.click(screen.getByRole('link', {name: /go to home/i}));
      expect(spy).toHaveBeenCalled();
      expect(onNavClick).not.toHaveBeenCalled();
   });

   it('renders the GitHub icon button linking to PERSONAL_INFO.github', () => {
      renderNavbar();
      const link = screen.getByLabelText('GitHub');
      expect(link).toHaveAttribute('href', expect.stringContaining('github.com'));
   });
});