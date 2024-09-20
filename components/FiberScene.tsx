import React, { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber/native';
import { TextureLoader, THREE } from 'expo-three';
import { Asset } from 'expo-asset';

const Box = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useLoader(
    TextureLoader,
    Asset.fromModule(require('../assets/textures/Ground079L.jpg')).uri,
  );

  useEffect(() => {
    console.log('Box component mounted');
    return () => console.log('Box component unmounted');
  }, []);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01 * delta * 60;
      mesh.current.rotation.y += 0.01 * delta * 60;
    }
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

const LoadingFallback = () => {
  useEffect(() => {
    console.log('LoadingFallback mounted');
    return () => console.log('LoadingFallback unmounted');
  }, []);

  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="hotpink" />
    </mesh>
  );
};

const FiberScene: React.FC = () => {
  useEffect(() => {
    console.log('FiberScene mounted');
    return () => console.log('FiberScene unmounted');
  }, []);

  return (
    <Canvas style={{ flex: 1 }}>
      <color attach="background" args={['lightgreen']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={<LoadingFallback />}>
        <Box />
      </Suspense>
    </Canvas>
  );
};

export default FiberScene;
