// ========================================
// 📊 Pricing Stats Hook
// ========================================
// Calculate offer statistics from pricing rows

import { useMemo } from 'react'
import type { PricingRow, OfferStats } from '../types'
import { hasValidOffer } from '../utils/validators'

/**
 * Calculate statistics for offers vs no offers
 * @param rows - Array of pricing rows
 * @returns Object with offers and noOffers counts
 */
export function usePricingStats(rows: PricingRow[]): OfferStats {
  return useMemo(() => {
    return rows.reduce((acc, row) => {
      if (hasValidOffer(row)) {
        acc.offers++
      } else if (row.highRange === 'No Offer') {
        acc.noOffers++
      }
      return acc
    }, { offers: 0, noOffers: 0 })
  }, [rows])
}

