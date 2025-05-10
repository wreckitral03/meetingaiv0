"use client"

import { X, AlertTriangle } from "lucide-react"

export default function DeleteConfirmationModal({
  onClose,
  onConfirm,
  itemName,
}: {
  onClose: () => void
  onConfirm: () => void
  itemName: string
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-sm">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Confirm Deletion</h2>
            <button onClick={onClose} className="p-1 rounded-full active:bg-neutral-100 transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle size={24} className="text-red-500" />
            </div>
          </div>

          <p className="text-neutral-600 mb-6 text-center">
            Are you sure you want to delete this {itemName}? This action cannot be undone.
          </p>

          <div className="flex space-x-3">
            <button className="btn-secondary flex-1" onClick={onClose}>
              Cancel
            </button>
            <button className="btn-danger flex-1" onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
