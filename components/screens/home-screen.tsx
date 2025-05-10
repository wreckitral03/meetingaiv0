"use client"

import { Clock, User, BarChart2, Calendar, Award, Mic } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import RecordingModal from "../modals/recording-modal"
import PremiumComparisonModal from "../modals/premium-comparison-modal"

export default function HomeScreen() {
  const [showRecordingModal, setShowRecordingModal] = useState(false)
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  // Mock data
  const stats = {
    meetingsRecorded: 12,
    totalDuration: "5h 23m",
    averageScore: 82,
  }

  const remainingMinutes = 45

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const handleRecordClick = () => {
    setShowRecordingModal(true)
  }

  // Show loading state while data is loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="p-4 pt-8 sm:pt-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">VoiceNote AI</h1>
        <Link href="/profile">
          <button className="p-2 rounded-full bg-neutral-100 active:bg-neutral-200 transition-colors">
            <User size={24} className="text-neutral-700" />
          </button>
        </Link>
      </div>

      <div className="flex items-center mb-6">
        <Clock size={20} className="text-neutral-500 mr-2" />
        <span className="text-neutral-700">
          <span className="font-medium">{remainingMinutes}</span> minutes remaining
        </span>
      </div>

      <div className="card p-6 mb-6 flex flex-col items-center">
        <div className="mb-4">
          {/* Simple record button without complex animations */}
          <button
            className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center shadow-lg hover:bg-blue-600 active:scale-95 transition-all duration-150"
            onClick={handleRecordClick}
            aria-label="Start recording"
          >
            <Mic size={36} className="text-white" />
          </button>
        </div>
        <h2 className="text-lg font-medium mb-2 text-center">Start Recording</h2>
        <p className="text-neutral-600 mb-4 text-center">Tap to capture your meeting in seconds</p>
        <button className="btn-primary w-full flex items-center justify-center" onClick={handleRecordClick}>
          <Mic size={18} className="mr-2" />
          Start your smart meeting
        </button>
      </div>

      <div className="mb-2 flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-lg font-medium">Your Stats</h2>
        <div className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
          <Award size={14} className="mr-1" />
          <span>10 Meetings Milestone!</span>
        </div>
      </div>

      <div className="card p-4 sm:p-5 mb-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <Calendar size={20} className="text-blue-600" />
            </div>
            <div className="text-xs text-neutral-500 mb-1">Meetings</div>
            <div className="text-lg sm:text-xl font-medium">{stats.meetingsRecorded}</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <Clock size={20} className="text-green-600" />
            </div>
            <div className="text-xs text-neutral-500 mb-1">Duration</div>
            <div className="text-lg sm:text-xl font-medium">{stats.totalDuration}</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <BarChart2 size={20} className="text-purple-600" />
            </div>
            <div className="text-xs text-neutral-500 mb-1">Avg. Score</div>
            <div className="text-lg sm:text-xl font-medium">{stats.averageScore}%</div>
          </div>
        </div>

        <div className="bg-neutral-100 rounded-lg p-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-neutral-500">Good</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${stats.averageScore}%` }} />
          </div>
        </div>
      </div>

      {showRecordingModal && <RecordingModal onClose={() => setShowRecordingModal(false)} />}
      {showPremiumModal && <PremiumComparisonModal onClose={() => setShowPremiumModal(false)} />}
    </div>
  )
}
