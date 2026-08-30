/**
 * Barrel exports for the Three.js 3D Hero Mini Planet Diorama
 */

// Entry points
export { Hero3DContainer } from './Hero3DContainer';
export { Hero3DScene } from './Hero3DScene';
export { SceneFallback } from './SceneFallback';

// Characters
export { createDeveloperCharacter } from './characters/DeveloperCharacter';
export { createRobotAssistant } from './characters/RobotAssistant';

// Environment
export { createMiniPlanet } from './environment/MiniPlanet';
export { createDeveloperWorkspace } from './environment/DeveloperWorkspace';
export { createBookshelfProp } from './environment/BookshelfProp';
export { createFloatingCodingElements } from './environment/FloatingCodePanels';

// Setup
export { createSceneLighting } from './setup/SceneLighting';
export { createSceneCamera } from './setup/sceneCamera';
export { disposeThreeScene } from './setup/sceneDisposal';
export * from './setup/types';
export * from './setup/config';
