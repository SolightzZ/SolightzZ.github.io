import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {act, renderHook} from '@testing-library/react';
import {useScrambleText} from './useScrambleText';

describe('useScrambleText', () => {
   beforeEach(() => {
      vi.useFakeTimers();
   });
   afterEach(() => {
      vi.useRealTimers();
   });

   it('starts with the target text already rendered (delay -1 = manual)', () => {
      const {result} = renderHook(() =>
         useScrambleText('Hello', {delay: -1, speed: 10}),
      );
      expect(result.current.displayText).toBe('Hello');
      expect(result.current.isScrambling).toBe(false);
   });

   it('triggers scramble on mount when delay is 0', () => {
      const {result} = renderHook(() =>
         useScrambleText('Hi', {delay: 0, speed: 10}),
      );
      expect(result.current.isScrambling).toBe(true);
   });

   it('triggerScramble replaces displayText with random glyphs then resolves to target', () => {
      const target = 'AB';
      const glyphs = '#';
      const {result} = renderHook(() =>
         useScrambleText(target, {delay: -1, speed: 10, stepIncrement: 1, glyphs}),
      );

      act(() => {
         result.current.triggerScramble();
      });
      expect(result.current.isScrambling).toBe(true);

      // Run enough intervals to exceed the target length
      act(() => {
         vi.advanceTimersByTime(50);
      });
      expect(result.current.displayText).toBe(target);
      expect(result.current.isScrambling).toBe(false);
   });

   it('stopScramble resets to the target text and stops the interval', () => {
      const {result} = renderHook(() =>
         useScrambleText('XYZ', {delay: -1, speed: 10}),
      );

      act(() => {
         result.current.triggerScramble();
      });
      expect(result.current.isScrambling).toBe(true);

      act(() => {
         result.current.stopScramble();
      });
      expect(result.current.displayText).toBe('XYZ');
      expect(result.current.isScrambling).toBe(false);
   });

   it('preserves spaces during the scramble (no random glyph for " ")', () => {
      const {result} = renderHook(() =>
         useScrambleText('A B', {delay: -1, speed: 10, stepIncrement: 0.5, glyphs: 'X'}),
      );

      act(() => {
         result.current.triggerScramble();
      });

      // The split includes ' ' characters that should remain ' '
      const chars = result.current.displayText.split('');
      expect(chars).toHaveLength(3);
      expect(chars[1]).toBe(' ');
   });

   it('clears the running interval on unmount (no leaked timers)', () => {
      const clearSpy = vi.spyOn(window, 'clearInterval');
      const {result, unmount} = renderHook(() =>
         useScrambleText('HI', {delay: -1, speed: 10}),
      );

      act(() => {
         result.current.triggerScramble();
      });
      const before = clearSpy.mock.calls.length;
      unmount();
      expect(clearSpy.mock.calls.length).toBeGreaterThan(before);
      clearSpy.mockRestore();
   });
});