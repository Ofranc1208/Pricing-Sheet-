// ========================================
// 🎼 Pricing Fields Orchestrator
// ========================================
// Main component that coordinates all sub-components

'use client'

import './pricing-fields.css'

// Types
import type { PricingFieldsProps } from './types'

// Hooks
import { usePricingStats } from './hooks/usePricingStats'
import { usePagination } from './hooks/usePagination'

// Components
import { LargeDatasetWarning } from './components/LargeDatasetWarning'
import { LeadStatsBar } from './components/LeadStatsBar'
import { PricingTable } from './components/PricingTable'
import { PaginationControls } from './components/PaginationControls'

// Constants
import { TABLE_COLUMNS } from './utils/constants'

/**
 * Main Pricing Fields Component
 * Orchestrates display of pricing data with stats, table, and pagination
 */
export default function PricingFields({ 
  rows, 
  updateRow, 
  onExportOffersOnly 
}: PricingFieldsProps) {
  // Calculate offer statistics
  const offerStats = usePricingStats(rows)

  // Manage pagination
  const {
    currentRows,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    rowsPerPage,
    goToNextPage,
    goToPreviousPage
  } = usePagination(rows)

  return (
    <div className="pricing-fields-container">
      {/* Large Dataset Warning */}
      <LargeDatasetWarning rowCount={rows.length} />
      
      {/* Lead Stats Summary Bar */}
      <LeadStatsBar 
        stats={offerStats} 
        onExportOffersOnly={onExportOffersOnly} 
      />

      {/* Main Pricing Table */}
      <PricingTable 
        rows={currentRows}
        columns={TABLE_COLUMNS}
        onUpdateRow={updateRow}
      />

      {/* Pagination Controls */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalRows={rows.length}
        rowsPerPage={rowsPerPage}
        onPreviousPage={goToPreviousPage}
        onNextPage={goToNextPage}
      />
    </div>
  )
}

