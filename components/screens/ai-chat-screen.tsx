"use client"

import { ArrowLeft, MessageSquare, Sparkles } from "lucide-react"
import Link from "next/link"

export default function AIChatScreen() {
  return (
    <div className="p-4 pt-12 h-full flex flex-col">
      <div className="flex items-center mb-6">
        <Link href="/">
          <button className="p-2 -ml-2 rounded-full active:bg-neutral-100 transition-colors">
            <ArrowLeft size={24} />
          </button>
        </Link>
        <h1 className="text-2xl font-bold ml-2">AI Chat</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <div className="w-40 h-40 mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <MessageSquare size={60} className="text-blue-500" />
          </div>
          <div className="absolute -top-2 -right-2">
            <Sparkles size={24} className="text-teal-500" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-3 text-blue-600">AI Chat Assistant</h2>
        <p className="text-neutral-600 mb-6 max-w-xs">
          Your intelligent meeting companion is arriving soon to supercharge your productivity!
        </p>

        <div className="bg-blue-50 p-4 rounded-xl w-full max-w-xs">
          <h3 className="font-medium text-blue-700 mb-2">Coming Soon</h3>
          <p className="text-sm text-blue-600">
            Ask questions about your meetings, get insights, and extract action items automatically.
          </p>
        </div>
      </div>
    </div>
  )
}
