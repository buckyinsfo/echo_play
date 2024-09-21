import * as React from 'react';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer, TextureLoader, THREE } from 'expo-three';
import { Asset } from 'expo-asset';

const ThreeScene2: React.FC = () => {
  let timeout: NodeJS.Timeout;

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
    const material = new THREE.MeshBasicMaterial({ color: 0xccff });
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    try {
      let time = 0;
      // Animation loop
      const render = () => {
        time += 0.05; // Increment time for animation
        timeout = setTimeout(render, 1000 / 60);

        // Move the mesh in and out along the z-axis
        mesh.position.z = Math.sin(time) * 0.5; // Adjust the multiplier (0.5) to change the range of motion

        renderer.render(scene, camera);
        gl.endFrameEXP();
      };
      render();
    } catch (error) {
      console.error('Error in ThreeScene2:', error);
    }
  };

  return <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />;
};

export default ThreeScene2;
