// ========================================
// ✅ Input Validation Module
// ========================================
// Validates pricing row input fields before calculations

import type { PricingRow } from '../../pricing-fields'

/**
 * Validate if a row has all required input fields
 * @param row - The pricing row to validate
 * @returns true if all required fields are present and valid
 */
export function isValidInputRow(row: PricingRow): boolean {
  return !!(
    row.gender &&
    row.age &&
    row.typeOfPayment &&
    row.paymentStartDate &&
    row.paymentEndDate &&
    row.paymentAmount &&
    parseFloat(row.paymentAmount) > 0
  )
}

/**
 * Validate individual field values
 */
export function isValidAge(age: string): boolean {
  const ageNum = parseInt(age)
  return !isNaN(ageNum) && ageNum >= 18 && ageNum <= 100
}

export function isValidGender(gender: string): boolean {
  return gender === 'male' || gender === 'female'
}

export function isValidPaymentType(type: string): boolean {
  return type === 'LCP' || type === 'GP'
}

export function isValidAmount(amount: string): boolean {
  const amountNum = parseFloat(amount)
  return !isNaN(amountNum) && amountNum > 0
}

export function isValidDateRange(startDate: string, endDate: string): boolean {
  const start = new Date(startDate)
  const end = new Date(endDate)
  return start < end
}

