import * as THREE from 'three';
import { create2DCanvas } from '../../../utils/canvas';

/**
 * Creates the "I KEEP CODING" texture for the front cliff plaque
 */
function createCodingPlaqueTexture(): THREE.CanvasTexture {
   const created = create2DCanvas(512, 256);
   const canvas = created?.canvas ?? document.createElement('canvas');
   const ctx = created?.ctx;

   if (ctx) {
      // Dark slate glossy background
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.roundRect(10, 10, 492, 236, 32);
      ctx.fill();

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 6;
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.roundRect(10, 10, 492, 236, 32);
      ctx.stroke();

      // Glowing text
      ctx.font = 'bold 44px "JetBrains Mono", system-ui, sans-serif';
      ctx.fillStyle = '#f8fafc';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 14;
      ctx.fillText('I KEEP', 256, 95);
      ctx.fillText('CODING', 256, 165);
   }

   const tex = new THREE.CanvasTexture(canvas);
   tex.generateMipmaps = true;
   tex.minFilter = THREE.LinearMipmapLinearFilter;
   tex.magFilter = THREE.LinearFilter;
   return tex;
}

/**
 * Creates a low-poly pine tree with grounded soil base collar (3D-004)
 */
function createPineTree(scale = 1.0, woodMat: THREE.Material, leafMat: THREE.Material, soilMat: THREE.Material): THREE.Group {
   const tree = new THREE.Group();

   // Soil collar at ground level
   const soilCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.11 * scale, 0.16 * scale, 0.03 * scale, 8), soilMat);
   soilCollar.position.y = 0.015 * scale;
   soilCollar.receiveShadow = true;
   tree.add(soilCollar);

   // Trunk
   const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.035 * scale, 0.055 * scale, 0.26 * scale, 8), woodMat);
   trunk.position.y = 0.13 * scale;
   trunk.castShadow = true;
   tree.add(trunk);

   // 3 Foliage Tiers
   const tiers = [
      { y: 0.26 * scale, r: 0.28 * scale, h: 0.32 * scale },
      { y: 0.42 * scale, r: 0.22 * scale, h: 0.26 * scale },
      { y: 0.56 * scale, r: 0.15 * scale, h: 0.22 * scale },
   ];

   tiers.forEach(({ y, r, h }) => {
      const cone = new THREE.Mesh(new THREE.ConeGeometry(r, h, 8), leafMat);
      cone.position.y = y;
      cone.castShadow = true;
      cone.receiveShadow = true;
      tree.add(cone);
   });

   return tree;
}

/**
 * Creates the Top Grass Plateau, Dirt Rim, and Winding S-Curve Cobblestone Path
 */
