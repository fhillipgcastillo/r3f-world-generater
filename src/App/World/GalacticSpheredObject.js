import { useEffect, useMemo, useRef, useState } from "react";
import { Html } from '@react-three/drei';
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Vector3 } from "three";

const sizeReductionBy = 1 / 100000.00;

const Planet = (props) => {
    const planet = useRef();
    const game = useThree();

    const controls = useControls(`${props.name}`, {
        name: props.name,
        size: props.size,
        color: props.color,
        awayFromSun: props.awayFromSun,
        rotationSpeed: props?.rotationSpeed || 0,
        rotation: props?.rotation || { x: 0, y: 0, z: 0 },
        wireframe: true,
        // rotation: props.rotation,

    })

    const thePosition = useMemo(() => {
        const [x, y, z] = [0, 0, 0];
        return [x + controls.awayFromSun, y, z];
    }, [controls.awayFromSun]);


    const handleClick = (e) => {
        console.log("looking at " + controls.name);
        game.camera.lookAt(planet.current.position);
        // moveTo(e.object.position);
        const { x, y, z } = thePosition;
        game.camera.position.set(x, y, z /* + ((size * 1 / 100000.00) * 0.1) + (size * 1 / 100000.00) */);

    };
    useFrame((state) => {
        state.camera.updateProjectionMatrix()
    });

    return (
        <mesh
            ref={planet}
            position={thePosition}
            castShadow
            receiveShadow
            onClick={handleClick}

        // onPointerEnter={handleHover}
        // onPointerOut={handleHoverOut}
        >
            <sphereGeometry args={[controls.size * sizeReductionBy, 18, 12]} />
            <meshStandardMaterial color={controls.color} wireframe={controls.wireframe} />
            {/* {beingHover &&  */}
            <Html style={{ zIndex: 1, cursor: "pointer", }} >
                <span style={{ color: controls.color }}>{controls.name}</span>
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
    const localGroup = useRef();

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
        // galacticGroup.current.rotation.y += controls.awayFromSun * delta * controls.rotationSpeed;
        if(props.objects){
        localGroup.current.rotation.y += delta * (props?.rotationSpeed || 1)//props.awayFromSun * delta * (props?.rotationSpeed || 1);
        }// mesh.current.rotation.y += delta;
        // state.camera.lerp()
    });

    return (
        <group
            name={props.name}
            onPointerEnter={handleHover}
            onPointerOut={handleHoverOut}
            ref={galacticGroup}
        >
            <group
                name={`props.name-locals`}
                ref={localGroup}
                position={[props.awayFromSun * 2, 0, 0]}
            >
                <Planet {...props} beingHover={beingHover} />

                {
                    props?.objects?.length > 0 && props.objects.map(object => <Planet {...object} key={object.name} wireframe={true} />)
                }
                <axesHelper args={[props.size * sizeReductionBy * 2]} />
            </group>
        </group>
    )
};


export default GalacticSpheredObject;
