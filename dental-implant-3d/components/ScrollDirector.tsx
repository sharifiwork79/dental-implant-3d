"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSceneStore, STAGES } from "@/lib/store";

export default function ScrollDirector() {
  useEffect(() => {
    const journey = document.getElementById("journey");
    if (!journey) return;

    const trigger = ScrollTrigger.create({
      trigger: journey,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        useSceneStore.getState().setScrollProgress(self.progress);
        const stageFloat = self.progress * (STAGES.length - 1);
        const idx = Math.round(stageFloat);
        const stage = STAGES[Math.min(idx, STAGES.length - 1)];
        useSceneStore.getState().setActiveStage(stage.id);
      },
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);

    return () => {
      trigger.kill();
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return null;
}
