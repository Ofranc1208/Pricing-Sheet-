import InputSummary from './InputSummary'
import RiskAdjustments from './RiskAdjustments'
import NPVConfig from './NPVConfig'
import FinalOutputs from './FinalOutputs'
import {
  BASE_DISCOUNT_RATE,
  BASE_DISCOUNT_RATE_LCP,
  FAMILY_PROTECTION_DISCOUNT_RATE,
  RATE_SPREADS,
  AMOUNT_ADJUSTMENTS,
  adjustmentMap
} from '../../../../../npvConfig'
import { getRuntimeConfig } from '../runtimeConfig'

interface CalculationBreakdownProps {
  calculationBreakdown: {
    inputs: {
      gender: string
      age: number
      ageBand: string
      paymentType: string
      paymentAmount: number
      startDate: string
      endDate: string
      years: number
      totalPayments: number
      totalPaymentAmount: number
    }
    riskAdjustments: {
      baseRate: number
      genderAdjustment: number
      ageAdjustment: number
      totalRiskAdjustment: number
      adjustedRate: number
      lcpKeys: string[]
    }
    npvConfig: {
      baseDiscountRate: number
      baseDiscountRateLCP: number
      familyProtectionRate: number
      minRateSpread: number
      maxRateSpread: number
      minAmountAdjustment: number
      maxAmountAdjustment: number
    }
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
}

export default function CalculationBreakdown({ calculationBreakdown }: CalculationBreakdownProps) {
  const runtimeConfig = getRuntimeConfig()
  const fileConfig = {
    baseDiscountRate: BASE_DISCOUNT_RATE,
    baseDiscountRateLCP: BASE_DISCOUNT_RATE_LCP,
    familyProtectionRate: FAMILY_PROTECTION_DISCOUNT_RATE,
    minRateSpread: RATE_SPREADS.min,
    maxRateSpread: RATE_SPREADS.max,
    minAmountAdjustment: AMOUNT_ADJUSTMENTS.min,
    maxAmountAdjustment: AMOUNT_ADJUSTMENTS.max
  }

  const isRuntimeDifferent = JSON.stringify(runtimeConfig) !== JSON.stringify(fileConfig)

  return (
    <div className="space-y-6">
      <InputSummary inputs={calculationBreakdown.inputs} />
      <RiskAdjustments
        inputs={{ paymentType: calculationBreakdown.inputs.paymentType }}
        riskAdjustments={calculationBreakdown.riskAdjustments}
      />

      {/* File Config */}
      <NPVConfig npvConfig={fileConfig} />

      {/* Runtime Config (if different) */}
      {isRuntimeDifferent && (
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-green-400">⚡ Active Runtime Configuration</h2>
            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded animate-pulse">
              Active
            </span>
          </div>
          <div className="text-sm text-gray-300 mb-4 p-3 bg-gray-700 rounded">
            <strong>Note:</strong> Runtime configuration overrides file values for calculations.
            Changes persist in browser storage until reset.
          </div>
          <NPVConfig npvConfig={runtimeConfig} isRuntimeConfig={true} />
        </div>
      )}

      <FinalOutputs outputs={calculationBreakdown.outputs} />
    </div>
  )
}

