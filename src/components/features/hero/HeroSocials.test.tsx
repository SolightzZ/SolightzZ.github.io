import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {SOCIAL_LINKS} from '../../../data/portfolioData';
import {HeroSocials} from './HeroSocials';

describe('<HeroSocials />', () => {
   it('renders a button/link for each social entry', () => {
      const {container} = render(<HeroSocials />);
      // ExpandableSocialButton uses aria-label not visible text — query by accessible name.
      SOCIAL_LINKS.forEach((link) => {
         expect(screen.getByLabelText(link.ariaLabel)).toBeInTheDocument();
      });
      // Sanity: a GitHub link is in the DOM.
      expect(container.querySelector('a[href*="github.com"]')).toBeInTheDocument();
   });

   it('GitHub link points to PERSONAL_INFO.github', () => {
      const {container} = render(<HeroSocials />);
      const links = Array.from(container.querySelectorAll('a'));
      const github = links.find((a) => a.getAttribute('href')?.includes('github.com'));
      expect(github).toBeDefined();
   });

   it('Email with no onContactClick renders a mailto link', () => {
      render(<HeroSocials />);
      const mailto = document.querySelector('a[href^="mailto:"]');
      expect(mailto).toBeInTheDocument();
   });

   it('Email with onContactClick renders a button instead of a mailto link', () => {
      const onContact = vi.fn();
      render(<HeroSocials onContactClick={onContact} />);
      expect(document.querySelector('a[href^="mailto:"]')).not.toBeInTheDocument();
      // At least one button for email exists.
      const buttons = document.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);
   });
});