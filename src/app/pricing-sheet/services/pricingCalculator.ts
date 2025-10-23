// ========================================
// 🎯 Pricing Calculator Orchestrator
// ========================================
// Lightweight orchestrator that coordinates all pricing calculations
// by delegating to specialized calculator modules

import type { PricingRow } from '../pricing-fields'
import {
  isValidInputRow,
  getLCPKeys,
  getRiskAdjustment,
  calculateMinMaxOffers,
  getBaseDiscountRate,
  calculatePaymentCount,
  calculateDeathBenefitMaxPV
} from './calculators'

// ========================================
// 📊 Output Interface
// ========================================

export interface CalculatedOutputs {
  paymentCount: string
  lowRange: string
  highRange: string
  deathBenefits: string
}

// ========================================
// 🎯 Main Calculation Function
// ========================================

/**
 * Calculate all output values for a pricing row
 * This is the main orchestrator function that coordinates:
 * 1. Input validation
 * 2. Risk adjustment calculation
 * 3. Min/Max NPV calculation (Low Range, High Range)
 * 4. Death Benefits calculation (Family Protection)
 * 
 * @param row - The pricing row with input data
 * @returns Calculated low range, high range, and death benefits
 */
export function calculatePricingOutputs(row: PricingRow): CalculatedOutputs {
  // Step 1: Validate input
  if (!isValidInputRow(row)) {
    return {
      paymentCount: '',
      lowRange: '',
      highRange: '',
      deathBenefits: ''
    }
  }

  // Step 2: Extract and parse input data
  const paymentType = row.typeOfPayment
  const age = parseInt(row.age)
  const gender = row.gender
  const paymentAmount = parseFloat(row.paymentAmount)
  const startDate = row.paymentStartDate
  const endDate = row.paymentEndDate

  try {
    // Step 3: Calculate risk-adjusted discount rate
    // GP (Guaranteed Payments) should NOT have age/gender risk adjustments
    const baseRate = getBaseDiscountRate(paymentType)
    const riskAdjustment = paymentType === 'GP' ? 0 : getRiskAdjustment(age, gender)
    const adjustedRate = baseRate + riskAdjustment

    // Step 4: Get LCP keys for life-contingent payments
    const lcpKeys = paymentType === 'LCP' ? getLCPKeys(age, gender) : []

    // Step 5: Calculate Min/Max offers (Low Range, High Range)
    const { minOffer, maxOffer } = calculateMinMaxOffers(
      paymentAmount,
      startDate,
      endDate,
      adjustedRate,
      paymentType,
      lcpKeys,
      row.paymentFrequency,
      parseFloat(row.annualIncrease) || 0
    )

    // Step 6: Calculate Death Benefits (Family Protection) using Max PV exposure
    const deathBenefitValue = paymentType === 'GP' ? 0 : calculateDeathBenefitMaxPV(
      paymentAmount,
      startDate,
      endDate,
      row.paymentFrequency,
      parseFloat(row.annualIncrease) || 0
    )

    // Step 7: Calculate payment count
    const paymentCount = calculatePaymentCount(
      startDate,
      endDate,
      row.paymentFrequency
    )

    // Step 7.5: Validation - if High Range < $15,000 → No Offer
    if (maxOffer < 15000) {
      return {
        paymentCount: paymentCount.toString(),
        lowRange: 'No Offer',
        highRange: 'No Offer',
        deathBenefits: deathBenefitValue.toFixed(2)
      }
    }

    // Step 8: Return formatted results
    return {
      paymentCount: paymentCount.toString(),
      lowRange: minOffer.toFixed(2),
      highRange: maxOffer.toFixed(2),
      deathBenefits: deathBenefitValue.toFixed(2)
    }
  } catch (error) {
    console.error('Error calculating pricing outputs:', error)
    return {
      paymentCount: '',
      lowRange: '',
      highRange: '',
      deathBenefits: ''
    }
  }
}

// ========================================
// 🔄 Re-export Batch Functions
// ========================================
// These are re-exported from the batch calculator module
// for backward compatibility with existing code

export { calculateAllPricingOutputs, shouldRecalculate } from './calculators/batchCalculator'

