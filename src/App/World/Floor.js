import { useEffect, useRef } from "react";
import { useControls } from "leva";
import { isCompositeComponent } from "react-dom/test-utils";
import { RigidBody } from "@react-three/rapier";


const Floor = () => {
  const meshRef = useRef(null);
  const control = useControls("Floor", {
    wireframe: true,
  });

  return (
    <RigidBody>
      <mesh ref={meshRef} rotation-x={Math.PI * -0.5} receiveShadow >
        <planeGeometry args={[30, 30, 256, 256]} />
        <meshStandardMaterial color={'#475e1b'} wireframe={control.wireframe} />
      </mesh>
    </RigidBody>
  );
};

export default Floor;
