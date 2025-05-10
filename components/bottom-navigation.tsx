"use client"

import type React from "react"

import { Home, FileText, Mic, BookOpen, MessageSquare } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import RecordingModal from "./modals/recording-modal"

export default function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [showRecordingModal, setShowRecordingModal] = useState(false)

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-neutral-200 px-2 pt-2 pb-6 z-20">
        <div className="flex items-center justify-around">
          <NavItem
            href="/"
            icon={<Home size={24} />}
            label="Home"
            isActive={pathname === "/"}
            onClick={() => handleNavigation("/")}
          />
          <NavItem
            href="/drafts"
            icon={<FileText size={24} />}
            label="Drafts"
            isActive={pathname === "/drafts"}
            onClick={() => handleNavigation("/drafts")}
          />
          <RecordButton onClick={() => setShowRecordingModal(true)} />
          <NavItem
            href="/notes"
            icon={<BookOpen size={24} />}
            label="Notes"
            isActive={pathname.startsWith("/notes")}
            onClick={() => handleNavigation("/notes")}
          />
          <NavItem
            href="/ai-chat"
            icon={<MessageSquare size={24} />}
            label="AI Chat"
            isActive={pathname === "/ai-chat"}
            onClick={() => handleNavigation("/ai-chat")}
          />
        </div>
      </div>

      {showRecordingModal && <RecordingModal onClose={() => setShowRecordingModal(false)} />}
    </>
  )
}

function NavItem({
  href,
  icon,
  label,
  isActive,
  disabled = false,
  onClick,
}: {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center ${disabled ? "opacity-40 pointer-events-none" : ""}`}
      aria-disabled={disabled}
    >
      <div className={`p-2 ${isActive ? "text-blue-500" : "text-neutral-500"}`}>{icon}</div>
      <span className={`text-xs ${isActive ? "text-blue-500 font-medium" : "text-neutral-500"}`}>{label}</span>
    </button>
  )
}

function RecordButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="relative -mt-6">
      <button
        className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-lg active:bg-blue-600 transition-colors"
        aria-label="Record"
        onClick={onClick}
      >
        <Mic size={28} className="text-white" />
      </button>
    </div>
  )
}
