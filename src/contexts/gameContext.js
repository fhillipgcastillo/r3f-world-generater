import { createContext } from "react";

const distanceDevider = 1000000;

export const defaultGameState = {
    paused: true,
    planetsInfo: [],
    distanceDevider,
    debug: true,
};
const GameContext = createContext({});

export default GameContext;