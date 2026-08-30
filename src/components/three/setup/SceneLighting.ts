import * as THREE from 'three';

/**
 * Creates art-directed studio lighting for the Mini Developer Planet diorama.
 * High dynamic range, soft shadows, warm key light, and cool cyan rim light matching reference.
 */
export function createSceneLighting(): THREE.Group {
   const lightingGroup = new THREE.Group();
   lightingGroup.name = 'SceneLighting';

   // 1. Hemisphere Light (Soft Warm Sky + Cyan Ground Bounce)
   const hemiLight = new THREE.HemisphereLight(0xffffff, 0xbfe4fd, 1.7);
   lightingGroup.add(hemiLight);

   // 2. Ambient Baseline Fill
   const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
   lightingGroup.add(ambientLight);

   // 3. Primary Key Directional Sun Light (Top-Right Front)
   const keyLight = new THREE.DirectionalLight(0xfffaed, 2.6);
   keyLight.position.set(4.5, 6.8, 4.5);
   keyLight.castShadow = true;
   keyLight.shadow.mapSize.width = 2048;
   keyLight.shadow.mapSize.height = 2048;
   keyLight.shadow.camera.near = 0.5;
   keyLight.shadow.camera.far = 22;
   keyLight.shadow.camera.left = -3.2;
   keyLight.shadow.camera.right = 3.2;
   keyLight.shadow.camera.top = 3.2;
   keyLight.shadow.camera.bottom = -3.2;
   keyLight.shadow.bias = -0.0004;
   keyLight.shadow.radius = 2.5; // Soft shadow blur
   lightingGroup.add(keyLight);

   // 4. Crisp Planetary Cyan Rim Light (Rear-Left)
   const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
   rimLight.position.set(-5.2, 4.8, -4.2);
   lightingGroup.add(rimLight);

   // 5. Front Fill Light (Gentle studio bounce)
   const fillLight = new THREE.DirectionalLight(0xe0f2fe, 0.9);
   fillLight.position.set(0, 0.6, 4.8);
   lightingGroup.add(fillLight);

   // 6. Underside Rock Soft Fill Light
   const underLight = new THREE.DirectionalLight(0x64748b, 0.8);
   underLight.position.set(0, -4.2, 2.2);
   lightingGroup.add(underLight);

   return lightingGroup;
}
