import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import PointerTracker from "@/components/PointerTracker";
import ScrollDirector from "@/components/ScrollDirector";
import { Nav } from "@/components/ui/Nav";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Need } from "@/components/sections/Need";
import { Process } from "@/components/sections/Process";
import { Result } from "@/components/sections/Result";
import { Trust } from "@/components/sections/Trust";
import { CTA } from "@/components/sections/CTA";

// The R3F canvas touches window/WebGL, so it must never be part of the SSR pass.
const Experience = dynamic(() => import("@/components/canvas/Experience"), { ssr: false });

export default function Home() {
  return (
    <SmoothScroll>
      <PointerTracker />
      <ScrollDirector />
      <Experience />
      <Nav />

      <main id="journey" className="relative z-10">
        <Hero />
        <Problem />
        <Need />
        <Process />
        <Result />
        <Trust />
        <CTA />
      </main>

      <footer className="relative z-10 text-center py-10 text-xs text-clinic-navy/40">
        © ۱۴۰۴ کلینیک ایمپلنت دندان آرکا — تمامی حقوق محفوظ است.
      </footer>
    </SmoothScroll>
  );
}
