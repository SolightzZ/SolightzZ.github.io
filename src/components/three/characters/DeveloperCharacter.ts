import * as THREE from 'three';
import { Animated3DObject } from '../setup/types';

/**
 * Creates the Ergonomic Office Chair with 5-star caster wheels
 */
function createOfficeChair(chairMat: THREE.Material, chairMetalMat: THREE.Material): THREE.Group {
   const chairGroup = new THREE.Group();

   // Seat Cushion
   const seat = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.055, 0.36), chairMat);
   seat.position.set(0, 0.36, 0);
   seat.castShadow = true;
   chairGroup.add(seat);

   // Backrest & Headrest (High-back ergonomic chair matching image.png)
   const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.38, 0.05), chairMat);
   backrest.position.set(0, 0.56, 0.16);
   backrest.rotation.x = -0.06;
   backrest.castShadow = true;
   chairGroup.add(backrest);

   const headrest = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.11, 0.045), chairMat);
   headrest.position.set(0, 0.77, 0.17);
   headrest.rotation.x = -0.04;
   chairGroup.add(headrest);

   // Armrests
   [-0.2, 0.2].forEach((xArm) => {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.15, 8), chairMetalMat);
      post.position.set(xArm, 0.42, 0.02);
      chairGroup.add(post);

      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.018, 0.18), chairMat);
      pad.position.set(xArm, 0.49, 0.02);
      chairGroup.add(pad);
   });

   // Stem
   const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.28, 12), chairMetalMat);
   stem.position.set(0, 0.18, 0);
   chairGroup.add(stem);

   // 5-Star Wheel Base with Radially Aligned Caster Wheels
   for (let s = 0; s < 5; s++) {
      const spokeGroup = new THREE.Group();
      const ang = (s / 5) * Math.PI * 2;
      spokeGroup.rotation.y = ang;

      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.015, 0.18), chairMetalMat);
      spoke.position.set(0, 0.02, 0.09);
      spokeGroup.add(spoke);

      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.012, 8), chairMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(0, 0.015, 0.18);
      spokeGroup.add(wheel);

      chairGroup.add(spokeGroup);
   }

   return chairGroup;
}

/**
 * Creates the Developer Head, Dual Ears, Glasses, and Messy Hair
 */
function createCharacterHead(
   skinMat: THREE.Material,
   glassesMat: THREE.Material,
   eyeMat: THREE.Material,
   hairMat: THREE.Material
): THREE.Group {
   const headGroup = new THREE.Group();
   headGroup.position.set(0, 0.88, 0.04);

   // Face sphere
   const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 20, 20), skinMat);
   head.castShadow = true;
   headGroup.add(head);

   // Dual Ears (Left and Right)
   [-0.14, 0.14].forEach((xEar) => {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), skinMat);
      ear.position.set(xEar, 0, 0);
      headGroup.add(ear);
   });

   // Glasses & Eye Dots
   const glassesGroup = new THREE.Group();
   glassesGroup.position.set(0, 0.015, -0.136);

   [-0.048, 0.048].forEach((xRim) => {
      const rim = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.038, 0.012), glassesMat);
      rim.position.set(xRim, 0, 0);
      glassesGroup.add(rim);

      const eyeDot = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 8), eyeMat);
      eyeDot.position.set(xRim, 0, -0.006);
      glassesGroup.add(eyeDot);
   });

   const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.008, 0.01), glassesMat);
   bridge.position.set(0, 0.004, 0);
   glassesGroup.add(bridge);
   headGroup.add(glassesGroup);

   // Full 360 Messy Hair Volume
   const hairPuffs = [
      { x: 0, y: 0.06, z: 0.01, s: [0.15, 0.13, 0.145] },
      { x: -0.06, y: 0.09, z: -0.03, s: [0.085, 0.08, 0.085] },
      { x: 0.06, y: 0.09, z: -0.03, s: [0.085, 0.08, 0.085] },
      { x: -0.05, y: 0.07, z: -0.09, s: [0.075, 0.06, 0.07] },
      { x: 0.04, y: 0.075, z: -0.09, s: [0.075, 0.06, 0.07] },
      { x: 0, y: 0.085, z: -0.08, s: [0.08, 0.065, 0.07] },
      { x: -0.11, y: 0.03, z: -0.04, s: [0.07, 0.08, 0.075] },
      { x: 0.11, y: 0.03, z: -0.04, s: [0.07, 0.08, 0.075] },
      { x: -0.08, y: 0.02, z: 0.06, s: [0.09, 0.08, 0.08] },
      { x: 0.08, y: 0.02, z: 0.06, s: [0.09, 0.08, 0.08] },
      { x: 0, y: 0.05, z: 0.085, s: [0.1, 0.09, 0.09] },
      { x: -0.05, y: -0.03, z: 0.085, s: [0.07, 0.07, 0.07] },
      { x: 0.05, y: -0.03, z: 0.085, s: [0.07, 0.07, 0.07] },
   ];

   hairPuffs.forEach(({ x, y, z, s }) => {
      const hMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(1, 0), hairMat);
      hMesh.position.set(x, y, z);
      hMesh.scale.set(s[0], s[1], s[2]);
      headGroup.add(hMesh);
   });

   return headGroup;
}

