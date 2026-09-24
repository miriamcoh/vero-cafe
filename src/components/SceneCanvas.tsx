"use client";

import { Suspense, RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import * as THREE from "three";
import CoffeeMachineModel from "./CoffeeMachineModel";
import CoffeeBeans from "./CoffeeBeans";
import SteamParticles from "./SteamParticles";

interface Props {
  scrollProgressRef: RefObject<number>;
}

export default function SceneCanvas({ scrollProgressRef }: Props) {
  return (
    <Canvas
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      camera={{ position: [0, 0.0, 3.5], fov: 42, near: 0.05, far: 200 }}
      gl={{
        antialias:           true,
        toneMapping:         THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.3,
        outputColorSpace:    THREE.SRGBColorSpace,
      }}
      shadows
    >
      {/* Soft base fill */}
      <ambientLight intensity={0.25} color="#1e140a" />

      {/* Key light — warm top-right (studio softbox) */}
      <directionalLight
        position={[3, 6, 3]}
        intensity={4.5}
        color="#ffe8b0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
      />

      {/* Cool fill — opposite side */}
      <directionalLight position={[-5, 3, 1]} intensity={1.4} color="#a8bfcf" />

      {/* Rear rim — chrome edge highlight */}
      <directionalLight position={[0.5, -1, -5]} intensity={3.0} color="#c87030" />

      {/* Under-glow */}
      <pointLight position={[0, -2.5, 0.5]} intensity={0.8} color="#301800" distance={8} decay={2} />

      {/* Bean rim light — warm gold from behind, separates beans from the black bg */}
      <directionalLight position={[0, 2, -5]} intensity={2} color="#c9a96e" />

      {/* Environment map for reflections */}
      <Environment preset="studio" environmentIntensity={1.0} />

      {/* 3D scene content */}
      <Suspense fallback={null}>
        <CoffeeBeans />
        <CoffeeMachineModel scrollProgressRef={scrollProgressRef} />
        <SteamParticles />
        <Preload all />
      </Suspense>

      {/* Post-processing: Bloom only — no DOF so the machine stays crisp */}
      <Suspense fallback={null}>
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.88}
            luminanceSmoothing={0.85}
            height={300}
            intensity={0.55}
          />
          <Vignette offset={0.35} darkness={0.65} />
          <Noise opacity={0.025} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
