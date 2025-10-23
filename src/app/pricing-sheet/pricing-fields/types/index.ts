// ========================================
// 📋 Pricing Fields Types
// ========================================
// Shared TypeScript interfaces and types

import type { PricingRow } from '../../PricingFields'

export type { PricingRow }

export interface PricingFieldsProps {
  rows: PricingRow[]
  updateRow: (id: string, field: keyof PricingRow, value: string) => void
  onExportOffersOnly?: () => void
}

export interface TableColumn {
  key: string
  label: string
  type: 'select' | 'number' | 'text' | 'date'
}

export interface OfferStats {
  offers: number
  noOffers: number
}

export interface PaginationState {
  currentPage: number
  rowsPerPage: number
  totalPages: number
  startIndex: number
  endIndex: number
}

