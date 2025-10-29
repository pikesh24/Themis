"use client"

import {vote} from "../../vote/vote"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "../../../../components/ui/button"
import { motion } from "framer-motion"
import { Card } from "../../../../components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Candidate data with full details
const candidates = [
  {
    id: 1,
    name: "John Anderson",
    category: "Leadership",
    position: "President",
    date: "JAN 05, 2023",
    image: "/placeholder.svg?height=400&width=300&text=John+Anderson",
    description: "Leaving San Francisco",
    bio: "A visionary leader with 10+ years of experience in community organization and policy development.",
  },
  {
    id: 2,
    name: "Sarah Williams",
    category: "Management",
    position: "Vice President",
    date: "JAN 05, 2023",
    image: "/placeholder.svg?height=400&width=300&text=Sarah+Williams",
    description: "What Marriage Means to Me",
    bio: "Dedicated to creating inclusive policies and fostering collaboration across diverse communities.",
  },
  {
    id: 3,
    name: "Michael Johnson",
    category: "Administration",
    position: "Secretary",
    date: "JAN 05, 2023",
    image: "/placeholder.svg?height=400&width=300&text=Michael+Johnson",
    description: "A Love Letter to Los Angeles",
    bio: "Bringing fresh perspectives and innovative solutions to long-standing challenges.",
  },
]

export default function CandidateDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const candidateId = Number(params.id)
  const [isLoading, setIsLoading] = useState(false)

  // Find the selected candidate
  const candidate = candidates.find((c) => c.id === candidateId)

  // If no candidate found, redirect or show error
  useEffect(() => {
    if (!candidate) {
      router.push("/candidates")
    }
  }, [candidate, router])

  if (!candidate) {
    return null
  }

  const handleVote = async () => {
    setIsLoading(true)
    try {
      // Call the vote function with the candidate's ID
      await vote(candidateId)
      
      
      // Redirect to confirmation page
      router.push("/voting-confirmation")
    } catch (error) {
      console.error("Voting failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#f5f0e5] py-12 px-4"
    >
      <div className="container mx-auto max-w-4xl">
        <Link
          href="/candidates"
          className="inline-flex items-center text-[#555555] hover:text-[#333333] transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to candidates
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold text-[#333333] mb-4">Candidate Details</h1>
          <p className="text-[#555555] max-w-2xl mx-auto">Learn more about the candidate before voting</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-none rounded-3xl shadow-md mb-8 transform transition-all duration-300 hover:shadow-xl">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-xs font-bold text-[#333333] mb-2 flex items-center gap-2"
                >
                  {candidate.category}
                  <span className="inline-block w-4 h-px bg-[#333333]"></span>
                  {candidate.date}
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-2xl font-bold text-[#333333] mb-2"
                >
                  {candidate.name}
                </motion.h2>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-xl font-bold text-[#333333] mb-4"
                >
                  {candidate.description}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-[#555555] mb-6"
                >
                  {candidate.bio}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="bg-[#f5f0e5] rounded-full py-2 px-4 inline-block"
                >
                  <span className="font-medium text-[#333333]">{candidate.position}</span>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative h-full min-h-[300px] overflow-hidden"
              >
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="h-full">
                  <Image
                    src={candidate.image || "/placeholder.svg"}
                    alt={candidate.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleVote}
              disabled={isLoading}
              className="bg-[#333333] hover:bg-[#222222] text-white rounded-full px-8 py-6 text-lg relative overflow-hidden group"
            >
              <span className="relative z-10">
                {isLoading ? (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center">
                    <motion.svg
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </motion.svg>
                    Processing...
                  </motion.span>
                ) : (
                  `Vote for ${candidate.name}`
                )}
              </span>
              <span className="absolute inset-0 w-0 bg-[#f0a08c] transition-all duration-300 group-hover:w-full"></span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

