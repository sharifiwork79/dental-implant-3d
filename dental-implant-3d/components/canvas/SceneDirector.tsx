"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneStore } from "@/lib/store";
import { JawArch, JawMode } from "./JawArch";

const STAGE_MODES: JawMode[] = ["healthy", "decayed", "missing", "implant", "implant", "implant"];

export function SceneDirector() {
  const [mode, setMode] = useState<JawMode>("healthy");
  const assemblyRef = useRef(0);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const { scrollProgress, pointer } = useSceneStore.getState();
    const stageFloat = THREE.MathUtils.clamp(scrollProgress, 0, 1) * 5;
    const s = Math.min(Math.floor(stageFloat), 5);
    const f = stageFloat - s;

    const nextMode = STAGE_MODES[s];
    if (nextMode !== mode) setMode(nextMode);

    // implant assembles across stage index 3 -> 4 (the "process" chapter)
    let targetAssembly = 0;
    if (s < 3) targetAssembly = 0;
    else if (s === 3) targetAssembly = f * 2;
    else targetAssembly = 2;
    assemblyRef.current = targetAssembly;

    // gentle idle rotation + mouse parallax on the whole arch for that "alive" feel
    if (groupRef.current) {
      const damp = 1 - Math.pow(0.001, delta);
      const targetRotY = pointer.x * 0.12;
      const targetRotX = pointer.y * -0.06;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, damp);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, damp);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, -1.2]}>
      <JawArch mode={mode} assemblyRef={assemblyRef} />
    </group>
  );
}
