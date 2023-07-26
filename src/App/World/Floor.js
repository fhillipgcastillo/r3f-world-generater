import { useRef } from "react";
import { RigidBody } from "@react-three/rapier";

const Floor = () => {
  const meshRef = useRef(null);

  return (
      <mesh ref={meshRef} rotation-x={Math.PI * -0.5} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color={'#475e1b'} />
      </mesh>
  );
};

export default Floor;
