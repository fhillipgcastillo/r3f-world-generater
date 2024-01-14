import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Html } from '@react-three/drei';
import { useFrame, useThree } from "@react-three/fiber";
import { button, useControls } from "leva";
import { PlaneGeometry, Vector3 } from "three";
import { sizeReductionBy } from "./GalacticSpheredObject";
import { invertColor } from "../lib/tools";
import GameContext from "../contexts/gameContext";

export const Planet = (props) => {
    const planet = useRef();
    const game = useThree();
    const [zoom, setZoom] = useState(false);
    const [target, setTarget] = useState({})
    const { debug, orbitControl } = useContext(GameContext);

    const orbitcontrols = useThree(state => state.controls);
    const rotations = props?.rotationSpeed ? {
        rotationSpeed: props?.rotationSpeed,
        rotation: props?.rotation,
    } : {};
    const distanceScale = 0.1;
    const thePosition = useMemo(() => {
        const [x, y, z] = props?.proistion || [0, 0, 0];
        const offset = (props.size * sizeReductionBy / 2);
        return [(x + props.awayFromSun - offset) * distanceScale, y, z];
    }, [props.awayFromSun]);

    const controls = useControls(`${props.name}`, {
        name: props.name,
        size: props.size,
        color: props.color,
        awayFromSun: props.awayFromSun,
        wireframe: false,
        ...rotations,
        // rotation: props.rotation,
        lookAtMe: button((get) => setZoom(!zoom)
        )
    });

    useEffect(() => {
        // if(props.name === "Earth"){
        //     game.camera.lookAt(planet);
        // }
    }, []);
    useFrame((state) => {

        if (zoom) {
            const vec = new Vector3();

            const [x, y, z] = planet.current.position;
            let distance = state.camera.position.distanceTo(planet.current.position) + (controls.size * 4);

            vec.setFromMatrixColumn(state.camera.matrix, 0);
            vec.crossVectors(state.camera.up, vec);
            state.camera.position.addScaledVector(vec, distance);
            state.camera.updateProjectionMatrix();
            orbitControl.current.target.addScaledVector(vec, distance); // this one is using orbit control ref from App because game state controls is being null when this is executed

            state.controls.target.set(x, y, z);
            orbitControl.current.update();

            setTimeout(() => {
                setZoom(false);
            }, 100);
        }
    });


    const zoomToMe = () => {
        setZoom(!zoom)

    }


    const handleClick = (e) => {
        const vec = new Vector3();
        let { distance, object: { position } } = e;
        const [x, y, z] = position;
        distance += controls.size * 4;
        
        vec.setFromMatrixColumn(game.camera.matrix, 0);
        vec.crossVectors(game.camera.up, vec);

        game.camera.position.addScaledVector(vec, distance);
        orbitcontrols.target.addScaledVector(vec, distance);


        orbitcontrols.target.set(x, y, z);
        // orbitcontrols.update();
    };



    return (
        <mesh
            ref={planet}
            position={thePosition}
            castShadow
            receiveShadow
            onClick={handleClick}
            showHelper
        // scale={[scale, scale, scale]}
        >
            <sphereGeometry args={[controls.size, 18, 12]} />
            <meshStandardMaterial color={controls.color} wireframe={controls.wireframe} />
            {/* {beingHover &&  */}
            <Html style={{ zIndex: 1, cursor: "none", fontSize: "10px",  /* cursor: "pointer", */ }}>
                <span style={{ color: invertColor(controls.color) }}>{controls.name}</span>
            </Html>
            {/* } */}
        </mesh>
    );
};
