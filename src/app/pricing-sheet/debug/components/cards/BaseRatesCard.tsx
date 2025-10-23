interface BaseRatesCardProps {
  rates: {
    BASE_DISCOUNT_RATE: number
    BASE_DISCOUNT_RATE_LCP: number
  }
  onRateChange: (field: string, value: number) => void
}

export default function BaseRatesCard({ rates, onRateChange }: BaseRatesCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="text-sm font-semibold mb-3 text-gray-800">Base Discount Rates</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Guaranteed</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="0.001"
              value={rates.BASE_DISCOUNT_RATE}
              onChange={(e) => onRateChange('BASE_DISCOUNT_RATE', parseFloat(e.target.value) || 0)}
              className="w-20 text-sm bg-white border border-gray-300 rounded px-2 py-1"
            />
            <span className="text-sm text-gray-500">%</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Life Contingent</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="0.001"
              value={rates.BASE_DISCOUNT_RATE_LCP}
              onChange={(e) => onRateChange('BASE_DISCOUNT_RATE_LCP', parseFloat(e.target.value) || 0)}
              className="w-20 text-sm bg-white border border-gray-300 rounded px-2 py-1"
            />
            <span className="text-sm text-gray-500">%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

