import {beforeEach, describe, expect, it} from 'vitest';
import * as THREE from 'three';
import {createSceneLighting} from './SceneLighting';

describe('createSceneLighting', () => {
   beforeEach(() => {
      // No-op; placeholder for future per-test reset.
   });

   it('returns a THREE.Group named SceneLighting', () => {
      const group = createSceneLighting();
      expect(group.type).toBe('Group');
      expect(group.name).toBe('SceneLighting');
   });

   it('contains exactly 6 lights (hemi + ambient + 4 directionals)', () => {
      const group = createSceneLighting();
      expect(group.children.length).toBe(6);
   });

   it('the key directional light has shadow enabled', () => {
      const group = createSceneLighting();
      const dirLights = group.children.filter(
         (c): c is THREE.DirectionalLight => c instanceof THREE.DirectionalLight,
      );
      const keyLight = dirLights[0];
      expect(keyLight).toBeDefined();
      expect(keyLight.castShadow).toBe(true);
      expect(keyLight.shadow.mapSize.width).toBe(2048);
      expect(keyLight.shadow.mapSize.height).toBe(2048);
   });
});