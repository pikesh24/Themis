"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { CheckCircle2Icon } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function VotingConfirmationPage() {
  const router = useRouter()
  const [votedCandidate, setVotedCandidate] = useState<string | null>(null)

  useEffect(() => {
    // Get the voted candidate from localStorage if available
    if (typeof window !== "undefined") {
      const candidate = localStorage.getItem("votedFor")
      setVotedCandidate(candidate)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#f5f0e5] flex items-center justify-center py-12 px-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 100,
        }}
      >
        <Card className="w-full max-w-md border-none rounded-3xl shadow-md overflow-hidden">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
              className="mx-auto"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(34, 197, 94, 0)",
                    "0 0 0 10px rgba(34, 197, 94, 0.2)",
                    "0 0 0 0 rgba(34, 197, 94, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
                className="rounded-full p-2"
              >
                <CheckCircle2Icon className="h-24 w-24 text-green-500 mb-4" />
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <CardTitle className="text-2xl font-bold text-[#333333]">Vote Successfully Recorded</CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-[#555555] mb-6"
            >
              {votedCandidate
                ? `Thank you for voting for ${votedCandidate}. Your vote has been securely recorded.`
                : "Thank you for participating in this election. Your vote has been securely recorded."}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => router.push("/")}
                className="bg-[#333333] hover:bg-[#222222] text-white rounded-full px-6 py-4 relative overflow-hidden group"
              >
                <span className="relative z-10">Return Home</span>
                <span className="absolute inset-0 w-0 bg-[#f0a08c] transition-all duration-300 group-hover:w-full"></span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="mt-6"
            >
              <div className="flex justify-center space-x-4">
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                  <Link href="#" className="text-sm text-[#555555] hover:text-[#f0a08c] transition-colors duration-300">
                    Share Result
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                  <Link
                    href="/results"
                    className="text-sm font-medium text-[#f0a08c] hover:text-[#e07a5f] transition-colors duration-300 flex items-center"
                  >
                    <span className="relative">
                      View Live Results
                      <motion.span
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#f0a08c]"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.3, delay: 1.3 }}
                      />
                    </span>
                    <motion.span
                      initial={{ x: 0 }}
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
                      className="ml-1"
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Animated confetti effect */}
      <ConfettiEffect />
    </motion.div>
  )
}

function ConfettiEffect() {
  // Create an array for confetti pieces
  const confettiPieces = Array.from({ length: 50 }).map((_, index) => {
    const size = Math.random() * 10 + 5
    const color = ["#f0a08c", "#333333", "#ffffff", "#f5f0e5", "#22c55e", "#f59e0b", "#3b82f6"][
      Math.floor(Math.random() * 7)
    ]

    return { id: index, size, color }
  })

  return (
    <>
      {confettiPieces.map((piece) => {
        return (
          <motion.div
            key={piece.id}
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: -20,
              opacity: 1,
              scale: 0,
            }}
            animate={{
              y: typeof window !== "undefined" ? window.innerHeight + 50 : 1000,
              opacity: [1, 1, 0],
              rotate: Math.random() * 360,
              scale: 1,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: Math.random() * 5 + 5,
            }}
            style={{
              position: "fixed",
              width: piece.size,
              height: piece.size,
              borderRadius: Math.random() > 0.5 ? "50%" : "0%",
              backgroundColor: piece.color,
              zIndex: -1,
            }}
          />
        )
      })}
    </>
  )
}

