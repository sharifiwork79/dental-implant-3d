"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { createArchCurve } from "./geometry";
import { Tooth } from "./Tooth";
import { Implant } from "./Implant";

export type JawMode = "healthy" | "decayed" | "missing" | "implant" | "restored";

const TOOTH_COUNT = 12;
const FOCUS_INDEX = 6; // the tooth the whole story happens to

export function JawArch({
  mode = "healthy",
  assemblyRef,
  ...props
}: {
  mode?: JawMode;
  assemblyRef?: React.MutableRefObject<number>;
} & JSX.IntrinsicElements["group"]) {
  const curve = useMemo(() => createArchCurve(), []);

  const teeth = useMemo(() => {
    const arr: { position: THREE.Vector3; quaternion: THREE.Quaternion; index: number }[] = [];
    for (let i = 0; i < TOOTH_COUNT; i++) {
      const t = 0.08 + (i / (TOOTH_COUNT - 1)) * 0.84;
      const point = curve.getPointAt(t);
      const tangent = curve.getTangentAt(t);
      const outward = new THREE.Vector3(tangent.z, 0, -tangent.x).normalize();
      const lookTarget = point.clone().add(outward);
      const m = new THREE.Matrix4().lookAt(point, lookTarget, new THREE.Vector3(0, 1, 0));
      const quaternion = new THREE.Quaternion().setFromRotationMatrix(m);
      quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2));
      arr.push({ position: point, quaternion, index: i });
    }
    return arr;
  }, [curve]);

  const gumGeometry = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.34, 16, false), [curve]);

  return (
    <group {...props}>
      {/* gum ridge */}
      <mesh geometry={gumGeometry} position={[0, -0.55, 0]} receiveShadow castShadow>
        <meshPhysicalMaterial color="#E8A79A" roughness={0.55} clearcoat={0.3} sheen={0.4} sheenColor="#ffffff" />
      </mesh>

      {teeth.map(({ position, quaternion, index }) => {
        const isFocus = index === FOCUS_INDEX;
        const isMissing = isFocus && (mode === "missing" || mode === "implant");
        const isDecayed = isFocus && mode === "decayed";

        if (isMissing && mode === "missing") return null;

        return (
          <group key={index} position={position} quaternion={quaternion}>
            {isFocus && mode === "implant" ? (
              <Implant assemblyRef={assemblyRef} />
            ) : (
              <Tooth decayed={isDecayed} scale={isFocus ? 1.05 : 0.95} />
            )}
          </group>
        );
      })}
    </group>
  );
}
