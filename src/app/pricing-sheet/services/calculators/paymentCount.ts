// ========================================
// 🔢 Payment Count Calculator
// ========================================
// Calculates the number of payments based on frequency and date range
// Uses the SAME logic as NPV calculation to ensure consistency

import type { PaymentFrequency } from '../../../../../npvCalculations'

/**
 * Helper function to add months to a date (same as NPV calculation)
 */
function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  const day = d.getDate();
  d.setMonth(d.getMonth() + months);
  if (d.getDate() < day) d.setDate(0);
  return d;
}

/**
 * Calculate the number of payments between start and end dates
 * Uses the EXACT same logic as calcNPV to ensure payment counts match
 * @param startDate - Payment start date (ISO format)
 * @param endDate - Payment end date (ISO format)
 * @param paymentFrequency - Payment frequency
 * @returns Number of payments
 */
export function calculatePaymentCount(
  startDate: string,
  endDate: string,
  paymentFrequency: string
): number {
  if (!startDate || !endDate || !paymentFrequency) {
    return 0
  }

  const s = new Date(startDate)
  const e = new Date(endDate)

  // Map frequency to payments per year (same as NPV calculation)
  const freqMap: Record<string, number> = {
    'Monthly': 12,
    'Quarterly': 4,
    'Semiannually': 2,
    'Semi-Annually': 2,
    'Annually': 1,
    'Lump Sum': 1
  }

  const perYear = freqMap[paymentFrequency] || 12
  const gap = 12 / perYear

  // Lump sum is always 1 payment
  if (paymentFrequency === 'Lump Sum') {
    return 1
  }

  // Count payments using the SAME loop logic as calcNPV
  let idx = 0
  for (let d = new Date(s); d <= e; d = addMonths(d, gap), idx++) {
    // Loop continues until date exceeds end date
  }

  return idx
}

