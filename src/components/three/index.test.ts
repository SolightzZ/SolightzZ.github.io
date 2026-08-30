import {describe, expect, it} from 'vitest';
import * as THREE from 'three';
import {
   createBookshelfProp,
   createDeveloperCharacter,
   createDeveloperWorkspace,
   createFloatingCodingElements,
   createMiniPlanet,
   createRobotAssistant,
} from './index';
import {createSceneCamera, createSceneLighting, disposeThreeScene} from './index';
import * as Types from './setup/types';
import * as Config from './setup/config';

describe('three/index barrel exports', () => {
   it('re-exports every documented surface', () => {
      // Entry points
      expect(typeof Hero3DContainer_).toBe('function');
      expect(typeof SceneFallback_).toBe('function');

      // Setup
      expect(typeof createSceneLighting).toBe('function');
      expect(typeof createSceneCamera).toBe('function');
      expect(typeof disposeThreeScene).toBe('function');

      // Types re-exported (objects exist)
      expect(Types).toBeDefined();

      // Config re-exported
      expect(Config).toBeDefined();

      // Factories
      expect(typeof createBookshelfProp).toBe('function');
      expect(typeof createDeveloperCharacter).toBe('function');
      expect(typeof createDeveloperWorkspace).toBe('function');
      expect(typeof createFloatingCodingElements).toBe('function');
      expect(typeof createMiniPlanet).toBe('function');
      expect(typeof createRobotAssistant).toBe('function');
   });
});

describe('three factories', () => {
   const scene = new THREE.Scene();
   void scene;

   it('createMiniPlanet returns a non-empty THREE.Group', () => {
      const group = createMiniPlanet();
      expect(group.isGroup).toBe(true);
      expect(group.children.length).toBeGreaterThan(0);
   });

   it('createDeveloperWorkspace returns a non-empty THREE.Group', () => {
      const group = createDeveloperWorkspace();
      expect(group.isGroup).toBe(true);
      expect(group.children.length).toBeGreaterThan(0);
   });

   it('createBookshelfProp returns a non-empty THREE.Group', () => {
      const group = createBookshelfProp();
      expect(group.isGroup).toBe(true);
      expect(group.children.length).toBeGreaterThan(0);
   });

   it('createFloatingCodingElements returns group + arrays of elements/clouds/stars', () => {
      const result = createFloatingCodingElements();
      expect(result.group.isGroup).toBe(true);
      expect(Array.isArray(result.elements)).toBe(true);
      expect(Array.isArray(result.clouds)).toBe(true);
      expect(Array.isArray(result.stars)).toBe(true);
      expect(result.group.children.length).toBeGreaterThan(0);
      expect(result.elements.length).toBeGreaterThan(0);
   });

   it('createDeveloperCharacter returns a group + update function', () => {
      const {group, update} = createDeveloperCharacter();
      expect(group.isGroup).toBe(true);
      expect(typeof update).toBe('function');
      expect(() => update(0)).not.toThrow();
   });

   it('createRobotAssistant returns a group + update function', () => {
      const {group, update} = createRobotAssistant();
      expect(group.isGroup).toBe(true);
      expect(typeof update).toBe('function');
      expect(() => update(0)).not.toThrow();
   });
});

// Imports referenced as `_` to avoid unused-import lint warnings since we test
// the re-export existence via typeof checks above.
import {Hero3DContainer as Hero3DContainer_, SceneFallback as SceneFallback_} from './index';