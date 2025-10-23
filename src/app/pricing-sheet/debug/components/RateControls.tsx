'use client'

import { useState } from 'react'
import { getRuntimeConfig } from '../runtimeConfig'
import type { RuntimeConfig } from '../runtimeConfig'
import {
  BaseRatesCard,
  RateSpreadsCard,
  AmountAdjustmentsCard,
  FamilyProtectionCard,
  GenderAdjustmentsCard,
  AgeBandsCard,
  PaymentFrequencyCard,
  PaymentIncreaseRateCard
} from './cards'

interface RateControlsProps {
  onRatesChange: (rates: RuntimeConfig) => void
  currentRates: RuntimeConfig
}

export default function RateControls({ onRatesChange, currentRates }: RateControlsProps) {
  const [localRates, setLocalRates] = useState(currentRates)

  const handleRateChange = (field: string, value: string | number | any) => {
    if (field === 'adjustmentMap') {
      const newRates = {
        ...localRates,
        adjustmentMap: value as Record<string, number>
      }
      setLocalRates(newRates)
      onRatesChange(newRates)
    } else {
      const newRates = { ...localRates, [field]: value }
      setLocalRates(newRates)
      onRatesChange(newRates)
    }
  }

  const resetToDefaults = () => {
    const defaultRates = getRuntimeConfig()
    setLocalRates(defaultRates)
    onRatesChange(defaultRates)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">🎛️ NPV Rate Control Dashboard</h2>
        <button
          onClick={resetToDefaults}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
        >
          Reset to Defaults
        </button>
      </div>

      {/* Organized Cards Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <BaseRatesCard rates={localRates} onRateChange={handleRateChange} />
        <RateSpreadsCard rates={localRates} onRateChange={handleRateChange} />
        <AmountAdjustmentsCard rates={localRates} onRateChange={handleRateChange} />
        <FamilyProtectionCard rates={localRates} onRateChange={handleRateChange} />
        <GenderAdjustmentsCard rates={localRates} onRateChange={handleRateChange} />
        <AgeBandsCard rates={localRates} onRateChange={handleRateChange} />
        <PaymentFrequencyCard rates={localRates} onRateChange={handleRateChange} />
        <PaymentIncreaseRateCard rates={localRates} onRateChange={handleRateChange} />
      </div>

      {/* Info Note */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-sm text-blue-800">
          <strong>Note:</strong> Changes affect calculations immediately. Consider saving to npvConfig.ts for permanent changes.
        </div>
      </div>
    </div>
  )
}

