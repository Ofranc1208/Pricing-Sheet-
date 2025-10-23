interface RiskAdjustmentsProps {
  inputs: {
    paymentType: string
  }
  riskAdjustments: {
    baseRate: number
    genderAdjustment: number
    ageAdjustment: number
    totalRiskAdjustment: number
    adjustedRate: number
    lcpKeys: string[]
  }
}

export default function RiskAdjustments({ inputs, riskAdjustments }: RiskAdjustmentsProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">⚠️ Risk Adjustments</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="text-sm text-gray-600">Base Rate ({inputs.paymentType})</span>
            <span className="font-mono font-medium">{(riskAdjustments.baseRate * 100).toFixed(2)}%</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
            <span className="text-sm text-gray-600">Gender Adjustment</span>
            <span className="font-mono font-medium text-blue-600">+{(riskAdjustments.genderAdjustment * 100).toFixed(2)}%</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-50 rounded">
            <span className="text-sm text-gray-600">Age Adjustment</span>
            <span className="font-mono font-medium text-green-600">+{(riskAdjustments.ageAdjustment * 100).toFixed(2)}%</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
            <span className="text-sm text-gray-600">Total Risk Adjustment</span>
            <span className="font-mono font-medium text-orange-600">+{(riskAdjustments.totalRiskAdjustment * 100).toFixed(2)}%</span>
          </div>
        </div>

        <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-200">
          <span className="font-semibold text-gray-800">Final Adjusted Rate</span>
          <span className="font-mono text-xl font-bold text-red-600">{(riskAdjustments.adjustedRate * 100).toFixed(2)}%</span>
        </div>

        {riskAdjustments.lcpKeys.length > 0 && (
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-2 font-medium">LCP Keys Used:</div>
            <div className="font-mono text-sm bg-white p-2 rounded border">{riskAdjustments.lcpKeys.join(', ')}</div>
          </div>
        )}
      </div>
    </div>
  )
}

