import * as THREE from 'three';
import { create2DCanvas } from '../../../utils/canvas';

/**
 * Creates the high-resolution programmatic canvas texture for the code editor monitor.
 */
function createCodeScreenTexture(): THREE.CanvasTexture {
   const created = create2DCanvas(1024, 600);
   const canvas = created?.canvas ?? document.createElement('canvas');
   const ctx = created?.ctx;

   if (ctx) {
      // 1. Dark IDE background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Top editor title bar & window tabs
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, canvas.width, 48);

      // macOS window dots
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(24, 24, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(44, 24, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.arc(64, 24, 6, 0, Math.PI * 2);
      ctx.fill();

      // Active tab
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(92, 8, 220, 40);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(92, 48);
      ctx.lineTo(312, 48);
      ctx.stroke();

      ctx.font = 'bold 15px "JetBrains Mono", monospace';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('⚡ Portfolio.tsx', 116, 33);

      // 3. Line numbers & gutter
      ctx.fillStyle = '#141e33';
      ctx.fillRect(0, 48, 50, canvas.height - 48);

      ctx.font = '14px "JetBrains Mono", monospace';
      for (let i = 1; i <= 17; i++) {
         ctx.fillStyle = i === 5 || i === 6 ? '#38bdf8' : '#475569';
         ctx.fillText(i.toString().padStart(2, ' '), 18, 80 + (i - 1) * 26);
      }

      // 4. Code Syntax lines matching main.png
      const codeLines = [
         { text: '// Full Stack Developer Portfolio', color: '#64748b' },
         { text: 'import { React, ThreeJS } from "core";', color: '#f43f5e' },
         { text: '', color: '#fff' },
         { text: 'export const Portfolio = () => {', color: '#38bdf8' },
         { text: '  const developer = "Paniti Jahem";', color: '#34d399' },
         { text: '  const stack = ["TS", "React", "Node"];', color: '#fbbf24' },
         { text: '  const passion = "I Keep Coding";', color: '#38bdf8' },
         { text: '', color: '#fff' },
         { text: '  return <HeroView active={true} />;', color: '#34d399' },
         { text: '};', color: '#38bdf8' },
      ];

      codeLines.forEach((line, idx) => {
         ctx.fillStyle = line.color;
         ctx.font = 'bold 15px "JetBrains Mono", monospace';
         ctx.fillText(line.text, 70, 80 + idx * 26);
      });
   }

   const texture = new THREE.CanvasTexture(canvas);
   texture.minFilter = THREE.LinearFilter;
   texture.magFilter = THREE.LinearFilter;
   return texture;
}

/**
 * Creates the Desk with white tabletop and angled wooden legs
 */
function createDesk(whiteTopMat: THREE.Material, woodLegMat: THREE.Material, width: number, depth: number, height: number): THREE.Group {
   const group = new THREE.Group();

   const topMesh = new THREE.Mesh(new THREE.BoxGeometry(width, 0.045, depth), whiteTopMat);
   topMesh.position.set(0, height, 0);
   topMesh.castShadow = true;
   topMesh.receiveShadow = true;
   group.add(topMesh);

   const legGeo = new THREE.CylinderGeometry(0.024, 0.02, height, 12);
   const legOffsets = [
      { x: -width / 2 + 0.08, z: -depth / 2 + 0.06, rotZ: 0.05, rotX: -0.05 },
      { x: width / 2 - 0.08, z: -depth / 2 + 0.06, rotZ: -0.05, rotX: -0.05 },
      { x: -width / 2 + 0.08, z: depth / 2 - 0.06, rotZ: 0.05, rotX: 0.05 },
      { x: width / 2 - 0.08, z: depth / 2 - 0.06, rotZ: -0.05, rotX: 0.05 },
   ];

   const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
   });
   const shadowGeo = new THREE.CircleGeometry(0.045, 12);
   shadowGeo.rotateX(-Math.PI / 2);

   legOffsets.forEach(({ x, z, rotZ, rotX }) => {
      const leg = new THREE.Mesh(legGeo, woodLegMat);
      leg.position.set(x, height / 2, z);
      leg.rotation.set(rotX, 0, rotZ);
      leg.castShadow = true;
      group.add(leg);

      const footShadow = new THREE.Mesh(shadowGeo, shadowMat);
      footShadow.position.set(x, 0.005, z);
      group.add(footShadow);
   });

   return group;
}

