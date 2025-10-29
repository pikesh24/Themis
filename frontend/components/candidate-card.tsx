"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "./../components/ui/button"

// Updated candidates array with descriptive random images
const candidates = [
  {
    id: 1,
    name: "Frenify",
    category: "Leadership",
    date: "JAN 05, 2023",
    image: "/api/placeholder/300/400?text=John+Anderson",
    title: "John Anderson",
  },
  {
    id: 2,
    name: "Frenify",
    category: "Management",
    date: "JAN 05, 2023",
    image: "/api/placeholder/300/400?text=Sarah+Williams",
    title: "Sarah Williams",
  },
  {
    id: 3,
    name: "Frenify",
    category: "Administration",
    date: "JAN 05, 2023",
    image: "/api/placeholder/300/400?text=Michael+Johnson",
    title: "Michael Johnson",
  },
]

export default function CandidatesPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null)
  const router = useRouter()

  const handleVote = () => {
    if (selectedCandidate) {
      router.push(`/voting?candidate=${selectedCandidate}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f0e5] py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#333333] mb-4">Our Candidates</h1>
          <p className="text-[#555555] max-w-2xl mx-auto">
            Select your preferred candidate by clicking on their card. Review their information before submitting your
            vote.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {candidates.map((candidate) => (
            <div 
              key={candidate.id} 
              className={`
                w-full max-w-xs cursor-pointer border-4 rounded-3xl overflow-hidden transition-all duration-300
                ${selectedCandidate === candidate.id 
                  ? 'border-[#333333] shadow-2xl' 
                  : 'border-transparent hover:border-[#333333]/50'}
              `}
              onClick={() => setSelectedCandidate(candidate.id)}
            >
              <div className="relative w-full aspect-[3/4]">
                <Image 
                  src={candidate.image} 
                  alt={candidate.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center bg-white">
                <div className="text-xs text-[#555555] mb-2">{candidate.category}</div>
                <h2 className="text-xl font-bold text-[#333333]">{candidate.title}</h2>
                <p className="text-sm text-[#555555]">{candidate.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            onClick={handleVote}
            disabled={!selectedCandidate}
            className="bg-[#333333] hover:bg-[#222222] text-white rounded-full px-8 py-6 text-lg"
          >
            {selectedCandidate ? "Continue with Selected Candidate" : "Please Select a Candidate"}
          </Button>
        </div>
      </div>
    </div>
  )
}