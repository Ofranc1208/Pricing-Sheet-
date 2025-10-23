// ========================================
// 📊 Lead Stats Bar Component
// ========================================
// Displays offer statistics and export button

import type { OfferStats } from '../types'

interface LeadStatsBarProps {
  stats: OfferStats
  onExportOffersOnly?: () => void
}

export function LeadStatsBar({ stats, onExportOffersOnly }: LeadStatsBarProps) {
  // Don't show if no data
  if (stats.offers === 0 && stats.noOffers === 0) return null

  return (
    <div className="mb-3 flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">Lead Stats:</span>
        </div>
        
        {/* Offers Count Badge */}
        <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded">
          <span className="text-sm font-medium text-green-800">Offers:</span>
          <span className="text-sm font-bold text-green-900">{stats.offers}</span>
        </div>
        
        {/* No Offers Count Badge */}
        <div className="flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded">
          <span className="text-sm font-medium text-red-800">No Offers:</span>
          <span className="text-sm font-bold text-red-900">{stats.noOffers}</span>
        </div>
      </div>
      
      {/* Export Offers Only Button */}
      {stats.offers > 0 && onExportOffersOnly && (
        <button
          onClick={onExportOffersOnly}
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors shadow-sm flex items-center gap-2"
          title={`Export ${stats.offers} offers to Excel`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Offers Only
        </button>
      )}
    </div>
  )
}

