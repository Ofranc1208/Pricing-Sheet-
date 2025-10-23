// ========================================
// 🔧 Data Normalization Utilities
// ========================================
// Functions to normalize and validate field values

import { normalizeText } from './utils'

export function normalizeGender(value: string): string {
  if (!value) return ''

  const normalized = normalizeText(value)
  if (['m', 'male', 'man'].includes(normalized)) return 'male'
  if (['f', 'female', 'woman'].includes(normalized)) return 'female'

  return value // Keep original if not recognized
}

export function normalizeFrequency(value: string): string {
  if (!value) return ''

  const normalized = normalizeText(value)
  const freqMap: Record<string, string> = {
    'monthly': 'Monthly',
    'quarterly': 'Quarterly',
    'quarter': 'Quarterly',
    'semi': 'Semiannually',
    'semiannually': 'Semiannually',
    'semi-annually': 'Semiannually',
    'annual': 'Annually',
    'annually': 'Annually',
    'yearly': 'Annually',
    'lump': 'Lump Sum',
    'lumpsum': 'Lump Sum',
    'one-time': 'Lump Sum'
  }

  return freqMap[normalized] || value
}

export function normalizePaymentType(value: string): string {
  if (!value) return ''

  const normalized = normalizeText(value)
  if (['lcp', 'life', 'lifecontingent'].includes(normalized)) return 'LCP'
  if (['gp', 'guaranteed'].includes(normalized)) return 'GP'

  return value
}

export function normalizeAnnualIncrease(value: string): string {
  if (!value || value.trim() === '') return '0'

  // Extract percentage or decimal
  const cleaned = value.replace(/[^0-9.-]/g, '')
  const num = parseFloat(cleaned)

  if (isNaN(num)) return '0'

  // If it looks like a percentage (e.g., 3.5), treat as percentage
  // If it looks like a decimal (e.g., 0.035), treat as decimal
  if (num > 1 && num <= 100) {
    return num.toString() // Percentage value
  } else if (num > 0 && num <= 1) {
    return (num * 100).toString() // Convert decimal to percentage
  }

  return '0'
}

export function normalizeAmount(value: string): string {
  if (!value) return ''

  // Remove currency symbols, commas, and extra spaces
  return value.replace(/[$,]/g, '').trim()
}

export function normalizeDate(value: string): string {
  if (!value) return ''

  // Handle common date formats with 2-digit year fix
  // Formats: MM/DD/YY, MM/DD/YYYY, MM-DD-YY, MM-DD-YYYY, YYYY-MM-DD
  
  // Try to detect and fix 2-digit years
  const datePatterns = [
    // MM/DD/YY or MM-DD-YY
    /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})$/,
    // MM/DD/YYYY or MM-DD-YYYY
    /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/,
    // YYYY-MM-DD or YYYY/MM/DD
    /^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/
  ]

  for (const pattern of datePatterns) {
    const match = value.trim().match(pattern)
    if (match) {
      let year: number, month: number, day: number

      if (pattern === datePatterns[0]) {
        // MM/DD/YY - 2-digit year
        month = parseInt(match[1])
        day = parseInt(match[2])
        let twoDigitYear = parseInt(match[3])
        
        // Smart year conversion: assume all 2-digit years are 2000+
        // 00-99 → 2000-2099
        year = 2000 + twoDigitYear
        
      } else if (pattern === datePatterns[1]) {
        // MM/DD/YYYY - 4-digit year
        month = parseInt(match[1])
        day = parseInt(match[2])
        year = parseInt(match[3])
        
      } else {
        // YYYY-MM-DD
        year = parseInt(match[1])
        month = parseInt(match[2])
        day = parseInt(match[3])
      }

      // Validate date components
      if (month >= 1 && month <= 12 && day >= 1 && day <= 31 && year >= 1900) {
        // Format as YYYY-MM-DD
        const formattedMonth = month.toString().padStart(2, '0')
        const formattedDay = day.toString().padStart(2, '0')
        return `${year}-${formattedMonth}-${formattedDay}`
      }
    }
  }

  // Fallback: try JavaScript Date parsing (but this has the 2-digit year bug)
  const date = new Date(value)
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0]
  }

  return value // Return original if all parsing fails
}
