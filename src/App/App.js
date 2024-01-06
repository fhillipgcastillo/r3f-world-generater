import { Canvas } from "@react-three/fiber";
import { CameraControls, KeyboardControls, PointerLockControls } from '@react-three/drei'
import { Physics } from "@react-three/rapier";
import World from "./World";
import { useControls } from 'leva'

const keyboardMapping = [
  { name: "forward", keys: ["ArrowUp", "w", "W"] },
  { name: "backward", keys: ["ArrowDown", "s", "S"] },
  { name: "left", keys: ["ArrowLeft", "a", "A"] },
  { name: "right", keys: ["ArrowRight", "d", "D"] },
  { name: "jump", keys: ["Space"] },
  { name: "flyUp", keys: ["Shift"] },
  { name: "flyDown", keys: ["Control"] },
];

const App = () => {
  const controls = useControls('Camera', {
    fov: {
      value: 70,
      min: 13,
      max: 100,
      step: 1,
    },
    near: {
      value: 1,
      min: 0.1,
      max: 10000,
      step: 100,
    },
    far: {
      value: 2000,
      min: 400,
      max: 100000,
      step: 100,
    },
    zoom: {
      value: 1,
      min: 1,
      max: 10,
      step: 1,
    }
  })
  const playerTopPosition = [0, 2.5, 35]

  return (
    <KeyboardControls map={keyboardMapping}>
      <Canvas
        args={[window.innerWidth, window.innerHeight]}
        dpr={[1, 1.5]}
        resize={true}
        shadows
        camera={{ 
          fov: controls.fov,
          position: playerTopPosition,
          near: controls.near,
          far: controls.far,
        }}
      >
        <Physics debug>
          <World cameraControls={controls} />
        </Physics>
        
        <PointerLockControls />
        {/* <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} /> */}
      </Canvas>
    </KeyboardControls>
  )
};

export default App;
