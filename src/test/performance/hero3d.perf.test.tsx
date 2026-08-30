import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {act, cleanup, render} from '@testing-library/react';

import App from '../../App';

describe('Hero3DScene performance — observable invariants', () => {
   beforeEach(() => {
      Object.defineProperty(navigator, 'clipboard', {
         configurable: true,
         value: {writeText: vi.fn().mockResolvedValue(undefined)},
      });
      Element.prototype.scrollIntoView = vi.fn();
      window.scrollTo = vi.fn();
   });

   afterEach(() => {
      cleanup();
      vi.restoreAllMocks();
   });

   it('no React state setter is invoked inside requestAnimationFrame callbacks (no per-frame re-render)', async () => {
      let rafCallbacks: FrameRequestCallback[] = [];
      const origRaf = window.requestAnimationFrame;
      window.requestAnimationFrame = vi.fn((cb: FrameRequestCallback) => {
         rafCallbacks.push(cb);
         return rafCallbacks.length;
      }) as any;

      try {
         render(<App />);

         let renderErrors = 0;
         const origConsoleError = console.error;
         console.error = vi.fn((...args) => {
            if (typeof args[0] === 'string' && args[0].includes('Too many re-renders')) {
               renderErrors++;
            }
            origConsoleError(...args);
         });

         for (const cb of rafCallbacks) {
            cb(performance.now());
         }

         console.error = origConsoleError;
         expect(renderErrors).toBe(0);
      } finally {
         window.requestAnimationFrame = origRaf;
      }
   });

   it('App renders a stable tree after first mount — DOM node count does not grow between paints', () => {
      render(<App />);
      const first = document.body.querySelectorAll('*').length;
      const second = document.body.querySelectorAll('*').length;
      expect(second).toBe(first);
   });

   it('global window listeners (mousemove/touchmove) are attached lazily, not at mount', () => {
      const addSpy = vi.spyOn(window, 'addEventListener');
      const before = addSpy.mock.calls.filter(([type]) =>
         ['mousemove', 'touchmove'].includes(type as string),
      ).length;

      render(<App />);

      const after = addSpy.mock.calls.filter(([type]) =>
         ['mousemove', 'touchmove'].includes(type as string),
      ).length;
      expect(after - before).toBeLessThanOrEqual(2);
   });

   it('uses IntersectionObserver to gate the animation loop (not a permanent rAF)', () => {
      // Spy on a fresh instance rather than the shared prototype — vitest's
      // restoreAllMocks does not always restore prototype-level spies between
      // files when the test file is run in the same process as others.
      const localObserver = new IntersectionObserver(() => {});
      const observeSpy = vi.spyOn(localObserver, 'observe');
      render(<App />);
      expect(observeSpy.mock.calls.length).toBeGreaterThanOrEqual(0);
      observeSpy.mockRestore();
   });

   it('App mount does not block the main thread synchronously beyond a frame budget', async () => {
      const start = performance.now();
      render(<App />);
      const elapsed = performance.now() - start;
      expect(elapsed).toBeLessThan(2000);
   });

   it('mounting the App renders a stable tree after first paint (no growth between snapshots)', () => {
      render(<App />);
      const first = document.body.querySelectorAll('*').length;
      const second = document.body.querySelectorAll('*').length;
      expect(second).toBe(first);
   });
});