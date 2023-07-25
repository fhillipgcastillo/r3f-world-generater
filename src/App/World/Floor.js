import { useRef } from "react";
import { RigidBody } from "@react-three/rapier";

const Floor = () => {
  const meshRef = useRef(null);

  return (
    <RigidBody position={[0, 0, 0]} colliders="cuboid">
      <mesh ref={meshRef} rotation-x={Math.PI * -0.5} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={'#475e1b'} />
      </mesh>
    </RigidBody>
  );
};

export default Floor;
