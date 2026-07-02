"use client";

import { motion } from "framer-motion";
import { useSceneStore, StageId } from "@/lib/store";

const LINKS: { id: StageId; label: string }[] = [
  { id: "hero", label: "خانه" },
  { id: "problem", label: "مشکل" },
  { id: "process", label: "فرآیند" },
  { id: "result", label: "نتیجه" },
  { id: "cta", label: "رزرو نوبت" },
];

export function Nav() {
  const activeStage = useSceneStore((s) => s.activeStage);

  const scrollToStage = (id: StageId) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
    >
      <div className="glass-panel rounded-full px-5 py-2.5 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-clinic-teal-bright" />
        <span className="font-display font-bold text-sm tracking-tight">کلینیک آرکا</span>
      </div>

      <div className="glass-panel hidden md:flex rounded-full px-2 py-2 items-center gap-1">
        {LINKS.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToStage(link.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeStage === link.id
                ? "bg-clinic-navy text-clinic-bone"
                : "text-clinic-navy/70 hover:text-clinic-navy"
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => scrollToStage("cta")}
        className="glass-panel rounded-full px-5 py-2.5 text-sm font-display font-semibold hover:bg-white/70 transition-colors"
      >
        رزرو مشاوره
      </button>
    </motion.nav>
  );
}
