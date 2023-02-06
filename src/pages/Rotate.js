import React, {useState, useEffect, useRef} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls, Stars} from '@react-three/drei';
import gsap from 'gsap';

import {useNavigate} from 'react-router-dom';

const CoinMesh = () => {
  const mesh = useRef(null);

  useEffect(() => {
    gsap.to(mesh.current.position, {
      duration: 1,
      y: 2,
    });
  }, [mesh]);

  useFrame((state, delta) => {
    gsap.to(mesh.current.rotation, {
      y: state.clock.elapsedTime,
    });
  });

  return (
    <mesh ref={mesh} scale={0.2} position={[Math.random() * 5 - 2.5, 0, Math.random() * 5 - 2.5]}>
      <ambientLight intensity={1} />
      <directionalLight position={[-1, 0, 1]} intensity={0.5} />
      <cylinderGeometry color="red" arg={[1, 1, 0.3, 50]} />
      <meshLambertMaterial attach="material" color="yellow" />
    </mesh>
  );
};

const Rotate = () => {
  const navigation = useNavigate();
  const goToBack = e => {
    navigation(-1);
  };

  return (
    <div className="rotate-test">
      <Canvas onClic={e => goToBack(e)}>
        <Stars />
        <OrbitControls autoRotate={true} />
        <CoinMesh />
      </Canvas>
    </div>
  );
};

export default Rotate;
