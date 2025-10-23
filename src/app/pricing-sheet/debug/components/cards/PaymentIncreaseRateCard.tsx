interface PaymentIncreaseRateCardProps {
  rates: {
    PAYMENT_INCREASE_RATE: number
  }
  onRateChange: (field: string, value: number) => void
}

export default function PaymentIncreaseRateCard({ rates, onRateChange }: PaymentIncreaseRateCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="text-sm font-semibold mb-3 text-gray-800">Payment Increase Rate</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Annual Increase</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="0.001"
              min="0"
              max="0.10"
              value={rates.PAYMENT_INCREASE_RATE}
              onChange={(e) => onRateChange('PAYMENT_INCREASE_RATE', parseFloat(e.target.value) || 0)}
              className="w-20 text-sm bg-white border border-gray-300 rounded px-2 py-1"
            />
            <span className="text-sm text-gray-500">%</span>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Annual rate at which payments increase over time
        </div>
      </div>
    </div>
  )
}

