import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useMediaQuery } from 'react-responsive'
import { Ufo } from "../../components/Ufo";

import { LeftTerminal } from "./LeftTerminal";
import { RightTerminal } from "./RightTerminal";

import { Countdown } from "./Countdown";

export const Hero = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  return (
    <section id="hero" className="w-full h-screen top-0 left-0 -z-10 relative">
      {!isTabletOrMobile && (
        <>
          <LeftTerminal />
          <RightTerminal />
        </>
      )}


      <div className="absolute top-24 inset-0 z-10 flex justify-center pointer-events-none">
        <img className="h-20 md:h-24 w-fit" src="medha2.png" alt="Medha Main" />
      </div>

      <Canvas className="w-full h-full absolute inset-0">
        <ambientLight intensity={0.5} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
        <Suspense fallback={null}>
          <Ufo />
        </Suspense>
        <Environment preset="forest" />
      </Canvas>

      <div className="absolute bottom-20 md:bottom-16 left-0 right-0 z-20">
        <Countdown targetDate="2025-11-28T23:59:59" />
      </div>
    </section>
  )
}