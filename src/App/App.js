import { Canvas } from "@react-three/fiber";
import { CameraControls, PerspectiveCamera } from '@react-three/drei'
// import { Physics } from "@react-three/rapier";
import { useRef } from "react";
import World from "./World";

const App = () => {
  const perspectiveCamera = useRef(null);

  return (
    <Canvas
      args={[window.innerWidth, window.innerHeight]}
      camera={{ fov: 75 }}
      dpr={[1, 1.5]}
      resize={true}
      shadows
    >
      {/* <Physics debug> */}
        <PerspectiveCamera ref={perspectiveCamera} fov={75} position={[0, 10, 10]} makeDefault={true} />
        <World />
        <CameraControls />
      {/* </Physics> */}
    </Canvas>

  )
};

export default App;
