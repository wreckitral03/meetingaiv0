"use client"

import type React from "react"

import { X } from "lucide-react"
import { useState } from "react"

export default function ProcessingModal({
  draftId,
  onClose,
}: {
  draftId: string
  onClose: () => void
}) {
  const [filename, setFilename] = useState(
    `${new Date()
      .toISOString()
      .replace(/[-:.TZ]/g, "")
      .slice(0, 14)}`,
  )
  const [outputLanguage, setOutputLanguage] = useState("en")
  const [deleteAfterProcess, setDeleteAfterProcess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Process the draft with the provided settings
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-sm">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Process Recording</h2>
            <button onClick={onClose} className="p-1 rounded-full active:bg-neutral-100 transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">Filename</label>
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="input"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">Output Language</label>
              <select value={outputLanguage} onChange={(e) => setOutputLanguage(e.target.value)} className="input">
                <option value="en">English</option>
                <option value="id">Indonesian</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={deleteAfterProcess}
                  onChange={(e) => setDeleteAfterProcess(e.target.checked)}
                  className="rounded border-neutral-300 text-blue-500 focus:ring-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-sm text-neutral-700">Delete after process</span>
              </label>
            </div>

            <div className="flex space-x-3">
              <button type="button" className="btn-secondary flex-1" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary flex-1">
                Process
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
