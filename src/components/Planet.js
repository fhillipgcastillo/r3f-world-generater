import { useEffect, useMemo, useRef } from "react";
import { Html } from '@react-three/drei';
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Vector3 } from "three";
import { sizeReductionBy } from "./GalacticSpheredObject";
import { invertColor } from "../lib/tools";

export const Planet = (props) => {
    const planet = useRef();
    const game = useThree();
    const orbitcontrols = useThree(state => state.controls);
    const rotations = props?.rotationSpeed ? {
        rotationSpeed: props?.rotationSpeed,
        rotation: props?.rotation,
    } : {};
    const controls = useControls(`${props.name}`, {
        name: props.name,
        size: props.size,
        color: props.color,
        awayFromSun: props.awayFromSun,
        wireframe: false,
        ...rotations
        // rotation: props.rotation,
    });
    const distanceScale = 0.1;
    const thePosition = useMemo(() => {
        const [x, y, z] = props?.proistion || [0, 0, 0];
        const offset = (props.size * sizeReductionBy / 2);
        return [(x + props.awayFromSun - offset) * distanceScale, y, z];
    }, [props.awayFromSun]);


    const handleClick = (e) => {
        const vec = new Vector3();
        const { distance, object: { position } } = e;
        const [x, y, z] = position;

        vec.setFromMatrixColumn(game.camera.matrix, 0);
        vec.crossVectors(game.camera.up, vec);

        // console.log("looking at " + controls.name, );
        game.camera.position.addScaledVector(vec, distance);
        orbitcontrols.target.addScaledVector(vec, distance);


        orbitcontrols.target.set(x, y, z);
        orbitcontrols.update();
    };

    useEffect(() => {
        // if(props.name === "Earth"){
        //     game.camera.lookAt(planet);
        // }
    }, []);
    useFrame((state) => {
        state.camera.updateProjectionMatrix();
    });
    
    return (
        <mesh
            ref={planet}
            position={thePosition}
            castShadow
            receiveShadow
            onClick={handleClick}
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
