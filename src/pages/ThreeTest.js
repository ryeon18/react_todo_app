import React from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls, Stars} from '@react-three/drei';
import {useNavigate} from 'react-router-dom';

const ThreeTest = () => {
  const navigation = useNavigate();
  const goToLink = e => {
    // e.preventDefault();
    // navigation('/rotate');
  };

  return (
    <div className="three-test">
      <Canvas onClick={e => goToLink(e)}>
        <Stars />
        <OrbitControls autoRotate={true} />
        <mesh>
          <ambientLight intensity={1} />
          <directionalLight position={[-1, 0, 1]} intensity={0.5} />
          <boxGeometry className="box" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color={'hotpink'} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default ThreeTest;
