"use client";

import dynamic from "next/dynamic";

const Experience = dynamic(() => import("@/components/canvas/Experience"), {
  ssr: false,
});

export default function ExperienceCanvas() {
  return <Experience />;
}
