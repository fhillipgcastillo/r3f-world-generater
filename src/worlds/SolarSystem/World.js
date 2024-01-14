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



const distanceDevider = 1000000;

const planetsInfo = [
    {
        name: "Sun",
        size: 1391400, //1,391,400 km
        color: "orange",
        awayFromSun: 1, // km
    },
    {
        name: "Mercury",
        size: 4879, // diameter
        color: "#c0bdbc", // or hex color
        awayFromSun: 57900000, //57900000, // km
        // rotationSpeed: 1, // maybe rotations per second
        // rotationAngle: 0, // angle
    },
    {
        name: "Venus",
        size: 12104, // diameter
        color: "#f4dbcc", // or hex color
        awayFromSun: 108200000, //149600000, // km
        // rotationSpeed: 1, // maybe rotations per second
        // rotationAngle: 0, // angle
    },
    {
        name: "Earth",
        size: 12756, // diameter
        color: "#426b8f", // or hex color
        awayFromSun: 149600000, // km
        // rotationSpeed: 1, // maybe rotations per second
        // rotationAngle: 0, // angle
        objects: [
            {
                name: "Moon",
                size: 6000, // diameter
                color: "white", // or hex color
                awayFromSun: 384400, // km this will be the offset
                rotationSpeed: 0.00001, // maybe rotations per second
                rotation: {
                    x: 0,
                    y: 384400,
                    z: 0,
                }
            },
        ]
    },
    {
        name: "Mars",
        size: 6792, // diameter
        color: "#f27b5f", // or hex color
        awayFromSun: 227900000, //149600000, // km
        // rotationSpeed: 1, // maybe rotations per second
        // rotationAngle: 0, // angle
    },
    {
        name: "Jupiter",
        size: 142984, // diameter
        color: "#bfaf9b", // or hex color
        awayFromSun: 778600000, //149600000, // km
        // rotationSpeed: 1, // maybe rotations per second
        // rotationAngle: 0, // angle
    },
    {
        name: "Saturn",
        size: 120536, // diameter
        color: "#f3ce88", // or hex color
        awayFromSun: 1433500000, //149600000, // km
        // rotationSpeed: 1, // maybe rotations per second
        // rotationAngle: 0, // angle
    },
    {
        name: "Uranus",
        size: 51118, // diameter
        color: "#d0ecf0", // or hex color
        awayFromSun: 2872500000, //149600000, // km
        // rotationSpeed: 1, // maybe rotations per second
        // rotationAngle: 0, // angle
    },
    {
        name: "Neptune",
        size: 49528, // diameter
        color: "#657ba5", // or hex color
        awayFromSun: 4495100000, //149600000, // km
        // rotationSpeed: 1, // maybe rotations per second
        // rotationAngle: 0, // angle
    },

];


const World = () => {
    const [teleportTo, setTeleportTo] = useState({});
    const [teleportTarget, setTeleportTarget] = useState({});
    const { paused } = useContext(GameContext);

    const game = useThree();
    const galaxiesRef = useRef();
    const controls = useControls('Camera', {
        // debug: false,
        fov: {
            value: 50,
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
            value: 9681040000,
            min: 400,
            max: 10820000000,
            step: 10000,
        },
        zoom: {
            value: 1,
            min: 1,
            max: 10,
            step: 1,
        },
        position: [3000, 0, 2872500000 * 0.001],
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

    const handleClick = (target, pos) => {
        setTeleportTo(pos);
        setTeleportTarget(target);
        setTimeout(function () {
            setTeleportTarget(null);
            setTeleportTo({});
        }, 500)
    };

    return (
        // <WorldContext.Provider value={{ planetsInfo, }}>
            <Suspense fallback={null}>
                <group name='world'>
                    <Environment />
                    <group name="objects">
                        <group name='galaxy' ref={galaxiesRef}>
                            {
                                planetsInfo && planetsInfo.map((galacticSphere) =>
                                    <group key={galacticSphere.name}>
                                        <GalacticSpheredObject
                                            {...galacticSphere}
                                            position={[0, 3, -5]}
                                            moveTo={handleClick}
                                            objects={galacticSphere?.objects}
                                        />
                                        {/* {
                                        galacticSphere?.objects?.map((localObject) => <GalacticSpheredObject
                                            {...localObject}
                                            position={[0, 3, -5]}
                                            key={localObject.name}
                                            moveTo={handleClick}
                                            objects={localObject?.objects}
                                        />
                                        )
                                    } */}
                                    </group>
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
