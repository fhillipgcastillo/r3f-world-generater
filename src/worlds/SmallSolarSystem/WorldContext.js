import { createContext } from "react";

const distanceDevider = 1000000;

export const defaultGameState = {
    paused: true,
    planetsInfo: [],
    distanceDevider,
};

const WorldContext = createContext({});

export default WorldContext;