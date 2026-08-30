import {describe, expect, it} from 'vitest';
import {render} from '@testing-library/react';
import {ScrollRevealHeading} from './ScrollRevealHeading';

describe('<ScrollRevealHeading />', () => {
   it('renders the title split into word spans', () => {
      const {container} = render(<ScrollRevealHeading title="Hello World" />);
      const h2 = container.querySelector('h2');
      expect(h2).toBeInTheDocument();
      expect(h2?.textContent).toContain('Hello');
      expect(h2?.textContent).toContain('World');
   });

   it('does not render the badge when not provided', () => {
      const {container} = render(<ScrollRevealHeading title="No Badge" />);
      expect(container.querySelector('h2')).toBeInTheDocument();
      expect(container.querySelector('div.inline-flex.items-center.gap-2')).not.toBeInTheDocument();
   });

   it('renders the description when provided', () => {
      const {container} = render(
         <ScrollRevealHeading title="T" description="A description" />,
      );
      expect(container.textContent).toContain('A description');
   });

   it('applies the default className', () => {
      const {container} = render(<ScrollRevealHeading title="T" />);
      expect(container.firstChild).toHaveClass('mb-10');
   });

   it('accepts a custom className override', () => {
      const {container} = render(<ScrollRevealHeading title="T" className="custom-x" />);
      expect(container.firstChild).toHaveClass('custom-x');
   });
});