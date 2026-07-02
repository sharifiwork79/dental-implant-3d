"use client";

export function Lights() {
  return (
    <>
      <ambientLight intensity={0.55} color="#EAF3F5" />
      {/* key light — soft, slightly warm, mimics an operatory light */}
      <directionalLight
        position={[2.5, 4, 3]}
        intensity={1.6}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={12}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
      />
      {/* fill — cool clinical blue from the opposite side */}
      <pointLight position={[-3, 1.5, -1]} intensity={0.7} color="#BFE3E0" />
      {/* rim light — separates the model from the backdrop */}
      <pointLight position={[0, 1, -3]} intensity={0.9} color="#3FB8A6" />
    </>
  );
}
