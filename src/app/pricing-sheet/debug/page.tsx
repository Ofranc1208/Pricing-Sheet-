'use client'

import { useState, useEffect } from 'react'
import './debug.css'
import {
  InputForm,
  CalculationBreakdown,
  RateControls
} from './components'
import {
  getRiskAdjustment,
  getLCPKeys,
  getAgeBand,
  getBaseDiscountRate,
  calculateMinMaxOffers,
  calculateDeathBenefits
} from '../services/calculators'
import {
  getRuntimeConfig,
  updateRuntimeConfig,
  resetRuntimeConfig,
  type RuntimeConfig
} from './runtimeConfig'
import {
  BASE_DISCOUNT_RATE,
  BASE_DISCOUNT_RATE_LCP,
  FAMILY_PROTECTION_DISCOUNT_RATE,
  RATE_SPREADS,
  AMOUNT_ADJUSTMENTS,
  adjustmentMap
} from '../../../../npvConfig'

export default function DebugCalculations() {
  const [inputs, setInputs] = useState({
    gender: 'male',
    age: '40',
    paymentType: 'LCP',
    paymentFrequency: 'Monthly',
    paymentAmount: '4090.86',
    annualIncrease: '0',
    startDate: '2025-05-01',
    endDate: '2054-05-01',
    firstName: 'John',
    lastName: 'Doe',
    insuranceCompany: 'Sample Insurance'
  })

  const [runtimeConfig, setRuntimeConfig] = useState<RuntimeConfig>(getRuntimeConfig())
  const [calculationBreakdown, setCalculationBreakdown] = useState<any>(null)

  // Update runtime config when rates change
  const handleRatesChange = (newRates: RuntimeConfig) => {
    setRuntimeConfig(newRates)
    updateRuntimeConfig(newRates)
  }

  // Reset rates to defaults
  const handleResetRates = () => {
    resetRuntimeConfig()
    setRuntimeConfig(getRuntimeConfig())
  }

  const runCalculation = () => {
    const age = parseInt(inputs.age)
    const amount = parseFloat(inputs.paymentAmount)

    // Step 1: Get base rate
    const baseRate = getBaseDiscountRate(inputs.paymentType)

    // Step 2: Get risk adjustment (GP should have NO risk adjustment)
    const riskAdjustment = inputs.paymentType === 'GP' ? 0 : getRiskAdjustment(age, inputs.gender)

    // Step 3: Calculate adjusted rate
    const adjustedRate = baseRate + riskAdjustment

    // Step 4: Get LCP keys
    const lcpKeys = inputs.paymentType === 'LCP' ? getLCPKeys(age, inputs.gender) : []

    // Step 5: Get age band
    const ageBand = getAgeBand(age)

    // Step 6: Calculate min/max offers
    const { minOffer, maxOffer } = calculateMinMaxOffers(
      amount,
      inputs.startDate,
      inputs.endDate,
      adjustedRate,
      inputs.paymentType,
      lcpKeys,
      inputs.paymentFrequency,
      parseFloat(inputs.annualIncrease) || 0
    )

    // Step 7: Calculate death benefits (GP should have NO death benefits)
    const deathBenefit = inputs.paymentType === 'GP' ? 0 : calculateDeathBenefits(
      amount,
      inputs.startDate,
      inputs.endDate,
      inputs.paymentFrequency,
      parseFloat(inputs.annualIncrease) || 0
    )

    // Calculate number of years
    const startYear = new Date(inputs.startDate).getFullYear()
    const endYear = new Date(inputs.endDate).getFullYear()
    const years = endYear - startYear

    // Calculate number of payments (monthly)
    const totalPayments = years * 12
    const totalPaymentAmount = amount * totalPayments

    setCalculationBreakdown({
      // Input Summary
      inputs: {
        gender: inputs.gender,
        age: age,
        ageBand: ageBand,
        paymentType: inputs.paymentType,
        paymentAmount: amount,
        startDate: inputs.startDate,
        endDate: inputs.endDate,
        years: years,
        totalPayments: totalPayments,
        totalPaymentAmount: totalPaymentAmount
      },

      // Risk Adjustments
      riskAdjustments: {
        baseRate: baseRate,
        genderAdjustment: runtimeConfig.adjustmentMap[`gender-${inputs.gender}`] || 0,
        ageAdjustment: runtimeConfig.adjustmentMap[`age-${ageBand}`] || 0,
        totalRiskAdjustment: riskAdjustment,
        adjustedRate: adjustedRate,
        lcpKeys: lcpKeys
      },

      // NPV Configuration
      npvConfig: {
        baseDiscountRate: runtimeConfig.BASE_DISCOUNT_RATE,
        baseDiscountRateLCP: runtimeConfig.BASE_DISCOUNT_RATE_LCP,
        familyProtectionRate: runtimeConfig.FAMILY_PROTECTION_DISCOUNT_RATE,
        minRateSpread: runtimeConfig.RATE_SPREADS.min,
        maxRateSpread: runtimeConfig.RATE_SPREADS.max,
        minAmountAdjustment: runtimeConfig.AMOUNT_ADJUSTMENTS.min,
        maxAmountAdjustment: runtimeConfig.AMOUNT_ADJUSTMENTS.max
      },

      // Final Calculations
      outputs: {
        lowRange: minOffer,
        highRange: maxOffer,
        deathBenefits: deathBenefit,
        discountFromTotal: {
          lowRangeDiscount: ((totalPaymentAmount - minOffer) / totalPaymentAmount * 100).toFixed(2) + '%',
          highRangeDiscount: ((totalPaymentAmount - maxOffer) / totalPaymentAmount * 100).toFixed(2) + '%',
          deathBenefitDiscount: ((totalPaymentAmount - deathBenefit) / totalPaymentAmount * 100).toFixed(2) + '%'
        }
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header with Back Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">🔍 NPV Calculation Debugger</h1>
          <a
            href="/pricing-sheet"
            className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors shadow-sm"
          >
            ← Back to Pricing Sheet
          </a>
        </div>

        <RateControls
          onRatesChange={handleRatesChange}
          currentRates={runtimeConfig}
        />

        <InputForm
          inputs={inputs}
          onInputsChange={setInputs}
          onCalculate={runCalculation}
        />

        {calculationBreakdown && (
          <CalculationBreakdown calculationBreakdown={calculationBreakdown} />
        )}
      </div>
    </div>
  )
}

