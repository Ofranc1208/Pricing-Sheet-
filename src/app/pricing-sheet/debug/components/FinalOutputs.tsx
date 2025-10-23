interface FinalOutputsProps {
  outputs: {
    lowRange: number
    highRange: number
    deathBenefits: number
    discountFromTotal: {
      lowRangeDiscount: string
      highRangeDiscount: string
      deathBenefitDiscount: string
    }
  }
}

export default function FinalOutputs({ outputs }: FinalOutputsProps) {
  return (
    <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-white">💰 Final Calculated Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm border border-white border-opacity-20">
          <div className="text-white text-sm mb-2 font-medium">Low Range (Conservative)</div>
          <div className="text-4xl font-bold text-green-300 mb-3">${outputs.lowRange.toFixed(2)}</div>
          <div className="text-sm text-green-100">Discount: {outputs.discountFromTotal.lowRangeDiscount}</div>
        </div>
        <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm border border-white border-opacity-20">
          <div className="text-white text-sm mb-2 font-medium">High Range (Aggressive)</div>
          <div className="text-4xl font-bold text-blue-300 mb-3">${outputs.highRange.toFixed(2)}</div>
          <div className="text-sm text-blue-100">Discount: {outputs.discountFromTotal.highRangeDiscount}</div>
        </div>
        <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm border border-white border-opacity-20">
          <div className="text-white text-sm mb-2 font-medium">Death Benefits</div>
          <div className="text-4xl font-bold text-purple-300 mb-3">${outputs.deathBenefits.toFixed(2)}</div>
          <div className="text-sm text-purple-100">Discount: {outputs.discountFromTotal.deathBenefitDiscount}</div>
        </div>
      </div>
    </div>
  )
}

