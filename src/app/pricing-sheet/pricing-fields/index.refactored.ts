// ========================================
// 📦 Pricing Fields Module Index
// ========================================
// Central export point for all pricing fields functionality

// Main Component
export { default } from './PricingFields.refactored'

// Types (for external use)
export type { PricingFieldsProps, TableColumn, OfferStats } from './types'

// Constants (for external use)
export { TABLE_COLUMNS, MAX_DISPLAY_ROWS } from './utils/constants'

// Utilities (for external use)
export { formatCurrency, parseCurrency } from './utils/formatters'
export { isNoOffer, hasValidOffer } from './utils/validators'

// Hooks (for external use if needed)
export { usePricingStats } from './hooks/usePricingStats'
export { usePagination } from './hooks/usePagination'

