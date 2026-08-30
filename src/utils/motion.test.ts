import {describe, expect, it, vi} from 'vitest';
import {EASE_SMOOTH, prefersReducedMotion} from './motion';

describe('motion utils', () => {
   describe('prefersReducedMotion', () => {
      it('returns true when the matchMedia query matches', () => {
         vi.stubGlobal(
            'window',
            Object.assign(window, {
               matchMedia: vi.fn().mockReturnValue({matches: true}),
            }),
         );
         expect(prefersReducedMotion()).toBe(true);
         vi.unstubAllGlobals();
      });

      it('returns false when the matchMedia query does not match', () => {
         vi.stubGlobal(
            'window',
            Object.assign(window, {
               matchMedia: vi.fn().mockReturnValue({matches: false}),
            }),
         );
         expect(prefersReducedMotion()).toBe(false);
         vi.unstubAllGlobals();
      });
   });

   describe('EASE_SMOOTH', () => {
      it('is a 4-tuple cubic-bezier', () => {
         expect(EASE_SMOOTH).toHaveLength(4);
         expect(EASE_SMOOTH.every((n) => typeof n === 'number')).toBe(true);
      });

      it('has all values within [0, 1] for x and y of an ease curve', () => {
         // First two are X (start/end), last two are Y (start/end) — all valid for cubic-bezier.
         EASE_SMOOTH.forEach((v) => {
            expect(v).toBeGreaterThanOrEqual(0);
            expect(v).toBeLessThanOrEqual(1);
         });
      });
   });
});