import * as React from 'react';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer, TextureLoader, THREE } from 'expo-three';
import { Asset } from 'expo-asset';

const ThreeScene: React.FC = () => {
  let timeout: NodeJS.Timeout;

  React.useEffect(() => {
    console.log('ThreeScene mounted');
    return () => {
      console.log('ThreeScene unmounted');
      clearTimeout(timeout);
    };
  }, []);

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

    // Create a cube
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    try {
      // Load a texture
      const texture = await new TextureLoader().loadAsync(
        Asset.fromModule(require('../assets/textures/Ground079L.jpg')).uri,
      );
      console.log('Texture loaded successfully');

      // Create a textured cube
      // A Mesh in three.js represents the combination of three things
      // 1) A Geometry (the shape of the object)
      // 2) A Material (how to draw the object, shiny or flat, what color, what texture(s) to apply. Etc.)
      // 3) The position, orientation, and scale of that object in the scene relative to its parent.
      const texturedMaterial = new THREE.MeshBasicMaterial({ map: texture });
      const texturedCube = new THREE.Mesh(geometry, texturedMaterial);
      scene.add(texturedCube);

      // Animation loop
      const render = () => {
        timeout = setTimeout(render, 1000 / 60);
        texturedCube.rotation.x += 0.001;
        texturedCube.rotation.y += 0.01;
        renderer.render(scene, camera);
        gl.endFrameEXP();
      };
      render();
    } catch (error) {
      console.error('Error in ThreeScene:', error);

      // Fallback to a simple colored cube if texture loading fails
      const material = new THREE.MeshBasicMaterial({ color: 'red' });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      const render = () => {
        timeout = setTimeout(render, 1000 / 60);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
        gl.endFrameEXP();
      };
      render();
    }
  };

  return <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />;
};

export default ThreeScene;
