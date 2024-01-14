import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Planet } from "./Planet";


export const sizeReductionBy = 1 / 100000.00;

/*
Props
{
    name: string;
    size: float;
    awayFromSun: float; // need to be rename to something like awayFromParent
    color: string; // named or hex value
    // good to have is a type like star, planet, moon, steroids, etc.
    // need to be added Lettering color;
    // new values
    rotationSpeed: float fraction; // should be a low number like 0.00001;
    rotation: {
        x: number/float;
        y: number/float;
        z: number/float;
    };
    objects: [
        previous props object
    ]
}


*/
const GalacticSpheredObject = (props) => {
    //states & vars
    const [beingHover, setBeingHover] = useState(false);
    const galacticGroup = useRef();
    const localGroup = useRef();

    const distanceScale = 0.1;
    const thePosition = useMemo(() => {
        const [x, y, z] = props?.proistion || [0, 0, 0];
        const offset = 0//(props.size * sizeReductionBy / 2);
        return [(x + props.awayFromSun - offset) * distanceScale, y, z];
    }, [props.awayFromSun]);

    // handlers & functions
    const handleHover = (obj) => {
        setBeingHover(true);
    };
    const handleHoverOut = (obj) => {
        setBeingHover(false);
    }
    useFrame((state, delta) => {
        // thre should be 2 rotation
        // 1. on its own axes
        // 2. on galaxy axes (parent axes)

        // each planet should have its own local objects
        // each local object have their own central rotation and parent rotation
        
        // galacticGroup.current.rotation.y += delta * 0.01;
        if (localGroup.current && props.name !== "Sun") {
            localGroup.current.rotation.y += delta * (props?.rotationSpeed || 1)//props.awayFromSun * delta * (props?.rotationSpeed || 1);
        }
        // mesh.current.rotation.y += delta;
        // state.camera.lerp()
    });

    return (
        <group
            name={props.name}
            onPointerEnter={handleHover}
            onPointerOut={handleHoverOut}
            ref={galacticGroup}
            position={[0, 0, 0]}
        >
            <Planet {...props} position={thePosition} beingHover={beingHover} />
            {
                props?.objects?.length > 0 &&
                <group
                    name={`props.name-locals`}
                    ref={localGroup}
                    position={thePosition}
                >

                    {props.objects.map(object =>
                        <GalacticSpheredObject {...object} key={`${props.name}-${object.name}`} wireframe={true} />
                    )}

                </group>
            }
            <axesHelper args={[props.size * 3]} />

        </group>
    )
};


export default GalacticSpheredObject;
