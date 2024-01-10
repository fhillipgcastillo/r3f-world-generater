import React, { Suspense, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Floor from "./Floor";
import Environment from "./Environment";
import { Html, PerspectiveCamera } from '@react-three/drei';
import Player from "./Player";
import { RigidBody } from '@react-three/rapier';
import GalacticSpheredObject from './GalacticSpheredObject';
import { useThree } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import GameContext from '../gameContext';


const World = () => {
    const [teleportTo, setTeleportTo] = useState({});
    const [teleportTarget, setTeleportTarget] = useState({});
    const {sun, planetsInfo, distanceDevider, paused} = useContext(GameContext);

    const game = useThree();
    const galaxiesRef = useRef();
    const controls = useControls('Camera', {
        // debug: false,
        fov: {
            value: 24,
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
            max: 100000000,
            step: 100,
        },
        zoom: {
            value: 1,
            min: 1,
            max: 10,
            step: 1,
        },
        position: [0, 0, 50],
        rotation: [0, 0, 50],
    })
    
    useEffect(() => {
        // if (teleportTo.hasOwnProperty("x")) {
        //     const { x, y, z } = teleportTo;
        //     game.camera.position.set(x, y, z + ((teleportTarget.size * 1 / 100000.00) * 0.1) + (teleportTarget.size * 1 / 100000.00));
        // }
    }, [teleportTo]);
    useEffect(() => {
        // galaxiesRef.current.rotation.y = Math.PI / 8;
    }, [galaxiesRef])
    useFrame((state, delta) => {
        // state.camera.updateMatrixWorld();
        // galaxiesRef.current.rotation.y += delta;
        // state.camera.lerp()
        // console.log(state.camera.position);
    });
    useEffect(() => {
      console.log("sun", {sun, planetsInfo, distanceDevider, paused});
    }, []);
    
    const handleClick = (target, pos) => {
        setTeleportTo(pos);
        setTeleportTarget(target);
        setTimeout(function () {
            setTeleportTarget(null);
            setTeleportTo({});
        }, 500)
    };

    return (
        <Suspense fallback={null}>
            <group name='world'>
                <Environment />
                <group name="objects">
                    <group name='galaxy' ref={galaxiesRef}>
                        {sun && <GalacticSpheredObject
                            {...sun}
                            position={[0, 3, -5]}
                            key={sun.name}
                            moveTo={handleClick}
                        />}
                        {
                            planetsInfo && planetsInfo.map((galacticSphere) =>
                                <GalacticSpheredObject
                                    {...galacticSphere}
                                    position={[0, 3, -5]}
                                    key={galacticSphere.name}
                                    moveTo={handleClick}
                                    objects={galacticSphere?.objects}
                                />
                            )
                        }
                    </group>
                    {/* <Player 
                            initialPosition={[0, 2, 35]}
                            paused={paused}
                            teleportTo={teleportTo}
                        /> */}
                    <PerspectiveCamera
                        {...controls} 
                        // position={[0,0,50]}
                        makeDefault
                        onUpdate={self => {
                            self.updateProjectionMatrix(); 
                            console.log("updated camera", self.rotation)
                        }}
                    />

                </group>
            </group>
        </Suspense>
    )
}

export default World;
