interface NPVConfigProps {
  npvConfig: {
    baseDiscountRate: number
    baseDiscountRateLCP: number
    familyProtectionRate: number
    minRateSpread: number
    maxRateSpread: number
    minAmountAdjustment: number
    maxAmountAdjustment: number
  }
  isRuntimeConfig?: boolean
}

export default function NPVConfig({ npvConfig, isRuntimeConfig = false }: NPVConfigProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">⚙️ NPV Configuration</h2>
        {isRuntimeConfig && (
          <span className="text-xs bg-green-600 text-white px-2 py-1 rounded animate-pulse">
            Active Runtime
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded">
          <div className="text-gray-600 text-sm mb-1">Base Rate (GP)</div>
          <div className="font-mono font-medium">{(npvConfig.baseDiscountRate * 100).toFixed(2)}%</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded">
          <div className="text-gray-600 text-sm mb-1">Base Rate (LCP)</div>
          <div className="font-mono font-medium">{(npvConfig.baseDiscountRateLCP * 100).toFixed(2)}%</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded">
          <div className="text-gray-600 text-sm mb-1">Family Protection</div>
          <div className="font-mono font-medium">{(npvConfig.familyProtectionRate * 100).toFixed(2)}%</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded">
          <div className="text-gray-600 text-sm mb-1">Min Spread</div>
          <div className="font-mono font-medium text-green-600">+{(npvConfig.minRateSpread * 100).toFixed(2)}%</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded">
          <div className="text-gray-600 text-sm mb-1">Max Spread</div>
          <div className="font-mono font-medium text-red-600">+{(npvConfig.maxRateSpread * 100).toFixed(2)}%</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded">
          <div className="text-gray-600 text-sm mb-1">Min Adjustment</div>
          <div className="font-mono font-medium text-blue-600">-${npvConfig.minAmountAdjustment.toLocaleString()}</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded">
          <div className="text-gray-600 text-sm mb-1">Max Adjustment</div>
          <div className="font-mono font-medium text-purple-600">-${npvConfig.maxAmountAdjustment.toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}

