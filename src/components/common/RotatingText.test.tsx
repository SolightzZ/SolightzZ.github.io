import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {act, render, screen} from '@testing-library/react';
import {RotatingText} from './RotatingText';

describe('<RotatingText />', () => {
   beforeEach(() => {
      vi.useFakeTimers();
   });

   afterEach(() => {
      vi.useRealTimers();
   });

   it('renders the first word on mount', () => {
      render(<RotatingText words={['Alpha', 'Beta', 'Gamma']} />);
      expect(screen.getByText('Alpha')).toBeInTheDocument();
   });

   it('does not start a timer when there is only one word', () => {
      const setIntervalSpy = vi.spyOn(globalThis, 'setInterval');
      render(<RotatingText words={['Only']} />);
      expect(setIntervalSpy).not.toHaveBeenCalled();
      setIntervalSpy.mockRestore();
   });

   it('sets up a timer for multiple words', () => {
      const setIntervalSpy = vi.spyOn(globalThis, 'setInterval');
      render(<RotatingText words={['A', 'B']} interval={500} />);
      expect(setIntervalSpy).toHaveBeenCalled();
      setIntervalSpy.mockRestore();
   });

   it('schedules interval ticks at the configured period', () => {
      const setIntervalSpy = vi.spyOn(globalThis, 'setInterval');
      render(<RotatingText words={['A', 'B', 'C']} interval={777} />);
      expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 777);
      setIntervalSpy.mockRestore();
   });

   it('clears the interval on unmount', () => {
      const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval');
      const {unmount} = render(<RotatingText words={['A', 'B']} interval={500} />);
      unmount();
      expect(clearIntervalSpy).toHaveBeenCalled();
      clearIntervalSpy.mockRestore();
   });
});