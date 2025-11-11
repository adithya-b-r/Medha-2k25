import React, { useRef, useEffect } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"
import { useControls } from "leva"

export default function Astronaut(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/models/astronaut/scene.gltf")
  const { actions } = useAnimations(animations, group)
  const { position, rotation, scale } = useControls("Astronaut", {
    position: { value: [0, -1, 4], step: 0.1 },
    rotation: { value: [0, 0, 0], step: 0.01 },
    scale: { value: 1, step: 0.1 }
  })

  useEffect(() => {
    if (actions.Loops) actions.Loops.play()
  }, [actions])

  return (
    <group ref={group} {...props} position={position} rotation={rotation} scale={scale} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.011}>
          <group name="17f9d1b3a83741e2a2981db7241c686efbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Astronaut" position={[0, 76.083, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                <group name="Armature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                  <group name="Object_6">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh name="Object_9" geometry={nodes.Object_9.geometry} material={materials.Astronaut} skeleton={nodes.Object_9.skeleton} />
                    <group name="Object_8" position={[0, 76.083, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("/models/astronaut/scene.gltf")
