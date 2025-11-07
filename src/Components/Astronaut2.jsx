import React, { useRef, useEffect, useMemo } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"
import { useControls } from "leva"
import { useMediaQuery } from "react-responsive"

function Astronaut2Controlled({ folder, presets, ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/models/astronaut2/scene.gltf")
  const { actions, names } = useAnimations(animations, group)

  const { position, rotation, scale } = useControls(folder, {
    position: { value: presets.position, step: 0.1 },
    rotation: { value: presets.rotation, step: 0.01 },
    scale: { value: presets.scale, step: 0.1 }
  })

  useEffect(() => {
    names.forEach((name) => actions[name]?.play())
  }, [actions, names])

  return (
    <group ref={group} {...props} position={position} rotation={rotation} scale={scale} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.122}>
          <group name="e75203c17064471a80f45a957ee6d120fbx" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Astronaut" rotation={[2.109, 1.4, -2.577]} scale={[-25.732, -25.723, -31.878]} />
                <group name="Armature_Astronaut" position={[0, 0, 7.92]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                  <group name="Object_6">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh name="Object_9" geometry={nodes.Object_9.geometry} material={materials.Astronaut} skeleton={nodes.Object_9.skeleton} />
                    <skinnedMesh name="Object_10" geometry={nodes.Object_10.geometry} material={materials.visier} skeleton={nodes.Object_10.skeleton} />
                    <group name="Object_8" rotation={[-1.032, -1.4, 2.577]} scale={[-25.732, 25.723, 31.878]} />
                  </group>
                </group>
                <group name="Sun" rotation={[3.128, 0.773, -2.283]} scale={100}>
                  <group name="Object_65" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="Object_66" />
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

export default function Astronaut2(props) {
  const isDesktop = useMediaQuery({ minWidth: 1024 })

  const presets = useMemo(
    () =>
      isDesktop
        ? { position: [-1, -0.5, 4], rotation: [-0.3, 0.8, 0], scale: 1 }
        : { position: [-0.5, -0.6, 3.5], rotation: [-0.3, 0.5, -0.4], scale: 1 },
    [isDesktop]
  )

  const folder = isDesktop ? "Astronaut2 • Desktop" : "Astronaut2 • Mobile"

  return <Astronaut2Controlled key={folder} folder={folder} presets={presets} {...props} />
}

useGLTF.preload("/models/astronaut2/scene.gltf")
