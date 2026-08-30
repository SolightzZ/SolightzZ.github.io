import {describe, expect, it} from 'vitest';
import * as THREE from 'three';
import {createBookshelfProp} from './BookshelfProp';

describe('createBookshelfProp', () => {
   it('returns a Group named BookshelfCabinet', () => {
      const group = createBookshelfProp();
      expect(group).toBeInstanceOf(THREE.Group);
      expect(group.name).toBe('BookshelfCabinet');
   });

   it('places the bookshelf at the configured position', () => {
      const group = createBookshelfProp();
      expect(group.position.x).toBeCloseTo(1.0, 5);
      expect(group.position.y).toBeCloseTo(0.68, 5);
   });

   it('contains a contact shadow, cabinet frame, books, and star', () => {
      const group = createBookshelfProp();
      let meshes = 0;
      let pointLights = 0;
      group.traverse((child) => {
         if (child instanceof THREE.Mesh) meshes++;
         if (child instanceof THREE.PointLight) pointLights++;
      });
      // Books + frame + star + shadows = many meshes
      expect(meshes).toBeGreaterThan(15);
      // Star contributes a point light
      expect(pointLights).toBeGreaterThanOrEqual(1);
   });

   it('contains books in three compartments (top-left, bottom-left, bottom-right)', () => {
      const group = createBookshelfProp();
      // Count meshes that match book-sized geometry — heuristic via small BoxGeometry count.
      // We confirm there are at least 14 book meshes (4+5+5).
      let smallBoxes = 0;
      group.traverse((child) => {
         if (child instanceof THREE.Mesh && child.geometry instanceof THREE.BoxGeometry) {
            const params = child.geometry.parameters;
            // Books have width around 0.035-0.045 and height 0.23-0.27
            if (params && params.width < 0.05 && params.height > 0.2 && params.height < 0.3) {
               smallBoxes++;
            }
         }
      });
      expect(smallBoxes).toBeGreaterThanOrEqual(14);
   });
});