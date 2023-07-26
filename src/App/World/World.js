import React, { Suspense } from 'react'
import Floor from "./Floor";
import Environment from "./Environment";

const World = () => {
    return (
        <Suspense fallback={null}>
            <group name='world'>
                <Environment />
                <group name="objects">
                    <Floor />
                </group>
            </group>
        </Suspense>
    )
}

export default World;
