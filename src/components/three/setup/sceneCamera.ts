import * as THREE from 'three';

export interface CameraController {
   camera: THREE.PerspectiveCamera;
   updateAspect: (width: number, height: number) => void;
   setFitSphere: (sphere: THREE.Sphere | null) => void;
}

// Art-directed view direction (front 3/4, slightly elevated) matching main.png.
// This is the fixed direction from the diorama center toward the camera; only the
// distance is computed per-frame so the WHOLE scene (orbital ring, floating badges,
// hanging rocks) always fits regardless of viewport aspect ratio — fixing pieces
// being clipped on wide screens and the scene overflowing on narrow screens.
const VIEW_DIR = new THREE.Vector3(0, 0.37, 0.93).normalize();

/**
 * Creates and manages the art-directed Perspective Camera for the Mini Planet diorama.
 * The camera is framed to a bounding sphere so every piece is visible at any aspect.
 */
export function createSceneCamera(initialWidth: number, initialHeight: number): CameraController {
   const initialAspect = initialWidth / initialHeight;
   const fov = 38;
   const camera = new THREE.PerspectiveCamera(fov, initialAspect, 0.1, 100);

   let fitSphere: THREE.Sphere | null = null;

   const updateAspect = (width: number, height: number) => {
      const aspect = width / height;
      camera.aspect = aspect;

      const center = new THREE.Vector3(0, 0.05, 0);
      let dist = 5.0;

      if (fitSphere) {
         center.copy(fitSphere.center);
         // 6% margin so the outermost ring/badges are never touching the frame edge.
         const r = fitSphere.radius * 0.5;
         const fovV = THREE.MathUtils.degToRad(fov);
         const fovH = 2 * Math.atan(Math.tan(fovV / 2) * aspect);
         const fitV = r / Math.sin(fovV / 2);
         const fitH = r / Math.sin(fovH / 2);
         dist = Math.max(fitV, fitH);
      }

      camera.fov = fov;
      camera.position.copy(center).add(VIEW_DIR.clone().multiplyScalar(dist));
      camera.lookAt(center);
      camera.updateProjectionMatrix();
   };

   const setFitSphere = (sphere: THREE.Sphere | null) => {
      fitSphere = sphere;
   };

   updateAspect(initialWidth, initialHeight);

   return { camera, updateAspect, setFitSphere };
}
