"use client"

import { useState, useRef } from "react"
import {
  ArrowLeft,
  Clock,
  Users,
  MoreVertical,
  Trash2,
  Edit,
  BarChart2,
  Copy,
  Download,
  Globe,
  CheckCircle,
  User,
  Check,
} from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import DeleteConfirmationModal from "../modals/delete-confirmation-modal"

export default function MeetingDetailScreen({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState("summary")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const summaryRef = useRef<HTMLTextAreaElement>(null)
  const detailsRef = useRef<HTMLTextAreaElement>(null)
  const notesRef = useRef<HTMLTextAreaElement>(null)

  // Mock data
  const meeting = {
    id,
    title: "Weekly Team Meeting",
    duration: "45:12",
    speakers: 4,
    score: 78,
    language: "English",
    summary:
      "This meeting covered project updates, timeline adjustments, and resource allocation. The team agreed to move the deadline by one week and reassign two developers to the frontend tasks.",
    details:
      "The meeting started with project updates from each team lead. Speaker 1 reported that the backend API is 80% complete but facing some integration issues. Speaker 2 mentioned that the design system is finalized and ready for implementation. The team discussed the current timeline and agreed that an extension is necessary due to unforeseen technical challenges.",
    notes:
      "- Follow up with Speaker 1 about API documentation\n- Schedule design handoff meeting with Speaker 2\n- Update project timeline in Asana\n- Inform client about the new delivery date",
    scoreDetails: {
      relevance: 85,
      clarity: 72,
      decisions: 90,
      actionItems: 65,
    },
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    // In a real app, this would delete the meeting
    alert(`Meeting ${id} deleted`)
    // Navigate back to notes page
  }

  const handleCopyToClipboard = () => {
    let textToCopy = ""

    switch (activeTab) {
      case "summary":
        textToCopy = summaryRef.current?.value || meeting.summary
        break
      case "details":
        textToCopy = detailsRef.current?.value || meeting.details
        break
      case "notes":
        textToCopy = notesRef.current?.value || meeting.notes
        break
      case "score":
        textToCopy = `Meeting Score: ${meeting.score}%\n\nRelevance: ${meeting.scoreDetails.relevance}%\nClarity: ${meeting.scoreDetails.clarity}%\nDecisions: ${meeting.scoreDetails.decisions}%\nAction Items: ${meeting.scoreDetails.actionItems}%`
        break
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedText(activeTab)
      setTimeout(() => setCopiedText(null), 2000)
    })
  }

  const handleDownloadPDF = () => {
    // Mock PDF download
    alert("PDF download functionality would be implemented here")
  }

  // Calculate score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 80) return { bg: "bg-green-100", text: "text-green-700", border: "border-green-300" }
    if (score >= 60) return { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-300" }
    return { bg: "bg-red-100", text: "text-red-700", border: "border-red-300" }
  }

  const scoreColor = getScoreColor(meeting.score)

  return (
    <div className="pb-4">
      <div className="bg-white border-b border-neutral-200 p-5 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Link href="/notes">
              <button className="p-2 -ml-2 rounded-full active:bg-neutral-100 transition-colors">
                <ArrowLeft size={24} />
              </button>
            </Link>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-full active:bg-neutral-100 transition-colors">
                <MoreVertical size={24} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center">
                <Edit size={16} className="mr-2" />
                <span>Rename</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center text-red-600" onClick={handleDeleteClick}>
                <Trash2 size={16} className="mr-2" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold mb-4">{meeting.title}</h1>

        <div className="flex flex-wrap gap-3 mb-5">
          <div
            className={`px-4 py-2 rounded-xl flex items-center ${scoreColor.bg} ${scoreColor.text} ${scoreColor.border} border shadow-sm`}
          >
            <BarChart2 size={18} className="mr-2" />
            <span className="font-medium">{meeting.score}% Effectiveness</span>
          </div>

          <div className="bg-blue-50 px-4 py-2 rounded-xl flex items-center text-blue-700 border border-blue-200 shadow-sm">
            <Clock size={18} className="mr-2" />
            <span>{meeting.duration}</span>
          </div>

          <div className="bg-purple-50 px-4 py-2 rounded-xl flex items-center text-purple-700 border border-purple-200 shadow-sm">
            <Users size={18} className="mr-2" />
            <span>{meeting.speakers} speakers</span>
          </div>

          <div className="bg-teal-50 px-4 py-2 rounded-xl flex items-center text-teal-700 border border-teal-200 shadow-sm">
            <Globe size={18} className="mr-2" />
            <span>{meeting.language}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            className="py-3 px-4 rounded-xl bg-neutral-100 text-neutral-700 font-medium flex items-center justify-center shadow-sm active:bg-neutral-200 transition-colors"
            onClick={handleCopyToClipboard}
          >
            {copiedText ? (
              <>
                <CheckCircle size={20} className="mr-2 text-green-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={20} className="mr-2" />
                <span>Copy Content</span>
              </>
            )}
          </button>
          <button
            className="py-3 px-4 rounded-xl bg-neutral-100 text-neutral-700 font-medium flex items-center justify-center shadow-sm active:bg-neutral-200 transition-colors"
            onClick={handleDownloadPDF}
          >
            <Download size={20} className="mr-2" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-white border-b border-neutral-200 px-5 sticky z-10" style={{ top: "232px" }}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger
              value="summary"
              className="text-sm py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
            >
              Summary
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="text-sm py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="notes"
              className="text-sm py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
            >
              Notes
            </TabsTrigger>
            <TabsTrigger
              value="score"
              className="text-sm py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:font-medium data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
            >
              Score
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-5">
          <TabsContent value="summary" className="mt-0">
            <div className="card p-5 shadow-sm">
              <h3 className="text-lg font-medium mb-4 pb-2 border-b border-neutral-100">Meeting Summary</h3>
              <textarea
                ref={summaryRef}
                className="w-full min-h-[200px] p-2 text-neutral-700 border-none focus:outline-none resize-none"
                defaultValue={meeting.summary}
              />
            </div>
          </TabsContent>

          <TabsContent value="details" className="mt-0">
            <div className="card p-5 shadow-sm">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 pb-2 border-b border-neutral-200">Per-Speaker Breakdown</h3>
                  <div className="space-y-4">
                    <SpeakerSection
                      name="Speaker 1"
                      content="The backend API is 80% complete but facing some integration issues. We need to address the authentication flow before proceeding."
                    />
                    <SpeakerSection
                      name="Speaker 2"
                      content="The design system is finalized and ready for implementation. All components have been documented in Figma."
                    />
                    <SpeakerSection
                      name="Speaker 3"
                      content="I've been working on the frontend integration. We might need more time to implement all the features."
                    />
                    <SpeakerSection
                      name="Speaker 4"
                      content="We should prioritize the core features for the initial release and plan the rest for future updates."
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-200">
                  <h3 className="text-lg font-medium mb-3">Conclusion</h3>
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-neutral-700">
                      The team agreed that an extension is necessary due to unforeseen technical challenges. The new
                      timeline will be communicated to stakeholders after assessing the remaining work.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-200">
                  <h3 className="text-lg font-medium mb-3">Action Items</h3>
                  <ul className="space-y-2 text-neutral-700">
                    <ActionItem text="Speaker 1 to resolve API authentication issues by Friday" />
                    <ActionItem text="Speaker 2 to hand off design assets to development team" />
                    <ActionItem text="Speaker 3 to estimate remaining frontend work" />
                    <ActionItem text="Speaker 4 to update project timeline in Asana" />
                    <ActionItem text="Team to reconvene next Monday to assess progress" />
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="mt-0">
            <div className="card p-5 shadow-sm">
              <h3 className="text-lg font-medium mb-4 pb-2 border-b border-neutral-100">Meeting Notes</h3>
              <textarea
                ref={notesRef}
                className="w-full min-h-[200px] p-2 text-neutral-700 border-none focus:outline-none resize-none"
                defaultValue={meeting.notes}
              />
            </div>
          </TabsContent>

          <TabsContent value="score" className="mt-0">
            <div className="card p-5 shadow-sm">
              <h3 className="text-lg font-medium mb-4 pb-2 border-b border-neutral-100">Meeting Effectiveness Score</h3>

              <div className="flex justify-center mb-8">
                <div
                  className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center shadow-md ${scoreColor.bg} ${scoreColor.border} border-4`}
                >
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold mb-1">{meeting.score}%</div>
                    <div className={`text-sm ${scoreColor.text}`}>Effectiveness</div>
                  </div>
                </div>
              </div>

              <div className="space-y-5 mb-6">
                <ScoreItem label="Relevance" score={meeting.scoreDetails.relevance} />
                <ScoreItem label="Clarity" score={meeting.scoreDetails.clarity} />
                <ScoreItem label="Decisions" score={meeting.scoreDetails.decisions} />
                <ScoreItem label="Action Items" score={meeting.scoreDetails.actionItems} />
              </div>

              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-center">
                <p className="text-sm text-neutral-600">
                  AI-generated score based on meeting content analysis. Scores above 80% indicate highly effective
                  meetings.
                </p>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {showDeleteModal && (
        <DeleteConfirmationModal
          itemName="meeting"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}

function ScoreItem({ label, score }: { label: string; score: number }) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return { bg: "bg-green-500", text: "text-green-700" }
    if (score >= 60) return { bg: "bg-yellow-500", text: "text-yellow-700" }
    return { bg: "bg-red-500", text: "text-red-700" }
  }

  const scoreColor = getScoreColor(score)

  return (
    <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{label}</span>
        <span
          className={`text-sm font-bold px-3 py-1 rounded-full ${
            score >= 80
              ? "bg-green-100 text-green-700"
              : score >= 60
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {score}%
        </span>
      </div>
      <div className="w-full bg-neutral-200 rounded-full h-3">
        <div className={`h-3 rounded-full ${scoreColor.bg}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

function SpeakerSection({ name, content }: { name: string; content: string }) {
  return (
    <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-sm">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 shadow-sm">
          <User size={20} className="text-blue-600" />
        </div>
        <span className="font-medium text-lg">{name}</span>
      </div>
      <p className="text-neutral-700">{content}</p>
    </div>
  )
}

function ActionItem({ text }: { text: string }) {
  return (
    <li className="flex items-start p-3 bg-white rounded-lg border border-neutral-200 shadow-sm">
      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
        <Check size={12} className="text-green-600" />
      </div>
      <span>{text}</span>
    </li>
  )
}
