"use client"

import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function FAQScreen() {
  return (
    <div className="p-4 pt-12 pb-20">
      <div className="flex items-center mb-6">
        <Link href="/profile">
          <button className="p-2 -ml-2 rounded-full active:bg-neutral-100 transition-colors">
            <ArrowLeft size={24} />
          </button>
        </Link>
        <h1 className="text-2xl font-bold ml-2">FAQ</h1>
      </div>

      <div className="card p-5 mb-4">
        <p className="text-neutral-600 mb-4">Find answers to the most commonly asked questions about VoiceNote AI.</p>
      </div>

      <div className="space-y-4">
        <FAQItem
          question="How does VoiceNote AI transcribe my meetings?"
          answer="VoiceNote AI uses advanced speech recognition technology to convert your spoken words into text. The AI processes the audio, identifies different speakers, and generates a transcript. The system is trained to handle various accents and can transcribe in multiple languages."
        />

        <FAQItem
          question="What is the AI Meeting Score?"
          answer="The AI Meeting Score is a metric that evaluates the effectiveness of your meeting based on several factors including clarity, relevance, decision-making, and action items. A higher score indicates a more productive meeting. The score helps you track improvement in your meeting efficiency over time."
        />

        <FAQItem
          question="How many minutes do I get with the free plan?"
          answer="The free plan includes 30 minutes of AI transcription and analysis per month. These minutes reset at the beginning of each billing cycle. If you need more minutes, you can upgrade to Premium or purchase additional minute packs."
        />

        <FAQItem
          question="Can I export my meeting notes?"
          answer="Yes, you can export your meeting notes in various formats. The free plan allows manual copying, while Premium users can download notes as PDF and text files. All your notes can be accessed from the Notes section of the app."
        />

        <FAQItem
          question="How does speaker identification work?"
          answer="VoiceNote AI automatically detects different speakers in your recording and labels them as 'Speaker 1', 'Speaker 2', etc. Premium users can rename these speakers for easier identification. The system becomes more accurate at identifying unique voices with continued use."
        />

        <FAQItem
          question="Is my data secure?"
          answer="Yes, we take data security very seriously. All recordings and transcriptions are encrypted both in transit and at rest. We do not share your data with third parties without your explicit consent. You can review our Privacy Policy for more details on how we handle your data."
        />

        <FAQItem
          question="What happens if I run out of minutes?"
          answer="If you run out of minutes, you won't be able to process new recordings until you either purchase more minutes or wait for your monthly reset (for free and Premium plans). Your existing notes and transcriptions will remain accessible."
        />

        <FAQItem
          question="How do I cancel my subscription?"
          answer="You can cancel your subscription at any time from the Profile screen. Go to Profile > Subscription and select 'Cancel Subscription'. Your Premium features will remain active until the end of your current billing period."
        />
      </div>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="card overflow-hidden">
      <button className="w-full p-5 flex justify-between items-center text-left" onClick={() => setIsOpen(!isOpen)}>
        <span className="font-medium text-lg">{question}</span>
        {isOpen ? (
          <ChevronUp size={20} className="text-neutral-500 flex-shrink-0" />
        ) : (
          <ChevronDown size={20} className="text-neutral-500 flex-shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-0">
          <div className="pt-3 border-t border-neutral-100">
            <p className="text-neutral-600">{answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}
