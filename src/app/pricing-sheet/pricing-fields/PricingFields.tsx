'use client'

import { useState } from 'react'
import './pricing-fields.css'
import type { PricingRow } from '../PricingFields'

interface PricingFieldsProps {
  rows: PricingRow[]
  updateRow: (id: string, field: keyof PricingRow, value: string) => void
  onExportOffersOnly?: () => void
}

// Tab definitions for organizing fields
const TAB_DEFINITIONS = {
  pricing: {
    label: '📊 Pricing',
    columns: [
      { key: 'gender', label: 'Gender', type: 'select' as const },
      { key: 'age', label: 'Age', type: 'number' as const },
      { key: 'firstName', label: 'First Name', type: 'text' as const },
      { key: 'lastName', label: 'Last Name', type: 'text' as const },
      { key: 'insuranceCompany', label: 'Insurance Co.', type: 'text' as const },
      { key: 'typeOfPayment', label: 'Payment Type', type: 'select' as const },
      { key: 'paymentFrequency', label: 'Frequency', type: 'select' as const },
      { key: 'paymentStartDate', label: 'Start Date', type: 'date' as const },
      { key: 'paymentEndDate', label: 'End Date', type: 'date' as const },
      { key: 'paymentAmount', label: 'Amount', type: 'number' as const },
      { key: 'annualIncrease', label: 'Ann Inc', type: 'number' as const },
      { key: 'paymentCount', label: '# Payments', type: 'number' as const },
      { key: 'lowRange', label: 'Low Range', type: 'number' as const },
      { key: 'highRange', label: 'High Range', type: 'number' as const },
      { key: 'deathBenefits', label: 'Death Ben.', type: 'number' as const }
    ]
  },
  contact: {
    label: '📞 Contact',
    columns: [
      { key: 'crmId', label: 'CRM ID', type: 'text' as const },
      { key: 'phone1', label: 'Phone 1', type: 'text' as const },
      { key: 'phone2', label: 'Phone 2', type: 'text' as const },
      { key: 'phone3', label: 'Phone 3', type: 'text' as const }
    ]
  },
  address: {
    label: '📍 Address',
    columns: [
      { key: 'fullAddress', label: 'Full Address', type: 'text' as const },
      { key: 'streetAddress1', label: 'Street 1', type: 'text' as const },
      { key: 'streetAddress2', label: 'Street 2', type: 'text' as const },
      { key: 'city', label: 'City', type: 'text' as const },
      { key: 'state', label: 'State', type: 'text' as const },
      { key: 'zipCode', label: 'ZIP Code', type: 'text' as const }
    ]
  }
}

export const TABLE_COLUMNS = TAB_DEFINITIONS.pricing.columns

// Maximum number of rows to display at once for performance
const MAX_DISPLAY_ROWS = 2000

