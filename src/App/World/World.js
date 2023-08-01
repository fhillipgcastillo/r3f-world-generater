import React, { Suspense } from 'react'
import Floor from "./Floor";
import Environment from "./Environment";
import { FirstPersonControls, KeyboardControls, PointerLockControls } from '@react-three/drei';
import Player from "./Player";
import { Physics, RigidBody } from '@react-three/rapier';


const World = () => {
    
    return (
        <Suspense fallback={null}>
            <group name='world'>
                <Environment />
                <group name="objects">
                    <RigidBody mass={5} position={[1.5, 5, -5]}>
                        <mesh castShadow receiveShadow>
                            <boxGeometry args={[2, 2, 2]} />
                            <meshStandardMaterial color={'yellow'} />
                        </mesh>
                    </RigidBody>
                    <Player />
                    <Floor />
                </group>
            </group>
        </Suspense>
    )
}

export default World;
