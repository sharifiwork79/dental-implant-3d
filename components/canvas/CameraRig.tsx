"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneStore } from "@/lib/store";

type Keyframe = { pos: [number, number, number]; look: [number, number, number]; fov: number };

// One keyframe per stage: hero, problem, need, process, result, cta
const KEYFRAMES: Keyframe[] = [
  { pos: [0, 0.6, 4.3], look: [0, 0.05, 1.8], fov: 34 }, // hero — wide establishing shot of the arch
  { pos: [0.68, 0.3, 2.55], look: [-0.16, 0.15, 1.85], fov: 27 }, // problem — push in on decay
  { pos: [0.8, 0.22, 2.4], look: [-0.16, -0.15, 1.85], fov: 25 }, // need — low, into the empty socket
  { pos: [0.5, 0.62, 2.35], look: [-0.16, 0.25, 1.85], fov: 23 }, // process — elevated, watching the implant seat
  { pos: [0, 0.45, 3.7], look: [0, 0, 1.75], fov: 31 }, // result — pull back to the restored smile
  { pos: [0, 0.95, 5.0], look: [0, 0, 1.4], fov: 38 }, // cta — calm, wide, resting shot
];

const tmpTarget = new THREE.Vector3();
const tmpPos = new THREE.Vector3();

export function CameraRig() {
  const { camera } = useThree();
  const currentLook = useRef(new THREE.Vector3(0, 0.05, 1.8));

  useFrame((_, delta) => {
    const { scrollProgress, pointer } = useSceneStore.getState();
    const stageFloat = THREE.MathUtils.clamp(scrollProgress, 0, 1) * (KEYFRAMES.length - 1);
    const i0 = Math.floor(stageFloat);
    const i1 = Math.min(i0 + 1, KEYFRAMES.length - 1);
    const t = stageFloat - i0;
    const k0 = KEYFRAMES[i0];
    const k1 = KEYFRAMES[i1];

    // smoothstep for a more cinematic ease between keyframes than linear scrub
    const smooth = t * t * (3 - 2 * t);

    tmpPos.set(
      THREE.MathUtils.lerp(k0.pos[0], k1.pos[0], smooth),
      THREE.MathUtils.lerp(k0.pos[1], k1.pos[1], smooth),
      THREE.MathUtils.lerp(k0.pos[2], k1.pos[2], smooth)
    );
    tmpTarget.set(
      THREE.MathUtils.lerp(k0.look[0], k1.look[0], smooth),
      THREE.MathUtils.lerp(k0.look[1], k1.look[1], smooth),
      THREE.MathUtils.lerp(k0.look[2], k1.look[2], smooth)
    );
    const fov = THREE.MathUtils.lerp(k0.fov, k1.fov, smooth);

    // subtle mouse-driven parallax with inertia (never snaps)
    const parallaxX = pointer.x * 0.18;
    const parallaxY = pointer.y * -0.1;
    tmpPos.x += parallaxX;
    tmpPos.y += parallaxY;

    const damp = 1 - Math.pow(0.001, delta); // frame-rate independent lerp factor
    camera.position.lerp(tmpPos, damp * 2.2);
    currentLook.current.lerp(tmpTarget, damp * 2.2);
    camera.lookAt(currentLook.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, fov, damp * 1.5);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
