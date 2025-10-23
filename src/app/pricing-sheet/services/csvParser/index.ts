// ========================================
// 📦 CSV Parser Module Index
// ========================================
// Central export point for all CSV parser modules

// Types
export type { ParsedRow, UploadResult } from './types'

// Header mappings
export { HEADER_MAPPINGS } from './headerMappings'

// Normalization functions
export {
  normalizeGender,
  normalizeFrequency,
  normalizePaymentType,
  normalizeAnnualIncrease,
  normalizeAmount,
  normalizeDate
} from './normalizers'

// Utilities
export { normalizeText, findFieldKey } from './utils'

// Main parser function
export { parseCSVData } from './csvParser'