/**
 * Creates the Main IDE Code Monitor with Stand and Glow Light
 */
function createMainMonitor(darkBezelMat: THREE.Material, tableHeight: number): THREE.Group {
   const monitorGroup = new THREE.Group();
   monitorGroup.position.set(0.1, tableHeight, -0.06);
   monitorGroup.rotation.y = 0.08;

   const base = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.015, 16), darkBezelMat);
   monitorGroup.add(base);

   const arm = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.28, 0.026), darkBezelMat);
   arm.position.set(0, 0.14, -0.03);
   monitorGroup.add(arm);

   const screenBezel = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.44, 0.024), darkBezelMat);
   screenBezel.position.set(0, 0.3, 0);
   screenBezel.castShadow = true;
   monitorGroup.add(screenBezel);

   const screenTex = createCodeScreenTexture();
   const screenPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(0.7, 0.4),
      new THREE.MeshBasicMaterial({ map: screenTex })
   );
   screenPlane.position.set(0, 0.3, 0.014);
   monitorGroup.add(screenPlane);

   const screenGlow = new THREE.PointLight(0x38bdf8, 1.2, 2.0);
   screenGlow.position.set(0, 0.3, 0.2);
   monitorGroup.add(screenGlow);

   return monitorGroup;
}

/**
 * Creates the Secondary Display / Open Laptop on Right Side of Desk
 */
function createSecondaryLaptop(darkBezelMat: THREE.Material, tableHeight: number): THREE.Group {
   const laptopGroup = new THREE.Group();
   laptopGroup.position.set(0.48, tableHeight + 0.024, 0.04);
   laptopGroup.rotation.y = -0.22;

   const lapBase = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.012, 0.2), darkBezelMat);
   laptopGroup.add(lapBase);

   const lapLidGroup = new THREE.Group();
   lapLidGroup.position.set(0, 0.006, -0.1);
   lapLidGroup.rotation.x = -0.32;

   const lapLid = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.2, 0.01), darkBezelMat);
   lapLid.position.set(0, 0.1, 0);
   lapLidGroup.add(lapLid);

   const lapScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.26, 0.18),
      new THREE.MeshBasicMaterial({ color: 0x0284c7 })
   );
   lapScreen.position.set(0, 0.1, 0.006);
   lapLidGroup.add(lapScreen);

   laptopGroup.add(lapLidGroup);
   return laptopGroup;
}

/**
 * Creates the Architect Desk Lamp on Left Edge
 */
function createDeskLamp(lampMat: THREE.Material, tableHeight: number): THREE.Group {
   const lampGroup = new THREE.Group();
   lampGroup.position.set(-0.52, tableHeight + 0.024, -0.06);

   const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.015, 16), lampMat);
   lampGroup.add(lampBase);

   const arm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.26, 8), lampMat);
   arm1.position.set(0.04, 0.12, 0);
   arm1.rotation.z = -0.32;
   lampGroup.add(arm1);

   const arm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.22, 8), lampMat);
   arm2.position.set(0.14, 0.26, 0);
   arm2.rotation.z = 0.55;
   lampGroup.add(arm2);

   const lampHead = new THREE.Mesh(
      new THREE.ConeGeometry(0.055, 0.09, 14, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 })
   );
   lampHead.position.set(0.22, 0.31, 0);
   lampHead.rotation.z = Math.PI * 0.72;
   lampGroup.add(lampHead);

   const lampLight = new THREE.SpotLight(0xffedd5, 1.4, 2.0, Math.PI / 4, 0.5);
   lampLight.position.set(0.22, 0.31, 0);
   lampLight.target.position.set(0.25, -0.3, 0.1);
   lampGroup.add(lampLight);
   lampGroup.add(lampLight.target);

   return lampGroup;
}

/**
 * Creates Tabletop Accessories (Mug, Keyboard, Mouse)
 */
function createDeskAccessories(tableHeight: number): THREE.Group {
   const group = new THREE.Group();

   const mug = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.026, 0.07, 14),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2 })
   );
   mug.position.set(0.28, tableHeight + 0.055, 0.14);
   group.add(mug);

   const keyboard = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.014, 0.11),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 })
   );
   keyboard.position.set(-0.12, tableHeight + 0.03, 0.14);
   group.add(keyboard);

   const mouse = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.018, 0.035, 4, 10),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 })
   );
   mouse.rotation.x = Math.PI / 2;
   mouse.position.set(0.12, tableHeight + 0.032, 0.14);
   group.add(mouse);

   return group;
}

