import { useMemo, useRef, useState } from "react";
import { Html } from '@react-three/drei';
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

const sizeReductionBy = 1 / 100000.00;

const Planet = ({ name, size, moveTo = () => { }, color = "red", position = [0, 0, 0], awayFromSun = 0, objects, beingHover }) => {
    const thePosition = useMemo(() => {
        const [x, y, z] = position;
        return [x + awayFromSun, y, z];
    }, [position, awayFromSun]);

    const handleClick = (e) => {
        moveTo(e.object.position);
    };

    return (
        <mesh
            position={thePosition}
            castShadow
            receiveShadow
            onClick={handleClick}
        // onPointerEnter={handleHover}
        // onPointerOut={handleHoverOut}
        >
            <sphereGeometry args={[size * sizeReductionBy, 18, 12]} />
            <meshStandardMaterial color={color} />
            {/* {beingHover &&  */}
            <Html style={{ zIndex: 1 }} >
                <span style={{ color: color }}>{name}</span>
            </Html>
            {/* } */}
        </mesh>
    );
};

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
    const controls = useControls(`${props.name}`, {
        speed: {
            value: 0.00001,
            min: 0.00001,
            max: 0.01,
            step: 0.00001,
        }
    })
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
        // console.log("delta", delta);
        galacticGroup.current.rotation.y += props.awayFromSun * delta * controls.speed;
        // mesh.current.rotation.y += delta;
        // state.camera.lerp()
    });

    return (
        <group
            name={props.name}
            onPointerEnter={handleHover}
            onPointerOut={handleHoverOut}
            ref={galacticGroup}
        >
            <Planet {...props} beingHover={beingHover} />

            {
                props?.objects?.length > 0 && props.objects.map(object => <Planet {...object} key={object.name} />)
            }
            <axesHelper args={[props.size * sizeReductionBy]} />
        </group>
    )
};

export default GalacticSpheredObject;
