// ========================================
// 💾 Local Storage Utilities
// ========================================
// Browser storage for pricing sheet data

import type { PricingRow } from '../PricingFields'

const STORAGE_KEY = 'pricing-sheet-data'
const STORAGE_VERSION = '1.0'

export interface StoredData {
  version: string
  timestamp: number
  rows: PricingRow[]
}

export function savePricingData(rows: PricingRow[]): void {
  try {
    const data: StoredData = {
      version: STORAGE_VERSION,
      timestamp: Date.now(),
      rows: rows
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    console.log(`💾 Saved ${rows.length} rows to localStorage`)
  } catch (error) {
    console.error('❌ Failed to save to localStorage:', error)
  }
}

export function loadPricingData(): PricingRow[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      console.log('💾 No saved data found in localStorage')
      return null
    }

    const data: StoredData = JSON.parse(stored)

    // Check version compatibility
    if (data.version !== STORAGE_VERSION) {
      console.warn(`💾 Version mismatch: ${data.version} vs ${STORAGE_VERSION}, clearing old data`)
      clearPricingData()
      return null
    }

    const age = Date.now() - data.timestamp
    const hoursOld = age / (1000 * 60 * 60)

    console.log(`💾 Loaded ${data.rows.length} rows from localStorage (${hoursOld.toFixed(1)} hours old)`)

    return data.rows
  } catch (error) {
    console.error('❌ Failed to load from localStorage:', error)
    clearPricingData()
    return null
  }
}

export function clearPricingData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
    console.log('💾 Cleared pricing data from localStorage')
  } catch (error) {
    console.error('❌ Failed to clear localStorage:', error)
  }
}

export function hasStoredData(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null
}

export function getStorageStats(): { size: string; age: string } | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    const data: StoredData = JSON.parse(stored)
    const age = Date.now() - data.timestamp
    const hoursOld = age / (1000 * 60 * 60)

    // Estimate size (rough calculation)
    const size = new Blob([stored]).size
    const sizeStr = size > 1024 ? `${(size / 1024).toFixed(1)}KB` : `${size}B`

    return {
      size: sizeStr,
      age: `${hoursOld.toFixed(1)}h old`
    }
  } catch (error) {
    return null
  }
}
