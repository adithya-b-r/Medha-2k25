import * as THREE from 'three'
import { Points, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'

export default function Space(props) {
  const ref = useRef()
  const { nodes } = useGLTF('/space/space.gltf')
  
  const [positions, colors] = useMemo(() => {
    nodes.Object_2.geometry.center()
    const positions = new Float32Array(
      nodes.Object_2.geometry.attributes.position.array.buffer
    )
    const colors = new Float32Array(positions.length)

    const getDistanceToCenter = (x, y, z) =>
      Math.sqrt(x * x + y * y + z * z)

    const color = new THREE.Color()
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const z = positions[i + 2]
      const distanceToCenter = getDistanceToCenter(x, y, z)
      const normalizedDistanceToCenter = distanceToCenter / 100

      // Glowing blue color scheme
      // Center: Bright cyan/blue, Outer: Deep blue with purple hints
      const blueIntensity = Math.max(0.3, Math.cos(normalizedDistanceToCenter * 0.5))
      const greenIntensity = Math.max(0.1, Math.sin(normalizedDistanceToCenter * 0.3) * 0.4)
      const redIntensity = Math.max(0, Math.sin(normalizedDistanceToCenter * 0.7) * 0.2)

      color.setRGB(
        redIntensity,      // Red - minimal for blue glow
        greenIntensity,    // Green - some for cyan tones
        blueIntensity      // Blue - dominant for glowing effect
      )
      color.toArray(colors, i)
    }

    return [positions, colors]
  }, [nodes])

  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.getElapsedTime() / 5
    ref.current.scale.setScalar(Math.sin(clock.getElapsedTime() / 2) + 1.8)
  })

  return (
    <group {...props} dispose={null} ref={ref}>
      <pointLight position={[0, 0, 0]} intensity={1.2} color="#4fc3f7" />
      <ambientLight intensity={0.3} color="#4fc3f7" />
      <Points scale={0.05} positions={positions} colors={colors}>
        <pointsMaterial
          transparent
          depthWrite={false}
          vertexColors
          opacity={0.9}
          depthTest
          size={0.012}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

useGLTF.preload('/space/space.gltf')