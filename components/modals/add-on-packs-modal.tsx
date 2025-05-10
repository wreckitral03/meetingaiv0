"use client"

import { X, Coffee, Package, Zap, Check, Star, CreditCard } from "lucide-react"
import { useState } from "react"

export default function AddOnPacksModal({ onClose }: { onClose: () => void }) {
  const [selectedPack, setSelectedPack] = useState<string | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const packs = [
    {
      id: "lite",
      name: "Lite Pack",
      price: "Rp 18.000",
      minutes: 60,
      costPerMinute: "Rp 300",
      description: "For 1 cup of coffee, save an hour.",
      icon: Coffee,
      color: "blue",
      highlight: false,
    },
    {
      id: "regular",
      name: "Regular Pack",
      price: "Rp 30.000",
      minutes: 120,
      costPerMinute: "Rp 250",
      description: "Good balance for moderate users.",
      icon: Package,
      color: "purple",
      highlight: false,
    },
    {
      id: "power",
      name: "Power Pack",
      price: "Rp 49.000",
      minutes: 250,
      costPerMinute: "Rp 196",
      description: "Best value for heavy users.",
      icon: Zap,
      color: "orange",
      highlight: true,
    },
  ]

  const handlePackSelect = (packId: string) => {
    setSelectedPack(packId)
  }

  const handleContinueToPayment = () => {
    setShowPaymentModal(true)
  }

  const selectedPackData = packs.find((pack) => pack.id === selectedPack)

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
        <div className="bg-white rounded-2xl w-full max-w-md overflow-auto max-h-[90vh]">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Add-On Minute Packs</h2>
              <button onClick={onClose} className="p-1 rounded-full active:bg-neutral-100 transition-colors">
                <X size={24} />
              </button>
            </div>

            <p className="text-neutral-600 mb-6">
              Purchase additional minutes to transcribe and analyze more meetings.
            </p>

            <div className="space-y-6">
              {packs.map((pack) => {
                const IconComponent = pack.icon
                const isSelected = selectedPack === pack.id

                // Determine background colors based on pack color and selection state
                const bgColor = isSelected
                  ? "bg-blue-50 border-blue-300"
                  : pack.color === "blue"
                    ? "bg-blue-50 border-blue-200"
                    : pack.color === "purple"
                      ? "bg-purple-50 border-purple-200"
                      : "bg-orange-50 border-orange-200"

                const iconBg =
                  pack.color === "blue"
                    ? "bg-blue-100 text-blue-600"
                    : pack.color === "purple"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-orange-100 text-orange-600"

                return (
                  <div
                    key={pack.id}
                    className={`border rounded-xl p-6 ${bgColor} ${
                      isSelected
                        ? "ring-2 ring-blue-500 transform scale-[1.02] shadow-md"
                        : pack.highlight
                          ? "ring-2 ring-orange-300 shadow-md"
                          : "shadow-sm"
                    } cursor-pointer transition-all duration-300`}
                    onClick={() => handlePackSelect(pack.id)}
                  >
                    <div className="flex items-start">
                      <div
                        className={`w-14 h-14 rounded-full ${iconBg} flex items-center justify-center mr-4 flex-shrink-0 shadow-sm`}
                      >
                        <IconComponent size={26} />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-bold">{pack.name}</h3>
                          {pack.highlight && !isSelected && (
                            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs px-3 py-1 rounded-full flex items-center shadow-sm">
                              <Star size={12} className="mr-1" />
                              Best Deal
                            </div>
                          )}
                          {isSelected && (
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                              <Check size={14} className="text-white" />
                            </div>
                          )}
                        </div>

                        <p className="text-neutral-600 text-sm mb-4">{pack.description}</p>

                        <div className="bg-white bg-opacity-70 p-4 rounded-xl shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl font-bold">{pack.price}</span>
                            <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
                              <span className="text-blue-700 font-medium">{pack.minutes} minutes</span>
                            </div>
                          </div>
                          <div className="text-xs text-neutral-500 text-right">{pack.costPerMinute} per minute</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {selectedPack && (
              <button
                onClick={handleContinueToPayment}
                className="w-full mt-6 py-3 bg-blue-500 text-white rounded-xl font-medium flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors"
              >
                <CreditCard size={18} className="mr-2" />
                Continue to Payment
              </button>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
              <p className="text-sm text-blue-700">Minutes are added to your account immediately and never expire.</p>
            </div>
          </div>
        </div>
      </div>

      {showPaymentModal && selectedPackData && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          packName={selectedPackData.name}
          amount={selectedPackData.price}
          minutes={selectedPackData.minutes}
        />
      )}
    </>
  )
}

function PaymentModal({
  onClose,
  packName,
  amount,
  minutes,
}: {
  onClose: () => void
  packName: string
  amount: string
  minutes: number
}) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      onClose()
      // Show success message or redirect
      alert(`Payment successful! ${minutes} minutes have been added to your account.`)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[70]">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Complete Your Purchase</h2>
            <button onClick={onClose} className="p-1 rounded-full active:bg-neutral-100 transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-neutral-700">Pack</span>
              <span className="font-medium">{packName}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-neutral-700">Minutes</span>
              <span className="font-medium">{minutes} minutes</span>
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
