import {beforeEach, describe, expect, it, vi} from 'vitest';
import {create2DCanvas} from './canvas';

describe('create2DCanvas', () => {
   let originalGetContext: typeof HTMLCanvasElement.prototype.getContext;

   beforeEach(() => {
      originalGetContext = HTMLCanvasElement.prototype.getContext;
   });

   it('returns a canvas with the requested width and height when getContext is supported', () => {
      const fakeCtx = {fake: true} as unknown as CanvasRenderingContext2D;
      HTMLCanvasElement.prototype.getContext = vi.fn(() => fakeCtx) as any;

      const result = create2DCanvas(100, 50);
      expect(result).not.toBeNull();
      expect(result!.canvas.width).toBe(100);
      expect(result!.canvas.height).toBe(50);
      expect(result!.ctx).toBe(fakeCtx);

      HTMLCanvasElement.prototype.getContext = originalGetContext;
   });

   it('returns null when getContext returns null (no 2D context available)', () => {
      HTMLCanvasElement.prototype.getContext = vi.fn(() => null) as any;

      const result = create2DCanvas(10, 10);
      expect(result).toBeNull();

      HTMLCanvasElement.prototype.getContext = originalGetContext;
   });
});