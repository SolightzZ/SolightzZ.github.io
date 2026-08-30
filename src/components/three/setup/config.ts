import * as THREE from 'three';

/**
 * Central configuration for the 3D Hero Mini Planet Diorama.
 *
 * Every tunable constant lives here — colors, speeds, sizes, positions.
 * Change values and the scene updates automatically.
 */

// CAMERA

export const CAMERA = {
   fov: 38,
   near: 0.1,
   far: 100,
   viewDir: new THREE.Vector3(0, 0.37, 0.93).normalize(),
   centerOffset: new THREE.Vector3(0, 0.05, 0),
   defaultDistance: 5.0,
   fitMargin: 0.5,
   maxPixelRatio: 1.5,
   toneExposure: 1.18,
} as const;

// LIGHTING

export const LIGHTING = {
   hemisphere: { sky: 0xffffff, ground: 0xbfe4fd, intensity: 1.7 },
   ambient: { color: 0xffffff, intensity: 0.95 },
   key: {
      color: 0xfffaed,
      intensity: 2.6,
      position: new THREE.Vector3(4.5, 6.8, 4.5),
      shadowSize: 2048,
      shadowBias: -0.0004,
      shadowRadius: 2.5,
   },
   rim: { color: 0x38bdf8, intensity: 2.0, position: new THREE.Vector3(-5.2, 4.8, -4.2) },
   fill: { color: 0xe0f2fe, intensity: 0.9, position: new THREE.Vector3(0, 0.6, 4.8) },
   under: { color: 0x64748b, intensity: 0.8, position: new THREE.Vector3(0, -4.2, 2.2) },
} as const;

// PALETTE

export const PALETTE = {
   // Brand
   cyan: 0x38bdf8,
   darkCyan: 0x0284c7,

   // Island
   grass: 0x86c726,
   dirtEdge: 0x86c726,
   soil: 0x451a03,
   stone: 0xcfd8dc,
   wood: 0x78350f,
   pineLeaf: 0x15803d,

   // Rock layers
   rock: 0x64748b,
   rockDark: 0x55677d,
   rockLight: 0x94a3b8,

   // Character
   hoodie: 0x2563eb,
   hair: 0x1e1e24,
   skin: 0xfde68a,
   glasses: 0x0f172a,
   pants: 0x0f172a,
   shoes: 0x1e293b,
   chair: 0x1e293b,
   chairMetal: 0x475569,

   // Robot
   robotBody: 0xf8fafc,
   robotVisor: 0x09111e,
   robotGlow: 0x38bdf8,
   robotHeadphone: 0x475569,

   // Workspace
   monitorBezel: 0x0f172a,
   deskTop: 0xf8fafc,
   deskLeg: 0xb45309,
   lampBody: 0x1e293b,
   lampLight: 0xffedd5,

   // Bookshelf
   cabinet: 0x475569,
   shelfInner: 0x334155,
   books: [0xef4444, 0x38bdf8, 0x22c55e, 0xfbbf24, 0xf8fafc] as number[],

   // Flowers
   wildflowers: [0xc084fc, 0xf472b6, 0xfef08a, 0xf8fafc] as number[],
   grassBlade: 0x65a30d,
   bush: [0x4ade80, 0xa855f7, 0xf43f5e] as number[],

   // Badge
   badgeGlow: {
      js: 0xd97706,
      code: 0x38bdf8,
      ts: 0x1d4ed8,
   },

   // Stars & rings
   starGold: 0xfde047,
   starGoldEmit: 0xfacc15,
   ringBlue: 0x93c5fd,
   ringBlueEmit: 0x60a5fa,
   ringBead: 0xfef08a,

   // Cloud
   cloud: 0xffffff,
   cloudEmit: 0x6688aa,

   // UI
   clear: 0x000000,
   shadow: 0x000000,
} as const;

// SCREEN COLORS

