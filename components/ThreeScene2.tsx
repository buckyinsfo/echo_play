import React, { useRef } from 'react';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer, THREE } from 'expo-three';
import { PanResponder, PanResponderGestureState } from 'react-native';

const ThreeScene2: React.FC = () => {
  let timeout: NodeJS.Timeout;

  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: Renderer;
    mesh: THREE.Mesh;
    wireframe: THREE.LineSegments;
  } | null>(null);

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
        color: 0x000000,
        opacity: 0.25,
        transparent: true,
      }),
    );
    scene.add(wireframe);

    // Create some light
    const hemisphere = new THREE.HemisphereLight(0xffffff, 0x000000);
    scene.add(hemisphere);

    sceneRef.current = { scene, camera, renderer, mesh, wireframe };

    try {
      // Animation loop
      const render = () => {
        if (sceneRef.current) {
          const { scene, camera, renderer } = sceneRef.current;

          // timeout = setTimeout(render, 1000 / 60);

          // // Move the mesh in and out along the z-axis
          // //mesh.position.z = Math.sin(time) * 0.5; // Adjust the multiplier (0.5) to change the range of motion

          // mesh.rotateX(0.001);
          // mesh.rotateY(0.01);

          // wireframe.rotateX(0.001);
          // wireframe.rotateY(0.01);

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

  return (
    <GLView
      style={{ flex: 1 }}
      onContextCreate={onContextCreate}
      {...panResponder.panHandlers}
    />
  );
};

export default ThreeScene2;
