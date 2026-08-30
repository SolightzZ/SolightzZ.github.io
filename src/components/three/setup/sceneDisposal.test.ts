import {describe, expect, it, vi} from 'vitest';
import {disposeThreeScene} from './sceneDisposal';

describe('disposeThreeScene', () => {
   it('disposes every geometry and material in the scene tree', () => {
      const geometryDispose = vi.fn();
      const materialDispose = vi.fn();

      const scene = {
         traverse: vi.fn((cb: (obj: unknown) => void) => {
            cb({
               isMesh: true,
               geometry: {dispose: geometryDispose},
               material: {dispose: materialDispose},
            });
            cb({
               isMesh: true,
               geometry: {dispose: geometryDispose},
               material: [{dispose: materialDispose}, {dispose: materialDispose}],
            });
            cb({isMesh: false, geometry: null, material: null});
         }),
      } as unknown as never;

      const domEl = document.createElement('canvas');
      const renderer = {
         dispose: vi.fn(),
         domElement: domEl,
      } as unknown as never;

      disposeThreeScene(scene as never, renderer);

      expect(geometryDispose).toHaveBeenCalledTimes(2);
      expect(materialDispose).toHaveBeenCalledTimes(3);
   });

   it('skips objects that are not meshes', () => {
      const traverse = vi.fn();
      const scene = {traverse} as unknown as never;
      const renderer = {dispose: vi.fn(), domElement: null} as unknown as never;
      disposeThreeScene(scene, renderer);
      expect(traverse).toHaveBeenCalled();
   });

   it('removes the renderer DOM element when it has a parent', () => {
      const parent = document.createElement('div');
      const domEl = document.createElement('canvas');
      parent.appendChild(domEl);

      const scene = {traverse: vi.fn()} as unknown as never;
      const renderer = {dispose: vi.fn(), domElement: domEl} as unknown as never;

      disposeThreeScene(scene, renderer);

      expect(parent.contains(domEl)).toBe(false);
   });

   it('does not throw when the renderer DOM element has no parent', () => {
      const domEl = document.createElement('canvas');
      const scene = {traverse: vi.fn()} as unknown as never;
      const renderer = {dispose: vi.fn(), domElement: domEl} as unknown as never;
      expect(() => disposeThreeScene(scene, renderer)).not.toThrow();
   });

   it('does not throw when the renderer has no DOM element', () => {
      const scene = {traverse: vi.fn()} as unknown as never;
      const renderer = {dispose: vi.fn(), domElement: null} as unknown as never;
      expect(() => disposeThreeScene(scene, renderer)).not.toThrow();
   });
});