function createGrassDome(grassMat: THREE.Material, dirtEdgeMat: THREE.Material, stoneMat: THREE.Material): THREE.Group {
   const group = new THREE.Group();

   // Main Lush Grass Plateau
   const topGrassGeo = new THREE.CylinderGeometry(1.68, 1.78, 0.26, 36, 4);
   const tgPos = topGrassGeo.attributes.position;
   for (let i = 0; i < tgPos.count; i++) {
      const x = tgPos.getX(i);
      const y = tgPos.getY(i);
      const z = tgPos.getZ(i);
      const r = Math.sqrt(x * x + z * z);
      const angle = Math.atan2(z, x);

      if (y > 0) {
         // Center workspace (r < 0.9m) flat at Y = 0.68, gentle organic slope at perimeter
         const mound = r > 0.9 ? Math.cos(((r - 0.9) / 0.88) * (Math.PI / 2)) * 0.06 : 0.06;
         tgPos.setY(i, y + mound);
      }
      const wave = Math.sin(angle * 4) * 0.04;
      tgPos.setX(i, x * (1 + wave));
      tgPos.setZ(i, z * (1 + wave));
   }
   topGrassGeo.computeVertexNormals();

    const topGrass = new THREE.Mesh(topGrassGeo, grassMat);
    topGrass.position.set(0, 0.506, 0);
   topGrass.receiveShadow = true;
   topGrass.castShadow = true;
   group.add(topGrass);

   // Beveled Dirt/Sand Rim Transition Layer (Below grass, above rocks - No Z-fighting)
   const rimGeo = new THREE.CylinderGeometry(1.78, 1.85, 0.14, 32);
    const rimMesh = new THREE.Mesh(rimGeo, dirtEdgeMat);
    rimMesh.position.set(0, 0.346, 0);
   rimMesh.receiveShadow = true;
   group.add(rimMesh);

   // Cobblestone Stepping Path (Winding from desk to front cliff matching main.png)
   const stonePositions = [
      { x: -0.32, z: 0.18, s: 0.09, r: 0.2 },
      { x: -0.26, z: 0.36, s: 0.11, r: -0.3 },
      { x: -0.16, z: 0.52, s: 0.1, r: 0.4 },
      { x: -0.02, z: 0.66, s: 0.12, r: -0.1 },
      { x: 0.14, z: 0.78, s: 0.11, r: 0.3 },
      { x: 0.32, z: 0.88, s: 0.1, r: -0.2 },
      { x: 0.52, z: 0.94, s: 0.09, r: 0.1 },
      { x: -0.38, z: 0.42, s: 0.08, r: 0.5 },
      { x: -0.08, z: 0.44, s: 0.07, r: -0.4 },
      { x: 0.22, z: 0.62, s: 0.08, r: 0.2 },
   ];

   stonePositions.forEach(({ x, z, s, r }) => {
      const stone = new THREE.Mesh(new THREE.CylinderGeometry(s, s * 1.05, 0.012, 7), stoneMat);
       stone.position.set(x, 0.628, z);
      stone.rotation.y = r;
      stone.receiveShadow = true;
      group.add(stone);
   });

   return group;
}

/**
 * Creates High-Density Instanced Micro-Props (Grass Tufts, Wildflowers, Pebbles)
 * Matching the rich environmental asset density of the target reference.
 */
