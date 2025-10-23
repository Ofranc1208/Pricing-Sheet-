// ========================================
// 📄 Pagination Controls Component
// ========================================
// Navigation controls for paginated data

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  startIndex: number
  endIndex: number
  totalRows: number
  rowsPerPage: number
  onPreviousPage: () => void
  onNextPage: () => void
}

export function PaginationControls({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalRows,
  rowsPerPage,
  onPreviousPage,
  onNextPage
}: PaginationControlsProps) {
  // Don't show pagination if all rows fit on one page
  if (totalRows <= rowsPerPage) return null

  return (
    <div className="mt-4 flex items-center justify-between bg-white px-4 py-3 border-t border-gray-200">
      <div className="text-sm text-gray-700">
        Showing {startIndex + 1} to {Math.min(endIndex, totalRows)} of {totalRows} entries
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          aria-label="Previous page"
        >
          Previous
        </button>
        
        <span className="px-3 py-1 text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  )
}

