// ========================================
// 🔄 Batch Calculator Module
// ========================================
// Handles batch processing and change detection

import type { PricingRow } from '../../pricing-fields'
import type { CalculatedOutputs } from '../pricingCalculator'

/**
 * Calculate outputs for multiple rows
 * @param rows - Array of pricing rows
 * @param calculateFn - Function to calculate outputs for a single row
 * @returns Array of rows with calculated outputs
 */
export function calculateAllPricingOutputs(
  rows: PricingRow[],
  calculateFn: (row: PricingRow) => CalculatedOutputs
): PricingRow[] {
  return rows.map(row => {
    const outputs = calculateFn(row)
    return {
      ...row,
      lowRange: outputs.lowRange,
      highRange: outputs.highRange,
      deathBenefits: outputs.deathBenefits
    }
  })
}

/**
 * Check if a row should trigger recalculation
 * (when any input field changes)
 * @param oldRow - Previous row state
 * @param newRow - New row state
 * @returns true if recalculation is needed
 */
export function shouldRecalculate(
  oldRow: PricingRow,
  newRow: PricingRow
): boolean {
  const inputFields: (keyof PricingRow)[] = [
    'gender',
    'age',
    'typeOfPayment',
    'paymentStartDate',
    'paymentEndDate',
    'paymentAmount'
  ]

  return inputFields.some(field => oldRow[field] !== newRow[field])
}

/**
 * Filter rows that need recalculation
 * @param rows - Array of pricing rows
 * @param previousRows - Previous state of rows
 * @returns Array of row IDs that need recalculation
 */
export function getRowsNeedingRecalculation(
  rows: PricingRow[],
  previousRows: PricingRow[]
): string[] {
  const needsRecalc: string[] = []

  rows.forEach(row => {
    const prevRow = previousRows.find(r => r.id === row.id)
    if (prevRow && shouldRecalculate(prevRow, row)) {
      needsRecalc.push(row.id)
    }
  })

  return needsRecalc
}

