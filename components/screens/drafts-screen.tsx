"use client"

import { useState } from "react"
import { Play, Scissors, Trash2, ArrowRight, RefreshCw } from "lucide-react"
import ProcessingModal from "../modals/processing-modal"
import DeleteConfirmationModal from "../modals/delete-confirmation-modal"

export default function DraftsScreen() {
  const [showProcessingModal, setShowProcessingModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null)

  // Mock data
  const drafts = [
    { id: "1", name: "20240509121323", duration: "23:45", isProcessing: false, hasError: false },
    { id: "2", name: "20240508153012", duration: "45:12", isProcessing: false, hasError: false },
    { id: "3", name: "20240507091534", duration: "12:05", isProcessing: true, hasError: false },
    { id: "4", name: "20240506143022", duration: "34:18", isProcessing: false, hasError: true },
  ]

  const maxDrafts = 5
  const usedDrafts = drafts.length
  const usagePercentage = (usedDrafts / maxDrafts) * 100

  const handleProcess = (id: string) => {
    setSelectedDraftId(id)
    setShowProcessingModal(true)
  }

  const handleDeleteClick = (id: string) => {
    setSelectedDraftId(id)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    // In a real app, this would delete the draft
    alert(`Draft ${selectedDraftId} deleted`)
    setShowDeleteModal(false)
  }

  return (
    <div className="p-4 pt-12">
      <h1 className="text-2xl font-bold mb-4">Drafts</h1>

      <div className="card p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Storage Usage</h3>
          <span className="text-sm font-medium">
            {usedDrafts} of {maxDrafts} drafts
          </span>
        </div>

        <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-2">
          <div
            className={`h-2.5 rounded-full ${
              usagePercentage > 80 ? "bg-red-500" : usagePercentage > 60 ? "bg-yellow-500" : "bg-green-500"
            }`}
            style={{ width: `${usagePercentage}%` }}
          />
        </div>

        <p className="text-sm text-neutral-600">
          Drafts are limited to 5. Please delete unused drafts to free up space.
        </p>
      </div>

      <div className="space-y-4">
        {drafts.map((draft) => (
          <DraftCard
            key={draft.id}
            draft={draft}
            onProcess={() => handleProcess(draft.id)}
            onDelete={() => handleDeleteClick(draft.id)}
          />
        ))}
      </div>

      {drafts.length === 0 && (
        <div className="card p-6 flex flex-col items-center justify-center text-center">
          <p className="text-neutral-500 mb-2">No drafts yet</p>
          <p className="text-neutral-400 text-sm">Tap the record button to create your first draft</p>
        </div>
      )}

      {showProcessingModal && selectedDraftId && (
        <ProcessingModal draftId={selectedDraftId} onClose={() => setShowProcessingModal(false)} />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          itemName="draft"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}

function DraftCard({
  draft,
  onProcess,
  onDelete,
}: {
  draft: {
    id: string
    name: string
    duration: string
    isProcessing: boolean
    hasError: boolean
  }
  onProcess: () => void
  onDelete: () => void
}) {
  const [playbackPosition, setPlaybackPosition] = useState(30)

  return (
    <div className="card p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{draft.name}</h3>
        <span className="text-sm text-neutral-500">{draft.duration}</span>
      </div>

      <div className="mb-3">
        <input
          type="range"
          min="0"
          max="100"
          value={playbackPosition}
          onChange={(e) => setPlaybackPosition(Number.parseInt(e.target.value))}
          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="flex justify-between">
        <div className="flex space-x-2">
          <button className="btn-secondary p-2">
            <Play size={18} />
          </button>
          <button className="btn-secondary p-2">
            <Scissors size={18} />
          </button>
          <button className="btn-danger p-2" onClick={onDelete}>
            <Trash2 size={18} />
          </button>
        </div>

        <div>
          {draft.isProcessing ? (
            <div className="text-sm text-blue-500 flex items-center">
              <span className="mr-1">Processing</span>
              <RefreshCw size={16} className="animate-spin" />
            </div>
          ) : draft.hasError ? (
            <button className="btn-secondary flex items-center">
              <RefreshCw size={18} className="mr-1" />
              <span>Retry</span>
            </button>
          ) : (
            <button className="btn-primary flex items-center" onClick={onProcess}>
              <span className="mr-1">Process</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
