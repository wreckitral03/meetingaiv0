"use client"

import { useState } from "react"
import { X, Star, CheckCircle } from "lucide-react"

export default function FeedbackModal({ onClose }: { onClose: () => void }) {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Mock submission delay
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Close modal after showing thank you message
      setTimeout(() => {
        onClose()
      }, 3000)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-sm">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Give Feedback</h2>
            <button onClick={onClose} className="p-1 rounded-full active:bg-neutral-100 transition-colors">
              <X size={24} />
            </button>
          </div>

          {isSubmitted ? (
            <div className="py-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">Thank You!</h3>
              <p className="text-neutral-600">You may earn bonus minutes if this feedback is accepted.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  How would you rate your experience?
                </label>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setRating(star)} className="p-2">
                      <Star
                        size={32}
                        className={`${
                          rating >= star ? "text-yellow-400 fill-yellow-400" : "text-neutral-300"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="feedback" className="block text-sm font-medium text-neutral-700 mb-2">
                  Tell us what could be better
                </label>
                <textarea
                  id="feedback"
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Your feedback helps us improve..."
                  className="w-full p-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={rating === 0 || isSubmitting}
                className={`btn-primary w-full flex items-center justify-center ${
                  isSubmitting ? "relative overflow-hidden" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="opacity-0">Submit Feedback</span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </span>
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
