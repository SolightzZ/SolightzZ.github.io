import {describe, expect, it, vi} from 'vitest';
import {render} from '@testing-library/react';
import {ExpandableSocialButton} from './ExpandableSocialButton';

describe('<ExpandableSocialButton />', () => {
   it('renders a link by default (no onClick)', () => {
      const {container} = render(
         <ExpandableSocialButton
            label="GitHub"
            expandedText="@me"
            href="https://github.com/me"
            ariaLabel="GitHub"
         />,
      );
      const link = container.querySelector('a');
      expect(link).toHaveAttribute('href', 'https://github.com/me');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('target', '_blank');
   });

   it('renders a button when onClick is provided', () => {
      const onClick = vi.fn();
      const {container} = render(
         <ExpandableSocialButton
            label="Email"
            expandedText="Direct"
            iconName="Mail"
            onClick={onClick}
            ariaLabel="Email"
         />,
      );
      expect(container.querySelector('button')).toBeInTheDocument();
      expect(container.querySelector('a')).not.toBeInTheDocument();
   });

   it('falls back to Github icon when iconName is unrecognized', () => {
      const {container} = render(
         <ExpandableSocialButton label="X" expandedText="Y" href="#" iconName="Unknown" />,
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
   });

   it('shows the arrow when showArrow is true (default)', () => {
      const {container} = render(
         <ExpandableSocialButton label="G" expandedText="GH" href="#" showArrow />,
      );
      expect(container.querySelectorAll('svg').length).toBeGreaterThanOrEqual(2);
   });

   it('hides the arrow when showArrow is false', () => {
      const {container} = render(
         <ExpandableSocialButton label="G" expandedText="GH" href="#" showArrow={false} />,
      );
      // Only the icon svg, no arrow svg
      expect(container.querySelectorAll('svg').length).toBe(1);
   });

   it('memo: keeps the same DOM node when props are unchanged', () => {
      const {rerender, container} = render(
         <ExpandableSocialButton label="G" expandedText="GH" href="https://example.com" />,
      );
      const initial = container.firstChild;
      rerender(<ExpandableSocialButton label="G" expandedText="GH" href="https://example.com" />);
      expect(container.firstChild).toBe(initial);
   });
});