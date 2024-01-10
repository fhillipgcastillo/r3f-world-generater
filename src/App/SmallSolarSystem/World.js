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
import WorldContext from './WorldContext';




const World = () => {
    const [teleportTo, setTeleportTo] = useState({});
    const [teleportTarget, setTeleportTarget] = useState({});
    const { distanceDevider, paused } = useContext(GameContext);
    const planetsInfo = [
        {
            name: "Sun",
            size: 1391400, //1,391,400 km
            color: "orange",
            awayFromSun: 0, // km
            objects: [
                {
                    name: "Earth",
                    size: 12756 * 10, // diameter
                    color: "#426b8f", // or hex color
                    awayFromSun: 149600000 / distanceDevider, // km
                    // rotationSpeed: 1, // maybe rotations per second
                    // rotationAngle: 0, // angle
                    objects: [
                        {
                            name: "Moon",
                            size: 6000 * 10, // diameter
                            color: "white", // or hex color
                            awayFromSun: 384400 * 0.0001, // km this will be the offset
                            rotationSpeed: 0.00001, // maybe rotations per second
                            rotation: {
                                x: 0,
                                y: 384400 * 0.0001,
                                z: 0,
                            }
                        },
                    ]
                },
                {
                    name: "Mars",
                    size: 6792 * 10, // diameter
                    color: "#f27b5f", // or hex color
                    awayFromSun: 227900000 / distanceDevider, //149600000, // km
                    // rotationSpeed: 1, // maybe rotations per second
                    // rotationAngle: 0, // angle
                },
            ]
        },

    ];
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
            value: 5000,
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
        position: [1000, 0, 300],
        rotation: [0, 0, 0],
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
        // console.group("position");
        // console.log(state.camera.position);
        // console.log(controls.position);
        // console.groupEnd();
    });

    const handleClick = (target, pos) => {
        setTeleportTo(pos);
        setTeleportTarget(target);
        setTimeout(function () {
            setTeleportTarget(null);
            setTeleportTo({});
        }, 500)
    };

    return (
        <WorldContext.Provider value={{ planetsInfo }}>
            <Suspense fallback={null}>
                <group name='world'>
                    <Environment />
                    <group name="objects">
                        <group name='galaxy' ref={galaxiesRef}>
                            {
                                planetsInfo && planetsInfo.map((galacticSphere) =>

                                    <GalacticSpheredObject
                                        key={galacticSphere.name}
                                        {...galacticSphere}
                                        position={[0, 0, 0]}
                                        moveTo={handleClick}
                                        objects={galacticSphere?.objects}
                                    />
                                )
                            }
                        </group>
                        <PerspectiveCamera
                            {...controls}
                            makeDefault
                            manual={false}
                            onUpdate={self => {
                                self.updateProjectionMatrix();
                                // console.log("updated camera", self)
                            }}
                        />

                    </group>
                </group>
            </Suspense>
        </WorldContext.Provider>
    )
}

export default World;
