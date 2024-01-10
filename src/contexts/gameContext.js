import { createContext } from "react";

const distanceDevider = 1000000;
const SUN = {
    name: "Sun",
    size: 1391400, //1,391,400 km
    color: "orange",
    awayFromSun: 1, // km
};


export const defaultGameState = {
    paused: true,
    planetsInfo: [],
    distanceDevider,
};
const GameContext = createContext({});

export default GameContext;