// ========================================
// 💀 Death Benefit Calculator (Max PV Exposure)
// ========================================
// Computes the death benefit as the maximum PRESENT VALUE of the remaining
// payment stream at any point in time (decreasing term logic). This matches
// the Balance column of standard amortization schedules.

import { currentConfig } from '../../debug/runtimeConfig'
import type { PaymentFrequency } from '../../../../../npvCalculations'

function addMonths(date: Date, months: number): Date {
	const d = new Date(date)
	const day = d.getDate()
	d.setMonth(d.getMonth() + months)
	if (d.getDate() < day) d.setDate(0)
	return d
}

export function calculateDeathBenefitMaxPV(
	amount: number,
	startDate: string,
	endDate: string,
	paymentFrequency?: string,
	increaseRate?: number
): number {
	const paymentMode: PaymentFrequency = (paymentFrequency as PaymentFrequency) || currentConfig.PAYMENT_FREQUENCY
	const increaseRateValue = increaseRate !== undefined ? increaseRate : currentConfig.PAYMENT_INCREASE_RATE
	// Use configured rate directly as a decimal (e.g., 0.055 for 5.5%)
	const discountRate = currentConfig.FAMILY_PROTECTION_DISCOUNT_RATE

	const s = new Date(startDate)
	const e = new Date(endDate)

	const freqMap: Record<string, number> = {
		Monthly: 12,
		Quarterly: 4,
		Semiannually: 2,
		'Semi-Annually': 2,
		Annually: 1,
		'Lump Sum': 1
	}

	const perYear = freqMap[paymentMode] || 12
	const gap = 12 / perYear

	// Build schedule with annual increases
	const schedule: { date: Date; amt: number }[] = []
	let payment = amount
	let idx = 0
	for (let d = new Date(s); d <= e; d = addMonths(d, gap), idx++) {
		if (paymentMode === 'Lump Sum' && idx > 0) break
		schedule.push({ date: new Date(d), amt: payment })
		if ((idx + 1) % perYear === 0) {
			payment *= 1 + increaseRateValue / 100
		}
	}

	// For each point in schedule, compute PV of remaining payments at that point
	let maxPV = 0
	for (let i = 0; i < schedule.length; i++) {
		let pvAtPoint = 0
		const ref = schedule[i].date
		for (let j = i; j < schedule.length; j++) {
			const p = schedule[j]
			const months = (p.date.getFullYear() - ref.getFullYear()) * 12 + (p.date.getMonth() - ref.getMonth())
			const df = Math.pow(1 + discountRate / 12, months)
			pvAtPoint += p.amt / df
		}
		if (pvAtPoint > maxPV) maxPV = pvAtPoint
	}

	// Apply buffer and round up to nearest $10,000
	const buffered = maxPV + 20000
	const roundedUpTo10k = Math.ceil((buffered - 0.001) / 10000) * 10000

	return parseFloat(roundedUpTo10k.toFixed(2))
}
