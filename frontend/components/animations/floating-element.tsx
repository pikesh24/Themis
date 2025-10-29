"use client"

import type React from "react"

import { motion } from "framer-motion"

interface FloatingElementProps {
  children: React.ReactNode
}

export function FloatingElement({ children }: FloatingElementProps) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

