"use client"

import { X, Mic, AlertCircle, Pause, Square, Edit2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function RecordingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"consent" | "permission" | "recording" | "naming">("consent")
  const [recordingTime, setRecordingTime] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [draftName, setDraftName] = useState(
    `Recording_${new Date().toISOString().slice(0, 10).replace(/-/g, "")}_${Math.floor(Math.random() * 1000)}`,
  )
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const waveformCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (step === "recording" && !isPaused) {
      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)

      // Draw waveform if canvas is available
      const canvas = waveformCanvasRef.current
      if (canvas) {
        const ctx = canvas.getContext("2d")
        if (ctx) {
          drawWaveform(ctx, canvas.width, canvas.height)
        }
      }

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }, [step, isPaused])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleConsentGranted = () => {
    setStep("permission")
  }

  const handlePermissionGranted = () => {
    setStep("recording")
  }

  const handlePauseResume = () => {
    setIsPaused((prev) => !prev)
  }

  const handleStop = () => {
    setStep("naming")
  }

  const handleSaveDraft = () => {
    // In a real app, this would save the recording with the given name
    alert(`Recording saved as draft: ${draftName}`)
    onClose()
  }

  // Simple waveform drawing function
  const drawWaveform = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height)

    const barCount = 50
    const barWidth = width / barCount - 1

    for (let i = 0; i < barCount; i++) {
      const barHeight = Math.random() * height * 0.8
      const x = i * (barWidth + 1)
      const y = (height - barHeight) / 2

      ctx.fillStyle = "rgba(59, 130, 246, 0.5)"
      ctx.fillRect(x, y, barWidth, barHeight)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-sm">
        {step === "consent" ? (
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Recording Consent</h2>
              <button onClick={onClose} className="p-1 rounded-full active:bg-neutral-100 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl mb-4 flex">
              <AlertCircle size={20} className="text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-blue-700 text-sm">
                Please ensure all participants have agreed to being recorded before proceeding.
              </p>
            </div>

            <p className="text-neutral-600 mb-6">
              By continuing, you confirm that you have informed all participants that this meeting will be recorded.
            </p>

            <div className="flex space-x-3">
              <button className="btn-secondary flex-1" onClick={onClose}>
                Cancel
              </button>
              <button className="btn-primary flex-1" onClick={handleConsentGranted}>
                I Confirm
              </button>
            </div>
          </div>
        ) : step === "permission" ? (
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Microphone Access</h2>
              <button onClick={onClose} className="p-1 rounded-full active:bg-neutral-100 transition-colors">
                <X size={24} />
              </button>
            </div>

            <p className="text-neutral-600 mb-6">
              This app will record your voice. Please confirm microphone access is enabled and voice input is active.
            </p>

            <div className="flex space-x-3">
              <button className="btn-secondary flex-1" onClick={onClose}>
                Cancel
              </button>
              <button className="btn-primary flex-1" onClick={handlePermissionGranted}>
                Start Recording
              </button>
            </div>
          </div>
        ) : step === "recording" ? (
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Recording</h2>
              <button onClick={onClose} className="p-1 rounded-full active:bg-neutral-100 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col items-center mb-6">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${
                  isPaused ? "bg-neutral-100" : "bg-red-100 animate-pulse"
                } flex items-center justify-center mb-4`}
              >
                <Mic size={32} className={isPaused ? "text-neutral-400" : "text-red-500"} />
              </div>
              <div className="text-2xl font-medium mb-4">{formatTime(recordingTime)}</div>

              <div className="w-full h-16 mb-4 bg-neutral-50 rounded-lg overflow-hidden">
                <canvas
                  ref={waveformCanvasRef}
                  width="300"
                  height="64"
                  className={`w-full h-full ${isPaused ? "opacity-30" : "opacity-100"}`}
                />
              </div>
            </div>

            <div className="flex space-x-3 mb-3">
              <button className="btn-secondary flex-1 flex items-center justify-center" onClick={handlePauseResume}>
                {isPaused ? (
                  <>
                    <Mic size={18} className="mr-2" />
                    <span>Resume</span>
                  </>
                ) : (
                  <>
                    <Pause size={18} className="mr-2" />
                    <span>Pause</span>
                  </>
                )}
              </button>
              <button className="btn-danger flex-1 flex items-center justify-center" onClick={handleStop}>
                <Square size={18} className="mr-2" />
                <span>Stop</span>
              </button>
            </div>

            <button
              className="flex items-center justify-center w-full p-3 rounded-xl border border-neutral-200 text-neutral-600 active:bg-neutral-50"
              onClick={() => setStep("naming")}
            >
              <Edit2 size={18} className="mr-2" />
              <span>Edit Draft Name</span>
            </button>
          </div>
        ) : (
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Save Recording</h2>
              <button onClick={onClose} className="p-1 rounded-full active:bg-neutral-100 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">Draft Name</label>
              <input type="text" value={draftName} onChange={(e) => setDraftName(e.target.value)} className="input" />
              <p className="text-xs text-neutral-500 mt-1">Duration: {formatTime(recordingTime)}</p>
            </div>

            <div className="flex space-x-3">
              <button className="btn-secondary flex-1" onClick={() => setStep("recording")}>
                Back
              </button>
              <button className="btn-primary flex-1" onClick={handleSaveDraft}>
                Save Draft
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
