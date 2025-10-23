interface GenderAdjustmentsCardProps {
  rates: {
    adjustmentMap: Record<string, number>
  }
  onRateChange: (field: string, value: Record<string, number>) => void
}

export default function GenderAdjustmentsCard({ rates, onRateChange }: GenderAdjustmentsCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="text-sm font-semibold mb-3 text-gray-800">Gender Adjustments</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Male</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="0.001"
              value={rates.adjustmentMap['gender-male']}
              onChange={(e) => onRateChange('adjustmentMap', {
                ...rates.adjustmentMap,
                'gender-male': parseFloat(e.target.value) || 0
              })}
              className="w-20 text-sm bg-white border border-gray-300 rounded px-2 py-1"
            />
            <span className="text-sm text-gray-500">%</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Female</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="0.001"
              value={rates.adjustmentMap['gender-female']}
              onChange={(e) => onRateChange('adjustmentMap', {
                ...rates.adjustmentMap,
                'gender-female': parseFloat(e.target.value) || 0
              })}
              className="w-20 text-sm bg-white border border-gray-300 rounded px-2 py-1"
            />
            <span className="text-sm text-gray-500">%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

