import React, { useRef, useEffect } from 'react';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer, THREE } from 'expo-three';
import { PanResponder, PanResponderGestureState } from 'react-native';

type SceneRef = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: Renderer;
  mesh: THREE.Mesh<THREE.BufferGeometry, THREE.Material>;
  wireframe: THREE.LineSegments<THREE.BufferGeometry, THREE.Material>;
};

const ThreeScene2: React.FC = () => {
  let timeout: NodeJS.Timeout;
  const sceneRef = useRef<SceneRef | null>(null);

  const rotationSpeedRef = useRef({ x: 0.001, y: 0.01 });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState: PanResponderGestureState) => {
      if (sceneRef.current) {
        const { mesh, wireframe } = sceneRef.current;
        mesh.rotation.y += gestureState.dx * 0.01;
        mesh.rotation.x += gestureState.dy * 0.01;
        wireframe.rotation.y += gestureState.dx * 0.01;
        wireframe.rotation.x += gestureState.dy * 0.01;
      }
    },
    onPanResponderRelease: () => {
      // Reset rotation speed when touch ends
      rotationSpeedRef.current = { x: 0.001, y: 0.01 };
    },
  });

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    console.log('ThreeScene context created');
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);

    // Create a new Three.js scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('lightblue'); // Set a background color

    // Create a camera
    const fov = 75;
    const aspect = width / height;
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    // Create a three.js primitive
    const geometry = new THREE.IcosahedronGeometry(0.5, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry),
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        opacity: 0.75,
        transparent: true,
      }),
    );
    scene.add(wireframe);

    // Create some light
    const hemisphere = new THREE.HemisphereLight(0xffffff, 0x000000);
    scene.add(hemisphere);

    sceneRef.current = { scene, camera, renderer, mesh, wireframe };

    // Animation loop
    try {
      const render = () => {
        if (sceneRef.current) {
          const { scene, camera, renderer, mesh, wireframe } = sceneRef.current;

          // Apply continuous rotation
          mesh.rotation.x += rotationSpeedRef.current.x;
          mesh.rotation.y += rotationSpeedRef.current.y;
          wireframe.rotation.x += rotationSpeedRef.current.x;
          wireframe.rotation.y += rotationSpeedRef.current.y;

          renderer.render(scene, camera);
        }
        gl.endFrameEXP();
        requestAnimationFrame(render);
      };
      render();
    } catch (error) {
      console.error('Error in ThreeScene2:', error);
    }
  };

  useEffect(() => {
    return () => {
      // Clean up Three.js resources when component unmounts
      if (sceneRef.current) {
        const { scene, mesh, wireframe } = sceneRef.current;
        scene.remove(mesh);
        scene.remove(wireframe);
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(material => material.dispose());
          } else {
            mesh.material.dispose();
          }
        }
        if (wireframe.geometry) wireframe.geometry.dispose();
        if (wireframe.material) {
          if (Array.isArray(wireframe.material)) {
            wireframe.material.forEach(material => material.dispose());
          } else {
            wireframe.material.dispose();
          }
        }
      }
      clearTimeout(timeout);
    };
  }, []);

  return (
    <GLView
      style={{ flex: 1 }}
      onContextCreate={onContextCreate}
      {...panResponder.panHandlers}
    />
  );
};

export default ThreeScene2;
