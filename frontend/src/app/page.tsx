import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { ScanFaceIcon, FingerprintIcon, ShieldCheckIcon, EyeIcon } from "lucide-react"
import Image from "next/image"
import { AnimatedLogo } from "../../components/animated-logo"
import { FadeIn } from "../../components/animations/fade-in"
import { SlideUp } from "../../components/animations/slide-up"
import { FloatingElement } from "../../components/animations/floating-element"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f0e5]">
      <header className="sticky top-0 z-60 w-full border-b border-[#e0d9c7] bg-[#f5f0e5]">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-4xl text-[#333333]">
            <AnimatedLogo />
            <p className="rowdies-bold">THEMIS</p>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <FadeIn delay={0.2}>
            <div className="space-y-8">
          <h1 className="dm-serif-text-regular text-5xl md:text-7xl leading-tight text-[#333333]">
            Secure E-Voting with{" "}
            <span className="text-[#f0a08c] relative inline-block">
              <span className="relative z-10">Biometric Authentication</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-[#f0a08c]/20 -z-10 transform -rotate-1"></span>
            </span>
          </h1>
          <p className="dm-serif-text-regular text-xl text-[#555555] md:text-2xl max-w-2xl mx-auto">
            Vote securely from anywhere using advanced biometric verification technology. Your identity, your
            vote, your future.
          </p>
          <div className="flex justify-center pt-2">
            <Link href="/auth">
              <Button className="bg-[#333333] hover:bg-[#222222] text-white rounded-full px-12 py-6 relative overflow-hidden group">
            <span className="relative z-10">Vote Now</span>
            <span className="absolute inset-0 w-0 bg-[#f0a08c] transition-all duration-300 group-hover:w-full"></span>
              </Button>
            </Link>
          </div>
            </div>
          </FadeIn>
          <div className="mt-16">
            <FadeIn delay={0.4}>
          <div className="relative w-full max-w-lg mx-auto">
            
          </div>
            </FadeIn>
          </div>
        </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <SlideUp>
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold text-[#333333]">How It Works</h2>
                <div className="w-20 h-1 bg-[#f0a08c]"></div>
                <p className="max-w-[700px] text-[#555555] md:text-xl/relaxed">
                  Our secure e-voting system uses advanced biometric authentication to ensure your vote is counted
                  accurately.
                </p>
              </div>
            </SlideUp>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <ScanFaceIcon className="h-10 w-10 text-[#f0a08c]" />,
                  title: "Face Recognition",
                  description: "Verify your identity securely using facial recognition technology.",
                  views: "256",
                },
                {
                  icon: <FingerprintIcon className="h-10 w-10 text-[#f0a08c]" />,
                  title: "Fingerprint Scan",
                  description: "Additional security with fingerprint verification.",
                  views: "323",
                },
                {
                  icon: <ShieldCheckIcon className="h-10 w-10 text-[#f0a08c]" />,
                  title: "Secure Voting",
                  description: "Cast your vote with confidence in a tamper-proof system.",
                  views: "179",
                },
              ].map((item, index) => (
                <FadeIn key={index} delay={0.2 * (index + 1)}>
                  <Card className="bg-[#f5f0e5] border-none rounded-3xl overflow-hidden shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="p-6 text-center">
                      <div className="mb-6 rounded-full bg-white p-4 w-20 h-20 mx-auto flex items-center justify-center relative group">
                        <div className="absolute inset-0 rounded-full bg-[#f0a08c]/10 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-[#333333] mb-3">{item.title}</h3>
                      <p className="text-[#555555]">{item.description}</p>
                      <div className="mt-6 flex justify-center">
                        <Link
                          href="/auth"
                          className="inline-flex items-center gap-2 text-[#333333] font-medium hover:text-[#f0a08c] transition-colors duration-300"
                        >
                          <span>READ MORE</span>
                          <div className="flex items-center gap-1 bg-[#f0f0f0] rounded-full px-3 py-1 group-hover:bg-[#f0a08c]/20">
                            <EyeIcon className="h-4 w-4" />
                            <span className="text-sm">{item.views}</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

      
      </main>

      <footer className="border-t border-[#e0d9c7] py-8 bg-[#f5f0e5]">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6">
              <div className="absolute h-4 w-4 bg-[#f0a08c] rounded-full left-0 top-1 opacity-80"></div>
              <div className="absolute h-4 w-4 bg-[#f0a08c] rounded-full right-0 top-1 opacity-80"></div>
            </div>
            <span className="font-medium text-[#333333]">THEMIS</span>
          </div>
          <div className="text-sm text-[#555555]">
            © {new Date().getFullYear()} E-Voting Biometrics. All rights reserved.
          </div>
          <nav className="flex gap-6">
            <Link href="#" className="text-sm text-[#555555] hover:text-[#f0a08c] transition-colors duration-300">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-[#555555] hover:text-[#f0a08c] transition-colors duration-300">
              Terms
            </Link>
            <Link href="#" className="text-sm text-[#555555] hover:text-[#f0a08c] transition-colors duration-300">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

