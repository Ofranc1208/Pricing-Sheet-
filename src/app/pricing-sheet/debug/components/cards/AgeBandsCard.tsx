interface AgeBandsCardProps {
  rates: {
    adjustmentMap: Record<string, number>
  }
  onRateChange: (field: string, value: Record<string, number>) => void
}

export default function AgeBandsCard({ rates, onRateChange }: AgeBandsCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="text-sm font-semibold mb-3 text-gray-800">Age Band Adjustments</h3>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(rates.adjustmentMap)
          .filter(([key]) => key.startsWith('age-'))
          .map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-xs text-gray-600">{key.replace('age-', '')}</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  step="0.001"
                  value={value}
                  onChange={(e) => onRateChange('adjustmentMap', {
                    ...rates.adjustmentMap,
                    [key]: parseFloat(e.target.value) || 0
                  })}
                  className="w-16 text-xs bg-white border border-gray-300 rounded px-1 py-1"
                />
                <span className="text-xs text-gray-500">%</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

