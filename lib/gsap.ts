"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Smoother scrub interpolation across the whole cinematic timeline
  gsap.defaults({ ease: "power2.out" });
}

export { gsap, ScrollTrigger };
