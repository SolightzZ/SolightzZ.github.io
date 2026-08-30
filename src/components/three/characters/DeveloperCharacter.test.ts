import {describe, expect, it} from 'vitest';
import * as THREE from 'three';
import {createDeveloperCharacter} from './DeveloperCharacter';

describe('createDeveloperCharacter', () => {
   it('returns an Animated3DObject with a named Group and update fn', () => {
      const obj = createDeveloperCharacter();
      expect(obj.group).toBeInstanceOf(THREE.Group);
      expect(obj.group.name).toBe('DeveloperCharacter');
      expect(typeof obj.update).toBe('function');
   });

   it('update accepts an elapsedTime number without throwing', () => {
      const obj = createDeveloperCharacter();
      expect(() => obj.update(0)).not.toThrow();
      expect(() => obj.update(1.5)).not.toThrow();
      expect(() => obj.update(99.99)).not.toThrow();
   });

   it('places the character at the configured world position', () => {
      const obj = createDeveloperCharacter();
      expect(obj.group.position.x).toBeCloseTo(-0.35, 5);
      expect(obj.group.position.y).toBeCloseTo(0.68, 5);
   });

   it('scales the character uniformly to ~1.02', () => {
      const obj = createDeveloperCharacter();
      expect(obj.group.scale.x).toBeCloseTo(1.02, 5);
      expect(obj.group.scale.y).toBeCloseTo(1.02, 5);
      expect(obj.group.scale.z).toBeCloseTo(1.02, 5);
   });

   it('contains many child meshes for the chair, character, and accessories', () => {
      const obj = createDeveloperCharacter();
      let meshCount = 0;
      obj.group.traverse((child) => {
         if (child instanceof THREE.Mesh) meshCount++;
      });
      expect(meshCount).toBeGreaterThan(15);
   });
});