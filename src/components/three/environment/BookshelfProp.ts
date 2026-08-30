import * as THREE from 'three';

/**
 * Creates the 2x2 Cabinet Frame with horizontal & vertical dividers
 */
function createCabinetFrame(cabinetMat: THREE.Material, innerMat: THREE.Material, width: number, height: number, depth: number, thickness: number): THREE.Group {
   const group = new THREE.Group();

   // Outer Back panel
   const back = new THREE.Mesh(new THREE.BoxGeometry(width, height, thickness), cabinetMat);
   back.position.set(0, height / 2, -depth / 2 + thickness / 2);
   group.add(back);

   // Left & Right walls
   [-width / 2 + thickness / 2, width / 2 - thickness / 2].forEach((xPos) => {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(thickness, height, depth), cabinetMat);
      wall.position.set(xPos, height / 2, 0);
      wall.castShadow = true;
      group.add(wall);
   });

   // Top & Bottom shelves
   [thickness / 2, height - thickness / 2].forEach((yPos) => {
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(width, thickness, depth), cabinetMat);
      shelf.position.set(0, yPos, 0);
      shelf.castShadow = true;
      group.add(shelf);
   });

   // Center Horizontal Divider
   const midShelf = new THREE.Mesh(new THREE.BoxGeometry(width - thickness * 2, thickness, depth), innerMat);
   midShelf.position.set(0, height / 2, 0);
   midShelf.castShadow = true;
   group.add(midShelf);

   // Center Vertical Divider
   const midWall = new THREE.Mesh(new THREE.BoxGeometry(thickness, height - thickness * 2, depth), innerMat);
   midWall.position.set(0, height / 2, 0);
   midWall.castShadow = true;
   group.add(midWall);

   return group;
}

/**
 * Creates the Colorful Books inside the 3 shelf compartments
 */
function createCompartmentBooks(
   bookMats: { red: THREE.Material; blue: THREE.Material; green: THREE.Material; yellow: THREE.Material; white: THREE.Material },
   height: number,
   thickness: number,
): THREE.Group {
   const group = new THREE.Group();

   // Top-Left Compartment
   const tlBooks = [
      { x: -0.21, h: 0.24, w: 0.038, d: 0.22, mat: bookMats.red },
      { x: -0.17, h: 0.26, w: 0.042, d: 0.23, mat: bookMats.green },
      { x: -0.12, h: 0.23, w: 0.045, d: 0.21, mat: bookMats.yellow },
      { x: -0.07, h: 0.25, w: 0.04, d: 0.22, mat: bookMats.blue },
   ];
   tlBooks.forEach(({ x, h, w, d, mat }) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      b.position.set(x, height / 2 + thickness + h / 2, 0);
      b.castShadow = true;
      group.add(b);
   });

   // Bottom-Left Compartment
   const blBooks = [
      { x: -0.22, h: 0.25, w: 0.035, d: 0.23, mat: bookMats.blue },
      { x: -0.18, h: 0.27, w: 0.04, d: 0.22, mat: bookMats.white },
      { x: -0.14, h: 0.24, w: 0.038, d: 0.21, mat: bookMats.red },
      { x: -0.09, h: 0.26, w: 0.042, d: 0.23, mat: bookMats.green },
      { x: -0.04, h: 0.23, w: 0.045, d: 0.2, mat: bookMats.yellow },
   ];
   blBooks.forEach(({ x, h, w, d, mat }) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      b.position.set(x, thickness + h / 2, 0);
      b.castShadow = true;
      group.add(b);
   });

   // Bottom-Right Compartment
   const brBooks = [
      { x: 0.04, h: 0.25, w: 0.038, d: 0.22, mat: bookMats.yellow },
      { x: 0.09, h: 0.26, w: 0.042, d: 0.23, mat: bookMats.red },
      { x: 0.14, h: 0.24, w: 0.04, d: 0.21, mat: bookMats.blue },
      { x: 0.19, h: 0.27, w: 0.038, d: 0.22, mat: bookMats.white },
      { x: 0.23, h: 0.23, w: 0.035, d: 0.2, mat: bookMats.green },
   ];
   brBooks.forEach(({ x, h, w, d, mat }) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      b.position.set(x, thickness + h / 2, 0);
      b.castShadow = true;
      group.add(b);
   });

   return group;
}

/**
 * Creates the glowing 3D extruded star in the Top-Right Compartment
 */
function createGlowingStar(starMat: THREE.Material, height: number): THREE.Group {
   const group = new THREE.Group();

   const starShape = new THREE.Shape();
   const points = 5;
   const outerR = 0.09;
   const innerR = 0.045;
   for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0) starShape.moveTo(x, y);
      else starShape.lineTo(x, y);
   }
   starShape.closePath();

   const starGeo = new THREE.ExtrudeGeometry(starShape, {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.008,
      bevelThickness: 0.008,
   });

   const starMesh = new THREE.Mesh(starGeo, starMat);
   starMesh.position.set(0.14, height * 0.73, -0.02);
   group.add(starMesh);

   const starLight = new THREE.PointLight(0xfacc15, 1.2, 1.0);
   starLight.position.set(0.14, height * 0.73, 0.08);
   group.add(starLight);

   return group;
}

/**
 * Creates the 2x2 compartment Bookshelf Cabinet matching image.png:
 * - Clean grey slate cabinet body
 * - Filled with standing and stacked colorful books
 * - Top-right compartment contains a warm glowing 3D star prop
 */
export function createBookshelfProp(): THREE.Group {
   const cabinetGroup = new THREE.Group();
   cabinetGroup.name = 'BookshelfCabinet';

   cabinetGroup.position.set(1.0, 0.68, -0.32);
   cabinetGroup.rotation.y = -0.34;

   // Contact shadow
   const shadowGeo = new THREE.PlaneGeometry(0.64, 0.38);
   const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.28, depthWrite: false });
   const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
   contactShadow.rotation.x = -Math.PI / 2;
   contactShadow.position.set(0, 0.005, 0);
   cabinetGroup.add(contactShadow);

   // Materials
   const cabinetMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.35, metalness: 0.2 });
   const innerMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.45 });
   const bookMats = {
      red: new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 }),
      blue: new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.4 }),
      green: new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.4 }),
      yellow: new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.4 }),
      white: new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 }),
   };
   const starMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      roughness: 0.1,
      metalness: 0.1,
      emissive: 0xfacc15,
      emissiveIntensity: 0.85,
   });

   const width = 0.58;
   const height = 0.68;
   const depth = 0.32;
   const thickness = 0.024;

   // 1. Cabinet Frame
   cabinetGroup.add(createCabinetFrame(cabinetMat, innerMat, width, height, depth, thickness));

   // 2. Books
   cabinetGroup.add(createCompartmentBooks(bookMats, height, thickness));

   // 3. Glowing 3D Star
   cabinetGroup.add(createGlowingStar(starMat, height));

   return cabinetGroup;
}
