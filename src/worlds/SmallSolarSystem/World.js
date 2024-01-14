import React, { Suspense, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Html, PerspectiveCamera } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useThree } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';

import GameContext from '../../contexts/gameContext';
// import WorldContext from './WorldContext';

import Floor from "../../components/Floor";
import Environment from "../../components/Environment";
import Player from "../../components/Player";
import GalacticSpheredObject from '../../components/GalacticSpheredObject';


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

 


    const handleClick = (target, pos) => {
        setTeleportTo(pos);
        setTeleportTarget(target);
        setTimeout(function () {
            setTeleportTarget(null);
            setTeleportTo({});
        }, 500)
    };

    return (
        // <WorldContext.Provider value={{ planetsInfo }}>
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
        // </WorldContext.Provider>
    )
}

export default World;
