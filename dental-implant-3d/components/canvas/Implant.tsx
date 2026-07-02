"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createImplantThreadCurve } from "./geometry";
import { Tooth } from "./Tooth";

/**
 * assemblyRef.current: 0 = screw floating above the socket,
 *                       1 = screw fully seated, abutment visible,
 *                       2 = final crown attached (fully restored)
 * Driven imperatively every frame from the scroll-derived scene state so
 * changing it never triggers a React re-render of this subtree.
 */
export function Implant({
  assemblyRef,
  ...props
}: { assemblyRef?: React.MutableRefObject<number> } & JSX.IntrinsicElements["group"]) {
  const internalRef = useRef(2);
  const ref = assemblyRef ?? internalRef;

  const threadCurve = useMemo(() => createImplantThreadCurve(), []);
  const threadGeometry = useMemo(
    () => new THREE.TubeGeometry(threadCurve, 220, 0.017, 8, false),
    [threadCurve]
  );

  const screwGroup = useRef<THREE.Group>(null);
  const abutmentMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const crownGroup = useRef<THREE.Group>(null);
  const crownMat = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame((_, delta) => {
    const a = ref.current;
    const damp = 1 - Math.pow(0.0001, delta);

    if (screwGroup.current) {
      const targetY = THREE.MathUtils.lerp(0.55, -0.02, THREE.MathUtils.clamp(a, 0, 1));
      screwGroup.current.position.y = THREE.MathUtils.lerp(screwGroup.current.position.y, targetY, damp);
    }
    if (abutmentMat.current) {
      const targetOpacity = THREE.MathUtils.clamp(a, 0, 1);
      abutmentMat.current.opacity = THREE.MathUtils.lerp(abutmentMat.current.opacity, targetOpacity, damp);
    }
    if (crownGroup.current && crownMat.current) {
      const targetOpacity = THREE.MathUtils.clamp(a - 1, 0, 1);
      crownMat.current.opacity = THREE.MathUtils.lerp(crownMat.current.opacity, targetOpacity, damp);
      crownGroup.current.visible = crownMat.current.opacity > 0.02;
    }
  });

  return (
    <group {...props}>
      <group ref={screwGroup} position={[0, 0.55, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.82, 20]} />
          <meshStandardMaterial color="#B9C2C9" metalness={0.9} roughness={0.28} />
        </mesh>
        <mesh geometry={threadGeometry} castShadow>
          <meshStandardMaterial color="#9AA6AE" metalness={0.95} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.44, 0]}>
          <coneGeometry args={[0.1, 0.14, 20]} />
          <meshStandardMaterial color="#9AA6AE" metalness={0.9} roughness={0.25} />
        </mesh>
      </group>

      <mesh position={[0, 0.62, 0]} castShadow>
        <cylinderGeometry args={[0.075, 0.09, 0.22, 16]} />
        <meshPhysicalMaterial
          ref={abutmentMat}
          color="#D7DCE0"
          metalness={0.85}
          roughness={0.2}
          transparent
          opacity={0}
        />
      </mesh>

      <group ref={crownGroup} position={[0, 0.72, 0]} scale={0.92}>
        <Tooth decayed={false} materialRef={crownMat} />
      </group>
    </group>
  );
}