function createMicroProps(stoneMat: THREE.Material): THREE.Group {
   const group = new THREE.Group();

   // 1. Wildflower Materials
   const flowerMats = [
      new THREE.MeshStandardMaterial({ color: 0xc084fc, roughness: 0.5 }), // Violet
      new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.5 }), // Pink
      new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.5 }), // Yellow
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 }), // White Daisy
   ];

   const flowerPositions = [
      { x: -0.72, z: 0.32, mat: 0, s: 0.035 },
      { x: -0.65, z: 0.48, mat: 1, s: 0.03 },
      { x: -0.52, z: 0.68, mat: 3, s: 0.032 },
      { x: -0.38, z: 0.85, mat: 2, s: 0.028 },
      { x: 0.22, z: 0.38, mat: 1, s: 0.035 },
      { x: 0.38, z: 0.48, mat: 0, s: 0.03 },
      { x: 0.65, z: 0.35, mat: 3, s: 0.034 },
      { x: 0.78, z: 0.52, mat: 2, s: 0.028 },
      { x: -0.95, z: 0.12, mat: 1, s: 0.032 },
      { x: -0.88, z: -0.15, mat: 3, s: 0.03 },
      { x: 0.85, z: 0.15, mat: 0, s: 0.032 },
      { x: 0.92, z: -0.12, mat: 1, s: 0.028 },
   ];

   flowerPositions.forEach(({ x, z, mat, s }) => {
      const petalMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), flowerMats[mat]);
       petalMesh.position.set(x, 0.616, z);
      petalMesh.castShadow = true;
      group.add(petalMesh);
   });

   // 2. Stylized Grass Tufts (3-Blade Clusters)
   const grassBladeMat = new THREE.MeshStandardMaterial({ color: 0x65a30d, roughness: 0.6, side: THREE.DoubleSide });
   const tuftPositions = [
      { x: -0.82, z: 0.42, r: 0.2 },
      { x: -0.58, z: 0.78, r: -0.4 },
      { x: -0.28, z: 0.92, r: 0.6 },
      { x: 0.45, z: 0.72, r: -0.3 },
      { x: 0.72, z: 0.62, r: 0.5 },
      { x: 0.88, z: 0.32, r: -0.6 },
      { x: -1.1, z: 0.05, r: 0.3 },
      { x: 1.05, z: 0.08, r: -0.2 },
      { x: -0.45, z: -0.45, r: 0.8 },
      { x: 0.42, z: -0.48, r: -0.5 },
   ];

   tuftPositions.forEach(({ x, z, r }) => {
      const tuft = new THREE.Group();
       tuft.position.set(x, 0.612, z);
      tuft.rotation.y = r;

      [-0.015, 0, 0.015].forEach((offset, idx) => {
         const blade = new THREE.Mesh(new THREE.ConeGeometry(0.014, 0.07, 4), grassBladeMat);
         blade.position.set(offset, 0.035, 0);
         blade.rotation.z = (idx - 1) * 0.25;
         tuft.add(blade);
      });
      group.add(tuft);
   });

   // 3. Smooth River Pebbles Scattered on Ground
   const pebblePositions = [
      { x: -0.45, z: 0.28, s: 0.025 },
      { x: -0.22, z: 0.48, s: 0.022 },
      { x: 0.05, z: 0.58, s: 0.028 },
      { x: 0.28, z: 0.72, s: 0.024 },
      { x: 0.48, z: 0.82, s: 0.02 },
      { x: -0.75, z: 0.65, s: 0.026 },
      { x: 0.62, z: 0.45, s: 0.023 },
   ];

   pebblePositions.forEach(({ x, z, s }) => {
      const peb = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 1), stoneMat);
       peb.position.set(x, 0.611 + s * 0.5, z);
      peb.receiveShadow = true;
      group.add(peb);
   });

   return group;
}

/**
 * Creates the wooden fence along the left rim matching main.png
 */
function createWoodenFence(woodMat: THREE.Material): THREE.Group {
   const fence = new THREE.Group();

   const postGeo = new THREE.CylinderGeometry(0.016, 0.018, 0.16, 6);
   const railGeo = new THREE.BoxGeometry(0.24, 0.014, 0.02);

   const posts = [
      { x: -1.02, z: -0.18, rot: 0.3 },
      { x: -1.18, z: 0.02, rot: 0.5 },
      { x: -1.26, z: 0.26, rot: 0.7 },
      { x: -1.22, z: 0.52, rot: 0.9 },
      { x: -1.06, z: 0.76, rot: 1.1 },
      { x: -0.82, z: 0.96, rot: 1.3 },
   ];

   posts.forEach(({ x, z }) => {
      const p = new THREE.Mesh(postGeo, woodMat);
      p.position.set(x, 0.73, z);
      p.castShadow = true;
      fence.add(p);
   });

   // Horizontal Rails
   for (let i = 0; i < posts.length - 1; i++) {
      const p1 = posts[i];
      const p2 = posts[i + 1];
      const midX = (p1.x + p2.x) / 2;
      const midZ = (p1.z + p2.z) / 2;
      const angle = Math.atan2(p2.z - p1.z, p2.x - p1.x);

      [0.72, 0.78].forEach((railY) => {
         const rail = new THREE.Mesh(railGeo, woodMat);
         rail.position.set(midX, railY, midZ);
         rail.rotation.y = -angle;
         rail.castShadow = true;
         fence.add(rail);
      });
   }

   return fence;
}

/**
 * Creates natural vegetation: 3D Pine Trees firmly rooted on plateau, Flower Bushes
 */
