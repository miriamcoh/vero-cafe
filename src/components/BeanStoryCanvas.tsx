"use client";

import { useRef, useMemo, RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

/* ── Step colour palette ────────────────────────────────── */
const STEP_COLORS = [
  new THREE.Color("#2A5C18"),   // step 0: raw green bean
  new THREE.Color("#9A5A28"),   // step 1: roasted amber
  new THREE.Color("#5A2810"),   // step 2: ground dark brown
  new THREE.Color("#180806"),   // step 3: near-black espresso
];

const STEP_EMISSIVE = [
  new THREE.Color(0x000000),
  new THREE.Color(0x3A1200),   // ember glow while roasting
  new THREE.Color(0x050200),
  new THREE.Color(0x020100),
];

/* ── Geometry helper (mirrors CoffeeBeans normalisation) ─── */
function buildBeanGeo(scene: THREE.Group): THREE.BufferGeometry {
  let geo: THREE.BufferGeometry | null = null;
  let mat: THREE.Matrix4 | null = null;

  scene.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (mesh.isMesh && !geo) {
      geo = mesh.geometry.clone();
      mesh.updateWorldMatrix(true, false);
      mat = mesh.matrixWorld.clone();
    }
  });

  if (geo) {
    const g = geo as THREE.BufferGeometry;
    if (mat) g.applyMatrix4(mat as THREE.Matrix4);
    g.center();
    g.computeBoundingSphere();
    const r = g.boundingSphere?.radius ?? 1;
    if (r > 0.0001) {
      const pos = g.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        pos.setXYZ(i, pos.getX(i) / r, pos.getY(i) / r, pos.getZ(i) / r);
      }
      pos.needsUpdate = true;
      g.computeBoundingBox();
      g.computeBoundingSphere();
    }
    return g;
  }

  // Fallback: squashed sphere
  const fb = new THREE.SphereGeometry(1, 14, 10);
  const p = fb.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    p.setY(i, p.getY(i) * 0.65);
    p.setZ(i, p.getZ(i) * 0.55);
  }
  p.needsUpdate = true;
  return fb;
}

/* ── Animated bean mesh ─────────────────────────────────── */
function Bean({ stepRef }: { stepRef: RefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const matRef  = useRef<THREE.MeshStandardMaterial>(null!);
  const { scene } = useGLTF("/scene.glb");

  const geometry = useMemo(
    () => buildBeanGeo(scene as unknown as THREE.Group),
    [scene]
  );

  useFrame(({ clock }) => {
    if (!meshRef.current || !matRef.current) return;
    const step = stepRef.current ?? 0;
    const t = clock.elapsedTime;

    // Colour lerp toward current step target
    matRef.current.color.lerp(STEP_COLORS[step], 0.04);
    matRef.current.emissive.lerp(STEP_EMISSIVE[step], 0.04);

    // Emissive intensity — warm glow only during roasting
    const targetIntensity = step === 1 ? 1.4 : 0;
    matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      matRef.current.emissiveIntensity,
      targetIntensity,
      0.04,
    );

    // Rotation — spin faster during grinding
    const rotSpeed = step === 2 ? 0.036 : 0.011;
    meshRef.current.rotation.y += rotSpeed;
    meshRef.current.rotation.x = Math.sin(t * 0.35) * 0.12;

    // Gentle levitation
    meshRef.current.position.y = Math.sin(t * 0.72) * 0.1;

    // Scale — swells slightly during roasting (heat expansion)
    const targetScale = step === 1 ? 1.13 : 1.0;
    const s = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.04);
    meshRef.current.scale.setScalar(s);
  });

  return (
    <mesh ref={meshRef} geometry={geometry} scale={1.65}>
      <meshStandardMaterial
        ref={matRef}
        color={STEP_COLORS[0]}
        roughness={0.82}
        metalness={0.0}
        emissive={STEP_EMISSIVE[0]}
        emissiveIntensity={0}
      />
    </mesh>
  );
}

/* ── Canvas export ──────────────────────────────────────── */
interface Props {
  stepRef: RefObject<number>;
}

export default function BeanStoryCanvas({ stepRef }: Props) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.8], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 4, 2]}   intensity={2.2} color="#FFF0D8" />
      <directionalLight position={[-2, -1, -3]} intensity={0.5} color="#2A1A08" />
      <pointLight position={[0, 3, 2]} intensity={3.2} color="#C8A165" />
      <Environment preset="studio" environmentIntensity={0.7} />
      <Bean stepRef={stepRef} />
    </Canvas>
  );
}

useGLTF.preload("/scene.glb");
