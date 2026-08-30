import {describe, expect, it} from 'vitest';
import * as THREE from 'three';
import {createSceneCamera} from './sceneCamera';

describe('createSceneCamera', () => {
   it('returns a CameraController with the expected shape', () => {
      const controller = createSceneCamera(800, 600);
      expect(controller.camera.type).toBe('PerspectiveCamera');
      expect(typeof controller.updateAspect).toBe('function');
      expect(typeof controller.setFitSphere).toBe('function');
   });

   it('uses the configured FOV and aspect from initial dimensions', () => {
      const controller = createSceneCamera(1600, 800);
      expect(controller.camera.fov).toBe(38);
      expect(controller.camera.aspect).toBe(2);
   });

   it('updates aspect on updateAspect', () => {
      const controller = createSceneCamera(800, 600);
      controller.updateAspect(1200, 600);
      expect(controller.camera.aspect).toBe(2);
   });

   it('setFitSphere accepts a real THREE.Sphere and updateAspect frames the camera to it', () => {
      const controller = createSceneCamera(800, 600);
      const sphere = new THREE.Sphere(new THREE.Vector3(0, 0.05, 0), 2);
      controller.setFitSphere(sphere);
      controller.updateAspect(800, 600);
      // After framing, position should be > 0 (camera moved into place).
      expect(controller.camera.position.z).toBeGreaterThan(0);
   });

   it('handles null sphere gracefully (uses default dist=5)', () => {
      const controller = createSceneCamera(800, 600);
      controller.setFitSphere(null);
      controller.updateAspect(800, 600);
      expect(controller.camera.position.z).toBeGreaterThan(0);
   });
});