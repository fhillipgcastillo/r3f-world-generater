import { Canvas } from "@react-three/fiber";
import { CameraControls, KeyboardControls, PointerLockControls } from '@react-three/drei'
import { Physics } from "@react-three/rapier";
import World from "./World";
import { useControls } from 'leva'
import { useEffect, useState } from "react";

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
  const [paused, setPaused] = useState(true);

  const controls = useControls('Camera', {
    debug: false,
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

  const pointerlockchange = (e) => {
    setPaused(!paused);
  };

  useEffect(() => {
    document.addEventListener('pointerlockchange', pointerlockchange, false);
    return () => {
      document.removeEventListener('pointerlockchange', pointerlockchange, false);
    }
  })
  return (
    <KeyboardControls map={keyboardMapping}>
      {/* add animation later */}
      <div className="menu" style={{
        display: paused ? "flex" : "none",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000000c2",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 9,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <div className="menu-content" style={{
          display: paused ? "flex" : "none",
          flexDirection: "column",
          width: "30vw",
          backgroundColor: "white",
          padding: "10%",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <label style={{ fontSize: "1.5rem" }}>Paused</label>
          <button id="start-btn"
            style={{
              adding: "4px 16px",
              border: "none",
              backgroundColor: "#007cff",
              borderRadius: "4px",
              color: "white",
              cursor: "pointer",
            }}
          >Start</button>
        </div>
      </div>
      <div style={{ zIndex: 1, width: "100vw" }}>
        <div className="dot" />

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
          <Physics debug={controls.debug}>
            <World cameraControls={controls} paused={paused} />
          </Physics>

          <PointerLockControls selector="#start-btn" />
        </Canvas>
      </div>
    </KeyboardControls >
  )
};

export default App;
