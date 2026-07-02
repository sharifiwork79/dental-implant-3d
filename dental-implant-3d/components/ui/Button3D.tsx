"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent } from "react";

export function Button3D({
  children,
  variant = "primary",
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-20, 20], [8, -8]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-40, 40], [-8, 8]), { stiffness: 200, damping: 18 });

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 400 }}
      whileTap={{ scale: 0.96 }}
      className={`${variant === "primary" ? "btn-primary" : "btn-secondary"} ${className}`}
    >
      {children}
    </motion.button>
  );
}
