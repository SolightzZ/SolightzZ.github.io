import {vi} from 'vitest';

vi.mock('three', () => {
   const noop = () => {};
   const Vector3 = class {
      x = 0;
      y = 0;
      z = 0;
      set() {
         return this;
      }
      copy() {
         return this;
      }
      normalize() {
         return this;
      }
      add() {
         return this;
      }
      multiplyScalar() {
         return this;
      }
      subVectors() {
         return this;
      }
      distanceTo() {
         return 0;
      }
   };
   const Color = class {
      constructor(_c?: unknown) {}
      copy() {
         return this;
      }
      set() {
         return this;
      }
   };
   return {
      Scene: class {
         add = noop;
         remove = noop;
         traverse = noop;
      },
      PerspectiveCamera: class {
         position = {...new Vector3()};
         aspect = 1;
         updateProjectionMatrix = noop;
         lookAt = noop;
      },
      WebGLRenderer: class {
         domElement = document.createElement('canvas');
         setPixelRatio = noop;
         setSize = noop;
         setClearColor = noop;
         render = noop;
         dispose = noop;
         toneMapping = 0;
         toneMappingExposure = 1;
         shadowMap = {enabled: false, type: 0};
         capabilities = {isWebGL2: true};
      },
      ACESFilmicToneMapping: 0,
      PCFSoftShadowMap: 0,
      PCFShadowMap: 1,
      Box3: class {
         setFromObject() {
            return this;
         }
         getBoundingSphere() {
            return {...new Vector3(), radius: 0};
         }
      },
      Sphere: class {},
      Group: class {
         children: unknown[] = [];
         position = {...new Vector3()};
         rotation = {x: 0, y: 0, z: 0};
         scale = {x: 1, y: 1, z: 1};
         add = noop;
         traverse(cb: (o: unknown) => void) {
            cb(this);
         }
      },
      Mesh: class {
         material = {};
         position = {...new Vector3()};
         rotation = {x: 0, y: 0, z: 0};
         scale = {x: 1, y: 1, z: 1};
      },
      Object3D: class {
         children: unknown[] = [];
         position = {...new Vector3()};
         rotation = {x: 0, y: 0, z: 0};
         scale = {x: 1, y: 1, z: 1};
      },
      Vector3,
      Vector2: class {
         x = 0;
         y = 0;
      },
      Quaternion: class {
         setFromEuler() {
            return this;
         }
      },
      Euler: class {},
      Color,
      MeshStandardMaterial: class {},
      MeshBasicMaterial: class {},
      MeshLambertMaterial: class {},
      SphereGeometry: class {},
      BoxGeometry: class {},
      PlaneGeometry: class {},
      CylinderGeometry: class {},
      ConeGeometry: class {},
      TorusGeometry: class {},
      CircleGeometry: class {},
      CapsuleGeometry: class {},
      ExtrudeGeometry: class {},
      BufferGeometry: class {
         setAttribute = noop;
         setIndex = noop;
      },
      BufferAttribute: class {},
      Raycaster: class {
         setFromCamera = noop;
         intersectObjects() {
            return [];
         }
      },
      Clock: class {
         getDelta() {
            return 0.016;
         }
         getElapsedTime() {
            return 0;
         }
      },
      DirectionalLight: class {
         position = {...new Vector3()};
      },
      AmbientLight: class {},
      HemisphereLight: class {},
      PointLight: class {
         position = {...new Vector3()};
      },
      Fog: class {},
      PointsMaterial: class {},
      SpriteMaterial: class {},
      Sprite: class {
         position = {...new Vector3()};
         scale = {x: 1, y: 1, z: 1};
      },
      CanvasTexture: class {},
      RepeatWrapping: 0,
      BackSide: 0,
      DoubleSide: 0,
      FrontSide: 0,
      AdditiveBlending: 0,
      NormalBlending: 0,
      SRGBColorSpace: 0,
      LinearSRGBColorSpace: 0,
      Matrix4: class {
         compose() {
            return this;
         }
         copy() {
            return this;
         }
         invert() {
            return this;
         }
      },
   };
});