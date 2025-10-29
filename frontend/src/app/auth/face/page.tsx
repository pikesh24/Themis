"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { FaceScanner } from "../../../../components/face-scanner";


export default function FaceAuthPage() {
  const router = useRouter()
  const [authState, setAuthState] = useState<"idle" | "scanning" | "success" | "error">("idle")
  const [message, setMessage] = useState("Prepare for face authentication")

  const startAuth = () => {
    setAuthState("scanning")
    setMessage("Scanning your face...")

    // Simulate face scanning process
    setTimeout(() => {
      setAuthState("success")
      setMessage("Authentication successful!")
    }, 3000)
  }

  const cancelAuth = () => {
    setAuthState("idle")
    setMessage("Prepare for face authentication")
    router.push("/auth")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e1e1e] to-[#121212] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#2a2a2a] border-none shadow-xl">
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Face Authentication</h1>
            <p className="text-gray-400">Please position your face within the frame</p>
          </div>

          <div className="relative aspect-square mb-8 bg-[#1e1e1e] rounded-lg overflow-hidden flex items-center justify-center">
            <FaceScanner state={authState} />
          </div>

          <div className="text-center mb-6">
            <p className="text-white font-medium">{message}</p>
            {authState === "scanning" && <p className="text-sm text-gray-400 mt-2">Please remain still</p>}
          </div>

          <div className="flex gap-4">
            {authState === "idle" ? (
              <>
                <Button
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                  onClick={cancelAuth}
                >
                  Cancel
                </Button>
                <Button className="flex-1 bg-[#1e88e5] hover:bg-[#1976d2] text-white" onClick={startAuth}>
                  Start Scan
                </Button>
              </>
            ) : authState === "scanning" ? (
              <Button
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={cancelAuth}
              >
                Cancel
              </Button>
            ) : (
              <Button
                className="w-full bg-[#1e88e5] hover:bg-[#1976d2] text-white"
                onClick={() => router.push("/candidates")}
              >
                Continue
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}