"use client"

import {
  ArrowLeft,
  Clock,
  Check,
  LogOut,
  Lock,
  CreditCard,
  User,
  Mail,
  MessageSquare,
  Plus,
  Info,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import PremiumComparisonModal from "../modals/premium-comparison-modal"
import FeedbackModal from "../modals/feedback-modal"
import AddOnPacksModal from "../modals/add-on-packs-modal"

export default function ProfileScreen() {
  const [uiLanguage, setUiLanguage] = useState("EN")
  const [outputLanguage, setOutputLanguage] = useState("EN")
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [showAddOnModal, setShowAddOnModal] = useState(false)
  const [skipConsent, setSkipConsent] = useState(false)
  const [showConsentTooltip, setShowConsentTooltip] = useState(false)

  // Mock data
  const minutesBalance = 45
  const isPremium = false
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
  }

  return (
    <div className="p-4 pt-12 pb-20">
      <div className="flex items-center mb-6">
        <Link href="/">
          <button className="p-2 -ml-2 rounded-full active:bg-neutral-100 transition-colors">
            <ArrowLeft size={24} />
          </button>
        </Link>
        <h1 className="text-2xl font-bold ml-2">Profile</h1>
      </div>

      {/* Top Section - User Info & Subscription */}
      <div className="card p-5 mb-6">
        {/* User Info */}
        <div className="flex items-center mb-5 pb-5 border-b border-neutral-100">
          <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <User size={28} className="text-blue-500" />
          </div>
          <div>
            <h2 className="font-medium text-lg">{userData.name}</h2>
            <div className="flex items-center text-neutral-500">
              <Mail size={14} className="mr-1" />
              <span className="text-sm">{userData.email}</span>
            </div>
          </div>
        </div>

        {/* Subscription Status */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <CreditCard size={20} className="text-neutral-500 mr-2" />
              <span className="text-neutral-700">Subscription</span>
            </div>
            <div className="flex items-center">
              <span className={isPremium ? "text-blue-500 font-medium" : "text-neutral-500"}>
                {isPremium ? "Premium" : "Free"}
              </span>
              <div className="ml-2 w-2 h-2 rounded-full bg-neutral-300"></div>
              <span className="ml-2 text-neutral-700">
                <Clock size={16} className="inline mr-1" />
                <span className="font-medium">{minutesBalance}</span> minutes
              </span>
            </div>
          </div>

          {!isPremium && (
            <div className="space-y-3">
              <button className="btn-primary w-full" onClick={() => setShowPremiumModal(true)}>
                Upgrade to Premium
              </button>
              <button
                className="flex items-center justify-center w-full p-3 rounded-xl border border-blue-200 bg-blue-50 text-blue-600 active:bg-blue-100"
                onClick={() => setShowAddOnModal(true)}
              >
                <Plus size={18} className="mr-2" />
                <span>Buy More Minutes</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Middle Section - Settings */}
      <div className="card p-5 mb-6">
        <h2 className="text-lg font-medium mb-4">Settings</h2>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span className="text-neutral-700">Auto-skip recording consent and microphone prompts</span>
              <button className="ml-1 p-1 rounded-full" onClick={() => setShowConsentTooltip(!showConsentTooltip)}>
                <Info size={16} className="text-neutral-400" />
              </button>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={skipConsent}
                onChange={() => setSkipConsent(!skipConsent)}
              />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
          {showConsentTooltip && (
            <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700 mb-3">
              When enabled, this will skip the recording consent prompt and microphone permission pop-up (if previously
              granted by your device). Use this setting only when you're sure all participants have agreed to being
              recorded.
            </div>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium mb-4">Language Settings</h3>

          <div className="mb-4">
            <label className="block text-neutral-700 mb-2">UI Language</label>
            <div className="grid grid-cols-2 gap-2">
              <LanguageButton
                label="English"
                code="EN"
                isSelected={uiLanguage === "EN"}
                onSelect={() => setUiLanguage("EN")}
              />
              <LanguageButton
                label="Indonesian"
                code="ID"
                isSelected={uiLanguage === "ID"}
                onSelect={() => setUiLanguage("ID")}
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-700 mb-2">Summary Output Language</label>
            <div className="grid grid-cols-2 gap-2">
              <LanguageButton
                label="English"
                code="EN"
                isSelected={outputLanguage === "EN"}
                onSelect={() => setOutputLanguage("EN")}
              />
              <LanguageButton
                label="Indonesian"
                code="ID"
                isSelected={outputLanguage === "ID"}
                onSelect={() => setOutputLanguage("ID")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Support & Info Section */}
      <div className="card p-5 mb-6">
        <h2 className="text-lg font-medium mb-4">Support & Info</h2>

        <div className="space-y-3">
          <Link href="/faq">
            <button className="flex items-center w-full p-3 rounded-xl border border-neutral-200 active:bg-neutral-50 transition-colors">
              <HelpCircle size={20} className="text-neutral-500 mr-3" />
              <span className="text-neutral-700">FAQ</span>
            </button>
          </Link>

          <button
            className="flex items-center w-full p-3 rounded-xl border border-neutral-200 active:bg-neutral-50 transition-colors"
            onClick={() => setShowFeedbackModal(true)}
          >
            <MessageSquare size={20} className="text-neutral-500 mr-3" />
            <span className="text-neutral-700">Give Feedback</span>
          </button>

          <div className="p-4 border border-neutral-200 rounded-xl">
            <p className="text-neutral-600 mb-2">VoiceNote AI v1.0.0</p>
            <div className="flex space-x-4">
              <Link href="/privacy-policy">
                <button className="text-blue-500 hover:underline">Privacy Policy</button>
              </Link>
              <Link href="/terms-conditions">
                <button className="text-blue-500 hover:underline">Terms of Service</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Account */}
      <div className="card p-5">
        <h2 className="text-lg font-medium mb-4">Account</h2>

        <div className="space-y-3">
          <button
            className="flex items-center w-full p-3 rounded-xl border border-neutral-200 active:bg-neutral-50 transition-colors"
            onClick={() => alert("Change password functionality")}
          >
            <Lock size={20} className="text-neutral-500 mr-3" />
            <span className="text-neutral-700">Change Password</span>
          </button>

          <button
            className="flex items-center w-full p-3 rounded-xl border border-red-100 text-red-600 active:bg-red-50 transition-colors"
            onClick={() => alert("Logout functionality")}
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {showPremiumModal && <PremiumComparisonModal onClose={() => setShowPremiumModal(false)} />}
      {showFeedbackModal && <FeedbackModal onClose={() => setShowFeedbackModal(false)} />}
      {showAddOnModal && <AddOnPacksModal onClose={() => setShowAddOnModal(false)} />}
    </div>
  )
}

function LanguageButton({
  label,
  code,
  isSelected,
  onSelect,
}: {
  label: string
  code: string
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <button
      className={`p-3 rounded-xl border flex justify-between items-center ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-neutral-200 bg-white"
      }`}
      onClick={onSelect}
    >
      <span>{label}</span>
      {isSelected && <Check size={18} className="text-blue-500" />}
    </button>
  )
}
