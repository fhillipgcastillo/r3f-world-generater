import { Canvas } from "@react-three/fiber";
import { KeyboardControls, PointerLockControls } from '@react-three/drei'
import { Physics } from "@react-three/rapier";
import World from "./World";
import { useControls } from 'leva'

const keyboardMapping = [
  { name: "forward", keys: ["ArrowUp", "w", "W"] },
  { name: "backward", keys: ["ArrowDown", "s", "S"] },
  { name: "left", keys: ["ArrowLeft", "a", "A"] },
  { name: "right", keys: ["ArrowRight", "d", "D"] },
  { name: "jump", keys: ["Space"] },
];

const App = () => {
  const constrols = useControls('Camera', {
    fov: {
      value: 75,
      min: 13,
      max: 100,
      step: 1,
    },
  })
  const playerTopPosition = [0, 2.5, 5]

  return (
    <KeyboardControls map={keyboardMapping}>
      <Canvas
        args={[window.innerWidth, window.innerHeight]}
        dpr={[1, 1.5]}
        resize={true}
        shadows
        camera={{ fov: constrols.fov, position: playerTopPosition }}
      >
        <Physics debug>
          <World />
        </Physics>
        <PointerLockControls selector="#root"/>
      </Canvas>
    </KeyboardControls>
  )
};

export default App;
