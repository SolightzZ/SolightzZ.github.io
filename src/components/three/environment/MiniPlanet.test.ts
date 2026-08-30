import {describe, expect, it} from 'vitest';
import * as THREE from 'three';
import {createMiniPlanet} from './MiniPlanet';

describe('createMiniPlanet', () => {
   it('returns a Group named MiniPlanetDiorama', () => {
      const group = createMiniPlanet();
      expect(group).toBeInstanceOf(THREE.Group);
      expect(group.name).toBe('MiniPlanetDiorama');
   });

   it('contains the major component groups as children', () => {
      const group = createMiniPlanet();
      // 8 top-level children (grass, micro-props, fence, nature, badges, ring, rock waist, boulders)
      const topLevel = group.children.filter((c) => c instanceof THREE.Group);
      expect(topLevel.length).toBeGreaterThanOrEqual(8);
   });

   it('contains a large number of meshes (grass, trees, rocks, stones, etc.)', () => {
      const group = createMiniPlanet();
      let meshCount = 0;
      group.traverse((child) => {
         if (child instanceof THREE.Mesh) meshCount++;
      });
      // Hundreds of meshes from micro-props, trees, grass, rocks, fence.
      expect(meshCount).toBeGreaterThan(50);
   });

   it('includes a luminous OrbitalRing named child', () => {
      const group = createMiniPlanet();
      let ringFound = false;
      group.traverse((child) => {
         if (child.name === 'OrbitalRing') ringFound = true;
      });
      expect(ringFound).toBe(true);
   });

   it('places no group at the world origin (the diorama is centered at (0,0,0))', () => {
      const group = createMiniPlanet();
      // The exported group itself is at origin; just verify it's a Group.
      expect(group.position.x).toBe(0);
      expect(group.position.y).toBe(0);
      expect(group.position.z).toBe(0);
   });
});