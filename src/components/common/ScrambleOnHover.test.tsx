import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {act, fireEvent, render, screen} from '@testing-library/react';
import {ScrambleOnHover} from './ScrambleOnHover';

describe('<ScrambleOnHover />', () => {
   beforeEach(() => {
      vi.useFakeTimers();
   });
   afterEach(() => {
      vi.useRealTimers();
   });

   it('renders the text in a span by default', () => {
      const {container} = render(<ScrambleOnHover text="HELLO" />);
      const span = container.querySelector('span');
      expect(span).toBeInTheDocument();
      expect(span!.textContent).toBe('HELLO');
   });

   it('supports rendering as h3 / h4 / div', () => {
      const {container: c1} = render(<ScrambleOnHover text="A" as="h3" />);
      expect(c1.querySelector('h3')).toBeInTheDocument();

      const {container: c2} = render(<ScrambleOnHover text="A" as="h4" />);
      expect(c2.querySelector('h4')).toBeInTheDocument();

      const {container: c3} = render(<ScrambleOnHover text="A" as="div" />);
      expect(c3.querySelector('div')).toBeInTheDocument();
   });

   it('applies a custom className to the rendered element', () => {
      const {container} = render(<ScrambleOnHover text="A" className="custom-x" />);
      const el = container.querySelector('.custom-x');
      expect(el).toBeInTheDocument();
   });

   it('triggers scramble on mouseEnter and stops on mouseLeave without crashing', () => {
      render(<ScrambleOnHover text="HELLO" />);
      const el = screen.getByText('HELLO');

      fireEvent.mouseEnter(el);
      act(() => {
         vi.advanceTimersByTime(50);
      });

      fireEvent.mouseLeave(el);
      act(() => {
         vi.advanceTimersByTime(50);
      });

      // After sufficient ticks, the display resolves back to the target text.
      expect(screen.getByText('HELLO')).toBeInTheDocument();
   });
});