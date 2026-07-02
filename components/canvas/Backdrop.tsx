"use client";

export function Backdrop() {
  return (
    <>
      <fog attach="fog" args={["#F7F8FA", 4, 11]} />
      <mesh position={[0, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[9, 64]} />
        <meshStandardMaterial color="#EFF3F5" roughness={0.9} />
      </mesh>
    </>
  );
}
