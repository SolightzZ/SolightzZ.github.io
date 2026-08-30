import {describe, expect, it} from 'vitest';
import * as THREE from 'three';
import {createRobotAssistant} from './RobotAssistant';

describe('createRobotAssistant', () => {
   it('returns an Animated3DObject with a named Group and update fn', () => {
      const obj = createRobotAssistant();
      expect(obj.group).toBeInstanceOf(THREE.Group);
      expect(obj.group.name).toBe('RobotCompanion');
      expect(typeof obj.update).toBe('function');
   });

   it('update runs without throwing for any elapsedTime', () => {
      const obj = createRobotAssistant();
      expect(() => obj.update(0)).not.toThrow();
      expect(() => obj.update(2)).not.toThrow();
      expect(() => obj.update(120)).not.toThrow();
   });

   it('scales the robot uniformly to ~0.92', () => {
      const obj = createRobotAssistant();
      expect(obj.group.scale.x).toBeCloseTo(0.92, 5);
      expect(obj.group.scale.y).toBeCloseTo(0.92, 5);
      expect(obj.group.scale.z).toBeCloseTo(0.92, 5);
   });

   it('places the robot on the front-right of the island', () => {
      const obj = createRobotAssistant();
      expect(obj.group.position.x).toBeCloseTo(0.8, 5);
      expect(obj.group.position.y).toBeCloseTo(0.68, 5);
   });

   it('contains a torso, head, and legs group as children', () => {
      const obj = createRobotAssistant();
      // Confirm there are at least 4 top-level child groups (bench, torso, head, tablet, arms, legs).
      const topLevel = obj.group.children.filter((c) => c instanceof THREE.Group);
      expect(topLevel.length).toBeGreaterThanOrEqual(4);
   });
});