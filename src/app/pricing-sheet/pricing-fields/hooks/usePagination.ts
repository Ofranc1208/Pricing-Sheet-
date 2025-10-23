// ========================================
// 📄 Pagination Hook
// ========================================
// Manage pagination state and calculations

import { useState, useMemo } from 'react'
import type { PricingRow, PaginationState } from '../types'
import { DEFAULT_ROWS_PER_PAGE } from '../utils/constants'

interface UsePaginationReturn extends PaginationState {
  currentRows: PricingRow[]
  setCurrentPage: (page: number) => void
  goToNextPage: () => void
  goToPreviousPage: () => void
}

/**
 * Hook to manage pagination for pricing rows
 * @param rows - Array of all pricing rows
 * @param rowsPerPage - Number of rows per page (default: 50)
 * @returns Pagination state and controls
 */
export function usePagination(
  rows: PricingRow[],
  rowsPerPage: number = DEFAULT_ROWS_PER_PAGE
): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(1)

  const paginationState = useMemo(() => {
    const totalPages = Math.ceil(rows.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const currentRows = rows.slice(startIndex, endIndex)

    return {
      currentPage,
      rowsPerPage,
      totalPages,
      startIndex,
      endIndex,
      currentRows
    }
  }, [rows, currentPage, rowsPerPage])

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(paginationState.totalPages, prev + 1))
  }

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1))
  }

  return {
    ...paginationState,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage
  }
}

