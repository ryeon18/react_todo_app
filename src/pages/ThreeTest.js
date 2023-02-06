import React from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls, Stars} from '@react-three/drei';

const ThreeTest = () => {
  return (
    <div className="three-test">
      <Canvas>
        <Stars />
        <OrbitControls autoRotate={true} />
        <mesh>
          <ambientLight intensity={1} />
          <directionalLight position={[-1, 0, 1]} intensity={0.5} />
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color={'orange'} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default ThreeTest;
