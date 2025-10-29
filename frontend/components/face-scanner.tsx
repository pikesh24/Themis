"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface FaceScannerProps {
  state: "idle" | "scanning" | "success" | "error"
}

export const FaceScanner: React.FC<FaceScannerProps> = ({ state }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas) return

    const ctx = canvas.getContext("2d")

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
        video.srcObject = stream
        video.onloadedmetadata = () => {
          video.play()
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
      }
    }

    if (state === "scanning") {
      startVideo()

      const drawFrame = () => {
        if (video.videoWidth === 0 || video.videoHeight === 0) {
          requestAnimationFrame(drawFrame)
          return
        }

        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
        requestAnimationFrame(drawFrame)
      }

      drawFrame()
    } else {
      const stream = video.srcObject as MediaStream
      if (stream) {
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
        video.srcObject = null
      }
      canvas.width = 0
      canvas.height = 0
    }

    return () => {
      const stream = video.srcObject as MediaStream
      if (stream) {
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
        video.srcObject = null
      }
    }
  }, [state])

  return (
    <>
      <video ref={videoRef} className="hidden" autoPlay muted playsInline />
      <canvas ref={canvasRef} className="absolute inset-0" />
      {state === "scanning" && <div className="absolute inset-0 border-4 border-blue-500 animate-pulse"></div>}
      {state === "success" && <div className="absolute inset-0 bg-green-500 opacity-50"></div>}
      {state === "error" && <div className="absolute inset-0 bg-red-500 opacity-50"></div>}
    </>
  )
}

