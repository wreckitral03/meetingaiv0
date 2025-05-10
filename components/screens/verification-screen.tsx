"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ArrowLeft, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

export default function VerificationScreen({
  email,
  onComplete,
}: {
  email: string
  onComplete: () => void
}) {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste of full code
      const pastedCode = value.slice(0, 6).split("")
      const newCode = [...code]

      pastedCode.forEach((char, i) => {
        if (index + i < 6) {
          newCode[index + i] = char
        }
      })

      setCode(newCode)

      // Focus on the appropriate input
      const focusIndex = Math.min(index + pastedCode.length, 5)
      inputRefs.current[focusIndex]?.focus()
      return
    }

    // Handle single character input
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // Focus previous input when backspace is pressed on an empty input
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleResend = () => {
    setIsResending(true)

    // Mock resending code
    setTimeout(() => {
      setIsResending(false)
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Check if code is complete
    if (code.every((digit) => digit !== "")) {
      // Set logged in status in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", "true")

        // Use direct navigation to ensure a full page load
        window.location.href = "/"
      } else {
        onComplete()
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6">
      <button
        onClick={() => router.back()}
        className="p-2 -ml-2 rounded-full active:bg-neutral-100 transition-colors self-start"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={32} className="text-blue-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
            <p className="text-neutral-600">
              We've sent a verification code to <br />
              <span className="font-medium">{email}</span>
            </p>
          </div>

          <div className="card p-4 sm:p-6 mb-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-3 text-center">
                  Enter 6-digit code
                </label>
                <div className="flex justify-between gap-1 sm:gap-2">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-full aspect-square text-center text-xl font-medium rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-primary w-full" disabled={!code.every((digit) => digit !== "")}>
                Verify Email
              </button>
            </form>
          </div>

          <div className="text-center">
            <p className="text-neutral-600 mb-2">Didn't receive the code?</p>
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-blue-500 hover:underline disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend Code"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
