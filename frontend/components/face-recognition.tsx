"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { CheckCircle2Icon, XCircleIcon, Loader2Icon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FaceRecognitionProps {
  onSuccess: () => void
  onCancel: () => void
}

export function FaceRecognition({ onSuccess, onCancel }: FaceRecognitionProps) {
  const [status, setStatus] = useState<"idle" | "scanning" | "success" | "error">("idle")
  const [countdown, setCountdown] = useState(3)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let stream: MediaStream | null = null

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
        setStatus("error")
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    if (status === "scanning") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            // Simulate successful authentication
            captureAndVerify()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [status])

  const startScan = () => {
    setStatus("scanning")
    setCountdown(3)
  }

  const captureAndVerify = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Draw current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Here you would normally send the image data to your API for verification
        // For demo purposes, we'll simulate a successful verification after a delay
        setTimeout(() => {
          setStatus("success")

          // After showing success for a moment, call the success callback
          setTimeout(() => {
            onSuccess()
          }, 1500)
        }, 1000)
      }
    }
  }

  return (
    <Card className="border-none rounded-3xl shadow-md bg-white overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl text-center text-[#333333]">Face Authentication</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <div className="relative w-full max-w-[280px] aspect-[3/4] mb-6 rounded-3xl overflow-hidden border-8 border-white shadow-md">
          {status === "scanning" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-10 border-4 border-[#f0a08c] rounded-2xl"
            >
              <motion.div
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="absolute inset-0 bg-[#f0a08c]/10"
              />
            </motion.div>
          )}

          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 bg-black/50 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10, stiffness: 100 }}
                >
                  <CheckCircle2Icon className="h-20 w-20 text-green-500" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 bg-black/50 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10, stiffness: 100 }}
                >
                  <XCircleIcon className="h-20 w-20 text-red-500" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          <canvas ref={canvasRef} className="hidden" />

          {/* Face outline overlay with animation */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                borderColor: ["rgba(240,160,140,0.4)", "rgba(240,160,140,0.8)", "rgba(240,160,140,0.4)"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="w-48 h-64 border-2 border-dashed border-[#f0a08c]/70 rounded-full"
            />
          </div>

          {status === "scanning" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#333333] text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold"
            >
              <motion.span
                key={countdown}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {countdown}
              </motion.span>
            </motion.div>
          )}
        </div>

        <div className="text-center space-y-2 mb-4">
          {status === "idle" && (
            <p className="text-sm text-[#555555]">Position your face within the outline and click Start</p>
          )}
          {status === "scanning" && (
            <motion.p
              animate={{ color: ["#f0a08c", "#333333", "#f0a08c"] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="text-sm font-medium"
            >
              Scanning your face... Please hold still
            </motion.p>
          )}
          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-green-500"
            >
              Authentication successful!
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-red-500"
            >
              Authentication failed. Please try again.
            </motion.p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={status === "scanning" || status === "success"}
          className="border-[#333333] text-[#333333] hover:bg-[#333333] hover:text-white rounded-full transition-colors duration-300"
        >
          Cancel
        </Button>
        {status === "idle" && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={startScan}
              className="bg-[#333333] hover:bg-[#222222] text-white rounded-full relative overflow-hidden group"
            >
              <span className="relative z-10">Start Scan</span>
              <span className="absolute inset-0 w-0 bg-[#f0a08c] transition-all duration-300 group-hover:w-full"></span>
            </Button>
          </motion.div>
        )}
        {status === "scanning" && (
          <Button disabled className="bg-[#333333] text-white rounded-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Loader2Icon className="mr-2 h-4 w-4" />
            </motion.div>
            Scanning
          </Button>
        )}
        {status === "error" && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={startScan}
              className="bg-[#333333] hover:bg-[#222222] text-white rounded-full relative overflow-hidden group"
            >
              <span className="relative z-10">Try Again</span>
              <span className="absolute inset-0 w-0 bg-[#f0a08c] transition-all duration-300 group-hover:w-full"></span>
            </Button>
          </motion.div>
        )}
      </CardFooter>
    </Card>
  )
}

