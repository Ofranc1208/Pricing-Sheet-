// ========================================
// 💰 Formatting Utilities
// ========================================
// Currency and data formatting functions

/**
 * Format a value as USD currency
 * @param value - String or number value to format
 * @returns Formatted currency string (e.g., "$1,234.56")
 */
export function formatCurrency(value: string | number): string {
  if (!value || value === '0' || value === '') return ''
  
  const numValue = typeof value === 'string' 
    ? parseFloat(value.replace(/[,$]/g, '')) 
    : value
    
  if (isNaN(numValue)) return typeof value === 'string' ? value : ''
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numValue)
}

/**
 * Parse currency string to raw number
 * @param value - Currency string (e.g., "$1,234.56")
 * @returns Raw number string (e.g., "1234.56")
 */
export function parseCurrency(value: string): string {
  return value.replace(/[,$]/g, '')
}

