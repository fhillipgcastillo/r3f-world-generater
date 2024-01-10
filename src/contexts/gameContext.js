import { createContext } from "react";

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
                awayFromSun:  149900000 / distanceDevider, // km this will be the offset
                rotationSpeed: 0.00001, // maybe rotations per second
                rotation: {
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


export const defaultGameState = {
    paused: true,
    sun: SUN,
    planetsInfo,
    distanceDevider,
};
const GameContext = createContext({});

export default GameContext;