// ========================================
// ✅ Validation Utilities
// ========================================
// Input validation and row checking functions

import type { PricingRow } from '../types'

/**
 * Check if a row has "No Offer" status
 * @param row - Pricing row to check
 * @returns True if row has no offer
 */
export function isNoOffer(row: PricingRow): boolean {
  return row.highRange === 'No Offer' || row.lowRange === 'No Offer'
}

/**
 * Check if a row has a valid offer
 * @param row - Pricing row to check
 * @returns True if row has valid offer
 */
export function hasValidOffer(row: PricingRow): boolean {
  return !!(row.highRange && row.highRange !== '' && row.highRange !== 'No Offer')
}

