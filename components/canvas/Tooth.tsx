"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { createToothGeometry } from "./geometry";

export function Tooth({
  decayed = false,
  scale = 1,
  materialRef,
  ...props
}: {
  decayed?: boolean;
  scale?: number;
  materialRef?: React.Ref<THREE.MeshPhysicalMaterial>;
} & JSX.IntrinsicElements["group"]) {
  const geometry = useMemo(() => createToothGeometry(), []);

  return (
    <group {...props} scale={scale}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          ref={materialRef}
          color={decayed ? "#cdb08a" : "#f7f5ef"}
          roughness={decayed ? 0.75 : 0.22}
          clearcoat={decayed ? 0.1 : 0.6}
          clearcoatRoughness={0.25}
          transmission={decayed ? 0 : 0.08}
          thickness={0.4}
          ior={1.4}
          sheen={decayed ? 0 : 0.15}
          sheenColor={"#ffffff"}
          transparent
          opacity={1}
        />
      </mesh>

      {decayed && (
        <>
          {/* cavity pit */}
          <mesh position={[0.05, 0.42, 0.09]} scale={[0.09, 0.06, 0.09]}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial color="#3a2a1c" roughness={0.9} />
          </mesh>
          {/* discoloration patch */}
          <mesh position={[-0.02, 0.3, 0.12]} scale={[0.14, 0.1, 0.06]}>
            <sphereGeometry args={[1, 10, 10]} />
            <meshStandardMaterial color="#8a6a3f" roughness={1} transparent opacity={0.55} />
          </mesh>
          {/* hairline crack */}
          <mesh position={[0, 0.35, 0.14]} rotation={[0, 0, 0.4]}>
            <boxGeometry args={[0.01, 0.28, 0.01]} />
            <meshStandardMaterial color="#5a4530" roughness={1} />
          </mesh>
        </>
      )}
    </group>
  );
}
