"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "../../../components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

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

export default function CandidatesPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check for existing candidate in URL on initial load
  useEffect(() => {
    const candidateId = searchParams.get("candidate")
    if (candidateId) {
      const parsedId = Number.parseInt(candidateId)
      setSelectedCandidate(parsedId)
    }
  }, [searchParams])

  const handleContinue = () => {
    if (selectedCandidate) {
      // Navigate to candidate details page - fixed path
      router.push(`/candidates/${selectedCandidate}`)
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
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-[#333333] mb-4">Our Candidates</h1>
          <p className="text-[#555555] max-w-2xl mx-auto">Select your preferred candidate by clicking on their card.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {candidates.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedCandidate(candidate.id)}
              className={`
                cursor-pointer rounded-2xl overflow-hidden transition-all duration-300
                ${
                  selectedCandidate === candidate.id
                    ? "ring-4 ring-[#333333] shadow-2xl"
                    : "hover:ring-2 hover:ring-[#333333]/50 shadow-md"
                }
              `}
            >
              <div className="relative w-full aspect-[3/4]">
                <Image src={candidate.image || "/placeholder.svg"} alt={candidate.name} fill className="object-cover" />

                {selectedCandidate === candidate.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-[#333333]/20 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 8 }}
                      className="bg-white rounded-full p-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#f0a08c]"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </motion.div>
                  </motion.div>
                )}
              </div>
              <motion.div
                className="p-4 text-center bg-white"
                whileHover={{ backgroundColor: "#f5f0e5" }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-xs text-[#555555] mb-1">{candidate.category}</div>
                <h2 className="text-xl font-bold text-[#333333] mb-2">{candidate.name}</h2>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <AnimatePresence mode="wait">
            {selectedCandidate ? (
              <motion.div
                key="selected"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  onClick={handleContinue}
                  className="bg-[#333333] hover:bg-[#222222] text-white rounded-full px-8 py-6 text-lg relative overflow-hidden group"
                >
                  <span className="relative z-10">
                    {`Continue with ${candidates.find((c) => c.id === selectedCandidate)?.name}`}
                  </span>
                  <span className="absolute inset-0 w-0 bg-[#f0a08c] transition-all duration-300 group-hover:w-full"></span>
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="not-selected"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Button disabled className="bg-[#333333]/70 text-white rounded-full px-8 py-6 text-lg">
                  Please Select a Candidate
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}

