import React from 'react'

const Environment = () => {
  return (
    <group>
        <directionalLight castShadow position={[2.5, 8, 5]} shadow-mapSize={[512, 512]}>
            <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
        </directionalLight>
        <ambientLight intensity={0.25} />
    </group>
  )
}

export default Environment;
