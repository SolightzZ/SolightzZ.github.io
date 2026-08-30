import * as THREE from 'three';
import { create2DCanvas } from '../../../utils/canvas';
import { FloatingElement, FloatingElementsResult } from '../setup/types';

/**
 * Creates a High-DPI 512x512 crisp texture for technology badges (`TS`, `JS`, `{ }`)
 * Ensures high contrast (3D-019) and razor-sharp typography (3D-012).
 */
function createBadgeTexture(
   text: string,
   bgColor: string,
   textColor: string,
   borderColor = '#ffffff'
): THREE.CanvasTexture {
   const created = create2DCanvas(512, 512);
   const canvas = created?.canvas ?? document.createElement('canvas');
   const ctx = created?.ctx;

   if (ctx) {
      // Rounded Card Background
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      ctx.roundRect(16, 16, 480, 480, 72);
      ctx.fill();

      // Border outline
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.roundRect(16, 16, 480, 480, 72);
      ctx.stroke();

      // Typography
      const fontSize = text.length > 2 ? 170 : 210;
      ctx.font = `bold ${fontSize}px "JetBrains Mono", system-ui, sans-serif`;
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      ctx.shadowBlur = 10;
      ctx.fillText(text, 256, 256);
   }

   const tex = new THREE.CanvasTexture(canvas);
   tex.generateMipmaps = true;
   tex.minFilter = THREE.LinearMipmapLinearFilter;
   tex.magFilter = THREE.LinearFilter;
   return tex;
}

export interface TechBadgeConfig {
   type: string;
   label: string;
   position: [number, number, number];
   rotation: [number, number, number];
   bgColor: string;
   textColor: string;
   borderColor: string;
   glowColor: number;
   width?: number;
   height?: number;
   depth?: number;
   speed?: number;
}

/**
 * Data-Driven Technology Badge Configuration (3D-004, 3D-011, 3D-016)
 */
export const TECH_BADGE_CONFIGS: TechBadgeConfig[] = [
   {
      type: 'javascript',
      label: 'JS',
      position: [-1.58, 1.35, 0.22],
      rotation: [0.18, 0.38, -0.08],
      bgColor: '#f59e0b',
      textColor: '#0f172a',
      borderColor: '#fde047',
      glowColor: 0xd97706,
      speed: 0.85,
   },
   {
      type: 'code',
      label: '{ }',
      position: [0.52, 1.86, -0.28],
      rotation: [0.15, -0.25, 0.08],
      bgColor: '#0284c7',
      textColor: '#ffffff',
      borderColor: '#38bdf8',
      glowColor: 0x38bdf8,
      speed: 0.8,
   },
   {
      type: 'typescript',
      label: 'TS',
      position: [1.8, 1.25, 0.28],
      rotation: [0.18, -0.36, 0.12],
      bgColor: '#2563eb',
      textColor: '#ffffff',
      borderColor: '#93c5fd',
      glowColor: 0x1d4ed8,
      speed: 0.85,
   },
];

/**
 * Reusable Technology Badge Factory (3D-004, 3D-011)
 * Creates a complete 3D Technology Badge with front and back high-res decals.
 */
export function createTechBadge({
   label,
   bgColor,
   textColor,
   borderColor,
   glowColor,
   width = 0.28,
   height = 0.28,
   depth = 0.07,
}: TechBadgeConfig): THREE.Group {
   const group = new THREE.Group();

   // 1. 3D Body
   const bodyMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(bgColor),
      roughness: 0.25,
      metalness: 0.2,
      emissive: new THREE.Color(glowColor),
      emissiveIntensity: 0.2,
   });
   const body = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), bodyMat);
   body.castShadow = true;
   group.add(body);

   // 2. High-DPI Front Decal (Facing camera)
   const tex = createBadgeTexture(label, bgColor, textColor, borderColor);
   const frontDecal = new THREE.Mesh(
      new THREE.PlaneGeometry(width * 0.98, height * 0.98),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true })
   );
   frontDecal.position.z = depth / 2 + 0.002;
   group.add(frontDecal);

   // 3. Back Decal (For full 3D integrity)
   const backDecal = new THREE.Mesh(
      new THREE.PlaneGeometry(width * 0.98, height * 0.98),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true })
   );
   backDecal.rotation.y = Math.PI;
   backDecal.position.z = -depth / 2 - 0.002;
   group.add(backDecal);

   return group;
}

/**
 * Creates a bright soft white puffy cloud cluster matching main.png
 */
