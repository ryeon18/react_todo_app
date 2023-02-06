import React, {useRef} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';

const CoinMesh = () => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.y = mesh.current.rotation.z += 0.1));

  return (
    <mesh ref={mesh} scale={0.3}>
      <ambientLight intensity={1} />
      <cylinderGeometry color="red" args={[1, 1, 0.3, 50]} />
      <meshLambertMaterial attach="material" color="green" />
    </mesh>
  );
};

const Meshes = () => {
  return (
    <>
      <Canvas>
        <CoinMesh />
      </Canvas>
    </>
  );
};

export default Meshes;