function createNatureVegetation(woodMat: THREE.Material, pineLeafMat: THREE.Material, soilMat: THREE.Material): THREE.Group {
   const group = new THREE.Group();

   // 1. Pine Trees (Firmly planted on grass plateau Y = 0.68)
   // Left pine tree
   const tree1 = createPineTree(1.1, woodMat, pineLeafMat, soilMat);
    tree1.position.set(-1.35, 0.622, 0.22);
   group.add(tree1);

   // Back pine tree behind bookshelf
   const tree2 = createPineTree(0.92, woodMat, pineLeafMat, soilMat);
   tree2.position.set(1.15, 0.68, -0.65);
   group.add(tree2);

   // Right pine tree near ledge
   const tree3 = createPineTree(0.72, woodMat, pineLeafMat, soilMat);
   tree3.position.set(1.26, 0.67, 0.36);
   group.add(tree3);

   // 2. Flowering Bush Clusters
   const bushMats = [
      new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.8, flatShading: true }),
      new THREE.MeshStandardMaterial({ color: 0xa855f7, roughness: 0.7, flatShading: true }),
      new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.7, flatShading: true }),
   ];

   const bushes = [
      { x: -0.68, z: 0.28, s: 0.08, mat: bushMats[1] },
      { x: -0.62, z: 0.36, s: 0.06, mat: bushMats[0] },
      { x: 0.18, z: 0.32, s: 0.09, mat: bushMats[2] },
      { x: 0.26, z: 0.38, s: 0.07, mat: bushMats[0] },
      { x: 0.68, z: 0.42, s: 0.08, mat: bushMats[1] },
      { x: -0.22, z: 0.82, s: 0.07, mat: bushMats[0] },
      { x: -0.15, z: 0.88, s: 0.06, mat: bushMats[2] },
   ];

   bushes.forEach(({ x, z, s, mat }) => {
      const b = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 1), mat);
      b.position.set(x, 0.68 + s * 0.4, z);
      b.castShadow = true;
      group.add(b);
   });

   return group;
}

/**
 * Creates the front cliff badges:
 * - Blue glowing `</>` Badge
 * - "I KEEP CODING" Dark Plaque matching main.png
 */
function createCliffBadges(): THREE.Group {
   const group = new THREE.Group();

   // 1. Blue `< / >` Square Badge
   const badgeGroup = new THREE.Group();
   badgeGroup.position.set(-0.48, 0.52, 1.28);
   badgeGroup.rotation.y = 0.25;
   badgeGroup.rotation.x = -0.12;

   const badgeMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      roughness: 0.25,
      metalness: 0.2,
   });
   const badgeBody = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.06), badgeMat);
   badgeBody.castShadow = true;
   badgeGroup.add(badgeBody);

   // White `< / >` text on badge
   const symbolMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
   const slash = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.13, 0.01), symbolMat);
   slash.rotation.z = -0.35;
   slash.position.set(0, 0, 0.035);
   badgeGroup.add(slash);

   const leftArrow = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.06, 0.01), symbolMat);
   leftArrow.rotation.z = 0.6;
   leftArrow.position.set(-0.06, 0.022, 0.035);
   badgeGroup.add(leftArrow);

   const leftArrow2 = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.06, 0.01), symbolMat);
   leftArrow2.rotation.z = -0.6;
   leftArrow2.position.set(-0.06, -0.022, 0.035);
   badgeGroup.add(leftArrow2);

   const rightArrow = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.06, 0.01), symbolMat);
   rightArrow.rotation.z = -0.6;
   rightArrow.position.set(0.06, 0.022, 0.035);
   badgeGroup.add(rightArrow);

   const rightArrow2 = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.06, 0.01), symbolMat);
   rightArrow2.rotation.z = 0.6;
   rightArrow2.position.set(0.06, -0.022, 0.035);
   badgeGroup.add(rightArrow2);

   group.add(badgeGroup);

   // 2. "I KEEP CODING" Plaque
   const plaqueGroup = new THREE.Group();
   plaqueGroup.position.set(-0.12, 0.52, 1.34);
   plaqueGroup.rotation.y = 0.08;
   plaqueGroup.rotation.x = -0.15;

   const plaqueTex = createCodingPlaqueTexture();
   const plaquePlane = new THREE.Mesh(new THREE.PlaneGeometry(0.48, 0.24), new THREE.MeshBasicMaterial({ map: plaqueTex, transparent: true }));
   plaquePlane.position.z = 0.02;
   plaqueGroup.add(plaquePlane);

   const plaqueBack = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.24, 0.03), new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.6 }));
   plaqueBack.castShadow = true;
   plaqueGroup.add(plaqueBack);

   group.add(plaqueGroup);

   return group;
}

