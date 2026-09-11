"use client"

import React from "react"
import { motion } from "framer-motion"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right" | "none"
  delay?: number
  duration?: number
  scale?: boolean
  blur?: boolean
}

export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.6,
  scale = true,
  blur = true,
}: ScrollRevealProps) {
  const directions = {
    up: { y: 35, x: 0 },
    down: { y: -35, x: 0 },
    left: { x: 35, y: 0 },
    right: { x: -35, y: 0 },
    none: { x: 0, y: 0 },
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        scale: scale ? 0.97 : 1,
        filter: blur ? "blur(4px)" : "none",
        ...directions[direction],
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  )
}