export const SCREEN = {
   bg: '#0f172a',
   titleBar: '#1e293b',
   tabActive: '#0f172a',
   tabUnderline: '#38bdf8',
   filename: '#38bdf8',
   gutterBg: '#141e33',
   lineNumHighlight: '#38bdf8',
   lineNum: '#475569',
   comment: '#64748b',
   import: '#f43f5e',
   keyword: '#38bdf8',
   string: '#34d399',
   array: '#fbbf24',
   dot: { red: '#f43f5e', yellow: '#fbbf24', green: '#34d399' },
} as const;

// BADGES

export interface BadgeConfig {
   label: string;
   position: THREE.Vector3;
   rotation: THREE.Vector3;
   speed: number;
   bg: string;
   text: string;
   border: string;
   glow: number;
}

export const BADGES: BadgeConfig[] = [
   {
      label: 'JS',
      position: new THREE.Vector3(-1.58, 1.35, 0.22),
      rotation: new THREE.Vector3(0.18, 0.38, -0.08),
      speed: 0.85,
      bg: '#f59e0b',
      text: '#0f172a',
      border: '#fde047',
      glow: 0xd97706,
   },
   {
      label: '{ }',
      position: new THREE.Vector3(0.52, 1.86, -0.28),
      rotation: new THREE.Vector3(0.15, -0.25, 0.08),
      speed: 0.8,
      bg: '#0284c7',
      text: '#ffffff',
      border: '#38bdf8',
      glow: 0x38bdf8,
   },
   {
      label: 'TS',
      position: new THREE.Vector3(1.8, 1.25, 0.28),
      rotation: new THREE.Vector3(0.18, -0.36, 0.12),
      speed: 0.85,
      bg: '#2563eb',
      text: '#ffffff',
      border: '#93c5fd',
      glow: 0x1d4ed8,
   },
];

export const BADGE_SIZE = { w: 0.28, h: 0.28, d: 0.07 };

// CLOUDS

export interface CloudConfig {
   position: THREE.Vector3;
   scale: number;
}

export const CLOUDS: CloudConfig[] = [
   { position: new THREE.Vector3(-0.9, 1.82, -0.85), scale: 1.2 },
   { position: new THREE.Vector3(0.65, 1.88, -0.85), scale: 1.3 },
   { position: new THREE.Vector3(1.58, 1.68, -0.6), scale: 0.9 },
   { position: new THREE.Vector3(-1.58, 1.12, -0.4), scale: 0.85 },
   { position: new THREE.Vector3(-0.82, -0.92, 0.42), scale: 0.75 },
   { position: new THREE.Vector3(1.42, -0.72, 0.32), scale: 0.8 },
];

// STARS

export interface StarConfig {
   position: THREE.Vector3;
   size: number;
   points: number;
   orbitRadius: number;
   orbitSpeed: number;
   orbitDir: number;
}

export const STARS: StarConfig[] = [
   { position: new THREE.Vector3(-2.1, 1.2, -0.5), size: 0.085, points: 5, orbitRadius: 2.4, orbitSpeed: 0.18, orbitDir: 1 },
   { position: new THREE.Vector3(0.5, 1.5, -2.0), size: 0.075, points: 4, orbitRadius: 2.2, orbitSpeed: 0.22, orbitDir: -1 },
   { position: new THREE.Vector3(2.2, 0.9, 0.3), size: 0.08, points: 5, orbitRadius: 2.5, orbitSpeed: 0.15, orbitDir: 1 },
   { position: new THREE.Vector3(-2.0, 0.8, 0.8), size: 0.07, points: 4, orbitRadius: 2.3, orbitSpeed: 0.2, orbitDir: -1 },
   { position: new THREE.Vector3(-1.0, 1.8, -1.8), size: 0.075, points: 5, orbitRadius: 2.1, orbitSpeed: 0.25, orbitDir: 1 },
   { position: new THREE.Vector3(1.8, 1.1, 1.6), size: 0.065, points: 4, orbitRadius: 2.4, orbitSpeed: 0.17, orbitDir: -1 },
];

// ANIMATION

