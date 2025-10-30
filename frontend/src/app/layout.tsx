import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "../../components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "E-Voting Biometric Authentication",
  description: "Secure e-voting platform with biometric authentication",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className={inter.className}>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
