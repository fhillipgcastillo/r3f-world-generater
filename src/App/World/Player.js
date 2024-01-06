import * as THREE from "three"
import * as RAPIER from "@dimforge/rapier3d-compat"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier"
import { useControls } from "leva"

const SPEED = 50;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
// const rotation = new THREE.Vector3();

function Player({ initialPosition = [0, 1, 5], lerp = THREE.MathUtils.lerp }) {
    const ref = useRef()
    const rapier = useRapier()
    const [_, get] = useKeyboardControls()
    // const constrols = useControls('Player', {
    //     x: initialPosition[0],
    //     y: initialPosition[1],
    //     z: initialPosition[2],
    // });


    useFrame((state) => {
        const { forward, backward, left, right, jump } = get();
        // console.log("keyboard", { forward, backward, left, right, jump } )
        if (!ref.current) return;
        const velocity = ref.current?.linvel();
        
        // update camera
        const { x, y, z } = ref.current?.translation();
        state.camera.position.set(x, y + 1.5, z);
        // update axe
        // axe.current.children[0].rotation.x = lerp(axe.current.children[0].rotation.x, Math.sin((velocity.length() > 1) * state.clock.elapsedTime * 10) / 6, 0.1)
        // axe.current.rotation.copy(state.camera.rotation)
        // axe.current.position.copy(state.camera.position).add(state.camera.getWorldDirection(rotation).multiplyScalar(1))
        
        // movement
        frontVector.set(0, 0, backward - forward)
        sideVector.set(left - right, 0, 0)
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(state.camera.rotation)
        ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })
        // jumping
        const world = rapier.world
        const ray = world.castRay(new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 }))
        const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75
        if (jump && grounded) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 })
    })
    return (
        // <mesh ref={ref} position={[initialPosition]}>
        <RigidBody
            ref={ref}
            colliders={false}
            mass={1}
            type="dynamic"
            position={initialPosition}
            enabledRotations={[false, false, false]}
        >
            <CapsuleCollider args={[0.75, 0.5]} />
        </RigidBody>
        // </mesh>
    )
}

export default Player;
