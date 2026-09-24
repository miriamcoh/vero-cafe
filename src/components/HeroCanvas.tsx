"use client";

import { Suspense, useEffect, useRef, RefObject, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Center, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import CoffeeBeans from "./CoffeeBeans";

/* ─────────────────────────────────────────────────────────────────
   Public API exposed to HeroSection for overlay buttons
───────────────────────────────────────────────────────────────── */
export interface ControlsApi {
  zoomIn(): void;
  zoomOut(): void;
  reset(): void;
}

/* ─────────────────────────────────────────────────────────────────
   Machine — clearcoat PBR + gentle float bob
   Rotation is now fully handled by OrbitControls.
───────────────────────────────────────────────────────────────── */
function Machine() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/espresso_coffee_machine.glb");

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
        phys.clearcoat           = 1.0;
        phys.clearcoatRoughness  = 0.06;
        phys.envMapIntensity     = 3.5;
        if (phys.metalness > 0.3 || phys.roughness < 0.4) {
          phys.metalness = Math.max(phys.metalness, 0.72);
          phys.roughness = Math.min(phys.roughness, 0.22);
        }
        phys.needsUpdate = true;
      });
    });
  }, [scene]);

  // Gentle float bob — OrbitControls handles all rotation
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.06;
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
   ReadyTrigger — fires onReady after the FIRST rendered frame.
   Co-located in the Machine Suspense so it fires only post-load.
───────────────────────────────────────────────────────────────── */
function ReadyTrigger({ onReady }: { onReady: () => void }) {
  const fired = useRef(false);
  const cbRef = useRef(onReady);
  useEffect(() => { cbRef.current = onReady; }, [onReady]);

  useFrame(() => {
    if (!fired.current) {
      fired.current = true;
      cbRef.current();
    }
  });
  return null;
}

/* ─────────────────────────────────────────────────────────────────
   SceneControls — OrbitControls + zoom/reset API + autoRotate idle
   Must be inside Canvas (uses useThree).
   Placed in the Machine Suspense so it mounts only after GLB loads.
───────────────────────────────────────────────────────────────── */
function SceneControls({
  controlsApiRef,
  onReady,
}: {
  controlsApiRef?: React.MutableRefObject<ControlsApi | null>;
  onReady: () => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const orbitRef = useRef<any>(null);
  const { camera } = useThree();
  const idleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  /* Expose zoom/reset API to HeroSection overlay buttons */
  useEffect(() => {
    if (!controlsApiRef) return;

    controlsApiRef.current = {
      zoomIn() {
        const c = orbitRef.current;
        if (!c) return;
        const dist = camera.position.distanceTo(c.target as THREE.Vector3);
        const newDist = Math.max(2.5, dist * 0.82);
        const dir = camera.position.clone().sub(c.target as THREE.Vector3).normalize();
        camera.position.copy(c.target as THREE.Vector3).addScaledVector(dir, newDist);
        c.update();
      },
      zoomOut() {
        const c = orbitRef.current;
        if (!c) return;
        const dist = camera.position.distanceTo(c.target as THREE.Vector3);
        const newDist = Math.min(6.5, dist * 1.22);
        const dir = camera.position.clone().sub(c.target as THREE.Vector3).normalize();
        camera.position.copy(c.target as THREE.Vector3).addScaledVector(dir, newDist);
        c.update();
      },
      reset() {
        orbitRef.current?.reset();
      },
    };

    return () => {
      controlsApiRef.current = null;
    };
  }, [camera, controlsApiRef]);

  /* autoRotate idle: stop on drag, resume after 4 s */
  const handleStart = useCallback(() => {
    clearTimeout(idleTimer.current);
    if (orbitRef.current) orbitRef.current.autoRotate = false;
  }, []);

  const handleEnd = useCallback(() => {
    idleTimer.current = setTimeout(() => {
      if (orbitRef.current) orbitRef.current.autoRotate = true;
    }, 4000);
  }, []);

  useEffect(() => {
    const controls = orbitRef.current;
    if (!controls) return;
    controls.addEventListener("start", handleStart);
    controls.addEventListener("end",   handleEnd);
    return () => {
      controls.removeEventListener("start", handleStart);
      controls.removeEventListener("end",   handleEnd);
    };
  }, [handleStart, handleEnd]);

  return (
    <>
      <OrbitControls
        ref={orbitRef}
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        enableZoom={false}      /* zoom via Ctrl+wheel + buttons only */
        autoRotate
        autoRotateSpeed={0.6}
        minDistance={2.5}
        maxDistance={6.5}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.78}
      />
      <ReadyTrigger onReady={onReady} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Canvas — exported for dynamic import (ssr: false)
───────────────────────────────────────────────────────────────── */
interface Props {
  onReady: () => void;
  controlsApiRef?: React.MutableRefObject<ControlsApi | null>;
}

export default function HeroCanvas({ onReady, controlsApiRef }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0.1, 4], fov: 42 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 2.6,
      }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Dark canvas background — never shows white even before first draw */}
      <color attach="background" args={["#0E0A08"]} />

      <Suspense fallback={null}>
        <Environment preset="studio" environmentIntensity={2.0} />
      </Suspense>

      <ambientLight intensity={0.35} color="#1a100a" />
      <directionalLight position={[4, 8, 3]}   intensity={9}  color="#ffe0a0" />
      <directionalLight position={[-4, 3, 2]}  intensity={4}  color="#c8dcff" />
      <directionalLight position={[-1, 6, -5]} intensity={14} color="#eef6ff" />
      <directionalLight position={[1, -4, -3]} intensity={3}  color="#c07030" />
      <pointLight position={[0.3, 0.05, 1.5]}  intensity={14} color="#ff8800" distance={2.0} decay={2} />
      <pointLight position={[-0.4, 0.5, 1.2]}  intensity={5}  color="#ffaa44" distance={1.8} decay={2} />

      <Suspense fallback={null}>
        <CoffeeBeans />
      </Suspense>

      {/* Machine + OrbitControls + ReadyTrigger share one Suspense:
          SceneControls mounts only after the GLB finishes loading */}
      <Suspense fallback={null}>
        <group position={[0, -0.25, 0]}>
          <Machine />
        </group>
        <SceneControls controlsApiRef={controlsApiRef} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