/**
 * Creates the luminous translucent orbital ring (3D-003)
 * Large radius (2.56m) ensuring clear non-intersecting orbit around rock waist (1.85m)
 * Consistent depth sorting with depthWrite: true.
 */
function createOrbitalRing(): THREE.Group {
   const ringGroup = new THREE.Group();
   ringGroup.name = 'OrbitalRing';
   ringGroup.position.set(0, -0.14, 0);

   const ringRadius = 2.56;
   const ringGeo = new THREE.TorusGeometry(ringRadius, 0.018, 16, 96);
   const ringMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.82,
      emissive: 0x60a5fa,
      emissiveIntensity: 0.85,
      depthWrite: true,
   });

   const ringMesh = new THREE.Mesh(ringGeo, ringMat);
   ringMesh.rotation.set(Math.PI * 0.44, 0, -0.22);
   ringGroup.add(ringMesh);

   // Small glowing beads on ring
   const beadGeo = new THREE.SphereGeometry(0.035, 8, 8);
   const beadMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });

   [0.4, 1.8, 3.4, 4.8].forEach((ang) => {
      const bead = new THREE.Mesh(beadGeo, beadMat);
      const x = Math.cos(ang) * ringRadius;
      const y = Math.sin(ang) * ringRadius;
      bead.position.set(x, y, 0);
      ringMesh.add(bead);
   });

   return ringGroup;
}

/**
 * Creates the faceted slate-grey rock waist and tapering underside
 */
