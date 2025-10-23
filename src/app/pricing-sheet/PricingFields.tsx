'use client'

import { useState } from 'react'

export interface PricingRow {
  id: string
  // Core Pricing Fields
  gender: string
  age: string
  firstName: string
  lastName: string
  insuranceCompany: string
  typeOfPayment: string
  paymentFrequency: string
  paymentStartDate: string
  paymentEndDate: string
  paymentAmount: string
  annualIncrease: string
  paymentCount: string
  lowRange: string
  highRange: string
  deathBenefits: string

  // Contact Fields
  crmId: string
  phone1: string
  phone2: string
  phone3: string

  // Address Fields
  fullAddress: string
  streetAddress1: string
  streetAddress2: string
  city: string
  state: string
  zipCode: string
}

const INITIAL_ROWS: PricingRow[] = Array.from({ length: 5 }, (_, index) => ({
  id: `row-${index + 1}`,
  // Core Pricing Fields
  gender: '',
  age: '',
  firstName: '',
  lastName: '',
  insuranceCompany: '',
  typeOfPayment: '',
  paymentFrequency: '',
  paymentStartDate: '',
  paymentEndDate: '',
  paymentAmount: '',
  annualIncrease: '0',
  paymentCount: '',
  lowRange: '',
  highRange: '',
  deathBenefits: '',

  // Contact Fields
  crmId: '',
  phone1: '',
  phone2: '',
  phone3: '',

  // Address Fields
  fullAddress: '',
  streetAddress1: '',
  streetAddress2: '',
  city: '',
  state: '',
  zipCode: ''
}))

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
      { key: 'zipCode', label: 'ZIP', type: 'text' as const }
    ]
  }
}

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

interface PricingFieldsProps {
  rows: PricingRow[]
  updateRow: (id: string, field: keyof PricingRow, value: string) => void
  onExportOffersOnly?: () => void
}

export default function PricingFields({ rows, updateRow, onExportOffersOnly }: PricingFieldsProps) {
  const [activeTab, setActiveTab] = useState('pricing')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(50) // Show 50 rows per page for performance

  // Calculate pagination
  const totalPages = Math.ceil(rows.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentRows = rows.slice(startIndex, endIndex)

  // Get current tab's columns
  const currentColumns = TAB_DEFINITIONS[activeTab as keyof typeof TAB_DEFINITIONS]?.columns || TAB_DEFINITIONS.pricing.columns

  const renderInput = (row: PricingRow, column: typeof currentColumns[0]) => {
    const value = row[column.key as keyof PricingRow] as string

    if (column.type === 'select' && column.key === 'gender') {
      return (
        <select
              id={`${column.key}-${row.id}`}
              name={`${column.key}-${row.id}`}
          value={value}
          onChange={(e) => updateRow(row.id, column.key as keyof PricingRow, e.target.value)}
          className="w-full px-1.5 py-1 text-xs border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
              <option value="">-</option>
              <option value="male">M</option>
              <option value="female">F</option>
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
          className="w-full px-1.5 py-1 text-xs border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
          <option value="">Select</option>
          <option value="LCP">LCP</option>
          <option value="GP">GP</option>
        </select>
      )
    }

    return (
      <input
        id={`${column.key}-${row.id}`}
        name={`${column.key}-${row.id}`}
        type={column.type}
        value={value}
        onChange={(e) => updateRow(row.id, column.key as keyof PricingRow, e.target.value)}
        className="w-full px-1.5 py-1 text-xs border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
        placeholder={`Enter ${column.label.toLowerCase()}`}
      />
    )
  }

  return (
    <div className="space-y-3">
      <LargeDatasetWarning rowCount={rows.length} />

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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

        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="min-w-full divide-y divide-gray-200" style={{ width: '100%', tableLayout: 'fixed' }}>
            <thead>
              <tr>
                {/* Dynamic Headers based on active tab */}
                {currentColumns.map((column) => (
                  <th key={column.key} className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider bg-yellow-500 text-yellow-900">
                    <div className="truncate" title={column.label}>
                      {column.label}
                  </div>
                </th>
                ))}

              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  {currentColumns.map((column) => (
                    <td key={column.key} className="px-2 py-1.5 border border-gray-200 align-top">
                      <div className="min-h-[2rem] flex items-center">
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
