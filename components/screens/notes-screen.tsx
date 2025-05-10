"use client"

import { Search, Clock, Users, BarChart2, Calendar, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import PremiumComparisonModal from "../modals/premium-comparison-modal"

export default function NotesScreen() {
  const [showPremiumModal, setShowPremiumModal] = useState(false)

  // Mock data with dates and categories
  const notes = [
    {
      id: "1",
      title: "Weekly Team Meeting",
      speakers: 4,
      duration: "45:12",
      score: 78,
      date: "May 9, 2024",
      category: "Team",
    },
    {
      id: "2",
      title: "Product Planning",
      speakers: 3,
      duration: "32:05",
      score: 92,
      date: "May 8, 2024",
      category: "Product",
    },
    {
      id: "3",
      title: "Client Presentation",
      speakers: 2,
      duration: "23:45",
      score: 85,
      date: "May 8, 2024",
      category: "Client",
    },
    {
      id: "4",
      title: "Marketing Strategy",
      speakers: 5,
      duration: "51:30",
      score: 65,
      date: "May 7, 2024",
      category: "Marketing",
    },
  ]

  // Group notes by date
  const groupedNotes = notes.reduce(
    (groups, note) => {
      if (!groups[note.date]) {
        groups[note.date] = []
      }
      groups[note.date].push(note)
      return groups
    },
    {} as Record<string, typeof notes>,
  )

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-700"
    if (score >= 60) return "bg-yellow-100 text-yellow-700"
    return "bg-red-100 text-red-700"
  }

  return (
    <div className="p-4 pt-12">
      <h1 className="text-2xl font-bold mb-6">Notes</h1>

      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search size={18} className="text-neutral-400" />
        </div>
        <input type="text" placeholder="Search notes..." className="input pl-10" />
      </div>

      <div className="card p-4 mb-6 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <h2 className="text-lg font-medium text-blue-800 mb-2">Upgrade to Premium</h2>
        <p className="text-blue-700 text-sm mb-3">Get unlimited notes storage and advanced AI analysis</p>
        <button className="btn-primary bg-blue-600 active:bg-blue-700" onClick={() => setShowPremiumModal(true)}>
          Upgrade Now
        </button>
      </div>

      {Object.entries(groupedNotes).map(([date, dateNotes]) => (
        <div key={date} className="mb-6">
          <div className="flex items-center mb-2">
            <Calendar size={16} className="text-neutral-500 mr-2" />
            <h2 className="text-sm font-medium text-neutral-500">{date}</h2>
          </div>

          <div className="space-y-3">
            {dateNotes.map((note) => (
              <Link key={note.id} href={`/notes/${note.id}`} className="block">
                <div
                  className="card p-4 active:bg-neutral-50 transition-colors border-l-4 hover:shadow-md flex flex-col"
                  style={{ borderLeftColor: note.score >= 80 ? "#10b981" : note.score >= 60 ? "#f59e0b" : "#ef4444" }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-lg">{note.title}</h3>
                    <ChevronRight size={18} className="text-neutral-400" />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(note.score)} flex items-center`}
                    >
                      <BarChart2 size={12} className="mr-1" />
                      {note.score}%
                    </span>

                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <Clock size={12} className="mr-1" />
                      {note.duration}
                    </span>

                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <Users size={12} className="mr-1" />
                      {note.speakers}
                    </span>

                    <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs font-medium">
                      {note.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {notes.length === 0 && (
        <div className="card p-6 flex flex-col items-center justify-center text-center">
          <p className="text-neutral-500 mb-2">No notes yet</p>
          <p className="text-neutral-400 text-sm">Start recording to see results here</p>
        </div>
      )}

      {showPremiumModal && <PremiumComparisonModal onClose={() => setShowPremiumModal(false)} />}
    </div>
  )
}
