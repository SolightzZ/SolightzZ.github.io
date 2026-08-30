import {describe, expect, it} from 'vitest';
import fs from 'fs';
import path from 'path';

const scenePath = path.resolve(__dirname, '../../components/three/Hero3DScene.tsx');
const source = fs.readFileSync(scenePath, 'utf8');

describe('Hero3DScene source-level perf invariants', () => {
   it('throttles mouse/touch input via INPUT_THROTTLE_MS', () => {
      expect(source).toMatch(/INPUT_THROTTLE_MS\s*=\s*33/);
      expect(source).toMatch(/lastInputTime/);
   });

   it('skips ambient (clouds/stars) loops on coarse pointers', () => {
      expect(source).toMatch(/skipAmbientAnim/);
      expect(source).toMatch(/isCoarsePointer|coarse/i);
   });

   it('gates the per-frame star/cloud/float work behind an idle fast-path', () => {
      expect(source).toMatch(/const idle\s*=\s*allEntrancesDone\s*&&\s*!mouseActive/);
      expect(source).toMatch(/if \(!skipAmbientAnim && !idle\)/);
   });

   it('exposes an FPS / frame-time QA hook on renderer.__qa', () => {
      expect(source).toMatch(/__qa/);
      expect(source).toMatch(/fps:\s*\(\)\s*=>\s*fpsCounter\.fps/);
      expect(source).toMatch(/maxFrameMs/);
   });

   it('renders at a 30 FPS cap (renderInterval = 1000 / 30)', () => {
      expect(source).toMatch(/renderInterval\s*=\s*1000\s*\/\s*30/);
   });

   it('caches userData reads into typed arrays instead of repeating `as number` casts every frame', () => {
      expect(source).toMatch(/const starState:/);
      expect(source).toMatch(/const cloudState:/);
      expect(source).toMatch(/const floatingState:/);
   });

   it('does NOT call setState inside the animate() body (no React re-renders per frame)', () => {
      const animateMatch = source.match(/const animate = \(\) => \{[\s\S]*?\n      \}/);
      expect(animateMatch).toBeTruthy();
      const body = animateMatch![0];
      expect(body).not.toMatch(/setHasWebGL/);
      expect(body).not.toMatch(/set[A-Z]\w+\(/);
   });

   it('pauses the animation when IntersectionObserver reports not intersecting', () => {
      expect(source).toMatch(/visibilityObserver/);
      expect(source).toMatch(/if \(entry\.isIntersecting && !document\.hidden\) startLoop\(\)/);
   });

   it('pauses on visibilitychange to hidden', () => {
      expect(source).toMatch(/handleVisibilityChange/);
      expect(source).toMatch(/if \(document\.hidden\)[\s\S]*?stopLoop\(\)/);
   });

   it('cleans up all listeners + cancelAnimationFrame on unmount', () => {
      expect(source).toMatch(/cancelAnimationFrame\(animationFrameId\)/);
      expect(source).toMatch(/visibilityObserver\.disconnect\(\)/);
      expect(source).toMatch(/resizeObserver\.disconnect\(\)/);
      expect(source).toMatch(/detachInputListeners\(\)/);
   });

   it('caps DPR adaptively (coarse pointer → 1.0, desktop → 1.5)', () => {
      expect(source).toMatch(/computePixelRatio/);
      expect(source).toMatch(/Math\.min\(dpr, 1\.0\)/);
      expect(source).toMatch(/Math\.min\(dpr, 1\.5\)/);
   });
});