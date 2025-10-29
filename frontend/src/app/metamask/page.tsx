"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, AlertCircle, Wallet, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert"

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean
      request: (request: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (...args: any[]) => void) => void
    }
  }
}

type AuthState = "idle" | "connecting" | "connected" | "error" | "redirecting"

export default function MetaMaskAuthPage() {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthState>("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [account, setAccount] = useState<string>("")
  const [hasMetaMask, setHasMetaMask] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if MetaMask is installed
    const checkMetaMask = () => {
      const isMetaMaskInstalled = typeof window !== "undefined" && window.ethereum?.isMetaMask
      setHasMetaMask(!!isMetaMaskInstalled)
    }

    checkMetaMask()
  }, [])

  const connectWallet = async () => {
    if (!window.ethereum) {
      setAuthState("error")
      setErrorMessage("MetaMask is not installed. Please install MetaMask to continue.")
      return
    }

    try {
      setAuthState("connecting")

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length === 0) {
        throw new Error("No accounts found. Please create an account in MetaMask.")
      }

      // Get the first account
      const account = accounts[0]
      setAccount(account)
      setAuthState("connected")

      // Simulate verification process
      setTimeout(() => {
        setAuthState("redirecting")

        // Redirect to candidates page after a short delay
        setTimeout(() => {
          router.push("/candidates")
        }, 1500)
      }, 2000)
    } catch (error: any) {
      console.error("Error connecting to MetaMask:", error)
      setAuthState("error")
      setErrorMessage(error.message || "Failed to connect to MetaMask. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f0e5] flex flex-col items-center justify-center py-12 px-4">
      <Link
        href="/auth"
        className="absolute top-8 left-8 flex items-center text-[#555555] hover:text-[#333333] transition-colors duration-300"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Authentication
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
          <h1 className="text-2xl font-bold tracking-tight text-[#333333]">MetaMask Authentication</h1>
          <p className="text-sm text-[#555555]">Connect your MetaMask wallet to access the voting system</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-none rounded-3xl shadow-md bg-white">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl text-[#333333]">Wallet Authentication</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {hasMetaMask === false && (
                <Alert 
                  variant="destructive" 
                  className="mb-8 bg-red-50 border-red-500 text-red-900"
                >
                  <AlertCircle className="text-red-500" />
                  <AlertTitle className="text-red-700">MetaMask Not Detected</AlertTitle>
                  <AlertDescription className="text-red-700">
                    Please install the MetaMask browser extension to continue.
                    <a
                      href="https://metamask.io/download/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-2 text-red-600 hover:underline"
                    >
                      Download MetaMask
                    </a>
                  </AlertDescription>
                </Alert>
              )}
              <div className="flex flex-col items-center justify-center space-y-6 py-6">
                {authState === "idle" && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full border-2 border-[#f0a08c] p-6"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Wallet className="h-16 w-16 text-[#f0a08c]" />
                    </motion.div>
                  </motion.div>
                )}

                {authState === "connecting" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-full border-2 border-[#f0a08c] p-6"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Loader2 className="h-16 w-16 text-[#f0a08c]" />
                    </motion.div>
                  </motion.div>
                )}

                {authState === "connected" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-full border-2 border-green-500 p-6"
                  >
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: 1 }}>
                      <CheckCircle className="h-16 w-16 text-green-500" />
                    </motion.div>
                  </motion.div>
                )}

                {authState === "redirecting" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-full border-2 border-green-500 p-6"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Loader2 className="h-16 w-16 text-green-500" />
                    </motion.div>
                  </motion.div>
                )}

                {authState === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-full border-2 border-red-500 p-6"
                  >
                    <AlertCircle className="h-16 w-16 text-red-500" />
                  </motion.div>
                )}

                <div className="text-center space-y-2">
                  {authState === "idle" && (
                    <p className="text-[#555555]">Connect your MetaMask wallet to verify your identity</p>
                  )}

                  {authState === "connecting" && <p className="text-[#555555]">Connecting to MetaMask...</p>}

                  {authState === "connected" && (
                    <>
                      <p className="text-green-600 font-medium">Connected Successfully!</p>
                      <p className="text-[#555555] text-sm">
                        Wallet: {account.substring(0, 6)}...{account.substring(account.length - 4)}
                      </p>
                      <p className="text-[#555555] text-sm">Verifying your identity...</p>
                    </>
                  )}

                  {authState === "redirecting" && (
                    <p className="text-green-600 font-medium">Redirecting to voting page...</p>
                  )}

                  {authState === "error" && <p className="text-red-500">{errorMessage}</p>}
                </div>
              </div>

              <div className="mt-4">
                {(authState === "idle" || authState === "error") && (
                  <Button
                    className="w-full bg-[#333333] hover:bg-[#222222] text-white rounded-full py-6 relative overflow-hidden group"
                    onClick={connectWallet}
                    disabled={hasMetaMask === false}
                  >
                    <span className="relative z-10">Connect MetaMask</span>
                    <span className="absolute inset-0 w-0 bg-[#f0a08c] transition-all duration-300 group-hover:w-full"></span>
                  </Button>
                )}
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-[#555555]">
                  By connecting your wallet, you agree to our{" "}
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
      </div>
    </div>
  )
}

