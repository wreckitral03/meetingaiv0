"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyScreen() {
  return (
    <div className="p-4 pt-12 pb-20">
      <div className="flex items-center mb-6">
        <Link href="/profile">
          <button className="p-2 -ml-2 rounded-full active:bg-neutral-100 transition-colors">
            <ArrowLeft size={24} />
          </button>
        </Link>
        <h1 className="text-2xl font-bold ml-2">Privacy Policy</h1>
      </div>

      <div className="card p-5 mb-6">
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            VoiceNote AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
            how we collect, use, and safeguard your information when you use our mobile application and services.
          </p>
          <p className="mb-4">
            By using VoiceNote AI, you agree to the collection and use of information in accordance with this policy.
          </p>

          <h2 className="text-xl font-semibold mb-4 mt-6">What Data We Collect</h2>
          <p className="mb-3">We collect the following types of information:</p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>
              <strong>Account Information:</strong> When you register, we collect your name, email address, and account
              preferences.
            </li>
            <li>
              <strong>Audio Recordings:</strong> We process and store the audio recordings you create using our app.
            </li>
            <li>
              <strong>Transcriptions and Summaries:</strong> We store the transcriptions and AI-generated summaries of
              your recordings.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect information about how you use the app, including features used,
              time spent, and interaction patterns.
            </li>
            <li>
              <strong>Device Information:</strong> We collect information about your device, including device model,
              operating system, and unique device identifiers.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mb-4 mt-6">How We Use Your Data</h2>
          <p className="mb-3">We use your data for the following purposes:</p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>To provide and maintain our service, including processing your recordings</li>
            <li>To improve and personalize your experience with the app</li>
            <li>To communicate with you about updates, features, or support requests</li>
            <li>To detect, prevent, and address technical issues or abuse</li>
            <li>To analyze usage patterns and optimize our service</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4 mt-6">Data Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal data against unauthorized access,
            alteration, disclosure, or destruction. All recordings and transcriptions are encrypted both in transit and
            at rest.
          </p>

          <h2 className="text-xl font-semibold mb-4 mt-6">Your Rights</h2>
          <p className="mb-3">You have the following rights regarding your data:</p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>The right to access the personal data we hold about you</li>
            <li>The right to request correction of inaccurate data</li>
            <li>The right to request deletion of your data</li>
            <li>The right to restrict or object to processing of your data</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent at any time</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4 mt-6">Data Retention</h2>
          <p className="mb-4">
            We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy
            Policy. When you delete your account, we will delete or anonymize your personal data within 30 days, except
            where we are legally required to retain certain information.
          </p>

          <h2 className="text-xl font-semibold mb-4 mt-6">Third-Party Services</h2>
          <p className="mb-4">
            We may employ third-party companies and individuals to facilitate our service, provide the service on our
            behalf, or assist us in analyzing how our service is used. These third parties have access to your personal
            data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other
            purpose.
          </p>

          <h2 className="text-xl font-semibold mb-4 mt-6">Changes to This Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <h2 className="text-xl font-semibold mb-4 mt-6">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            <a href="mailto:privacy@voicenoteai.com" className="text-blue-500">
              privacy@voicenoteai.com
            </a>
          </p>

          <p className="text-sm text-neutral-500 mt-8">Last Updated: May 10, 2025</p>
        </div>
      </div>
    </div>
  )
}