export const ANIMATION = {
   // Loop
   targetFps: 30,

   // Mouse parallax
   mouse: {
      desktopX: 0.16,
      desktopY: 0.12,
      touchX: 0.1,
      touchY: 0.08,
      lerp: 0.04,
   },

   // World idle floating
   worldFloat: { speed: 0.75, amplitude: 0.025 },

   // Idle rotation
   idleRotation: { speed: 0.1, amplitude: 0.03 },

   // Mouse parallax rotation
   parallaxRotation: { yMul: 0.22, xMul: 0.14 },

   // Floating badges
   badgeBob: { speed: 0.8, amplitude: 0.07, phaseOffset: 0.8 },
   badgeRotation: { x: 0.0006, y: 0.001, z: 0.0005 },

   // Cloud drift
   cloudDrift: { speed: 0.4, amplitude: 0.03 },

   // Star bob
   starBob: { speed: 0.8, amplitude: 0.06, selfRotation: 0.5 },

   // Reveal
   revealTimeout: 2200,
} as const;

// ENTRANCE

export interface EntranceEntry {
   delay: number;
   duration: number;
   riseFrom: number;
}

export const ENTRANCE = {
   planet: { delay: 420, duration: 800, riseFrom: 0.25 } as EntranceEntry,
   workspace: { delay: 180, duration: 600, riseFrom: 0.3 } as EntranceEntry,
   character: { delay: 360, duration: 700, riseFrom: 0.3 } as EntranceEntry,
   bookshelf: { delay: 540, duration: 500, riseFrom: 0.3 } as EntranceEntry,
   robot: { delay: 720, duration: 600, riseFrom: 0.3 } as EntranceEntry,
   floating: { delay: 900, duration: 500, riseFrom: 0.3 } as EntranceEntry,
   defaultRiseFrom: 0.35,
   initialScaleMul: 0.9,
};

// CHARACTER ANIMATION

export const CHARACTER_ANIM = {
   typingSpeed: 11,
   typingAmplitude: 0.035,
   headYawSpeed: 1.3,
   headYawAmplitude: 0.04,
   headPitchSpeed: 1.7,
   headPitchBase: 0.04,
   headPitchAmplitude: 0.02,
   breathingSpeed: 2.2,
   breathingAmplitude: 0.003,
} as const;

// ROBOT ANIMATION
export const ROBOT_ANIM = {
   headYawSpeed: 0.9,
   headYawAmplitude: 0.08,
   headRollSpeed: 1.2,
   headRollAmplitude: 0.04,
   tabletBobSpeed: 1.6,
   tabletBobAmplitude: 0.008,
   legSwingSpeed: 2.2,
   legSwingAmplitude: 0.08,
   initialRotationZ: -0.07,
} as const;

// ISLAND GEOMETRY
export const ISLAND = {
   grass: {
      topRadius: 1.848,
      bottomRadius: 1.958,
      height: 0.286,
      radialSegments: 36,
      heightSegments: 4,
      positionY: 0.5566,
      moundSlope: 0.88,
      moundHeight: 0.066,
      edgeWave: 0.044,
   },
   dirtRim: {
      topRadius: 1.958,
      bottomRadius: 2.035,
      height: 0.154,
      positionY: 0.3806,
   },
   cliff: {
      midY: -0.022,
      midTopR: 2.024,
      midBotR: 1.628,
      midH: 0.825,
      bandTopR: 1.628,
      bandBotR: 1.375,
      bandH: 0.495,
      undersideR: 1.595,
      undersideH: 1.76,
   },
   ring: {
      radius: 2.816,
      tube: 0.0198,
      positionY: -0.154,
      rotationX: Math.PI * 0.44,
      rotationZ: -0.22,
   },
   beadRadius: 0.0385,
   beadAngles: [0.4, 1.8, 3.4, 4.8],
};

// PLANT CONFIG
export const PLANTS = {
   grassBlade: { radius: 0.014, height: 0.07, color: 0x65a30d },
   pineTrees: [
      { pos: new THREE.Vector3(-1.35, 0.622, 0.22), scale: 0.72 },
      { pos: new THREE.Vector3(1.15, 0.68, -0.65), scale: 0.55 },
      { pos: new THREE.Vector3(1.26, 0.67, 0.36), scale: 0.45 },
   ],
   fencePost: { radiusTop: 0.016, radiusBot: 0.018, height: 0.16, y: 0.73 },
   fenceRail: { width: 0.24, height: 0.014, depth: 0.02, railY1: 0.72, railY2: 0.78 },
} as const;

