import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber";
import Space from "../Components/Space";
import { Suspense } from "react";

export const Hero = () => {
  return (
    <section className="w-full h-screen top-0 left-0 -z-10 relative"> {/*fixed */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <img className="h-18 md:h-32 w-fit" src="medha2.png" alt="Medha Main" />
      </div>

      <Canvas className="w-full h-full">
        <ambientLight intensity={0.5} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
        // autoRotate
        // autoRotateSpeed={2}
        />
        <Suspense fallback={null}>
          <Space />
        </Suspense>
        <Environment preset="sunset" />
      </Canvas>
    </section>
  )
}