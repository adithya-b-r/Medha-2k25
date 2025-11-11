import React, { useEffect, useMemo, useRef } from "react"
import { useGLTF, useAnimations, useTexture } from "@react-three/drei"
import { useControls } from "leva"
import * as THREE from "three"

const UFO_ANIMS = ["Hovering", "Zooming", "Abduction Force Field"]

export default function Ufo(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/models/ufo/scene.gltf")
  const { actions, mixer, names } = useAnimations(animations, group)

  const animNames = useMemo(() => (names && names.length ? names : UFO_ANIMS), [names])
  const animOptions = useMemo(() => Object.fromEntries(animNames.map((n) => [n, n])), [animNames])

  const { animName, fade, speed, loop, applyTextures, position, rotation, scale } = useControls(
    "UFO",
    {
      animName: { label: "Animation", options: animOptions, value: animNames[1] },
      fade: { label: "Fade", value: 0.3, min: 0, max: 2, step: 0.1 },
      speed: { label: "Speed", value: 1, min: 0, max: 3, step: 0.1 },
      loop: { label: "Loop", value: true },
      applyTextures: { label: "Apply Textures", value: true },
      position: { label: "Position", value: { x: 0, y: -7, z: 0 }, step: 0.1 },
      rotation: { label: "Rotation (rad)", value: { x: 0, y: 0, z: 0 }, step: 0.1 },
      scale: { label: "Scale", value: { x: 2, y: 2, z: 1 }, min: 0.01, max: 10, step: 0.1 },
    },
    { collapsed: true }
  )


  const tex = useTexture({
    map: "/models/ufo/textures/material_0_diffuse.png",
    specGloss: "/models/ufo/textures/material_0_specularGlossiness.png",
    emissiveMap: "/models/ufo/textures/material_0_emissive.png",
    normalMap: "/models/ufo/textures/material_0_normal.png",
  })

  useMemo(() => {
    Object.values(tex).forEach((t) => {
      if (t && "flipY" in t) t.flipY = false
    })
    if (tex.map && "colorSpace" in tex.map) tex.map.colorSpace = THREE.SRGBColorSpace
  }, [tex])

  const material = useMemo(() => {
    const base = materials.material_0
    if (!applyTextures) {
      base.transparent = false
      base.opacity = 1
      base.alphaTest = 0
      base.depthWrite = true
      base.depthTest = true
      base.side = THREE.FrontSide
      base.blending = THREE.NormalBlending
      base.needsUpdate = true
      return base
    }
    const mat = base.clone()
    mat.map = tex.map
    mat.normalMap = tex.normalMap
    mat.emissiveMap = tex.emissiveMap
    mat.emissive = new THREE.Color(0xffffff)
    mat.emissiveIntensity = 1
    mat.transparent = false
    mat.opacity = 1
    mat.alphaTest = 0
    mat.depthWrite = true
    mat.depthTest = true
    mat.side = THREE.FrontSide
    mat.blending = THREE.NormalBlending
    mat.needsUpdate = true
    return mat
  }, [applyTextures, materials.material_0, tex.map, tex.normalMap, tex.emissiveMap])

  useEffect(() => {
    const name = animName
    if (!name || !actions[name]) return
    Object.entries(actions).forEach(([n, action]) => {
      if (!action) return
      action.setEffectiveTimeScale(1).setEffectiveWeight(1)
      if (n === name) {
        action.reset()
        action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, Infinity)
        action.clampWhenFinished = !loop
        action.enabled = true
        action.fadeIn(fade).play()
        action.timeScale = speed
      } else {
        action.fadeOut(fade)
      }
    })
    return () => {
      Object.values(actions).forEach((a) => a && a.stop())
    }
  }, [actions, animName, fade, loop, speed])

  useEffect(() => {
    mixer.timeScale = speed
  }, [mixer, speed])

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
      scale={[scale.x, scale.y, scale.z]}
    >
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={2.019}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="RootNode0_0" scale={0.01}>
                <group name="skeletal1_1">
                  <group name="GLTF_created_0">
                    <primitive object={nodes.GLTF_created_0_rootJoint} />
                    <skinnedMesh
                      name="Object_17"
                      geometry={nodes.Object_17.geometry}
                      material={material}
                      skeleton={nodes.Object_17.skeleton}
                    />
                    <group name="ufo11_11_correction">
                      <group name="ufo11_11" />
                    </group>
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

useGLTF.preload("/models/ufo/scene.gltf")
