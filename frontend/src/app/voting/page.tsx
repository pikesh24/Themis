"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function VotingRedirectPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Get candidate ID from URL if present
    const candidateId = searchParams.get("candidate")

    // If we have a candidate ID, store it and redirect to confirmation
    if (candidateId) {
      // Simulate voting process
      // In a real app, you would make an API call here
      if (typeof window !== "undefined") {
        localStorage.setItem("hasVoted", "true")
      }

      // Redirect to confirmation page
      router.push("/voting-confirmation")
    } else {
      // If no candidate ID, redirect to candidates page
      router.push("/candidates")
    }
  }, [router, searchParams])

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-[#f5f0e5] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#333333] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-[#333333]">Processing your vote...</p>
      </div>
    </div>
  )
}