// BADGE (CLIFF)

export const CLIFF_BADGE = {
   body: { w: 0.24, h: 0.24, d: 0.06 },
   slash: { w: 0.02, h: 0.13, d: 0.01 },
   arrow: { w: 0.018, h: 0.06, d: 0.01 },
   color: 0x3b82f6,
   symbolColor: 0xffffff,
   position: new THREE.Vector3(-0.48, 0.52, 1.28),
   rotation: new THREE.Euler(0.25, -0.3927, -0.12),
};

// PLAQUE
export const PLAQUE = {
   size: { w: 0.48, h: 0.24, d: 0.03 },
   position: new THREE.Vector3(-0.12, 0.52, 1.34),
   rotation: new THREE.Euler(0.08, -0.25, -0.15),
   canvasSize: { w: 512, h: 256 },
};

// SUSPENDED ROCKS
export const SUSPENDED_ROCKS = [
   { pos: new THREE.Vector3(0.12, -1.65, 0.08), size: 0.1, rot: new THREE.Vector3(0.3, 0.5, 0.2) },
   { pos: new THREE.Vector3(-0.15, -1.82, -0.12), size: 0.075, rot: new THREE.Vector3(0.6, 0.2, 0.4) },
   { pos: new THREE.Vector3(0.16, -1.98, 0.12), size: 0.06, rot: new THREE.Vector3(0.2, 0.7, 0.5) },
] as const;

// PERIMETER BOULDERS
export const BOULDERS = [
   { pos: new THREE.Vector3(-1.68, 0.15, 0.35), scale: new THREE.Vector3(0.46, 0.35, 0.42), rot: new THREE.Vector3(0.2, 0.5, 0.1) },
   { pos: new THREE.Vector3(-1.58, 0.25, -0.38), scale: new THREE.Vector3(0.44, 0.36, 0.4), rot: new THREE.Vector3(-0.3, 0.2, 0.4) },
   { pos: new THREE.Vector3(-1.42, -0.05, 0.95), scale: new THREE.Vector3(0.4, 0.3, 0.35), rot: new THREE.Vector3(0.4, -0.2, 0.3) },
   { pos: new THREE.Vector3(-0.92, -0.12, 1.48), scale: new THREE.Vector3(0.48, 0.36, 0.42), rot: new THREE.Vector3(0.3, 0.4, -0.2) },
   { pos: new THREE.Vector3(-0.32, -0.18, 1.6), scale: new THREE.Vector3(0.42, 0.32, 0.38), rot: new THREE.Vector3(0.1, -0.3, 0.2) },
   { pos: new THREE.Vector3(1.54, 0.12, 0.42), scale: new THREE.Vector3(0.42, 0.32, 0.38), rot: new THREE.Vector3(-0.2, 0.6, -0.3) },
   { pos: new THREE.Vector3(1.42, -0.02, 0.92), scale: new THREE.Vector3(0.46, 0.34, 0.4), rot: new THREE.Vector3(0.3, 0.1, -0.2) },
   { pos: new THREE.Vector3(-0.48, -0.85, 0.68), scale: new THREE.Vector3(0.55, 0.42, 0.48), rot: new THREE.Vector3(0.5, 0.2, -0.4) },
   { pos: new THREE.Vector3(0.52, -0.95, 0.62), scale: new THREE.Vector3(0.58, 0.44, 0.5), rot: new THREE.Vector3(-0.3, 0.5, 0.2) },
   { pos: new THREE.Vector3(0.08, -1.18, -0.28), scale: new THREE.Vector3(0.62, 0.48, 0.54), rot: new THREE.Vector3(0.2, -0.4, 0.5) },
] as const;

// WORLD ROOT

export const WORLD_ROOT = { position: new THREE.Vector3(0, -0.2, 0) } as const;

// FALLBACK

export const FALLBACK = {
   width: 800,
   height: 800,
   pulseScale: [0.96, 1.04, 0.96] as [number, number, number],
   pulseOpacity: [0.6, 0.9, 0.6] as [number, number, number],
   pulseDuration: 3.5,
};
