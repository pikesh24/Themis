"use client"

import { useEffect, useRef } from "react"

export function AnimatedLogo() {
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (logoRef.current) {
        const circles = logoRef.current.querySelectorAll(".logo-circle")

        circles.forEach((circle) => {
          // Add pulse animation
          circle.classList.add("animate-pulse")

          // Remove animation after it completes
          setTimeout(() => {
            circle.classList.remove("animate-pulse")
          }, 1000)
        })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={logoRef} className="relative h-8 w-8 cursor-pointer group">
      <div
        className="logo-circle absolute h-6 w-6 bg-[#f0a08c] rounded-full left-0 top-1 opacity-80 
                  transition-all duration-500 group-hover:left-1 group-hover:top-0"
      ></div>
      <div
        className="logo-circle absolute h-6 w-6 bg-[#f0a08c] rounded-full right-0 top-1 opacity-80 
                  transition-all duration-500 group-hover:right-1 group-hover:top-0"
      ></div>
    </div>
  )
}