function createRockWaistAndUnderside(rockMat: THREE.Material, darkRockMat: THREE.Material): THREE.Group {
   const group = new THREE.Group();

   // Middle Rocky Cliff Waist
   const midCliffGeo = new THREE.CylinderGeometry(1.84, 1.48, 0.75, 24);
   const mcPos = midCliffGeo.attributes.position;
   for (let i = 0; i < mcPos.count; i++) {
      const x = mcPos.getX(i);
      const y = mcPos.getY(i);
      const z = mcPos.getZ(i);
      const angle = Math.atan2(z, x);
      const crag = Math.sin(angle * 4.0 + y * 3.0) * 0.1 + Math.cos(angle * 2.5) * 0.08;
      mcPos.setX(i, x + Math.cos(angle) * crag);
      mcPos.setZ(i, z + Math.sin(angle) * crag);
   }
   midCliffGeo.computeVertexNormals();

   const midCliff = new THREE.Mesh(midCliffGeo, rockMat);
   midCliff.position.set(0, -0.02, 0);
   midCliff.castShadow = true;
   midCliff.receiveShadow = true;
   group.add(midCliff);

   // Lower Rock Band
   const lowerBandGeo = new THREE.CylinderGeometry(1.48, 1.25, 0.45, 22);
   const lbPos = lowerBandGeo.attributes.position;
   for (let i = 0; i < lbPos.count; i++) {
      const x = lbPos.getX(i);
      const y = lbPos.getY(i);
      const z = lbPos.getZ(i);
      const angle = Math.atan2(z, x);
      const crag = Math.sin(angle * 3.0 + y * 2.0) * 0.08 + Math.cos(angle * 2.0) * 0.06;
      lbPos.setX(i, x + Math.cos(angle) * crag);
      lbPos.setZ(i, z + Math.sin(angle) * crag);
   }
   lowerBandGeo.computeVertexNormals();
   const lowerBand = new THREE.Mesh(lowerBandGeo, darkRockMat);
   lowerBand.position.set(0, -0.62, 0);
   lowerBand.castShadow = true;
   lowerBand.receiveShadow = true;
   group.add(lowerBand);

   // Inverted Faceted Rock Underside
   const underConeGeo = new THREE.ConeGeometry(1.45, 1.6, 16, 6);
   const ucPos = underConeGeo.attributes.position;
   for (let i = 0; i < ucPos.count; i++) {
      const x = ucPos.getX(i);
      const y = ucPos.getY(i);
      const z = ucPos.getZ(i);
      const angle = Math.atan2(z, x);
      const heightFactor = Math.max(0, 1 - (y + 0.8) / 1.6);
      const crag = (Math.sin(angle * 3.0 + y * 2.5) * 0.12 + Math.cos(angle * 2.0) * 0.08) * heightFactor;
      ucPos.setX(i, x + Math.cos(angle) * crag);
      ucPos.setZ(i, z + Math.sin(angle) * crag);
   }
   underConeGeo.computeVertexNormals();

   const underside = new THREE.Mesh(underConeGeo, darkRockMat);
   underside.rotation.x = Math.PI;
   underside.position.set(0, -0.85, 0);
   underside.castShadow = true;
   underside.receiveShadow = true;
   group.add(underside);

   // Suspended floating micro-rocks below tip
   const suspendedRocks = [
      { x: 0.12, y: -1.65, z: 0.08, s: 0.1, rot: [0.3, 0.5, 0.2] },
      { x: -0.15, y: -1.82, z: -0.12, s: 0.075, rot: [0.6, 0.2, 0.4] },
      { x: 0.16, y: -1.98, z: 0.12, s: 0.06, rot: [0.2, 0.7, 0.5] },
   ];

   suspendedRocks.forEach(({ x, y, z, s, rot }) => {
      const frag = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), rockMat);
      frag.position.set(x, y, z);
      frag.rotation.set(rot[0], rot[1], rot[2]);
      group.add(frag);
   });

   return group;
}

/**
 * Creates perimeter rock ledges
 */
function createPerimeterBoulders(rockMat: THREE.Material, darkRockMat: THREE.Material, lightRockMat: THREE.Material): THREE.Group {
   const group = new THREE.Group();
   const bGeo = new THREE.DodecahedronGeometry(1, 0);

   const boulders = [
      { pos: [-1.68, 0.15, 0.35], s: [0.46, 0.35, 0.42], rot: [0.2, 0.5, 0.1], mat: rockMat },
      { pos: [-1.58, 0.25, -0.38], s: [0.44, 0.36, 0.4], rot: [-0.3, 0.2, 0.4], mat: darkRockMat },
      { pos: [-1.42, -0.05, 0.95], s: [0.4, 0.3, 0.35], rot: [0.4, -0.2, 0.3], mat: lightRockMat },
      { pos: [-0.92, -0.12, 1.48], s: [0.48, 0.36, 0.42], rot: [0.3, 0.4, -0.2], mat: darkRockMat },
      { pos: [-0.32, -0.18, 1.6], s: [0.42, 0.32, 0.38], rot: [0.1, -0.3, 0.2], mat: rockMat },
      { pos: [1.54, 0.12, 0.42], s: [0.42, 0.32, 0.38], rot: [-0.2, 0.6, -0.3], mat: rockMat },
      { pos: [1.42, -0.02, 0.92], s: [0.46, 0.34, 0.4], rot: [0.3, 0.1, -0.2], mat: darkRockMat },
      { pos: [-0.48, -0.85, 0.68], s: [0.55, 0.42, 0.48], rot: [0.5, 0.2, -0.4], mat: darkRockMat },
      { pos: [0.52, -0.95, 0.62], s: [0.58, 0.44, 0.5], rot: [-0.3, 0.5, 0.2], mat: rockMat },
      { pos: [0.08, -1.18, -0.28], s: [0.62, 0.48, 0.54], rot: [0.2, -0.4, 0.5], mat: darkRockMat },
   ];

   boulders.forEach(({ pos, s, rot, mat }) => {
      const bMesh = new THREE.Mesh(bGeo, mat);
      bMesh.position.set(pos[0], pos[1], pos[2]);
      bMesh.scale.set(s[0], s[1], s[2]);
      bMesh.rotation.set(rot[0], rot[1], rot[2]);
      bMesh.castShadow = true;
      bMesh.receiveShadow = true;
      group.add(bMesh);
   });

   return group;
}

