// ========================================
// 📊 Risk Adjustment Module
// ========================================
// Calculates risk adjustments based on age, gender, and other factors

import { currentConfig } from '../../debug/runtimeConfig'

/**
 * Get LCP keys for adjustment map based on age and gender
 * These keys are used to look up risk adjustments in the config
 * @param age - Client age
 * @param gender - Client gender ('male' or 'female')
 * @returns Array of adjustment keys
 */
export function getLCPKeys(age: number, gender: string): string[] {
  const keys: string[] = []

  // Add gender key
  if (gender === 'male') {
    keys.push('gender-male')
  } else if (gender === 'female') {
    keys.push('gender-female')
  }

  // Add age band key
  if (age >= 18 && age <= 25) {
    keys.push('age-18-25')
  } else if (age >= 26 && age <= 35) {
    keys.push('age-26-35')
  } else if (age >= 36 && age <= 45) {
    keys.push('age-36-45')
  } else if (age >= 46 && age <= 50) {
    keys.push('age-46-50')
  } else if (age >= 51 && age <= 56) {
    keys.push('age-51-56')
  } else if (age >= 57 && age <= 65) {
    keys.push('age-57-65')
  }

  return keys
}

/**
 * Calculate total risk adjustment based on age and gender
 * @param age - Client age
 * @param gender - Client gender ('male' or 'female')
 * @returns Total risk adjustment as a decimal (e.g., 0.03 = 3%)
 */
export function getRiskAdjustment(age: number, gender: string): number {
  let adjustment = 0

  // Gender adjustment
  if (gender === 'male') {
    adjustment += currentConfig.adjustmentMap['gender-male'] || 0
  } else if (gender === 'female') {
    adjustment += currentConfig.adjustmentMap['gender-female'] || 0
  }

  // Age band adjustment
  if (age >= 18 && age <= 25) {
    adjustment += currentConfig.adjustmentMap['age-18-25'] || 0
  } else if (age >= 26 && age <= 35) {
    adjustment += currentConfig.adjustmentMap['age-26-35'] || 0
  } else if (age >= 36 && age <= 45) {
    adjustment += currentConfig.adjustmentMap['age-36-45'] || 0
  } else if (age >= 46 && age <= 50) {
    adjustment += currentConfig.adjustmentMap['age-46-50'] || 0
  } else if (age >= 51 && age <= 56) {
    adjustment += currentConfig.adjustmentMap['age-51-56'] || 0
  } else if (age >= 57 && age <= 65) {
    adjustment += currentConfig.adjustmentMap['age-57-65'] || 0
  }

  return adjustment
}

/**
 * Get age band label for a given age
 * Useful for debugging and reporting
 */
export function getAgeBand(age: number): string {
  if (age >= 18 && age <= 25) return '18-25'
  if (age >= 26 && age <= 35) return '26-35'
  if (age >= 36 && age <= 45) return '36-45'
  if (age >= 46 && age <= 50) return '46-50'
  if (age >= 51 && age <= 56) return '51-56'
  if (age >= 57 && age <= 65) return '57-65'
  return 'unknown'
}

