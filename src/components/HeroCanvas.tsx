"use client";

import { Suspense, useEffect, useRef, RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Environment } from "@react-three/drei";
import * as THREE from "three";
import CoffeeBeans from "./CoffeeBeans";

/* ─────────────────────────────────────────────────────────────────
   Machine with clearcoat PBR + manual auto-rotation + mouse parallax
───────────────────────────────────────────────────────────────── */
function Machine({
  mouseRef,
}: {
  mouseRef: RefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const autoRotY = useRef(0);
  const { scene } = useGLTF("/espresso_coffee_machine.glb");

  // Upgrade materials to MeshPhysicalMaterial for clearcoat + chrome sheen
  useEffect(() => {
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;

      const mats = Array.isArray(mesh.material)
        ? (mesh.material as THREE.Material[])
        : [mesh.material as THREE.Material];

      mats.forEach((m, idx) => {
        const std = m as THREE.MeshStandardMaterial;
        if (!std.isMeshStandardMaterial) return;

        let phys: THREE.MeshPhysicalMaterial;

        if ((std as THREE.MeshPhysicalMaterial).isMeshPhysicalMaterial) {
          phys = std as THREE.MeshPhysicalMaterial;
        } else {
          // Create a physical material that inherits the original properties
          phys = new THREE.MeshPhysicalMaterial({
            map:          std.map,
            normalMap:    std.normalMap,
            roughnessMap: std.roughnessMap,
            metalnessMap: std.metalnessMap,
            color:        std.color.clone(),
            metalness:    std.metalness,
            roughness:    std.roughness,
          });
          if (Array.isArray(mesh.material)) {
            (mesh.material as THREE.Material[])[idx] = phys;
          } else {
            mesh.material = phys;
          }
        }

        // Premium chrome / stainless steel finish
        phys.clearcoat           = 1.0;
        phys.clearcoatRoughness  = 0.06;
        phys.envMapIntensity     = 3.5;
        // Boost metallic materials only (don't wash out plastic/rubber parts)
        if (phys.metalness > 0.3 || phys.roughness < 0.4) {
          phys.metalness = Math.max(phys.metalness, 0.72);
          phys.roughness = Math.min(phys.roughness, 0.22);
        }
        phys.needsUpdate = true;
      });
    });
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const mx = mouseRef.current?.x ?? 0;
    const my = mouseRef.current?.y ?? 0;

    // Slow auto-rotation
    autoRotY.current += 0.003;

    // Target: base auto-rotation + subtle mouse parallax on X and Y
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      autoRotY.current + mx * 0.12,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      my * 0.08,
      0.04
    );

    // Gentle levitation
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.06;
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

useGLTF.preload("/espresso_coffee_machine.glb");

/* ─────────────────────────────────────────────────────────────────
   Canvas — exported for dynamic import (ssr: false)
───────────────────────────────────────────────────────────────── */
interface Props {
  mouseRef: RefObject<{ x: number; y: number }>;
  onReady: () => void;
}

export default function HeroCanvas({ mouseRef, onReady }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0.1, 4], fov: 42 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 2.6,
      }}
      onCreated={onReady}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Studio environment for reflections */}
      <Suspense fallback={null}>
        <Environment preset="studio" environmentIntensity={2.0} />
      </Suspense>

      {/* Warm base fill */}
      <ambientLight intensity={0.35} color="#1a100a" />

      {/* Dramatic key light — top-right warm */}
      <directionalLight position={[4, 8, 3]}   intensity={9}  color="#ffe0a0" />
      {/* Cool fill — opposite side for separation */}
      <directionalLight position={[-4, 3, 2]}  intensity={4}  color="#c8dcff" />
      {/* Rear rim light — chrome edge highlight */}
      <directionalLight position={[-1, 6, -5]} intensity={14} color="#eef6ff" />
      {/* Under fill — subtle warm ground bounce */}
      <directionalLight position={[1, -4, -3]} intensity={3}  color="#c07030" />
      {/* Spout point light — orange glow */}
      <pointLight position={[0.3, 0.05, 1.5]} intensity={14} color="#ff8800" distance={2.0} decay={2} />
      <pointLight position={[-0.4, 0.5, 1.2]} intensity={5}  color="#ffaa44" distance={1.8} decay={2} />

      {/* 3-D content */}
      <Suspense fallback={null}>
        <CoffeeBeans />
      </Suspense>

      {/* Machine offset to left so text panel has clear space on the right */}
      <Suspense fallback={null}>
        <group position={[-0.6, -0.15, 0]}>
          <Machine mouseRef={mouseRef} />
        </group>
      </Suspense>
    </Canvas>
  );
}