/**
 * Creates the Mini Developer Planet diorama matching main.png:
 * - Lush, vibrant lime-green grass plateau with flat workspace & winding cobblestones
 * - High-density micro-props (wildflowers, grass tufts, pebbles)
 * - Clean non-intersecting rock waist and underside
 * - Non-clipping luminous orbital ring with correct depth ordering
 * - Grounded pine trees with soil base mounds
 */
export function createMiniPlanet(): THREE.Group {
   const planetGroup = new THREE.Group();
   planetGroup.name = 'MiniPlanetDiorama';

   // Materials
   const grassMat = new THREE.MeshStandardMaterial({
      color: 0x86c726,
      roughness: 0.8,
      metalness: 0.02,
      flatShading: true,
   });

    const dirtEdgeMat = new THREE.MeshStandardMaterial({
       color: 0x86c726,
      roughness: 0.88,
      metalness: 0.05,
      flatShading: true,
   });

   const soilMat = new THREE.MeshStandardMaterial({
      color: 0x451a03,
      roughness: 0.9,
      metalness: 0.05,
      flatShading: true,
   });

   const stoneMat = new THREE.MeshStandardMaterial({
      color: 0xcfd8dc,
      roughness: 0.75,
      metalness: 0.1,
      flatShading: true,
   });

   const woodMat = new THREE.MeshStandardMaterial({
      color: 0x78350f,
      roughness: 0.7,
      metalness: 0.1,
   });

   const pineLeafMat = new THREE.MeshStandardMaterial({
      color: 0x15803d,
      roughness: 0.6,
      metalness: 0.05,
      flatShading: true,
   });

   const rockMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.88,
      metalness: 0.08,
      flatShading: true,
   });

   const darkRockMat = new THREE.MeshStandardMaterial({
      color: 0x55677d,
      roughness: 0.92,
      metalness: 0.1,
      flatShading: true,
   });

   const lightRockMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.85,
      metalness: 0.08,
      flatShading: true,
   });

   // 1. Lush Top Grass Dome & Pathway
   planetGroup.add(createGrassDome(grassMat, dirtEdgeMat, stoneMat));

   // 2. High-Density Micro-Props (Flowers, Grass Tufts, Pebbles)
   planetGroup.add(createMicroProps(stoneMat));

   // 3. Wooden Fence
   planetGroup.add(createWoodenFence(woodMat));

   // 4. Nature Vegetation (Pine trees with soil bases & bush flowers)
   planetGroup.add(createNatureVegetation(woodMat, pineLeafMat, soilMat));

   // 5. Front Cliff Badges ("I KEEP CODING" & `</>`)
   planetGroup.add(createCliffBadges());

   // 6. Non-Clipping Luminous Orbital Ring
   planetGroup.add(createOrbitalRing());

   // 7. Rock Waist & Inverted Cone Underside
   planetGroup.add(createRockWaistAndUnderside(rockMat, darkRockMat));

   // 8. Perimeter & Hanging Boulders
   planetGroup.add(createPerimeterBoulders(rockMat, darkRockMat, lightRockMat));

   return planetGroup;
}