// Warning component for large datasets
const LargeDatasetWarning = ({ rowCount }: { rowCount: number }) => {
  if (rowCount <= MAX_DISPLAY_ROWS) return null

  return (
    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Large Dataset Detected
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>Your dataset contains {rowCount.toLocaleString()} rows. For optimal performance, consider:</p>
            <ul className="mt-1 list-disc list-inside">
              <li>Processing in smaller batches (e.g., 500-1000 rows)</li>
              <li>Using pagination to navigate through results</li>
              <li>Filtering data before upload if possible</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PricingFields({ rows, updateRow, onExportOffersOnly }: PricingFieldsProps) {
  const [activeTab, setActiveTab] = useState('pricing')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(50) // Show 50 rows per page for performance

  // Get current tab columns
  const currentColumns = TAB_DEFINITIONS[activeTab as keyof typeof TAB_DEFINITIONS]?.columns || TAB_DEFINITIONS.pricing.columns

  // Calculate pagination
  const totalPages = Math.ceil(rows.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentRows = rows.slice(startIndex, endIndex)

  // Calculate stats for offers vs no offers
  const offerStats = rows.reduce((acc, row) => {
    const hasOffer = row.highRange && row.highRange !== '' && row.highRange !== 'No Offer'
    if (hasOffer) {
      acc.offers++
    } else if (row.highRange === 'No Offer') {
      acc.noOffers++
    }
    return acc
  }, { offers: 0, noOffers: 0 })

  // Helper function to check if row has "No Offer"
  const isNoOffer = (row: PricingRow): boolean => {
    return row.highRange === 'No Offer' || row.lowRange === 'No Offer'
  }

  // Currency formatting function
  const formatCurrency = (value: string): string => {
    if (!value || value === '0' || value === '') return ''
    const numValue = parseFloat(value.replace(/[,$]/g, ''))
    if (isNaN(numValue)) return value
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numValue)
  }

  const renderInput = (row: PricingRow, column: typeof TABLE_COLUMNS[0]) => {
    const value = (row[column.key as keyof PricingRow] as string) || ''

    if (column.type === 'select' && column.key === 'gender') {
      return (
        <select
              id={`${column.key}-${row.id}`}
              name={`${column.key}-${row.id}`}
          value={value}
          onChange={(e) => updateRow(row.id, column.key as keyof PricingRow, e.target.value)}
          className="pricing-field-input"
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      )
    }

        if (column.type === 'select' && column.key === 'typeOfPayment') {
          return (
            <select
              id={`${column.key}-${row.id}`}
              name={`${column.key}-${row.id}`}
              value={value}
              onChange={(e) => updateRow(row.id, column.key as keyof PricingRow, e.target.value)}
              className="pricing-field-input"
            >
              <option value="">Select</option>
              <option value="LCP">LCP</option>
              <option value="GP">GP</option>
            </select>
          )
        }

        if (column.type === 'select' && column.key === 'paymentFrequency') {
          return (
            <select
              id={`${column.key}-${row.id}`}
              name={`${column.key}-${row.id}`}
              value={value}
              onChange={(e) => updateRow(row.id, column.key as keyof PricingRow, e.target.value)}
              className="pricing-field-input"
            >
              <option value="">Select</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Semiannually">Semi-Annually</option>
              <option value="Annually">Annually</option>
              <option value="Lump Sum">Lump Sum</option>
            </select>
          )
        }

    if (column.type === 'date') {
      return (
        <input
          id={`${column.key}-${row.id}`}
          name={`${column.key}-${row.id}`}
          type="date"
          value={value}
          onChange={(e) => updateRow(row.id, column.key as keyof PricingRow, e.target.value)}
          className="pricing-field-input pricing-date-input"
          placeholder=""
        />
      )
    }

        // Handle payment count output field (read-only number)
        if (column.key === 'paymentCount') {
      return (
        <input
          id={`${column.key}-${row.id}`}
          name={`${column.key}-${row.id}`}
          type="text"
          value={value || ''}
          readOnly
          className="pricing-field-input pricing-currency-input"
          placeholder="Auto"
          title="Number of Payments - Automatically calculated based on frequency and dates"
        />
      )
    }

        // Handle currency output fields (lowRange, highRange, deathBenefits)
        if (['lowRange', 'highRange', 'deathBenefits'].includes(column.key)) {
      const displayValue = formatCurrency(value || '')
      return (
        <input
          id={`${column.key}-${row.id}`}
          name={`${column.key}-${row.id}`}
          type="text"
          value={displayValue || ''}
          onChange={(e) => {
            // Store raw value but display formatted
            const rawValue = e.target.value.replace(/[,$]/g, '')
            updateRow(row.id, column.key as keyof PricingRow, rawValue)
          }}
          className="pricing-field-input pricing-currency-input"
          placeholder="Output value"
          title={`Calculated ${column.label} - This field will be populated by the calculator`}
        />
      )
    }

    // Handle payment amount input field (with currency formatting)
    if (column.key === 'paymentAmount') {
      const displayValue = formatCurrency(value || '')
      return (
        <input
          id={`${column.key}-${row.id}`}
          name={`${column.key}-${row.id}`}
          type="text"
          value={displayValue || ''}
          onChange={(e) => {
            // Store raw value but display formatted
            const rawValue = e.target.value.replace(/[,$]/g, '')
            updateRow(row.id, column.key as keyof PricingRow, rawValue)
          }}
          className="pricing-field-input"
          placeholder="$0.00"
          title="Payment Amount - Enter the payment amount"
        />
      )
    }

    // Handle percentage field (annualIncrease) - always 0%
    if (column.key === 'annualIncrease') {
      const numericValue = parseFloat(value || '0') || 0
      return (
        <input
          id={`${column.key}-${row.id}`}
          name={`${column.key}-${row.id}`}
          type="number"
          value={numericValue}
          onChange={(e) => {
            const newValue = parseFloat(e.target.value) || 0
            updateRow(row.id, column.key as keyof PricingRow, newValue.toString())
          }}
          className="pricing-field-input"
          placeholder="0"
          title={`${column.label} - Always 0% (percentage)`}
          min="0"
          max="0"
          step="1"
        />
      )
    }

    return (
      <input
        id={`${column.key}-${row.id}`}
        name={`${column.key}-${row.id}`}
        type={column.type}
        value={value || ''}
        onChange={(e) => updateRow(row.id, column.key as keyof PricingRow, e.target.value)}
        className="pricing-field-input"
        placeholder={`Enter ${column.label.toLowerCase()}`}
      />
    )
  }

  return (
    <div className="pricing-fields-container">
      <LargeDatasetWarning rowCount={rows.length} />
      
      {/* Lead Stats Summary */}
      {(offerStats.offers > 0 || offerStats.noOffers > 0) && (
        <div className="mb-3 flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">Lead Stats:</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded">
              <span className="text-sm font-medium text-green-800">Offers:</span>
              <span className="text-sm font-bold text-green-900">{offerStats.offers}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded">
              <span className="text-sm font-medium text-red-800">No Offers:</span>
              <span className="text-sm font-bold text-red-900">{offerStats.noOffers}</span>
            </div>
          </div>
          {offerStats.offers > 0 && onExportOffersOnly && (
            <button
              onClick={onExportOffersOnly}
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors shadow-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Offers Only
            </button>
          )}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-3">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-4">
            {Object.entries(TAB_DEFINITIONS).map(([tabKey, tabDef]) => (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tabKey
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tabDef.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="pricing-fields-wrapper">
        <div className="pricing-fields-scroll-area">
          <table className="pricing-fields-table">
            <thead>
              <tr>
                {/* Dynamic headers based on active tab */}
                {currentColumns.map((column) => {
                  // Determine header style based on field type
                  const isOutputField = ['paymentCount', 'lowRange', 'highRange', 'deathBenefits'].includes(column.key)
                  const headerClass = isOutputField ? 'pricing-output-header' : 'pricing-input-header'
                  
                  return (
                    <th key={column.key} className={headerClass}>
                      <div className="pricing-header-content" title={column.label}>
                        {column.label}
                      </div>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`pricing-table-row ${index % 2 === 0 ? 'pricing-row-even' : 'pricing-row-odd'} ${isNoOffer(row) ? 'pricing-row-no-offer' : ''}`}
                >
                  {currentColumns.map((column) => (
                    <td key={column.key} className="pricing-table-cell">
                      <div className="pricing-cell-content">
                        {renderInput(row, column)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {rows.length > rowsPerPage && (
        <div className="mt-4 flex items-center justify-between bg-white px-4 py-3 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, rows.length)} of {rows.length} entries
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
