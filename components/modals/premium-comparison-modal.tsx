"use client"

import { X, Check, Star, CreditCard } from "lucide-react"
import { useState } from "react"
import AddOnPacksModal from "./add-on-packs-modal"

export default function PremiumComparisonModal({ onClose }: { onClose: () => void }) {
  const [showAddOnModal, setShowAddOnModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const plans = [
    {
      id: "free",
      name: "Free Plan",
      price: "Rp 0",
      color: "green",
      features: [
        { name: "AI Minutes", value: "30 minutes/month" },
        { name: "Meeting History", value: "3 latest meetings" },
        { name: "Export", value: "Manual copy" },
        { name: "Editable Summaries", value: "Not available" },
        { name: "Languages", value: "1 UI + summary language" },
        { name: "AI Meeting Score", value: true },
        { name: "AI Chat", value: false },
        { name: "Device Sync", value: "1 device" },
        { name: "Support", value: "Community" },
      ],
    },
    {
      id: "standard",
      name: "Standard Plan",
      label: "Decoy",
      price: "Rp 39.000/month",
      color: "yellow",
      features: [
        { name: "AI Minutes", value: "100 minutes" },
        { name: "Meeting History", value: "10 meetings" },
        { name: "Export", value: ".txt only" },
        { name: "Editable Summaries", value: "Partial" },
        { name: "Languages", value: "2 languages" },
        { name: "AI Meeting Score", value: true },
        { name: "AI Chat", value: "Limited" },
        { name: "Device Sync", value: "2 devices" },
        { name: "Support", value: "Standard" },
      ],
    },
    {
      id: "premium",
      name: "Premium Plan",
      label: "Best Value",
      price: "Rp 79.000",
      discountPrice: "Rp 59.000/month",
      color: "orange",
      features: [
        { name: "AI Minutes", value: "300 minutes + 20 bonus" },
        { name: "Meeting History", value: "Unlimited" },
        { name: "Export", value: "PDF + .txt" },
        { name: "Editable Summaries", value: "Full with versioning" },
        { name: "Languages", value: "Unlimited" },
        { name: "AI Meeting Score", value: true },
        { name: "AI Chat", value: "Full Access" },
        { name: "Device Sync", value: "3 devices" },
        { name: "Support", value: "Priority" },
      ],
    },
  ]

  const handleOpenAddOnModal = () => {
    setShowAddOnModal(true)
  }

  const handleCloseAddOnModal = () => {
    setShowAddOnModal(false)
  }

  const handlePlanSelect = (planId: string) => {
    if (planId === "free") {
      // Free plan doesn't need selection
      return
    }
    setSelectedPlan(planId)
  }

  const handleContinueToPayment = () => {
    setShowPaymentModal(true)
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-md overflow-auto max-h-[90vh]">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Choose Your Plan</h2>
              <button onClick={onClose} className="p-1 rounded-full active:bg-neutral-100 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`border rounded-xl p-5 relative shadow-sm cursor-pointer transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? "ring-2 ring-blue-500 transform scale-[1.02]"
                      : plan.name === "Premium Plan"
                        ? "border-orange-300 bg-orange-50 shadow-orange-100"
                        : plan.name === "Standard Plan"
                          ? "border-neutral-200 bg-neutral-50 opacity-80"
                          : "border-green-300 bg-green-50"
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {plan.label && (
                    <div
                      className={`absolute -top-3 -right-3 ${
                        plan.label === "Best Value"
                          ? "bg-gradient-to-r from-orange-500 to-yellow-500"
                          : "bg-neutral-400"
                      } text-white text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-md`}
                    >
                      {plan.label === "Best Value" && <Star size={12} className="mr-1" />}
                      {plan.label}
                    </div>
                  )}

                  <h3
                    className={`text-xl font-bold ${
                      plan.color === "green"
                        ? "text-green-600"
                        : plan.color === "yellow"
                          ? "text-yellow-600"
                          : "text-orange-600"
                    }`}
                  >
                    {plan.name}
                  </h3>

                  <div className="mt-2 mb-4">
                    {plan.discountPrice ? (
                      <div>
                        <span className="text-lg font-bold line-through text-neutral-400">{plan.price}</span>
                        <span className="text-2xl font-bold ml-2">{plan.discountPrice}</span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold">{plan.price}</span>
                    )}
                  </div>

                  <div className="space-y-3 mt-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        {typeof feature.value === "boolean" ? (
                          feature.value ? (
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                              <Check size={14} className="text-green-600" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
                              <X size={14} className="text-red-600" />
                            </div>
                          )
                        ) : (
                          <div className="w-5 h-5 mr-3 flex-shrink-0" />
                        )}
                        <div className="flex justify-between w-full">
                          <span className="text-neutral-700">{feature.name}</span>
                          <span className="font-medium">{typeof feature.value === "boolean" ? "" : feature.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {plan.id !== "free" && selectedPlan === plan.id && (
                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {selectedPlan && (
              <button
                onClick={handleContinueToPayment}
                className="w-full mt-6 py-3 bg-blue-500 text-white rounded-xl font-medium flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors"
              >
                <CreditCard size={18} className="mr-2" />
                Continue to Payment
              </button>
            )}

            <button
              onClick={handleOpenAddOnModal}
              className="w-full mt-4 py-3 border border-blue-300 rounded-xl text-blue-600 font-medium bg-blue-50 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
            >
              Need more minutes? View Add-On Packs
            </button>
          </div>
        </div>
      </div>

      {showAddOnModal && <AddOnPacksModal onClose={handleCloseAddOnModal} />}
      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          planId={selectedPlan || ""}
          planName={plans.find((p) => p.id === selectedPlan)?.name || ""}
          amount={selectedPlan === "premium" ? "Rp 59.000" : selectedPlan === "standard" ? "Rp 39.000" : "Rp 0"}
        />
      )}
    </>
  )
}

function PaymentModal({
  onClose,
  planId,
  planName,
  amount,
}: {
  onClose: () => void
  planId: string
  planName: string
  amount: string
}) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      onClose()
      // Show success message or redirect
      alert(`Payment successful! You are now subscribed to ${planName}`)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[70]">
      <div className="bg-white rounded-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Complete Your Purchase</h2>
            <button onClick={onClose} className="p-1 rounded-full active:bg-neutral-100 transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-neutral-700">Plan</span>
              <span className="font-medium">{planName}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-neutral-700">Billing</span>
              <span className="font-medium">Monthly</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-blue-200">
              <span className="text-neutral-700 font-medium">Total</span>
              <span className="text-xl font-bold">{amount}</span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Card Number</label>
              <input type="text" placeholder="1234 5678 9012 3456" className="input" maxLength={19} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Expiry Date</label>
                <input type="text" placeholder="MM/YY" className="input" maxLength={5} />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">CVC</label>
                <input type="text" placeholder="123" className="input" maxLength={3} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Cardholder Name</label>
              <input type="text" placeholder="John Doe" className="input" />
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors disabled:opacity-70"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCard size={18} className="mr-2" />
                Pay {amount}
              </>
            )}
          </button>

          <p className="text-xs text-neutral-500 text-center mt-4">
            Your payment is secure and encrypted. By proceeding, you agree to our Terms of Service.
          </p>
        </div>
      </div>
    </div>
  )
}
