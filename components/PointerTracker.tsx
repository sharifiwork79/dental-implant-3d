"use client";

import { useEffect } from "react";
import { useSceneStore } from "@/lib/store";

export default function PointerTracker() {
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      useSceneStore.getState().setPointer(x, y);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return null;
}
