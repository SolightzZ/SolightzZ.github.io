import {describe, expect, it} from 'vitest';
import * as Config from './config';

describe('three/setup/config exports', () => {
   it('exports the expected constants', () => {
      expect(Config.CAMERA).toBeDefined();
      expect(Config.LIGHTING).toBeDefined();
      expect(Config.PALETTE).toBeDefined();
      expect(Config.SCREEN).toBeDefined();
      expect(Config.ANIMATION).toBeDefined();
      expect(Config.ENTRANCE).toBeDefined();
      expect(Config.CHARACTER_ANIM).toBeDefined();
      expect(Config.ROBOT_ANIM).toBeDefined();
      expect(Config.ISLAND).toBeDefined();
      expect(Config.PLANTS).toBeDefined();
      expect(Config.WORLD_ROOT).toBeDefined();
      expect(Config.FALLBACK).toBeDefined();
      expect(Config.BADGES).toBeDefined();
      expect(Config.CLOUDS).toBeDefined();
      expect(Config.STARS).toBeDefined();
      expect(Config.SUSPENDED_ROCKS).toBeDefined();
      expect(Config.BOULDERS).toBeDefined();
      expect(Config.CLIFF_BADGE).toBeDefined();
      expect(Config.PLAQUE).toBeDefined();
      expect(Config.BADGE_SIZE).toBeDefined();
   });

   it('CAMERA exposes numeric FOV + aspect', () => {
      expect(typeof Config.CAMERA.fov).toBe('number');
      expect(Config.CAMERA.fov).toBeGreaterThan(0);
      expect(Config.CAMERA.fov).toBeLessThan(180);
   });

   it('BADGES is a non-empty array', () => {
      expect(Array.isArray(Config.BADGES)).toBe(true);
      expect(Config.BADGES.length).toBeGreaterThan(0);
   });

   it('FALLBACK pulse keyframes are length-3 arrays', () => {
      expect(Config.FALLBACK.pulseScale).toHaveLength(3);
      expect(Config.FALLBACK.pulseOpacity).toHaveLength(3);
      expect(Config.FALLBACK.pulseDuration).toBeGreaterThan(0);
   });

   it('ENTRANCE entries have delay + duration > 0', () => {
      const entries = Object.entries(Config.ENTRANCE).filter(
         ([, v]) => typeof v === 'object' && v && 'delay' in v && 'duration' in v,
      );
      expect(entries.length).toBeGreaterThan(0);
      entries.forEach(([key, e]) => {
         const entry = e as {delay: number; duration: number};
         expect(entry.delay, `ENTRANCE.${key}.delay`).toBeGreaterThanOrEqual(0);
         expect(entry.duration, `ENTRANCE.${key}.duration`).toBeGreaterThan(0);
      });
   });

   it('STARS + CLOUDS + BOULDERS are non-empty arrays', () => {
      expect(Config.STARS.length).toBeGreaterThan(0);
      expect(Config.CLOUDS.length).toBeGreaterThan(0);
      expect(Config.BOULDERS.length).toBeGreaterThan(0);
   });
});