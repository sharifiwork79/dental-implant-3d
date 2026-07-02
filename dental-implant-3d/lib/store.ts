import { create } from "zustand";

export type StageId =
  | "hero"
  | "problem"
  | "need"
  | "process"
  | "result"
  | "cta";

export const STAGES: { id: StageId; index: number }[] = [
  { id: "hero", index: 0 },
  { id: "problem", index: 1 },
  { id: "need", index: 2 },
  { id: "process", index: 3 },
  { id: "result", index: 4 },
  { id: "cta", index: 5 },
];

interface SceneState {
  /** 0 -> 1 across the entire scroll journey (hero -> cta) */
  scrollProgress: number;
  /** continuous stage value, e.g. 1.35 means 35% between "problem" and "need" */
  stageProgress: number;
  activeStage: StageId;
  /** normalized pointer position, -1..1, used for parallax/inertia */
  pointer: { x: number; y: number };
  setScrollProgress: (v: number) => void;
  setStageProgress: (v: number) => void;
  setActiveStage: (s: StageId) => void;
  setPointer: (x: number, y: number) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  scrollProgress: 0,
  stageProgress: 0,
  activeStage: "hero",
  pointer: { x: 0, y: 0 },
  setScrollProgress: (v) => set({ scrollProgress: v }),
  setStageProgress: (v) => set({ stageProgress: v }),
  setActiveStage: (s) => set({ activeStage: s }),
  setPointer: (x, y) => set({ pointer: { x, y } }),
}));
