import React, { Suspense } from 'react'
import { CameraControls } from '@react-three/drei'
import { RigidBody } from "@react-three/rapier";
import Floor from "./Floor";
import Environment from "./Environment";

const WhiteBox = () => {
    return (
        <RigidBody mass={1} >
            <mesh position={[0, 1, 0]} castShadow receiveShadow>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial />
            </mesh>
        </RigidBody>
    )
};

const GreenBox = () => {
    return (
        <RigidBody mass={5} position={[1.5, 5, 1]}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color={'green'} />
            </mesh>
        </RigidBody>
    )
};

const World = () => {
    return (
        <Suspense fallback={null}>
            <group name='world'>
                <Environment />
                <group name="objects">
                    <WhiteBox />
                    <GreenBox />
                    <Floor />
                    <CameraControls />
                </group>
            </group>
        </Suspense>
    )
}

export default World;
