// Ufo.jsx
import React, { useRef, useEffect, forwardRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { useControls } from 'leva'
import { useMediaQuery } from "react-responsive"

export const Ufo = forwardRef((props, ref) => {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/ufosmall/scene.gltf')
  const { actions } = useAnimations(animations, group)
  
  const [initialPosition] = useState([0, 0.2, 2])
  const [isMoving, setIsMoving] = useState(false)
  const returnTimeoutRef = useRef(null)
  
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const { position, rotation, scale } = useControls('UFO Controls', {
    position: {
      value: initialPosition,
      step: 0.1,
      min: -10,
      max: 10,
    },
    rotation: {
      value: [0.1, 0, 0],
      step: 0.01,
      min: -Math.PI * 2,
      max: Math.PI * 2,
    },
    scale: {
      value: 0.45,
      step: 0.01,
      min: 0.1,
      max: 5,
    },
  })

  useEffect(() => {
    const animationName = 'ArmatureAction.001'
    const action = actions[animationName]

    if (action) {
      action.setLoop(THREE.LoopRepeat, Infinity).play()
    } else {
      console.warn(`Animation '${animationName}' not found in model.`)
    }
  }, [actions])

  const moveUfo = (targetX) => {
    if (!group.current) return
    
    // Clear any existing timeout
    if (returnTimeoutRef.current) {
      clearTimeout(returnTimeoutRef.current)
    }
    
    setIsMoving(true)
    
    // Move to new position
    gsap.to(group.current.position, {
      x: targetX,
      duration: 1,
      ease: "power.inOut",
      onComplete: () => {
        // Set timeout to return to initial position after 2 seconds
        returnTimeoutRef.current = setTimeout(() => {
          returnToInitialPosition()
        }, 2000)
      }
    })
  }

  const returnToInitialPosition = () => {
    if (!group.current) return
    
    gsap.to(group.current.position, {
      x: initialPosition[0],
      y: initialPosition[1],
      z: initialPosition[2],
      duration: 1,
      ease: "power.inOut",
      onComplete: () => {
        setIsMoving(false)
      }
    })
  }

  // Mouse move handler for desktop
  useEffect(() => {
    if (isMobile) return // Skip mouse events on mobile

    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 4 - 2
      moveUfo(x)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile])

  // Click/touch handler for mobile
  useEffect(() => {
    if (!isMobile) return // Skip touch events on desktop

    const handlePointerDown = (event) => {
      const clientX = event.clientX || (event.touches && event.touches[0].clientX)
      if (clientX) {
        const x = (clientX / window.innerWidth) * 4 - 2
        moveUfo(x)
      }
    }

    // Add both mouse and touch events for mobile
    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('touchstart', handlePointerDown)
    
    return () => {
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('touchstart', handlePointerDown)
    }
  }, [isMobile])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (returnTimeoutRef.current) {
        clearTimeout(returnTimeoutRef.current)
      }
    }
  }, [])

  return (
    <group
      ref={group}
      position={position}
      rotation={rotation}
      scale={scale}
      {...props}
      dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Armature_6">
                <group name="GLTF_created_0">
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.LightMEtal}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name="Object_8"
                    geometry={nodes.Object_8.geometry}
                    material={materials.DarkMetal}
                    skeleton={nodes.Object_8.skeleton}
                  />
                  <skinnedMesh
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials.Light}
                    skeleton={nodes.Object_9.skeleton}
                  />
                  {/* Rings (Object_10) commented out */}
                  <skinnedMesh
                    name="Object_10"
                    geometry={nodes.Object_10.geometry}
                    material={materials.White}
                    skeleton={nodes.Object_10.skeleton}
                  />
                  <skinnedMesh
                    name="Object_11"
                    geometry={nodes.Object_11.geometry}
                    material={materials.Glass}
                    skeleton={nodes.Object_11.skeleton}
                  />
                  <group
                    name="Body_5"
                    position={[0, -0.2017543, 0]}
                    scale={[0.41318879, 0.5509184, 0.41318879]}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
})

useGLTF.preload('/models/ufosmall/scene.gltf')