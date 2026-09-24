"use client";

import { useRef, useEffect, useMemo, RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

interface Props {
  scrollProgressRef: RefObject<number>;
}

export default function CoffeeMachineModel({ scrollProgressRef }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/espresso_coffee_machine.glb");
  const { camera } = useThree();

  // Compute bounding box → derive a uniform scale so the model fits ~2.4 world units tall,
  // and an offset so it is centred at the group origin.
  const { autoScale, autoOffset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size   = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    // Guard against zero-size (e.g. model not yet parsed)
    const s = maxDim > 0.001 ? 2.4 / maxDim : 1;
    return {
      autoScale:  s,
      autoOffset: [-center.x, -center.y, -center.z] as [number, number, number],
    };
  }, [scene]);

  // Enhance material reflectivity for chrome/metal look
  useEffect(() => {
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow    = true;
      mesh.receiveShadow = true;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((m) => {
        const mat = m as THREE.MeshStandardMaterial;
        if (mat.isMeshStandardMaterial) {
          mat.envMapIntensity = 2.8;
          mat.needsUpdate     = true;
        }
      });
    });
  }, [scene]);

  // Accumulates free auto-rotation separately so we can blend it with
  // the scroll-driven 3/4 profile angle without any discontinuity.
  const autoRotY = useRef(0);

  useFrame((state) => {
    if (!groupRef.current) return;
    const sp = scrollProgressRef.current ?? 0;

    // Auto-rotation decelerates to zero by sp ≈ 0.33, then stops
    autoRotY.current += 0.003 * Math.max(0, 1 - sp * 3);

    // Scroll drives a 3/4 profile angle (~50°); fully reached at sp = 1
    const scrollAngle = THREE.MathUtils.lerp(0, Math.PI * 0.28, sp);

    // Butter-smooth follow of combined target
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      autoRotY.current + scrollAngle,
      0.06
    );

    // Gentle levitation
    groupRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.4) * 0.06;

    // Camera zooms in toward the portafilter / button panel as user scrolls
    const camZ      = THREE.MathUtils.lerp(3.5, 1.4, sp);
    const camY      = THREE.MathUtils.lerp(0.0, -0.5, sp);
    const targetFov = THREE.MathUtils.lerp(42, 28, sp);

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, camZ, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, camY, 0.06);

    const persp = camera as THREE.PerspectiveCamera;
    if (persp.isPerspectiveCamera) {
      persp.fov = THREE.MathUtils.lerp(persp.fov, targetFov, 0.06);
      persp.updateProjectionMatrix();
    }
  });

  return (
    <group position={[-2.5, -0.5, 0]}>
      <group ref={groupRef}>
        {/*
          Inner group applies the auto-derived scale + centering offset.
          <Center> is NOT used here because we need to scale BEFORE centering
          to avoid the centering happening on the un-scaled bounds.
          The bounding-box math above gives identical results more explicitly.
        */}
        <group scale={autoScale} position={autoOffset}>
          <primitive object={scene} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/espresso_coffee_machine.glb");
