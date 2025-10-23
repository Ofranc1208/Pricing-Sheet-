interface AmountAdjustmentsCardProps {
  rates: {
    AMOUNT_ADJUSTMENTS: { min: number; max: number }
  }
  onRateChange: (field: string, value: { min: number; max: number }) => void
}

export default function AmountAdjustmentsCard({ rates, onRateChange }: AmountAdjustmentsCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="text-sm font-semibold mb-3 text-gray-800">Amount Adjustments</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Min Adjustment</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">$</span>
            <input
              type="number"
              step="100"
              value={rates.AMOUNT_ADJUSTMENTS.min}
              onChange={(e) => onRateChange('AMOUNT_ADJUSTMENTS', { ...rates.AMOUNT_ADJUSTMENTS, min: parseFloat(e.target.value) || 0 })}
              className="w-24 text-sm bg-white border border-gray-300 rounded px-2 py-1"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Max Adjustment</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">$</span>
            <input
              type="number"
              step="100"
              value={rates.AMOUNT_ADJUSTMENTS.max}
              onChange={(e) => onRateChange('AMOUNT_ADJUSTMENTS', { ...rates.AMOUNT_ADJUSTMENTS, max: parseFloat(e.target.value) || 0 })}
              className="w-24 text-sm bg-white border border-gray-300 rounded px-2 py-1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

