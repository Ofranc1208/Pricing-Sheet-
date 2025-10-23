// ========================================
// 🔧 Runtime Configuration System
// ========================================
// Allows overriding npvConfig values at runtime for testing

import {
  BASE_DISCOUNT_RATE,
  BASE_DISCOUNT_RATE_LCP,
  BASE_DISCOUNT_RATE_LUMP_SUM_GUARANTEED,
  BASE_DISCOUNT_RATE_LUMP_SUM_LCP,
  RATE_SPREADS,
  AMOUNT_ADJUSTMENTS,
  FAMILY_PROTECTION_DISCOUNT_RATE,
  adjustmentMap
} from '../../../../npvConfig'
import type { PaymentFrequency } from '../../../../npvCalculations'

export interface RuntimeConfig {
  BASE_DISCOUNT_RATE: number
  BASE_DISCOUNT_RATE_LCP: number
  BASE_DISCOUNT_RATE_LUMP_SUM_GUARANTEED: number
  BASE_DISCOUNT_RATE_LUMP_SUM_LCP: number
  RATE_SPREADS: { min: number; max: number }
  AMOUNT_ADJUSTMENTS: { min: number; max: number }
  FAMILY_PROTECTION_DISCOUNT_RATE: number
  PAYMENT_FREQUENCY: PaymentFrequency
  PAYMENT_INCREASE_RATE: number
  DEFAULT_PAYMENT_FREQUENCY: PaymentFrequency
  DEFAULT_ANNUAL_INCREASE: number
  adjustmentMap: Record<string, number>
}

// Default runtime config (matches file values)
const defaultConfig: RuntimeConfig = {
  BASE_DISCOUNT_RATE,
  BASE_DISCOUNT_RATE_LCP,
  BASE_DISCOUNT_RATE_LUMP_SUM_GUARANTEED,
  BASE_DISCOUNT_RATE_LUMP_SUM_LCP,
  RATE_SPREADS,
  AMOUNT_ADJUSTMENTS,
  FAMILY_PROTECTION_DISCOUNT_RATE,
  PAYMENT_FREQUENCY: 'Monthly',
  PAYMENT_INCREASE_RATE: 0,
  DEFAULT_PAYMENT_FREQUENCY: 'Monthly',
  DEFAULT_ANNUAL_INCREASE: 0,
  adjustmentMap: { ...adjustmentMap }
}

// Runtime config state
let runtimeConfig: RuntimeConfig = { ...defaultConfig }

// Get current runtime config
export function getRuntimeConfig(): RuntimeConfig {
  return runtimeConfig
}

// Update runtime config
export function updateRuntimeConfig(newConfig: Partial<RuntimeConfig>): void {
  runtimeConfig = { ...runtimeConfig, ...newConfig }

  // Update adjustmentMap if provided
  if (newConfig.adjustmentMap) {
    runtimeConfig.adjustmentMap = { ...runtimeConfig.adjustmentMap, ...newConfig.adjustmentMap }
  }

  // Persist to localStorage for persistence across page reloads
  if (typeof window !== 'undefined') {
    localStorage.setItem('npv-runtime-config', JSON.stringify(runtimeConfig))
  }
}

// Reset to default config
export function resetRuntimeConfig(): void {
  runtimeConfig = { ...defaultConfig }

  if (typeof window !== 'undefined') {
    localStorage.removeItem('npv-runtime-config')
  }
}

// Load from localStorage on initialization
if (typeof window !== 'undefined') {
  const savedConfig = localStorage.getItem('npv-runtime-config')
  if (savedConfig) {
    try {
      const parsedConfig = JSON.parse(savedConfig)
      runtimeConfig = { ...defaultConfig, ...parsedConfig }

      // Handle adjustmentMap separately
      if (parsedConfig.adjustmentMap) {
        runtimeConfig.adjustmentMap = { ...defaultConfig.adjustmentMap, ...parsedConfig.adjustmentMap }
      }
    } catch (error) {
      console.error('Failed to load runtime config from localStorage:', error)
      runtimeConfig = { ...defaultConfig }
    }
  }
}

// Export the current config for use in calculations
export { runtimeConfig as currentConfig }

