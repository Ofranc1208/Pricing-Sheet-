// ========================================
// 💰 NPV Calculator Module
// ========================================
// Wrapper for NPV calculations with proper input formatting

import {
  calculateGuaranteedNPV,
  calculateMinMaxNPV,
  type GuaranteedNPVInput,
  type MinMaxNPVInput,
  type PaymentFrequency
} from '../../../../../npvCalculations'
import { currentConfig } from '../../debug/runtimeConfig'

/**
 * Calculate min and max NPV offers
 * @param amount - Payment amount
 * @param startDate - Payment start date (ISO format)
 * @param endDate - Payment end date (ISO format)
 * @param adjustedRate - Base rate with risk adjustments applied
 * @param paymentType - 'LCP' or 'GP'
 * @param lcpKeys - Array of LCP adjustment keys
 * @returns Object with minOffer and maxOffer
 */
export function calculateMinMaxOffers(
  amount: number,
  startDate: string,
  endDate: string,
  adjustedRate: number,
  paymentType: string,
  lcpKeys: string[],
  paymentFrequency?: string,
  increaseRate?: number
): { minOffer: number; maxOffer: number } {
  // Use provided values or fall back to runtime config defaults
  const paymentMode: PaymentFrequency = (paymentFrequency as PaymentFrequency) || currentConfig.PAYMENT_FREQUENCY
  const increaseRateValue = increaseRate !== undefined ? increaseRate : currentConfig.PAYMENT_INCREASE_RATE

  // IMPORTANT: adjustedRate already includes age/gender risk adjustments.
  // To avoid double-counting, do NOT pass lcpKeys/isLCP into the core calc.
  const minMaxInput: MinMaxNPVInput = {
    amount,
    startDate,
    endDate,
    baseRate: adjustedRate,
    paymentMode,
    increaseRate: increaseRateValue,
    minRateSpread: currentConfig.RATE_SPREADS.min,
    maxRateSpread: currentConfig.RATE_SPREADS.max,
    minAdjustment: currentConfig.AMOUNT_ADJUSTMENTS.min,
    maxAdjustment: currentConfig.AMOUNT_ADJUSTMENTS.max,
    isLCP: false,
    lcpKeys: []
  }

  return calculateMinMaxNPV(minMaxInput)
}

/**
 * Calculate death benefits (family protection)
 * @param amount - Payment amount
 * @param startDate - Payment start date (ISO format)
 * @param endDate - Payment end date (ISO format)
 * @returns NPV value for death benefits
 */
export function calculateDeathBenefits(
  amount: number,
  startDate: string,
  endDate: string,
  paymentFrequency?: string,
  increaseRate?: number
): number {
  const paymentMode: PaymentFrequency = (paymentFrequency as PaymentFrequency) || currentConfig.PAYMENT_FREQUENCY
  const increaseRateValue = increaseRate !== undefined ? increaseRate : currentConfig.PAYMENT_INCREASE_RATE

  const familyProtectionInput: GuaranteedNPVInput = {
    amount,
    startDate,
    endDate,
    discountRate: currentConfig.FAMILY_PROTECTION_DISCOUNT_RATE,
    paymentMode,
    increaseRate: increaseRateValue
  }

  const result = calculateGuaranteedNPV(familyProtectionInput)
  return result.npv
}

/**
 * Get base discount rate based on payment type
 */
export function getBaseDiscountRate(paymentType: string): number {
  return paymentType === 'LCP' ? currentConfig.BASE_DISCOUNT_RATE_LCP : currentConfig.BASE_DISCOUNT_RATE
}

