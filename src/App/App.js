import { Canvas } from "@react-three/fiber";
import { CameraControls, KeyboardControls, OrbitControls, PointerLockControls } from '@react-three/drei'
import { Physics } from "@react-three/rapier";
import World from "./World";
import { useControls } from 'leva'
import { useEffect, useRef, useState } from "react";
import { PerspectiveCamera } from '@react-three/drei'
import GameContext, { defaultGameState } from "./gameContext";


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
  const controls = useControls('Physics', {
    debug: false,
  });
  const cameraRef = useRef();
  const playerTopPosition = [0, 2.5, 35]

  const pointerlockchange = (e) => {
    setPaused(!paused);
  };

  useEffect(() => {
    document.addEventListener('pointerlockchange', pointerlockchange, false);
    return () => {
      document.removeEventListener('pointerlockchange', pointerlockchange, false);
    }
  });


  return (
    <GameContext.Provider value={{...defaultGameState, paused}}>
      <KeyboardControls map={keyboardMapping}>
        {/* add animation later */}
        {/* 
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
        */}
        <div style={{ zIndex: 1, width: "100vw" }}>
          {/* <div className="dot" /> */}

          <Canvas
            args={[window.innerWidth, window.innerHeight]}
            dpr={[1, 1.5]}
            resize={true}
            shadows
            camera={cameraRef}
          // camera={{
          //   fov: controls.fov,
          //   position: [-10, 1.5, 1000],
          //   near: controls.near,
          //   far: controls.far,
          //   zoom: controls.zoom,
          //   rotateOnAxis: [0, Math.PI  / 4, 0],
          // }}
          >
            <Physics debug={controls.debug}>
              <World />
            </Physics>

            {/* <PointerLockControls selector="#start-btn" /> */}
            <OrbitControls />
            {/* <PerspectiveCamera
            // {...controls} 
            ref={cameraRef}
            position={[0, 0, 50]}
            makeDefault
            onUpdate={self => {self.updateProjectionMatrix(); console.log("updated camera", self.position)}}
        /> */}
            {/* <PerspectiveCamera ref={perspectiveCamera} fov={75} position={[0, 10, 10]} makeDefault={true} /> */}
          </Canvas>
        </div>
      </KeyboardControls >
    </GameContext.Provider>
  )
};

export default App;
