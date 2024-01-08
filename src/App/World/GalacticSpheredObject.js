import { useMemo, useState } from "react";
import { Html } from '@react-three/drei';

const sizeReductionBy = 1 / 100000.00;


const GalacticSpheredObject = ({ name, size, moveTo=() => {}, color = "red", position = [0, 0, 0], awayFromSun = 0 }) => {
    const thePosition = useMemo(() => {
        const [x, y, z] = position;
        return [x + awayFromSun, y, z];
    }, [position, awayFromSun]);
    const [beingHover, setBeingHover] = useState(false);
    const handleClick = (e) => {
        moveTo(e.object.position);
    };
    const handleHover = (obj) => {
        setBeingHover(true);
    };
    const handleHoverOut = (obj) => {
        setBeingHover(false);
    }
    return (
        <group name={name}
        onPointerEnter={handleHover}
        onPointerOut={handleHoverOut}
        >
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
                {beingHover && <Html style={{zIndex: 1}} >
                    <span style={{ color: color }}>{name}</span>
                </Html>}
            </mesh>
        </group>
    )
};

export default GalacticSpheredObject;
