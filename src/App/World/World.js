import React, { Suspense, useMemo, useState } from 'react'
import Floor from "./Floor";
import Environment from "./Environment";
import { Html } from '@react-three/drei';
import Player from "./Player";
import { RigidBody } from '@react-three/rapier';
import GalacticSpheredObject from './GalacticSpheredObject';
// import { useFrame } from '@react-three/fiber';

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
    // useFrame((state, delta) => {
    // })
    const [teleportTo, setTeleportTo] = useState({});
    const handleClick = (pos) => {
        setTeleportTo(pos);
        setTimeout(function (){
            setTeleportTo({});
        }, 500)
    };
    return (
        <Suspense fallback={null}>
            <group name='world'>
                <Environment />
                <group name="objects">
                    <group name='galaxy'>
                        {
                            planetsInfo.map((galacticSphere) =>
                                <GalacticSpheredObject
                                    {...galacticSphere}
                                    position={[0, 3, -5]}
                                    key={galacticSphere.name}
                            moveTo={handleClick}
                            />
                            )
                        }
                    </group>
                    <Player 
                        initialPosition={[0, 2, 35]}
                        paused={paused}
                        teleportTo={teleportTo}
                    />
                    <RigidBody mass={1} position={[(14960000 / distanceDevider / 2), 50, -5]} friction={10}>
                        <GalacticSpheredObject
                            name="Ball"
                            color='white'
                            size={12756 * 10}
                            awayFromSun={(14960000 / distanceDevider / 2)}
                            moveTo={handleClick}
                       />
                    </RigidBody>
                    <Floor />
                </group>
            </group>
        </Suspense>
    )
}

export default World;
