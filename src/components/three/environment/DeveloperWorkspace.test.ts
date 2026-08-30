import {describe, expect, it} from 'vitest';
import * as THREE from 'three';
import {createDeveloperWorkspace} from './DeveloperWorkspace';

describe('createDeveloperWorkspace', () => {
   it('returns a Group named DeveloperWorkspace', () => {
      const group = createDeveloperWorkspace();
      expect(group).toBeInstanceOf(THREE.Group);
      expect(group.name).toBe('DeveloperWorkspace');
   });

   it('places the workspace at the configured position', () => {
      const group = createDeveloperWorkspace();
      expect(group.position.x).toBeCloseTo(-0.05, 5);
      expect(group.position.y).toBeCloseTo(0.68, 5);
   });

   it('includes the desk, monitor, laptop, lamp, accessories and floor props', () => {
      const group = createDeveloperWorkspace();
      let meshes = 0;
      let lights = 0;
      group.traverse((child) => {
         if (child instanceof THREE.Mesh) meshes++;
         if (child instanceof THREE.Light) lights++;
      });
      // Desk (top+4 legs+4 shadows), monitor (bezel+screen+lights), laptop (base+lid+screen),
      // lamp (base+2 arms+head+light+target), accessories (mug+keyboard+mouse),
      // floor (pot+6 leaves+cube+5 symbols+light)
      expect(meshes).toBeGreaterThan(20);
      // Monitor screen glow, lamp spotlight, cube point light
      expect(lights).toBeGreaterThanOrEqual(2);
   });

   it('rotates the workspace slightly toward the viewer', () => {
      const group = createDeveloperWorkspace();
      expect(group.rotation.y).toBeCloseTo(-0.45, 5);
   });
});