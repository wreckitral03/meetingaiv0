"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import BottomNavigation from "@/components/bottom-navigation"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if we're on an auth page
  const isAuthPage = pathname === "/auth" || pathname === "/verification"

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true"
      setIsLoggedIn(loggedIn)

      // If not on auth page and not logged in, redirect to auth
      if (!isAuthPage && !loggedIn) {
        router.push("/auth")
      }

      setIsLoading(false)
    }
  }, [pathname, isAuthPage, router])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <html lang="en">
        <body className={`${inter.className} bg-neutral-50`}>
          <div className="max-w-md mx-auto min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-50`}>
        <div className="max-w-md mx-auto min-h-screen flex flex-col">
          <main className={`flex-1 overflow-x-hidden ${!isAuthPage && isLoggedIn ? "pb-20" : ""}`}>{children}</main>
          {!isAuthPage && isLoggedIn && <BottomNavigation />}
        </div>
      </body>
    </html>
  )
}
