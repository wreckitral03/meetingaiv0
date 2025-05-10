"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import BottomNavigation from "@/components/bottom-navigation"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
    setIsLoading(false)

    if (!loggedIn && pathname !== "/auth") {
      router.push("/auth")
    }
  }, [pathname, router])

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col">
      <main className="flex-1 overflow-auto pb-20">{children}</main>
      <BottomNavigation />
    </div>
  )
}
