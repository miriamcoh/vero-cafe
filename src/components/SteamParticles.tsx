"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 20;

export default function SteamParticles() {
  const texture   = useTexture("/media_02052021100755.png");
  const meshRefs  = useRef<(THREE.Mesh | null)[]>([]);

  // The machine is centred at the group origin, auto-scaled to ~2.4 units tall.
  // Its top is roughly at y ≈ +1.2.  Steam spawns just above that and rises ~1.0 unit.
  // Camera sits at y=0, fov=42; at z=0 the visible y range ≈ [-1.5, +1.5],
  // so steam at y=[1.0 → 2.0] is nicely visible and exits at the top.
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        x:      (Math.random() - 0.5) * 0.35,
        startY: 1.0 + Math.random() * 0.3,       // near machine spout
        riseAmt: 0.8 + Math.random() * 0.5,      // how far it rises
        z:      (Math.random() - 0.5) * 0.25 + 0.3,
        speed:  0.20 + Math.random() * 0.25,
        offset: (i / PARTICLE_COUNT) * Math.PI * 2,
        scale:  0.40 + Math.random() * 0.35,     // large enough to see
        drift:  (Math.random() - 0.5) * 0.3,
      })),
    []
  );

  useFrame(({ clock, camera }) => {
    const t = clock.elapsedTime;

    particles.forEach((p, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;

      const cycle   = ((t * p.speed + p.offset) % (Math.PI * 2)) / (Math.PI * 2);
      const y       = p.startY + cycle * p.riseAmt;
      const x       = p.x + Math.sin(t * 0.6 + p.offset) * 0.1 + p.drift * cycle;
      const opacity = Math.sin(cycle * Math.PI) * 0.50;

      mesh.position.set(x, y, p.z);
      mesh.scale.setScalar(p.scale + cycle * 0.4);
      mesh.lookAt(camera.position);

      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, opacity);
    });
  });

  return (
    <group>
      {particles.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            color={new THREE.Color(0.85, 0.80, 0.75)}
          />
        </mesh>
      ))}
    </group>
  );
}