/**
 * Creates the Left and Right Arms positioned forward for typing
 */
function createCharacterArms(hoodieMat: THREE.Material, skinMat: THREE.Material): {
   lArmGroup: THREE.Group;
   rArmGroup: THREE.Group;
} {
   const lArmGroup = new THREE.Group();
   lArmGroup.position.set(-0.14, 0.67, 0.04);

   const lUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.032, 0.18, 8), hoodieMat);
   lUpper.position.set(-0.02, -0.08, -0.06);
   lUpper.rotation.set(0.65, 0.15, 0.25);
   lArmGroup.add(lUpper);

   const lForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.026, 0.18, 8), hoodieMat);
   lForearm.position.set(-0.01, -0.14, -0.19);
   lForearm.rotation.set(1.35, 0.2, 0.3);
   lArmGroup.add(lForearm);

   const lHand = new THREE.Mesh(new THREE.SphereGeometry(0.026, 8, 8), skinMat);
   lHand.position.set(0.02, -0.14, -0.28);
   lArmGroup.add(lHand);

   const rArmGroup = new THREE.Group();
   rArmGroup.position.set(0.14, 0.67, 0.04);

   const rUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.032, 0.18, 8), hoodieMat);
   rUpper.position.set(0.02, -0.08, -0.06);
   rUpper.rotation.set(0.65, -0.15, -0.25);
   rArmGroup.add(rUpper);

   const rForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.026, 0.18, 8), hoodieMat);
   rForearm.position.set(0.01, -0.14, -0.19);
   rForearm.rotation.set(1.35, -0.2, -0.3);
   rArmGroup.add(rForearm);

   const rHand = new THREE.Mesh(new THREE.SphereGeometry(0.026, 8, 8), skinMat);
   rHand.position.set(-0.02, -0.14, -0.28);
   rArmGroup.add(rHand);

   return { lArmGroup, rArmGroup };
}

/**
 * Creates the Legs and White Sole Sneakers tucked under the desk
 */
function createCharacterLegs(pantsMat: THREE.Material, shoeMat: THREE.Material, soleMat: THREE.Material): THREE.Group {
   const group = new THREE.Group();

   [-0.075, 0.075].forEach((xLeg) => {
      const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.044, 0.22, 10), pantsMat);
      thigh.position.set(xLeg, 0.43, -0.06);
      thigh.rotation.x = Math.PI / 2 - 0.12;
      group.add(thigh);

      const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.038, 0.2, 10), pantsMat);
      shin.position.set(xLeg, 0.29, -0.17);
      group.add(shin);

      const shoeGroup = new THREE.Group();
      shoeGroup.position.set(xLeg, 0.15, -0.19);

      const shoeBody = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.045, 0.13), shoeMat);
      shoeBody.position.set(0, 0.02, -0.02);
      shoeGroup.add(shoeBody);

      const sole = new THREE.Mesh(new THREE.BoxGeometry(0.078, 0.014, 0.134), soleMat);
      sole.position.set(0, -0.01, -0.02);
      shoeGroup.add(sole);

      group.add(shoeGroup);
   });

   return group;
}

