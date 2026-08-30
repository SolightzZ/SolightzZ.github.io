import * as THREE from 'three';

/**
 * Common types and interfaces for the Three.js 3D Hero Scene
 */

export interface FloatingElement {
   mesh: THREE.Object3D;
   initialY: number;
   speed: number;
   rotSpeed: { x: number; y: number; z: number };
}

export interface Animated3DObject {
   group: THREE.Group;
   update: (elapsedTime: number) => void;
}

export interface FloatingElementsResult {
   group: THREE.Group;
   elements: FloatingElement[];
   clouds: THREE.Group[];
   stars: THREE.Mesh[];
}

export interface Hero3DSceneProps {
   className?: string;
}