function createCloud(scale = 1.0): THREE.Group {
   const cloudGroup = new THREE.Group();
   const cloudMat = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      emissive: 0x6688aa,
      emissiveIntensity: 0.18,
   });

   const p1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.25 * scale, 1), cloudMat);
   cloudGroup.add(p1);

   const p2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.2 * scale, 1), cloudMat);
   p2.position.set(-0.22 * scale, -0.04 * scale, 0);
   cloudGroup.add(p2);

   const p3 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.21 * scale, 1), cloudMat);
   p3.position.set(0.22 * scale, -0.02 * scale, 0);
   cloudGroup.add(p3);

   const p4 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.16 * scale, 1), cloudMat);
   p4.position.set(0.06 * scale, 0.13 * scale, 0.04 * scale);
   cloudGroup.add(p4);

   return cloudGroup;
}

/**
 * Creates a golden 4-point or 5-point star matching main.png
 */
function createGoldenStar(size = 0.08, points = 4): THREE.Mesh {
   const shape = new THREE.Shape();
   const outerR = size;
   const innerR = size * (points === 4 ? 0.32 : 0.45);
   for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const ang = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(ang) * r;
      const y = Math.sin(ang) * r;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
   }
   shape.closePath();

   const starGeo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.02,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.005,
      bevelThickness: 0.005,
   });

   const starMat = new THREE.MeshStandardMaterial({
      color: 0xfde047,
      roughness: 0.2,
      metalness: 0.3,
      emissive: 0xfacc15,
      emissiveIntensity: 0.65,
   });

   return new THREE.Mesh(starGeo, starMat);
}

/**
 * Creates the Floating Elements & Technology Stack matching main.png:
 * - Data-driven Technology Badges (`JS`, `{ }`, `TS`)
 * - Puffy Clouds & Golden Twinkling Stars
 */
export function createFloatingCodingElements(): FloatingElementsResult {
   const group = new THREE.Group();
   group.name = 'FloatingCodingElements';
   const elements: FloatingElement[] = [];
   const clouds: THREE.Group[] = [];
   const stars: THREE.Mesh[] = [];

   // ==========================================
   // 1. Data-Driven Technology Stack Badges (3D-004)
   // ==========================================
   TECH_BADGE_CONFIGS.forEach((config) => {
      const badge = createTechBadge(config);
      badge.position.set(...config.position);
      badge.rotation.set(...config.rotation);
      group.add(badge);

      elements.push({
         mesh: badge,
         initialY: config.position[1],
         speed: config.speed ?? 0.85,
         rotSpeed: { x: 0.0006, y: 0.001, z: 0.0005 },
      });
   });

   // ==========================================
   // 2. Soft Pure White Clouds (Framing Arc in Background)
   // ==========================================
   const cloudConfigs = [
      { x: -0.9, y: 1.82, z: -0.85, s: 1.2 },
      { x: 0.65, y: 1.88, z: -0.85, s: 1.3 },
      { x: 1.58, y: 1.68, z: -0.6, s: 0.9 },
      { x: -1.58, y: 1.12, z: -0.4, s: 0.85 },
      { x: -0.82, y: -0.92, z: 0.42, s: 0.75 },
      { x: 1.42, y: -0.72, z: 0.32, s: 0.8 },
   ];

   cloudConfigs.forEach(({ x, y, z, s }) => {
      const c = createCloud(s);
      c.position.set(x, y, z);
      group.add(c);
      clouds.push(c);
   });

   // ==========================================
   // 3. Golden Twinkling Stars
   // ==========================================
    // Stars orbit OUTSIDE the island (grass radius ~1.78) — placed at r >= 2.0
    // and Y >= 0.8 so they never intersect the island geometry.
    const starPositions = [
       { x: -2.1, y: 1.2, z: -0.5, s: 0.085, pts: 5 },
       { x: 0.5, y: 1.5, z: -2.0, s: 0.075, pts: 4 },
       { x: 2.2, y: 0.9, z: 0.3, s: 0.08, pts: 5 },
       { x: -2.0, y: 0.8, z: 0.8, s: 0.07, pts: 4 },
       { x: -1.0, y: 1.8, z: -1.8, s: 0.075, pts: 5 },
       { x: 1.8, y: 1.1, z: 1.6, s: 0.065, pts: 4 },
    ];

    starPositions.forEach(({ x, y, z, s, pts }) => {
       const star = createGoldenStar(s, pts);
       star.position.set(x, y, z);
       star.rotation.z = Math.random() * 0.5;
       // Orbit data: each star circles the island at its own radius, height, and speed
       const angle = Math.atan2(z, x);
       const radius = Math.sqrt(x * x + z * z);
       star.userData.orbitAngle = angle;
       star.userData.orbitRadius = radius;
       star.userData.orbitY = y;
       star.userData.orbitSpeed = 0.15 + Math.random() * 0.25; // rad/s
       group.add(star);
       stars.push(star);
    });

   return { group, elements, clouds, stars };
}
