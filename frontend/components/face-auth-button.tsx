"use client"

import { useState } from "react"
import { Button } from "../components/ui/button";
import { FaceAuthIcon } from "../components/icons";


export function FaceAuthButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Button
      variant="outline"
      className="w-full border-[#1e88e5] text-[#6ab7ff] hover:bg-[#1e88e5] hover:text-white flex items-center justify-center gap-2 h-14 relative overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FaceAuthIcon className={`h-5 w-5 transition-all duration-300 ${isHovered ? "scale-110" : ""}`} />
      <span>Face Authentication</span>
      <div
        className={`absolute inset-0 bg-[#1e88e5] transform ${isHovered ? "scale-100 opacity-10" : "scale-0 opacity-0"} transition-all duration-300 rounded-md`}
      ></div>
    </Button>
  )
}

