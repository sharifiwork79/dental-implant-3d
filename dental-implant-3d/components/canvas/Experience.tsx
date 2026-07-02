"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { CameraRig } from "./CameraRig";
import { Lights } from "./Lights";
import { Backdrop } from "./Backdrop";
import { SceneDirector } from "./SceneDirector";

export default function Experience() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.6, 4.3], fov: 34, near: 0.1, far: 30 }}
      >
        <color attach="background" args={["#F7F8FA"]} />
        <Suspense fallback={null}>
          <Lights />
          <Backdrop />
          <SceneDirector />
          <CameraRig />
          <EffectComposer multisampling={0}>
            <Bloom intensity={0.35} luminanceThreshold={0.65} luminanceSmoothing={0.3} mipmapBlur />
            <Vignette eskil={false} offset={0.25} darkness={0.55} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
