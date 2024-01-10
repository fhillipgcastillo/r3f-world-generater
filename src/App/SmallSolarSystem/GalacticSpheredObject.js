import { useEffect, useMemo, useRef, useState } from "react";
import { Html } from '@react-three/drei';
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Vector3 } from "three";


const sizeReductionBy = 1 / 100000.00;

const Planet = (props) => {
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
        wireframe: true,
        ...rotations
        // rotation: props.rotation,
    })

    const thePosition = useMemo(() => {
        const [x, y, z] = [0, 0, 0];
        return [x + controls.awayFromSun, y, z];
    }, [controls.awayFromSun]);


    const handleClick = (e) => {
        const vec = new Vector3();
        const { distance, object: {position} } = e;
        const  [ x, y, z ] = position;

        vec.setFromMatrixColumn(game.camera.matrix, 0)
        vec.crossVectors(game.camera.up, vec)
        
        // console.log("looking at " + controls.name, );
        
        game.camera.position.addScaledVector(vec, distance)
        orbitcontrols.target.addScaledVector(vec, distance);
        

        orbitcontrols.target.set(x, y, z);
        orbitcontrols.update();
    };

    useEffect(() => {
        // if(props.name === "Earth"){
        //     game.camera.lookAt(planet);
        // }
    }, [])
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

    const thePosition = useMemo(() => {
        const [x, y, z] = props?.proistion || [0, 0, 0];
        return [x + props.awayFromSun, y, z];
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
            <axesHelper args={[props.size * sizeReductionBy * 2]} />

        </group>
    )
};


export default GalacticSpheredObject;