/**
 * Creates the Floor Potted Plant and Glowing `< / >` Cube matching main.png
 */
function createFloorProps(): THREE.Group {
   const group = new THREE.Group();

   // 1. Floor Potted Plant (Left of desk matching main.png)
   const potGroup = new THREE.Group();
   potGroup.position.set(-0.82, 0.0, -0.15);

   const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.065, 0.16, 12),
      new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5 })
   );
   pot.position.y = 0.08;
   pot.castShadow = true;
   potGroup.add(pot);

   // Lush Green Leaves
   const leafMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.4, side: THREE.DoubleSide });
   for (let l = 0; l < 6; l++) {
      const angle = (l / 6) * Math.PI * 2;
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), leafMat);
      leaf.scale.set(0.4, 1.2, 0.1);
      leaf.position.set(Math.cos(angle) * 0.06, 0.22, Math.sin(angle) * 0.06);
      leaf.rotation.set(0.35, angle, 0.35);
      leaf.castShadow = true;
      potGroup.add(leaf);
   }
   group.add(potGroup);

   // 2. Glowing Translucent Blue `< / >` Cube (Front-Right of desk matching main.png)
   const cubeGroup = new THREE.Group();
   cubeGroup.position.set(0.55, 0.12, 0.58);
   cubeGroup.rotation.y = 0.35;

   const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
      roughness: 0.15,
      metalness: 0.2,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
   });

   const cubeMesh = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.22), cubeMat);
   cubeMesh.castShadow = true;
   cubeGroup.add(cubeMesh);

   // White symbol `< / >` on cube front
   const symMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
   const slash = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.11, 0.01), symMat);
   slash.rotation.z = -0.35;
   slash.position.set(0, 0, 0.112);
   cubeGroup.add(slash);

   const lArr = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.05, 0.01), symMat);
   lArr.rotation.z = 0.6;
   lArr.position.set(-0.045, 0.018, 0.112);
   cubeGroup.add(lArr);

   const lArr2 = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.05, 0.01), symMat);
   lArr2.rotation.z = -0.6;
   lArr2.position.set(-0.045, -0.018, 0.112);
   cubeGroup.add(lArr2);

   const rArr = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.05, 0.01), symMat);
   rArr.rotation.z = -0.6;
   rArr.position.set(0.045, 0.018, 0.112);
   cubeGroup.add(rArr);

   const rArr2 = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.05, 0.01), symMat);
   rArr2.rotation.z = 0.6;
   rArr2.position.set(0.045, -0.018, 0.112);
   cubeGroup.add(rArr2);

   const cubeLight = new THREE.PointLight(0x38bdf8, 1.2, 1.2);
   cubeLight.position.set(0, 0.05, 0.1);
   cubeGroup.add(cubeLight);

   group.add(cubeGroup);

   return group;
}

/**
 * Creates the Developer Workstation matching main.png:
 * - Clean white desk with warm wooden legs
 * - Large central IDE code monitor
 * - Secondary laptop screen
 * - Anglepoise desk lamp
 * - White coffee mug & keyboard/mouse
 * - Floor potted plant and glowing `< / >` cube
 */
export function createDeveloperWorkspace(): THREE.Group {
   const workspaceGroup = new THREE.Group();
   workspaceGroup.name = 'DeveloperWorkspace';

   workspaceGroup.position.set(-0.05, 0.68, -0.38);
   workspaceGroup.rotation.y = -0.45;

   const whiteTopMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.25,
      metalness: 0.05,
   });

   const woodLegMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.65,
      metalness: 0.1,
   });

   const darkBezelMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.8,
   });

   const lampMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.35,
      metalness: 0.7,
   });

   const tableWidth = 1.45;
   const tableDepth = 0.62;
   const tableHeight = 0.58;

   workspaceGroup.add(createDesk(whiteTopMat, woodLegMat, tableWidth, tableDepth, tableHeight));
   workspaceGroup.add(createMainMonitor(darkBezelMat, tableHeight));
   workspaceGroup.add(createSecondaryLaptop(darkBezelMat, tableHeight));
   workspaceGroup.add(createDeskLamp(lampMat, tableHeight));
   workspaceGroup.add(createDeskAccessories(tableHeight));
   workspaceGroup.add(createFloorProps());

   return workspaceGroup;
}
