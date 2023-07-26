import { Canvas } from "@react-three/fiber";
import { CameraControls, PerspectiveCamera } from '@react-three/drei'
// import { Physics } from "@react-three/rapier";
import { useRef } from "react";
import World from "./World";
import { useControls } from 'leva'


const App = () => {
  const perspectiveCamera = useRef(null);
  const constrols = useControls('Camera', {
    fov: {
      value: 75,
      min: 13,
      max: 100,
      step: 1,
    }
  })
  return (
    <Canvas
      args={[window.innerWidth, window.innerHeight]}
      dpr={[1, 1.5]}
      resize={true}
      shadows
    >
      {/* <Physics debug> */}
        <PerspectiveCamera ref={perspectiveCamera} fov={constrols.fov} position={[0, 10, 10]} makeDefault={true} />
        <World />
        <CameraControls />
      {/* </Physics> */}
    </Canvas>

  )
};

export default App;
