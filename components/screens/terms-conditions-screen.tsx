"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsConditionsScreen() {
  return (
    <div className="p-4 pt-12 pb-20">
      <div className="flex items-center mb-6">
        <Link href="/profile">
          <button className="p-2 -ml-2 rounded-full active:bg-neutral-100 transition-colors">
            <ArrowLeft size={24} />
          </button>
        </Link>
        <h1 className="text-2xl font-bold ml-2">Terms & Conditions</h1>
      </div>

      <div className="card p-5 mb-6">
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4">Agreement Overview</h2>
          <p className="mb-4">
            These Terms and Conditions ("Terms") govern your use of the VoiceNote AI mobile application and services
            (collectively, the "Service") operated by VoiceNote AI ("we," "our," or "us").
          </p>
          <p className="mb-4">
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of
            the Terms, you may not access the Service.
          </p>

          <h2 className="text-xl font-semibold mb-4 mt-6">User Responsibilities</h2>
          <p className="mb-3">As a user of VoiceNote AI, you agree to:</p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>
              Provide accurate and complete information when creating an account and keep this information updated
            </li>
            <li>Maintain the security of your account and password</li>
            <li>
              Obtain proper consent from all participants before recording any conversation or meeting using our Service
            </li>
            <li>
              Not use the Service for any illegal purpose or in violation of any local, state, national, or
              international law
            </li>
            <li>
              Not attempt to probe, scan, or test the vulnerability of the Service or any related system or network
            </li>
            <li>Not interfere with or disrupt the integrity or performance of the Service</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4 mt-6">Subscription Terms</h2>
          <p className="mb-4">
            VoiceNote AI offers both free and premium subscription plans. By subscribing to a premium plan, you agree to
            the following:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>
              Payment will be charged to your account at confirmation of purchase and at the beginning of each billing
              cycle
            </li>
            <li>
              Subscriptions automatically renew unless auto-renew is turned off at least 24 hours before the end of the
              current period
            </li>
            <li>
              You can manage your subscription and turn off auto-renewal by going to your account settings after
              purchase
            </li>
            <li>No refund is provided for the unused portion of any subscription period</li>
            <li>Prices are subject to change. We will notify you of any price changes before they take effect</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4 mt-6">Intellectual Property</h2>
          <p className="mb-4">
            The Service and its original content, features, and functionality are and will remain the exclusive property
            of VoiceNote AI and its licensors. The Service is protected by copyright, trademark, and other laws.
          </p>
          <p className="mb-4">
            You retain ownership of the content you create using the Service, including recordings, transcriptions, and
            summaries. However, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify,
            and display your content solely for the purpose of providing the Service to you.
          </p>

          <h2 className="text-xl font-semibold mb-4 mt-6">Limitation of Liability</h2>
          <p className="mb-4">
            In no event shall VoiceNote AI, its directors, employees, partners, agents, suppliers, or affiliates be
            liable for any indirect, incidental, special, consequential, or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>Your access to or use of or inability to access or use the Service</li>
            <li>Any conduct or content of any third party on the Service</li>
            <li>Any content obtained from the Service</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4 mt-6">Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your account and access to the Service immediately, without prior notice or
            liability, for any reason, including without limitation if you breach the Terms.
          </p>
          <p className="mb-4">
            Upon termination, your right to use the Service will immediately cease. If you wish to terminate your
            account, you may simply discontinue using the Service or delete your account through the app.
          </p>

          <h2 className="text-xl font-semibold mb-4 mt-6">Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by
            posting the new Terms on this page and updating the "Last Updated" date.
          </p>
          <p className="mb-4">
            Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
          </p>

          <h2 className="text-xl font-semibold mb-4 mt-6">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at:
            <br />
            <a href="mailto:legal@voicenoteai.com" className="text-blue-500">
              legal@voicenoteai.com
            </a>
          </p>

          <p className="text-sm text-neutral-500 mt-8">Last Updated: May 10, 2025</p>
        </div>
      </div>
    </div>
  )
}
