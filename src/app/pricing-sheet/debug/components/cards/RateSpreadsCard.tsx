interface RateSpreadsCardProps {
  rates: {
    RATE_SPREADS: { min: number; max: number }
  }
  onRateChange: (field: string, value: { min: number; max: number }) => void
}

export default function RateSpreadsCard({ rates, onRateChange }: RateSpreadsCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="text-sm font-semibold mb-3 text-gray-800">Rate Spreads</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Min Spread</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="0.001"
              value={rates.RATE_SPREADS.min}
              onChange={(e) => onRateChange('RATE_SPREADS', { ...rates.RATE_SPREADS, min: parseFloat(e.target.value) || 0 })}
              className="w-20 text-sm bg-white border border-gray-300 rounded px-2 py-1"
            />
            <span className="text-sm text-gray-500">%</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Max Spread</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="0.001"
              value={rates.RATE_SPREADS.max}
              onChange={(e) => onRateChange('RATE_SPREADS', { ...rates.RATE_SPREADS, max: parseFloat(e.target.value) || 0 })}
              className="w-20 text-sm bg-white border border-gray-300 rounded px-2 py-1"
            />
            <span className="text-sm text-gray-500">%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

