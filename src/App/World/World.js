import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import Floor from "./Floor";
import Environment from "./Environment";
import { Html, PerspectiveCamera } from '@react-three/drei';
import Player from "./Player";
import { RigidBody } from '@react-three/rapier';
import GalacticSpheredObject from './GalacticSpheredObject';
import { useThree } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';

const distanceDevider = 1000000;
const SUN = {
    name: "Sun",
    size: 1391400, //1,391,400 km
    color: "orange",
    awayFromSun: 1, // km
};

const planetsInfo = [

    {
        name: "Mercury",
        size: 4879, // diameter
        color: "#c0bdbc", // or hex color
        awayFromSun: 57900000 / distanceDevider, //57900000, // km
        // rotationSpeed: 1, // maybe rotations per second
        // rotationAngle: 0, // angle
    },
    {
        name: "Venus",
        size: 12104 * 10, // diameter
        color: "#f4dbcc", // or hex color
        awayFromSun: 108200000 / distanceDevider, //149600000, // km
        // rotationSpeed: 1, // maybe rotations per second
        // rotationAngle: 0, // angle
    },
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
                awayFromSun:  149600000 / distanceDevider, // km this will be the offset
                rotationSpeed: 0.00001, // maybe rotations per second
                rotarion: {
                    x: 0,
                    y:  149600000 / distanceDevider,
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
    {
        name: "Jupiter",
        size: 142984, // diameter
        color: "#bfaf9b", // or hex color
        awayFromSun: 778600000 / distanceDevider, //149600000, // km
        // rotationSpeed: 1, // maybe rotations per second
        // rotationAngle: 0, // angle
    },
    {
        name: "Saturn",
        size: 120536, // diameter
        color: "#f3ce88", // or hex color
        awayFromSun: 1433500000 / distanceDevider, //149600000, // km
        // rotationSpeed: 1, // maybe rotations per second
        // rotationAngle: 0, // angle
    },
    {
        name: "Uranus",
        size: 51118, // diameter
        color: "#d0ecf0", // or hex color
        awayFromSun: 2872500000 / distanceDevider, //149600000, // km
        // rotationSpeed: 1, // maybe rotations per second
        // rotationAngle: 0, // angle
    },
    {
        name: "Neptune",
        size: 49528, // diameter
        color: "#657ba5", // or hex color
        awayFromSun: 4495100000 / distanceDevider, //149600000, // km
        // rotationSpeed: 1, // maybe rotations per second
        // rotationAngle: 0, // angle
    },

];

const World = ({ cameraControls, paused }) => {
    const [teleportTo, setTeleportTo] = useState({});
    const [teleportTarget, setTeleportTarget] = useState({});
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
    const handleClick = (target, pos) => {
        setTeleportTo(pos);
        setTeleportTarget(target);
        setTimeout(function () {
            setTeleportTarget(null);
            setTeleportTo({});
        }, 500)
    };
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
    })
    return (
        <Suspense fallback={null}>
            <group name='world'>
                <Environment />
                <group name="objects">
                    <group name='galaxy' ref={galaxiesRef}>
                        <GalacticSpheredObject
                            {...SUN}
                            position={[0, 3, -5]}
                            key={SUN.name}
                            moveTo={handleClick}
                        />
                        {
                            planetsInfo.map((galacticSphere) =>
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
