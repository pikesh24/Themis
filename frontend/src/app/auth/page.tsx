"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { ScanFaceIcon, FingerprintIcon, ArrowLeft } from "lucide-react"
import { FaceRecognition } from "../../../components/face-recognition"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function AuthPage() {
  const [authMethod, setAuthMethod] = useState<string>("face")
  const [showFaceAuth, setShowFaceAuth] = useState(false)
  const router = useRouter()

  const handleStartAuth = () => {
    setShowFaceAuth(true)
  }

  const handleAuthSuccess = () => {
    // This would connect to your API in the future
    router.push("/metamask")
  }

  const handleAuthCancel = () => {
    setShowFaceAuth(false)
  }

  return (
    <div className="min-h-screen bg-[#f5f0e5] flex flex-col items-center justify-center py-12 px-4">
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center text-[#555555] hover:text-[#333333] transition-colors duration-300"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-2 text-center"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{
              duration: 1.5,
              delay: 0.5,
              ease: "easeInOut",
            }}
            className="mx-auto mb-4 relative h-16 w-16"
          >
            <div className="absolute h-12 w-12 bg-[#f0a08c] rounded-full left-0 top-2 opacity-80"></div>
            <div className="absolute h-12 w-12 bg-[#f0a08c] rounded-full right-0 top-2 opacity-80"></div>
          </motion.div>
          <h1 className="text-2xl font-bold tracking-tight text-[#333333]">Authentication</h1>
          <p className="text-sm text-[#555555]">Verify your identity to access the voting system</p>
        </motion.div>

        {showFaceAuth ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <FaceRecognition onSuccess={handleAuthSuccess} onCancel={handleAuthCancel} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-none rounded-3xl shadow-md bg-white">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl text-[#333333]">Choose Authentication Method</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="face" onValueChange={setAuthMethod} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-[#f5f0e5] p-1 rounded-full">
                    <TabsTrigger
                      value="face"
                      className="rounded-full data-[state=active]:bg-[#333333] data-[state=active]:text-white transition-all duration-300"
                    >
                      Face ID
                    </TabsTrigger>
                    <TabsTrigger
                      value="fingerprint"
                      className="rounded-full data-[state=active]:bg-[#333333] data-[state=active]:text-white transition-all duration-300"
                    >
                      Fingerprint
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="face" className="mt-6">
                    <div className="flex flex-col items-center justify-center space-y-4 py-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-full border-2 border-[#f0a08c] p-6"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <ScanFaceIcon className="h-16 w-16 text-[#f0a08c]" />
                        </motion.div>
                      </motion.div>
                      <p className="text-center text-[#555555]">Authenticate using facial recognition technology</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="fingerprint" className="mt-6">
                    <div className="flex flex-col items-center justify-center space-y-4 py-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-full border-2 border-[#f0a08c] p-6"
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <FingerprintIcon className="h-16 w-16 text-[#f0a08c]" />
                        </motion.div>
                      </motion.div>
                      <p className="text-center text-[#555555]">Authenticate using fingerprint scanning</p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-8">
                  <Button
                    className="w-full bg-[#333333] hover:bg-[#222222] text-white rounded-full py-6 relative overflow-hidden group"
                    onClick={handleStartAuth}
                    disabled={authMethod !== "face"}
                  >
                    <span className="relative z-10">
                      {authMethod === "face" ? "Start Face Authentication" : "Start Fingerprint Authentication"}
                    </span>
                    <span className="absolute inset-0 w-0 bg-[#f0a08c] transition-all duration-300 group-hover:w-full"></span>
                  </Button>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-xs text-[#555555]">
                    By continuing, you agree to our{" "}
                    <Link href="#" className="text-[#f0a08c] hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-[#f0a08c] hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

