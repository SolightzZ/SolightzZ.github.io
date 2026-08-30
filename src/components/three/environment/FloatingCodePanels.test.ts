import {describe, expect, it} from 'vitest';
import * as THREE from 'three';
import {createFloatingCodingElements, createTechBadge, TECH_BADGE_CONFIGS} from './FloatingCodePanels';

describe('createFloatingCodingElements', () => {
   it('returns a group with elements, clouds, and stars', () => {
      const result = createFloatingCodingElements();
      expect(result.group).toBeInstanceOf(THREE.Group);
      expect(result.group.name).toBe('FloatingCodingElements');
      expect(Array.isArray(result.elements)).toBe(true);
      expect(Array.isArray(result.clouds)).toBe(true);
      expect(Array.isArray(result.stars)).toBe(true);
   });

   it('exposes one floating element per TECH_BADGE_CONFIGS entry', () => {
      const result = createFloatingCodingElements();
      expect(result.elements.length).toBe(TECH_BADGE_CONFIGS.length);
   });

   it('each floating element has mesh, initialY, speed, rotSpeed', () => {
      const result = createFloatingCodingElements();
      result.elements.forEach((el) => {
         expect(el.mesh).toBeInstanceOf(THREE.Group);
         expect(typeof el.initialY).toBe('number');
         expect(typeof el.speed).toBe('number');
         expect(typeof el.rotSpeed.x).toBe('number');
         expect(typeof el.rotSpeed.y).toBe('number');
         expect(typeof el.rotSpeed.z).toBe('number');
      });
   });

   it('renders six clouds and six stars', () => {
      const result = createFloatingCodingElements();
      expect(result.clouds.length).toBe(6);
      expect(result.stars.length).toBe(6);
   });

   it('initialY on each floating element matches the configured y position', () => {
      const result = createFloatingCodingElements();
      TECH_BADGE_CONFIGS.forEach((config, idx) => {
         expect(result.elements[idx].initialY).toBeCloseTo(config.position[1], 5);
      });
   });
});

describe('createTechBadge', () => {
   const baseConfig = TECH_BADGE_CONFIGS[0];

   it('returns a Group', () => {
      const badge = createTechBadge(baseConfig);
      expect(badge).toBeInstanceOf(THREE.Group);
   });

   it('contains body, front decal, and back decal meshes', () => {
      const badge = createTechBadge(baseConfig);
      let meshCount = 0;
      badge.traverse((child) => {
         if (child instanceof THREE.Mesh) meshCount++;
      });
      // 1 body + 1 front decal + 1 back decal = 3
      expect(meshCount).toBeGreaterThanOrEqual(3);
   });

   it('respects custom width, height, and depth overrides', () => {
      const badge = createTechBadge({...baseConfig, width: 0.5, height: 0.4, depth: 0.1});
      // Body box should have width=0.5, height=0.4, depth=0.1
      const body = badge.children.find((c) => c instanceof THREE.Mesh && c.geometry instanceof THREE.BoxGeometry) as THREE.Mesh | undefined;
      expect(body).toBeDefined();
      const params = (body!.geometry as THREE.BoxGeometry).parameters!;
      expect(params.width).toBeCloseTo(0.5, 5);
      expect(params.height).toBeCloseTo(0.4, 5);
      expect(params.depth).toBeCloseTo(0.1, 5);
   });
});

describe('TECH_BADGE_CONFIGS', () => {
   it('contains JS, { }, and TS badges', () => {
      const labels = TECH_BADGE_CONFIGS.map((c) => c.label);
      expect(labels).toContain('JS');
      expect(labels).toContain('{ }');
      expect(labels).toContain('TS');
   });

   it('every config has the required fields', () => {
      TECH_BADGE_CONFIGS.forEach((c) => {
         expect(typeof c.type).toBe('string');
         expect(typeof c.label).toBe('string');
         expect(c.position).toHaveLength(3);
         expect(c.rotation).toHaveLength(3);
         expect(typeof c.bgColor).toBe('string');
         expect(typeof c.textColor).toBe('string');
         expect(typeof c.borderColor).toBe('string');
         expect(typeof c.glowColor).toBe('number');
      });
   });
});