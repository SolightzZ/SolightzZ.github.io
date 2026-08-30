import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createBookshelfProp } from './environment/BookshelfProp';
import { createDeveloperCharacter } from './characters/DeveloperCharacter';
import { createDeveloperWorkspace } from './environment/DeveloperWorkspace';
import { createFloatingCodingElements } from './environment/FloatingCodePanels';
import { createMiniPlanet } from './environment/MiniPlanet';
import { createRobotAssistant } from './characters/RobotAssistant';
import { createSceneLighting } from './setup/SceneLighting';
import { createSceneCamera } from './setup/sceneCamera';
import { disposeThreeScene } from './setup/sceneDisposal';
import { SceneFallback } from './SceneFallback';
import { Hero3DSceneProps } from './setup/types';
import { prefersReducedMotion } from '../../utils/motion';

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({ className = '' }) => {
   const mountRef = useRef<HTMLDivElement>(null);
   const [hasWebGL, setHasWebGL] = useState<boolean>(true);

   useEffect(() => {
      const container = mountRef.current;
      if (!container) return;

      // 1. WebGL Availability Check
      try {
         const testCanvas = document.createElement('canvas');
         const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
         if (!gl) {
            setHasWebGL(false);
            return;
         }
      } catch {
         setHasWebGL(false);
         return;
      }

      let animationFrameId: number;
      const width = container.clientWidth || 600;
      const height = container.clientHeight || 600;

      // 2. Camera Setup (Elevated front 3/4 matching image.png)
      const scene = new THREE.Scene();
      const { camera, updateAspect, setFitSphere } = createSceneCamera(width, height);

      // 3. High-Performance WebGLRenderer Setup
      const renderer = new THREE.WebGLRenderer({
         antialias: true,
         alpha: true,
         powerPreference: 'high-performance',
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(width, height);

      // Adaptive DPR: cap aggressively on small screens / coarse pointers to keep
      // the main thread + GPU usage low on mobile. High-DPI desktop stays at 1.5.
      const computePixelRatio = (): number => {
         const dpr = window.devicePixelRatio || 1;
         const isCoarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
         const isSmall = Math.min(width, height) < 520;
         if (isCoarse || isSmall) return Math.min(dpr, 1.0);
         return Math.min(dpr, 1.5);
      };
      renderer.setPixelRatio(computePixelRatio());
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.18;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;

       // Graceful fallback if the WebGL context is lost (the realistic failure
       // mode for a procedural scene). Stops the loop and swaps in the fallback.
       renderer.domElement.addEventListener(
          'webglcontextlost',
          (e) => {
             e.preventDefault();
             running = false;
             setHasWebGL(false);
          },
          false
       );

       container.appendChild(renderer.domElement);

      // 4. Assemble 3D Planet Diorama World Root (progressive piece-by-piece reveal with entrance animation)
      const worldGroup = new THREE.Group();
      worldGroup.name = 'PlanetWorldRoot';
      worldGroup.position.set(0, -0.2, 0);
      // Scene lighting MUST be added before any piece is revealed, or every
      // MeshStandardMaterial object renders black (3D-RENDER-001 underexposure).
      scene.add(createSceneLighting());

      scene.add(worldGroup);

      let characterUpdate: ((t: number) => void) | null = null;
      let robotUpdate: ((t: number) => void) | null = null;
      let floatingElements: ReturnType<typeof createFloatingCodingElements>['elements'] = [];
      let clouds: THREE.Object3D[] = [];
      let stars: THREE.Object3D[] = [];

      // On coarse pointers (mobile/tablet) we skip the high-cost star orbit and
      // cloud-drift passes — they contribute a large share of per-frame CPU work
      // without adding noticeable visual richness on small screens.
      const isCoarsePointer = window.matchMedia?.('(pointer: coarse)').matches ?? false;
      const isSmallViewport = Math.min(width, height) < 520;
      const skipAmbientAnim = isCoarsePointer || isSmallViewport;
      if (skipAmbientAnim) {
         clouds = [];
         stars = [];
      }

      // Entrance animation system
      interface Entrance {
         group: THREE.Group;
         delay: number;
         duration: number;
         started: boolean;
         completed: boolean;
         initialScale: number;
         targetScale: number;
         initialY: number;
         targetY: number;
      }
      const entrances: Entrance[] = [];

      // Remember each material's authored transparency settings so we can restore
      // them exactly once the piece is fully revealed. Leaving `transparent = true`
      // on opaque meshes (grass, planet) after the intro makes them render in the
      // transparent pass and sort by centroid distance — which makes solids overlap
      // / show through each other ("หญ้าทับกัน"). It also wrongly overwrites the
      // opacity of genuinely translucent props (orbital ring, glow cube).
      const materialState = new WeakMap<
         THREE.Material,
         { transparent: boolean; opacity: number; depthWrite: boolean; alphaTest: number }
      >();
      const captureMaterial = (m: THREE.Material) => {
         let s = materialState.get(m);
         if (!s) {
            s = {
               transparent: m.transparent,
               opacity: m.opacity,
               depthWrite: m.depthWrite,
               alphaTest: (m as any).alphaTest ?? 0,
            };
            materialState.set(m, s);
         }
         return s;
      };

      const applyEntranceState = (group: THREE.Group, scale: number, y: number, opacity: number) => {
         group.scale.setScalar(scale);
         group.position.y = y;
         group.traverse((obj) => {
            if (obj instanceof THREE.Mesh && obj.material) {
               const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
               mats.forEach((m) => {
                  const orig = captureMaterial(m);
                  if (opacity >= 1) {
                     // Fully revealed: restore ALL original material settings so
                     // opaque meshes render in the opaque pass with correct depth.
                     m.transparent = orig.transparent;
                     m.opacity = orig.opacity;
                     m.depthWrite = orig.depthWrite;
                     (m as any).alphaTest = orig.alphaTest;
                  } else if (!orig.transparent) {
                     // Originally-opaque material mid-fade: keep transparent=false
                     // so it stays in the opaque pass (correct depth testing).
                     // Use alphaTest to progressively reveal fragments instead —
                     // this avoids centroid-sort overlap ("หญ้าทับกัน").
                     m.transparent = false;
                     m.opacity = orig.opacity;
                     m.depthWrite = true;
                     (m as any).alphaTest = 1.0 - opacity;
                  } else {
                     // Originally-transparent material mid-fade: just reduce opacity.
                     // Already in the transparent pass — depth-write stays off.
                     m.opacity = orig.opacity * opacity;
                     m.depthWrite = false;
                  }
               });
            }
         });
      };

      const startEntrance = (group: THREE.Group, delay: number, duration: number, riseFrom = 0.35) => {
         // Preserve each piece's authored scale & Y placement. The character is authored
         // at scale 1.02 and the robot at 0.92 — animating toward a hardcoded 1.0 would
         // permanently resize them (final layout ≠ authored layout). Rise from a gentle
         // offset ON TOP of the authored base so pieces never sink into/below the island.
         const baseScale = group.scale.x;
         const baseY = group.position.y;
         applyEntranceState(group, baseScale * 0.9, baseY + riseFrom, 0);
         entrances.push({
            group,
            delay,
            duration,
            started: false,
            completed: false,
            initialScale: baseScale * 0.9,
            targetScale: baseScale,
            initialY: baseY + riseFrom,
            targetY: baseY,
         });
      };

      const addPlanet = () => {
         const group = createMiniPlanet();
         worldGroup.add(group);
         // Base island reveals FIRST so foreground objects never float in mid-air.
         startEntrance(group, 0, 420, 0.25);
      };

      const addWorkspace = () => {
         const group = createDeveloperWorkspace();
         worldGroup.add(group);
         startEntrance(group, 180, 600, 0.3); // gentle settle onto plateau
      };
      const addCharacter = () => {
         const { group, update } = createDeveloperCharacter();
         worldGroup.add(group);
         characterUpdate = update;
         startEntrance(group, 360, 700, 0.3); // subtle rise
      };
      const addBookshelf = () => {
         const group = createBookshelfProp();
         worldGroup.add(group);
         startEntrance(group, 540, 500, 0.3);
      };
      const addRobot = () => {
         const { group, update } = createRobotAssistant();
         worldGroup.add(group);
         robotUpdate = update;
         startEntrance(group, 720, 600, 0.3); // scale + rotate feel
         // add slight rotation entrance
         group.rotation.z = -0.07; // ~-4deg
         const origRotZ = group.rotation.z;
         // we'll animate rotation.z in the entrance system
         (group as any).__entranceOrigRotZ = origRotZ;
      };
      const addFloating = () => {
         const { group, elements, clouds: c, stars: s } = createFloatingCodingElements();
         worldGroup.add(group);
         floatingElements = elements;
         clouds = c;
         stars = s;
         clouds.forEach((cloud) => {
            cloud.userData.baseY = cloud.position.y;
         });
         // Store initial star rotations for time-based animation
         stars.forEach((star) => {
            star.userData.initialRotZ = star.rotation.z;
         });
         // Only the group-level entrance — individual badges share the same
         // parent group so per-badge entrances would fight over the same
         // scale/position/material state and cause visible opacity flickering.
         startEntrance(group, 900, 500, 0.3);
      };

      // Build scene pieces (each hidden via the entrance system). The base planet is
      // added FIRST so the island/terrain is forming before the foreground appears.
      const safeAdd = (fn: () => void) => {
         try {
            fn();
         } catch (err) {
            // A single failed part must not crash the whole diorama (3D-LOAD-004).
            console.warn('[Hero3DScene] a scene part failed to build', err);
         }
      };
      safeAdd(addPlanet);
      safeAdd(addWorkspace);
      safeAdd(addCharacter);
      safeAdd(addBookshelf);
      safeAdd(addRobot);
      safeAdd(addFloating);

      // Compute the diorama bounding sphere from the AUTHORED (revealed) layout, then
      // frame the camera to it so every piece is visible at any aspect ratio. Entrance
      // groups currently sit at their hidden initial state (scale 0.9, opacity 0) — flip
      // them to their target state, measure, then restore so the intro still plays.
      entrances.forEach((e) => applyEntranceState(e.group, e.targetScale, e.targetY, 1));
      worldGroup.updateMatrixWorld(true);
      const bbox = new THREE.Box3().setFromObject(worldGroup);
      const fitSphere = bbox.getBoundingSphere(new THREE.Sphere());
      entrances.forEach((e) => applyEntranceState(e.group, e.initialScale, e.initialY, 0));
      setFitSphere(fitSphere);
      updateAspect(width, height);

      // 5. Parallax & Mouse Interactivity — throttled to ~30Hz to avoid 60Hz
      // mousemove firing the lerp logic more often than the render budget.
      const mouse = {
         targetX: 0,
         targetY: 0,
         currentX: 0,
         currentY: 0,
         lastInputTime: 0,
      };
      const INPUT_THROTTLE_MS = 33;

      const handleMouseMove = (e: MouseEvent) => {
         const now = performance.now();
         if (now - mouse.lastInputTime < INPUT_THROTTLE_MS) return;
         mouse.lastInputTime = now;
         const rect = container.getBoundingClientRect();
         const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
         const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
         mouse.targetX = x * 0.16;
         mouse.targetY = y * 0.12;
      };

      const handleTouchMove = (e: TouchEvent) => {
         const now = performance.now();
         if (now - mouse.lastInputTime < INPUT_THROTTLE_MS) return;
         if (e.touches.length > 0) {
            mouse.lastInputTime = now;
            const touch = e.touches[0];
            const rect = container.getBoundingClientRect();
            const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
            mouse.targetX = x * 0.1;
            mouse.targetY = y * 0.08;
         }
      };

      const renderFrame = () => renderer.render(scene, camera);

      // 6. Responsive ResizeObserver
      const resizeObserver = new ResizeObserver((entries) => {
         for (const entry of entries) {
            const { width: newWidth, height: newHeight } = entry.contentRect;
            if (newWidth > 0 && newHeight > 0) {
               updateAspect(newWidth, newHeight);
               renderer.setSize(newWidth, newHeight);
               renderFrame();
            }
         }
      });
      resizeObserver.observe(container);

      // 7. Reduced Motion Check
      const reduceMotion = prefersReducedMotion();
      if (reduceMotion) {
         // Reduced motion: parts are already built above; just show them all
         // instantly with no entrance animation (no double-add, no floating).
         entrances.forEach((e) => applyEntranceState(e.group, e.targetScale, e.targetY, 1));
         renderFrame();
         return () => {
            resizeObserver.disconnect();
            disposeThreeScene(scene, renderer);
         };
      }

      // 8. Centralized Animation Loop
      let mouseListenersAttached = false;
      const attachInputListeners = () => {
         if (mouseListenersAttached) return;
         window.addEventListener('mousemove', handleMouseMove, { passive: true });
         window.addEventListener('touchmove', handleTouchMove, { passive: true });
         mouseListenersAttached = true;
      };
      const detachInputListeners = () => {
         if (!mouseListenersAttached) return;
         window.removeEventListener('mousemove', handleMouseMove);
         window.removeEventListener('touchmove', handleTouchMove);
         mouseListenersAttached = false;
      };

      let running = false;
      const startTime = performance.now();
      const renderInterval = 1000 / 30;
      let lastRender = -renderInterval;
      let animatedTime = 0;
      let lastFrameTime = -1;

      // Pre-cast per-frame userData once at mount to remove repeated `as number`
      // casts from the hot path. Each entry mirrors the original star.
      const starState: {
         mesh: THREE.Object3D;
         angle: number;
         radius: number;
         orbitY: number;
         speed: number;
         dir: number;
         baseRotZ: number;
      }[] = stars.map((star, sIdx) => ({
         mesh: star,
         angle: (star.userData.orbitAngle as number) ?? 0,
         radius: (star.userData.orbitRadius as number) ?? 1,
         orbitY: (star.userData.orbitY as number) ?? 0,
         speed: (star.userData.orbitSpeed as number) ?? 0.2,
         dir: sIdx % 2 === 0 ? 1 : -1,
         baseRotZ: (star.userData.initialRotZ as number) ?? 0,
      }));

      const cloudState: {mesh: THREE.Object3D; baseY: number}[] = clouds.map((cloud) => ({
         mesh: cloud,
         baseY: (cloud.userData.baseY as number) ?? cloud.position.y,
      }));

      const floatingState: {
         mesh: THREE.Object3D;
         rotX: number;
         rotY: number;
         rotZ: number;
         speed: number;
         initialY: number;
      }[] = floatingElements.map((item) => ({
         mesh: item.mesh,
         rotX: item.rotSpeed.x,
         rotY: item.rotSpeed.y,
         rotZ: item.rotSpeed.z,
         speed: item.speed,
         initialY: item.initialY,
      }));

      const startLoop = () => {
         if (running) return;
         running = true;
         attachInputListeners();
         animate();
      };
      const stopLoop = () => {
         running = false;
         lastFrameTime = -1;
         cancelAnimationFrame(animationFrameId);
         detachInputListeners();
      };

      // FPS counter (sliding window). Exposed via __qa for tooling / tests.
      const fpsCounter = {
         frames: 0,
         lastSecond: performance.now(),
         fps: 0,
         totalFrames: 0,
         maxFrameMs: 0,
      };
      const tickFps = (frameMs: number) => {
         fpsCounter.frames++;
         fpsCounter.totalFrames++;
         if (frameMs > fpsCounter.maxFrameMs) fpsCounter.maxFrameMs = frameMs;
         const now = performance.now();
         if (now - fpsCounter.lastSecond >= 1000) {
            fpsCounter.fps = fpsCounter.frames;
            fpsCounter.frames = 0;
            fpsCounter.lastSecond = now;
         }
      };

      // QA hook: expose renderer.info + perf counters so tooling / tests can
      // verify draw calls / triangle count / FPS / frame time without
      // digging through three's internals.
      (renderer as any).__qa = {
         info: renderer.info,
         scene,
         camera,
         worldGroup,
         isRunning: () => running,
         fps: () => fpsCounter.fps,
         maxFrameMs: () => fpsCounter.maxFrameMs,
         totalFrames: () => fpsCounter.totalFrames,
         skipAmbientAnim,
      };

      // Easing helper
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const animate = () => {
         if (!running) return;
         animationFrameId = requestAnimationFrame(animate);
         const frameStart = performance.now();
         const now = frameStart;

         // Delta-based timing: only accumulate time while the loop is active.
         // Prevents character animations from jumping when the tab regains
         // focus after being hidden (elapsedTime would otherwise skip ahead).
         if (lastFrameTime >= 0) {
            animatedTime += (now - lastFrameTime) * 0.001;
         }
         lastFrameTime = now;
         const elapsedTime = animatedTime;

         // Idle fast-path: once all entrances finish AND the mouse isn't being
         // actively panned, we still re-render at 30 FPS for the subtle float
         // but skip the per-frame world transform + ambient passes that the
         // QA profile flagged as the heaviest scripting contributor.
         const mouseActive = now - mouse.lastInputTime < 1500;
         const allEntrancesDone = entrances.every((e) => e.completed);
         const idle = allEntrancesDone && !mouseActive;

         // Entrance progression — only the highest-progress entry per
         // group wins, preventing later entries from overwriting material state
         // (opacity/transparent) set by an earlier entry with higher progress.
         if (!allEntrancesDone) {
            const entranceWinners = new Map<THREE.Group, {entry: Entrance; progress: number}>();
            for (const e of entrances) {
               if (e.completed) continue;
               const elapsed = now - startTime - e.delay;
               if (elapsed <= 0) continue;
               e.started = true;
               const progress = Math.min(elapsed / e.duration, 1);
               const existing = entranceWinners.get(e.group);
               if (!existing || progress > existing.progress) {
                  entranceWinners.set(e.group, {entry: e, progress});
               }
            }
            for (const [group, {entry: e, progress}] of entranceWinners) {
               const eased = easeOutCubic(progress);
               const scale = e.initialScale + (e.targetScale - e.initialScale) * eased;
               const y = e.initialY + (e.targetY - e.initialY) * eased;
               applyEntranceState(group, scale, y, eased);
               // Robot rotation entrance
               if (group.rotation.z !== 0 && (group as any).__entranceOrigRotZ !== undefined) {
                  const origRotZ = (group as any).__entranceOrigRotZ;
                  group.rotation.z = origRotZ * (1 - eased);
               }
               if (progress >= 1) {
                  e.completed = true;
                  applyEntranceState(group, e.targetScale, e.targetY, 1);
               }
            }
         }

         // World transform — always updated (gentle float is cheap and visible).
         // Gentle floating oscillation centered at -0.2
         const floatY = -0.2 + Math.sin(elapsedTime * 0.75) * 0.025;
         worldGroup.position.y = floatY;

         // Idle rotation skips the sin() call when nothing's moving (cheap win).
         const baseRot = idle && !mouseActive ? 0 : Math.sin(elapsedTime * 0.1) * 0.03;
         mouse.currentX += (mouse.targetX - mouse.currentX) * 0.04;
         mouse.currentY += (mouse.targetY - mouse.currentY) * 0.04;
         worldGroup.rotation.y = baseRot + mouse.currentX * 0.22;
         worldGroup.rotation.x = mouse.currentY * 0.14;

         // Update Characters & Props — these are the most "alive" elements.
         if (characterUpdate) characterUpdate(elapsedTime);
         if (robotUpdate) robotUpdate(elapsedTime);

         // Ambient loops are SKIPPED on coarse-pointer viewports (mobile/tablet)
         // and SHORT-CIRCUITED when fully idle to keep scripting cost near zero.
         if (!skipAmbientAnim && !idle) {
            // Floating Coding Elements
            for (let i = 0; i < floatingState.length; i++) {
               const f = floatingState[i];
               f.mesh.rotation.x += f.rotX;
               f.mesh.rotation.y += f.rotY;
               f.mesh.rotation.z += f.rotZ;
               f.mesh.position.y = f.initialY + Math.sin(elapsedTime * f.speed + i * 0.8) * 0.07;
            }

            // Cloud drifting (around each cloud's authored Y)
            for (let cIdx = 0; cIdx < cloudState.length; cIdx++) {
               const c = cloudState[cIdx];
               c.mesh.position.y = c.baseY + Math.sin(elapsedTime * 0.4 + cIdx) * 0.03;
            }

            // Stars orbit around the island center + twinkle rotation
            for (let sIdx = 0; sIdx < starState.length; sIdx++) {
               const s = starState[sIdx];
               const currentAngle = s.angle + elapsedTime * s.speed * s.dir;
               s.mesh.position.x = Math.cos(currentAngle) * s.radius;
               s.mesh.position.z = Math.sin(currentAngle) * s.radius;
               s.mesh.position.y = s.orbitY + Math.sin(elapsedTime * 0.8 + sIdx) * 0.06;
               s.mesh.rotation.z = s.baseRotZ + elapsedTime * 0.5 * s.dir;
            }
         }

         if (now - lastRender >= renderInterval) {
            renderFrame();
            lastRender = now;
         }

         tickFps(now - frameStart);
      };

      const handleVisibilityChange = () => {
         if (document.hidden) {
            stopLoop();
         } else {
            startLoop();
         }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      const visibilityObserver = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting && !document.hidden) startLoop();
            else stopLoop();
         },
         { threshold: 0 }
      );
      visibilityObserver.observe(container);

      // Safety net: guarantee the FINAL scene is fully revealed even if the rAF
      // loop is throttled/paused (e.g. tab backgrounded during load). Satisfies
      // the "no object permanently missing" acceptance criterion — every piece
      // is forced to its revealed state after the intro window regardless.
      const revealSafety = window.setTimeout(() => {
         entrances.forEach((e) => {
            e.completed = true;
            applyEntranceState(e.group, e.targetScale, e.targetY, 1);
         });
         if (running) renderFrame();
      }, 2200);

      // 9. Cleanup on Unmount
      return () => {
         clearTimeout(revealSafety);
         stopLoop();
         document.removeEventListener('visibilitychange', handleVisibilityChange);
         visibilityObserver.disconnect();
         detachInputListeners();
         resizeObserver.disconnect();
         disposeThreeScene(scene, renderer);
      };
   }, []);

   if (!hasWebGL) {
      return <SceneFallback />;
   }

   return (
      <div
         ref={mountRef}
         aria-label="Interactive Three.js developer mini planet diorama"
         className={`relative w-full h-full min-h-0 flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
          style={{ touchAction: 'pan-y' }}
       >
       </div>
    );
};
