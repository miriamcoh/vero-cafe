"use client";

import { useRef, useMemo, RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const COUNT = 22;

// roughness:1 + metalness:0 + envMapIntensity:0 → fully matte, absorbs
// light instead of reflecting it, so no highlight can wash the colour out.
const BEAN_MATERIAL = new THREE.MeshStandardMaterial({
  color: "#3d1c04",
  roughness: 1.0,
  metalness: 0,
  envMapIntensity: 0,
});

/** Extract + normalise bean geometry from the GLB to unit-radius. */
function buildNormalisedGeo(scene: THREE.Group): THREE.BufferGeometry {
  let foundGeo: THREE.BufferGeometry | null = null;
  let foundMat: THREE.Matrix4 | null = null;

  scene.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (mesh.isMesh && foundGeo === null) {
      foundGeo = mesh.geometry.clone();
      mesh.updateWorldMatrix(true, false);
      foundMat = mesh.matrixWorld.clone();
    }
  });

  if (foundGeo !== null) {
    const geo = foundGeo as THREE.BufferGeometry;
    if (foundMat !== null) geo.applyMatrix4(foundMat as THREE.Matrix4);
    geo.center();
    geo.computeBoundingSphere();
    const r = geo.boundingSphere?.radius ?? 1;
    if (r > 0.0001) {
      const pos = geo.attributes.position as THREE.BufferAttribute;
      const inv = 1 / r;
      for (let i = 0; i < pos.count; i++) {
        pos.setXYZ(i, pos.getX(i) * inv, pos.getY(i) * inv, pos.getZ(i) * inv);
      }
      pos.needsUpdate = true;
      geo.computeBoundingBox();
      geo.computeBoundingSphere();
    }
    return geo;
  }

  // Fallback: squashed sphere if GLB has no mesh
  const fb = new THREE.SphereGeometry(1, 10, 8);
  const p = fb.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    p.setY(i, p.getY(i) * 0.65);
    p.setZ(i, p.getZ(i) * 0.55);
  }
  p.needsUpdate = true;
  return fb;
}

interface Props {
  scrollProgressRef?: RefObject<number>;
}

export default function CoffeeBeans({ scrollProgressRef }: Props = {}) {
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const { scene }    = useGLTF("/scene.glb");

  const geometry = useMemo(
    () => buildNormalisedGeo(scene as unknown as THREE.Group),
    [scene]
  );

  const transforms = useMemo(
    () =>
      Array.from({ length: COUNT }, () => ({
        x:      (Math.random() - 0.5) * 2.6,  // ±1.3 — within canvas visible range
        y:      (Math.random() - 0.5) * 3.0,  // ±1.5 — above and below machine
        z:      (Math.random() - 0.5) * 2.5 - 0.3, // vary depth, slightly behind machine
        rotX:   Math.random() * Math.PI * 2,
        rotY:   Math.random() * Math.PI * 2,
        rotZ:   Math.random() * Math.PI * 2,
        speed:  0.06 + Math.random() * 0.10,
        offset: Math.random() * Math.PI * 2,
        scale:  0.12 + Math.random() * 0.10,
      })),
    []
  );

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Mutable Y offsets for scroll gravity drift
  const yOffsets = useMemo(() => new Float32Array(COUNT), []);

  useFrame(({ clock }) => {
    if (!instancedRef.current) return;
    const t = clock.elapsedTime;
    const sp = scrollProgressRef?.current ?? 0;

    transforms.forEach((tr, i) => {
      // Scroll gravity: beans drift downward as user scrolls
      yOffsets[i] -= sp * 0.004;
      if (tr.y + yOffsets[i] < -5) yOffsets[i] = 4 - tr.y;

      dummy.position.set(
        tr.x + Math.sin(t * 0.18 + tr.offset) * 0.25,
        tr.y + yOffsets[i] + Math.sin(t * tr.speed + tr.offset) * 0.5,
        tr.z
      );
      dummy.rotation.set(
        tr.rotX + t * 0.08,
        tr.rotY + t * 0.05,
        tr.rotZ + t * 0.04
      );
      dummy.scale.setScalar(tr.scale);
      dummy.updateMatrix();
      instancedRef.current!.setMatrixAt(i, dummy.matrix);
    });
    instancedRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={instancedRef}
      args={[geometry, BEAN_MATERIAL, COUNT]}
    />
  );
}

useGLTF.preload("/scene.glb");
