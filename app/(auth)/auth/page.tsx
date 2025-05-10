"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, User, ArrowRight } from "lucide-react"
import VerificationScreen from "@/components/screens/verification-screen"

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [showVerification, setShowVerification] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication - in a real app, this would call an API
    setShowVerification(true)
  }

  const handleVerificationComplete = () => {
    // Mock successful verification - in a real app, this would validate the code
    if (typeof window !== "undefined") {
      localStorage.setItem("isLoggedIn", "true")
    }
    router.push("/")
  }

  const handleSkipLogin = () => {
    // Set logged in status in localStorage for testing
    if (typeof window !== "undefined") {
      localStorage.setItem("isLoggedIn", "true")

      // Force a hard navigation to ensure the app layout is applied
      window.location.href = "/"
    }
  }

  if (showVerification) {
    return <VerificationScreen email={email} onComplete={handleVerificationComplete} />
  }

  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">VoiceNote AI</h1>
            <p className="text-neutral-600">{isLogin ? "Sign in to your account" : "Create your account"}</p>
          </div>

          <div className="card p-6 mb-6">
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                    Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-neutral-400" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input pl-10"
                      placeholder="Your name"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-neutral-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input pl-10"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full flex items-center justify-center">
                <span className="mr-2">{isLogin ? "Sign In" : "Create Account"}</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          <div className="text-center mb-6">
            <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 hover:underline">
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={handleSkipLogin}
              className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50"
            >
              Skip Login (Testing Only)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