/**
 * Creates the Developer Figurine seated in the office chair:
 * - Perfectly aligned in front of desk and keyboard
 * - Ergonomic office chair with 5-star caster wheel base
 * - Stylized 3D character in royal blue hoodie with drawstrings, dark pants, sneakers
 * - Complete messy hair volume, dual ears, and developer glasses
 * - Live typing & idle breathing/head animation
 */
export function createDeveloperCharacter(): Animated3DObject {
   const charGroup = new THREE.Group();
   charGroup.name = 'DeveloperCharacter';
   charGroup.scale.setScalar(1.02);

   charGroup.position.set(-0.35, 0.68, -0.04);
   charGroup.rotation.y = -0.36;

   // Contact shadows (Chair Base + Shoes)
   const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
   });

   // Central Chair Wheel Base Shadow
   const chairShadow = new THREE.Mesh(new THREE.CircleGeometry(0.24, 16), shadowMat);
   chairShadow.rotation.x = -Math.PI / 2;
   chairShadow.position.set(0, 0.005, 0.05);
   charGroup.add(chairShadow);

   // Shoe Soles Contact Shadows
   [-0.075, 0.075].forEach((xLeg) => {
      const shoeShadow = new THREE.Mesh(new THREE.CircleGeometry(0.065, 12), shadowMat);
      shoeShadow.rotation.x = -Math.PI / 2;
      shoeShadow.position.set(xLeg, 0.005, -0.21);
      charGroup.add(shoeShadow);
   });

   // Materials
   const chairMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.45, metalness: 0.1 });
   const chairMetalMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.25, metalness: 0.8 });
   const hoodieMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.65, metalness: 0.05 });
   const hairMat = new THREE.MeshStandardMaterial({ color: 0x1e1e24, roughness: 0.6, metalness: 0.05 });
   const skinMat = new THREE.MeshStandardMaterial({ color: 0xfde68a, roughness: 0.55, metalness: 0.05 });
   const glassesMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.9 });
   const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
   const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
   const pantsMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.75 });
   const shoeMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 });
   const soleMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });

   // 1. Office Chair
   charGroup.add(createOfficeChair(chairMat, chairMetalMat));

   // 2. Torso (Royal Blue Hoodie)
   const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.145, 0.3, 14), hoodieMat);
   torso.position.set(0, 0.58, 0.04);
   torso.rotation.x = 0.06;
   torso.castShadow = true;
   charGroup.add(torso);

   // Hoodie drawstrings on chest
   [-0.03, 0.03].forEach((xStr) => {
      const str = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.08, 6), whiteMat);
      str.position.set(xStr, 0.64, -0.09);
      str.rotation.x = 0.08;
      charGroup.add(str);
   });

   // Hoodie Hood on Back of Neck
   const hoodPuff = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), hoodieMat);
   hoodPuff.position.set(0, 0.71, 0.11);
   hoodPuff.scale.set(1.1, 0.7, 0.8);
   charGroup.add(hoodPuff);

   // 3. Head & Glasses
   const headGroup = createCharacterHead(skinMat, glassesMat, eyeMat, hairMat);
   charGroup.add(headGroup);

   // 4. Arms & Hands
   const { lArmGroup, rArmGroup } = createCharacterArms(hoodieMat, skinMat);
   charGroup.add(lArmGroup);
   charGroup.add(rArmGroup);

   // 5. Legs & Shoes
   charGroup.add(createCharacterLegs(pantsMat, shoeMat, soleMat));

   // 6. Interactive Animation Loop
   const update = (elapsedTime: number) => {
      lArmGroup.rotation.x = Math.sin(elapsedTime * 11) * 0.035;
      rArmGroup.rotation.x = Math.cos(elapsedTime * 11) * 0.035;
      headGroup.rotation.y = Math.sin(elapsedTime * 1.3) * 0.04;
      headGroup.rotation.x = 0.04 + Math.cos(elapsedTime * 1.7) * 0.02;
      torso.position.y = 0.58 + Math.sin(elapsedTime * 2.2) * 0.003;
   };

   return { group: charGroup, update };
}
