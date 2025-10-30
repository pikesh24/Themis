"use client";

import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Loader2, Camera, AlertCircle } from "lucide-react";

// Props from parent (page.tsx)
interface FaceRecognitionProps {
  onSuccess: () => void;
  onCancel: () => void;
}

// Convert base64 → Blob
function dataURLtoBlob(dataurl: string): Blob | null {
  const arr = dataurl.split(",");
  if (arr.length < 2) return null;

  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) return null;

  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
}

export function FaceRecognition({ onSuccess, onCancel }: FaceRecognitionProps) {
  const webcamRef = useRef<Webcam>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user",
  };

  const captureAndVerify = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) {
      setError("Could not capture image. Please try again.");
      setIsLoading(false);
      return;
    }

    const imageBlob = dataURLtoBlob(imageSrc);
    if (!imageBlob) {
      setError("Could not process image. Please try again.");
      setIsLoading(false);
      return;
    }

    // Prepare form-data to send image file
    const formData = new FormData();
    formData.append("file", imageBlob, "verification.jpg");

    try {
      const response = await fetch("http://127.0.0.1:8000/verify-face", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Verification Result:", result);

      if (result.verified === true) {
        // Success → Call parent handler to allow voting
        onSuccess();
      } else {
        // Failed verification
        setError(`❌ Face not verified (Match: ${result.similarity}%)`);
      }
    } catch (err) {
      console.error("Verification API error:", err);
      setError("Verification service unavailable. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [webcamRef, onSuccess, isLoading]);

  return (
    <Card className="border-none rounded-3xl shadow-md bg-white overflow-hidden">
      <CardContent className="p-6 text-center">
        <h2 className="text-xl font-semibold text-[#333333] mb-4">
          Face Verification
        </h2>

        {/* Webcam Preview */}
        <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-[#f0a08c]">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center justify-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <p className="text-sm text-[#555555] mt-4">
          Position your face in the center of the frame and press “Verify”.
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 p-6 bg-gray-50">
        <Button
          className="w-full bg-[#333333] hover:bg-[#222222] text-white rounded-full py-6"
          onClick={captureAndVerify}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Camera className="mr-2 h-5 w-5" />
          )}
          {isLoading ? "Verifying..." : "Verify Me"}
        </Button>

        <Button
          variant="ghost"
          className="w-full rounded-full"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
