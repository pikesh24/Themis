"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent } from "../../../../components/ui/card"
import { FaceScanner } from "../../../../components/face-scanner"

export default function FaceAuthPage() {
  const router = useRouter()
  const [authState, setAuthState] = useState<"idle" | "scanning" | "success" | "error">("idle")
  const [message, setMessage] = useState("Prepare for face authentication")
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const startAuth = async () => {
    setAuthState("scanning")
    setMessage("Scanning your face...")

    try {
      // Capture image from webcam
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      const video = document.createElement("video")
      video.srcObject = stream
      await video.play()

      // Wait briefly for camera
      await new Promise((res) => setTimeout(res, 1000))

      const canvas = document.createElement("canvas")
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Convert to blob
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg")
      )
      if (!blob) throw new Error("Failed to capture image")

      // Stop camera
      stream.getTracks().forEach((track) => track.stop())

      // Send to backend
      const formData = new FormData()
      formData.append("file", blob, "capture.jpg")

      const res = await fetch("http://localhost:5000/verify", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (data.status === "success" && data.verified) {
        setAuthState("success")
        setMessage(`Verified as ${data.name} (${data.similarity.toFixed(1)}%)`)
        setTimeout(() => router.push("/candidates"), 2000)
      } else {
        setAuthState("error")
        setMessage(data.message || "Verification failed.")
      }
    } catch (err) {
      console.error(err)
      setAuthState("error")
      setMessage("Error during face verification.")
    }
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
            <p className="text-gray-400">{message}</p>
          </div>

          <div className="relative aspect-square mb-8 bg-[#1e1e1e] rounded-lg overflow-hidden flex items-center justify-center">
            <FaceScanner state={authState} />
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
                <Button
                  className="flex-1 bg-[#1e88e5] hover:bg-[#1976d2] text-white"
                  onClick={startAuth}
                >
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
