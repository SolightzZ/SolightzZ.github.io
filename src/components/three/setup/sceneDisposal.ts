import * as THREE from 'three';

/**
 * Safely traverses and disposes all Three.js geometries, materials, and renderer DOM nodes
 * to prevent memory leaks during component unmount.
 */
export function disposeThreeScene(scene: THREE.Scene, renderer: THREE.WebGLRenderer): void {
   scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
         const mesh = obj as THREE.Mesh;
         if (mesh.geometry) mesh.geometry.dispose();
         if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
         } else if (mesh.material) {
            mesh.material.dispose();
         }
      }
   });

   renderer.dispose();
   if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
   }
}
