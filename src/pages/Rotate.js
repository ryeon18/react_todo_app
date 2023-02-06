import React, {useRef} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';

const CoinMesh = () => {
  const mesh = useRef(null);
  // useFrame(() => (mesh.current.rotate.y = mesh.current.rotate.z += 0.1));
  return (
    <mesh ref={mesh} scale={3}>
      <cylinderGeometry color="red" arg={[1, 1, 0.3, 50]} />
      <meshLambertMaterial attach="material" />
    </mesh>
  );
};

const Rotate = () => {
  return (
    <Canvas>
      <CoinMesh />
    </Canvas>
  );
};

export default Rotate;
