import * as THREE from 'three';
import { Animated3DObject } from '../setup/types';

/**
 * Creates the Robot Head with glossy white shell, dark visor, cyan digital eyes, and headphones
 */
function createRobotHead(
   whiteMat: THREE.Material,
   darkVisorMat: THREE.Material,
   cyanGlowMat: THREE.Material,
   headphoneMat: THREE.Material
): THREE.Group {
   const headGroup = new THREE.Group();
   headGroup.position.set(0, 0.38, -0.01);

   // Glossy rounded white helmet shell
   const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 20, 20), whiteMat);
   head.scale.set(1.05, 0.95, 1.0);
   head.castShadow = true;
   headGroup.add(head);

   // Front Visor Screen
   const visor = new THREE.Mesh(new THREE.SphereGeometry(0.128, 16, 16), darkVisorMat);
   visor.scale.set(0.92, 0.72, 0.6);
   visor.position.set(0, 0.01, 0.07);
   headGroup.add(visor);

   // Twin Expressive Digital Cyan Eyes
   [-0.038, 0.038].forEach((xEye) => {
      const eye = new THREE.Mesh(new THREE.CapsuleGeometry(0.012, 0.024, 4, 8), cyanGlowMat);
      eye.position.set(xEye, 0.015, 0.134);
      headGroup.add(eye);
   });

   // Earphones / Headphones on sides
   [-0.15, 0.15].forEach((xEar) => {
      const ear = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.028, 12), headphoneMat);
      ear.rotation.z = Math.PI / 2;
      ear.position.set(xEar, 0.02, 0);
      headGroup.add(ear);

      const earRing = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.006, 8, 16), cyanGlowMat);
      earRing.rotation.y = Math.PI / 2;
      earRing.position.set(xEar * 1.08, 0.02, 0);
      headGroup.add(earRing);
   });

   // Headband
   const band = new THREE.Mesh(new THREE.TorusGeometry(0.145, 0.01, 8, 16, Math.PI), headphoneMat);
   band.rotation.x = -Math.PI / 2;
   band.rotation.z = Math.PI;
   band.position.set(0, 0.04, 0);
   headGroup.add(band);

   return headGroup;
}

/**
 * Creates the Lap Tablet with glowing cyan screen
 */
function createRobotTablet(darkVisorMat: THREE.Material, cyanGlowMat: THREE.Material): THREE.Group {
   const tabletGroup = new THREE.Group();
   tabletGroup.position.set(0, 0.15, 0.11);
   tabletGroup.rotation.x = 0.55;

   const tabBody = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.11, 0.012), darkVisorMat);
   tabletGroup.add(tabBody);

   const tabScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.09), cyanGlowMat);
   tabScreen.position.set(0, 0, 0.007);
   tabletGroup.add(tabScreen);

   return tabletGroup;
}

/**
 * Creates the Robot Arms resting on lap holding the tablet
 */
function createRobotArms(whiteMat: THREE.Material, darkVisorMat: THREE.Material): THREE.Group {
   const group = new THREE.Group();

   [-0.14, 0.14].forEach((xArm) => {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.02, 0.14, 8), whiteMat);
      arm.position.set(xArm, 0.18, 0.04);
      arm.rotation.set(0.65, xArm > 0 ? -0.35 : 0.35, xArm > 0 ? -0.25 : 0.25);
      arm.castShadow = true;
      group.add(arm);

      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 8), darkVisorMat);
      hand.position.set(xArm * 0.75, 0.12, 0.12);
      group.add(hand);
   });

   return group;
}

/**
 * Creates the Dangling Legs over the cliff edge
 */
function createRobotLegs(whiteMat: THREE.Material, darkVisorMat: THREE.Material): {
   legsGroup: THREE.Group;
   legs: THREE.Group[];
} {
   const legsGroup = new THREE.Group();
   const legs: THREE.Group[] = [];

   [-0.065, 0.065].forEach((xLeg) => {
      const singleLeg = new THREE.Group();
      singleLeg.position.set(xLeg, 0.04, 0.11);

      const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.024, 0.11, 8), whiteMat);
      thigh.position.set(0, -0.045, 0);
      singleLeg.add(thigh);

      const foot = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 8), darkVisorMat);
      foot.position.set(0, -0.095, 0.012);
      foot.scale.set(0.9, 0.8, 1.2);
      singleLeg.add(foot);

      legsGroup.add(singleLeg);
      legs.push(singleLeg);
   });

   return { legsGroup, legs };
}

/**
 * Creates the Seated Companion Robot on front-right rock ledge matching main.png:
 * - Clear solid contact shadow (3D-005)
 * - White ceramic torso and round head
 * - Dark visor with cyan digital capsule eyes
 * - White headphones with cyan LED ring
 * - Tablet on lap & swinging legs
 */
export function createRobotAssistant(): Animated3DObject {
   const robotGroup = new THREE.Group();
   robotGroup.name = 'RobotCompanion';
   robotGroup.scale.setScalar(0.92);

   robotGroup.position.set(0.8, 0.68, 0.92);
   robotGroup.rotation.y = -0.52;

   // Materials
   const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2, metalness: 0.15 });
   const darkVisorMat = new THREE.MeshStandardMaterial({ color: 0x09111e, roughness: 0.1, metalness: 0.8 });
   const cyanGlowMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
   const headphoneMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.3, metalness: 0.7 });
   const benchMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6, metalness: 0.1 });

   // 1. Strong AO Ground Contact Shadow (Resolves 3D-005 floating artifact)
   const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
   });
   const benchShadow = new THREE.Mesh(new THREE.CircleGeometry(0.24, 16), shadowMat);
   benchShadow.rotation.x = -Math.PI / 2;
   benchShadow.position.set(0, 0.005, -0.02);
   robotGroup.add(benchShadow);

   // Stone Ledge Seat Bench
   const bench = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.035, 0.28), benchMat);
   bench.position.set(0, 0.018, 0);
   bench.receiveShadow = true;
   bench.castShadow = true;
   robotGroup.add(bench);

   // 2. Torso
   const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.13, 0.22, 16), whiteMat);
   torso.position.set(0, 0.16, -0.02);
   torso.castShadow = true;
   robotGroup.add(torso);

   // 3. Head & Visor
   const headGroup = createRobotHead(whiteMat, darkVisorMat, cyanGlowMat, headphoneMat);
   robotGroup.add(headGroup);

   // 4. Tablet
   const tabletGroup = createRobotTablet(darkVisorMat, cyanGlowMat);
   robotGroup.add(tabletGroup);

   // 5. Arms
   robotGroup.add(createRobotArms(whiteMat, darkVisorMat));

   // 6. Legs
   const { legsGroup, legs } = createRobotLegs(whiteMat, darkVisorMat);
   robotGroup.add(legsGroup);

   // 7. Animation Loop
   const update = (elapsedTime: number) => {
      headGroup.rotation.y = Math.sin(elapsedTime * 0.9) * 0.08;
      headGroup.rotation.z = Math.cos(elapsedTime * 1.2) * 0.04;
      tabletGroup.position.y = 0.15 + Math.sin(elapsedTime * 1.6) * 0.008;

      if (legs[0]) legs[0].rotation.x = Math.sin(elapsedTime * 2.2) * 0.08;
      if (legs[1]) legs[1].rotation.x = -Math.sin(elapsedTime * 2.2) * 0.08;
   };

   return { group: robotGroup, update };
}
