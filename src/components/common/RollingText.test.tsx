import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {act, render, screen} from '@testing-library/react';
import React from 'react';
import {RollingText} from './RollingText';
import {RotatingText} from './RotatingText';

describe('<RollingText />', () => {
   it('renders each character as its own span', () => {
      const {container} = render(<RollingText text="HI" />);
      const spans = container.querySelectorAll('span span');
      expect(spans.length).toBeGreaterThanOrEqual(2);
      expect(container.textContent).toContain('HI');
   });

   it('replaces spaces with non-breaking spaces in the visible line', () => {
      const {container} = render(<RollingText text="A B" />);
      const visible = container.querySelector('span.inline-flex:not([aria-hidden])');
      expect(visible).not.toBeNull();
      // After React rendering the NBSP char gets encoded as &nbsp; in innerHTML.
      const html = visible!.innerHTML;
      expect(html.includes('&nbsp;') || html.includes('\u00A0')).toBe(true);
   });

   it('appends the provided className', () => {
      const {container} = render(<RollingText text="X" className="extra" />);
      expect(container.firstChild).toHaveClass('extra');
   });

   it('memo: keeps the same DOM node when text + className are unchanged', () => {
      const ref = React.createRef<HTMLSpanElement>();
      const {rerender} = render(<RollingText text="AB" ref={ref} />);
      const initial = ref.current;
      rerender(<RollingText text="AB" ref={ref} />);
      expect(ref.current).toBe(initial);
   });
});

describe('<RotatingText />', () => {
   beforeEach(() => {
      vi.useFakeTimers();
   });
   afterEach(() => {
      vi.useRealTimers();
   });

   it('renders the first word initially', () => {
      render(<RotatingText words={['A', 'B', 'C']} interval={1000} />);
      expect(screen.getByText('A')).toBeInTheDocument();
   });

   it('schedules exactly one setInterval per mount when there are multiple words', () => {
      const setIntervalSpy = vi.spyOn(window, 'setInterval');
      render(<RotatingText words={['A', 'B', 'C']} interval={1000} />);
      expect(setIntervalSpy).toHaveBeenCalledTimes(1);
      expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 1000);
      setIntervalSpy.mockRestore();
   });

   it('clears the interval on unmount', () => {
      const clearSpy = vi.spyOn(window, 'clearInterval');
      const {unmount} = render(<RotatingText words={['A', 'B', 'C']} interval={1000} />);
      const before = clearSpy.mock.calls.length;
      unmount();
      expect(clearSpy.mock.calls.length).toBeGreaterThan(before);
      clearSpy.mockRestore();
   });

   it('does NOT set an interval when there is only one word', () => {
      const setIntervalSpy = vi.spyOn(window, 'setInterval');
      render(<RotatingText words={['only']} />);
      expect(setIntervalSpy).not.toHaveBeenCalled();
      setIntervalSpy.mockRestore();
   });

   it('appends the provided className', () => {
      const {container} = render(<RotatingText words={['X']} className="rot" />);
      expect(container.firstChild).toHaveClass('rot');
   });
});