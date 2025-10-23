// ========================================
// 📊 Excel Export Utility
// ========================================
// Exports pricing sheet data to Excel format

import * as XLSX from 'xlsx'
import type { PricingRow } from '../PricingFields'

export interface ExportOptions {
  includeCalculations?: boolean
  filename?: string
}

// Standard headers for Excel export (complete lead information)
const EXCEL_HEADERS = [
  // Core Pricing Fields
  'Gender',
  'Age',
  'First Name',
  'Last Name',
  'Insurance Company',
  'Payment Type',
  'Payment Frequency',
  'Start Date',
  'End Date',
  'Amount',
  'Annual Increase',
  'Number of Payments',
  'Low Range',
  'High Range',
  'Death Benefits',

  // Contact Fields
  'CRM ID',
  'Phone 1',
  'Phone 2',
  'Phone 3',

  // Address Fields
  'Full Address',
  'Street Address 1',
  'Street Address 2',
  'City',
  'State',
  'ZIP Code'
]

// Field mapping from PricingRow to Excel columns
const FIELD_MAPPING: Record<string, keyof PricingRow> = {
  'Gender': 'gender',
  'Age': 'age',
  'First Name': 'firstName',
  'Last Name': 'lastName',
  'Insurance Company': 'insuranceCompany',
  'Payment Type': 'typeOfPayment',
  'Payment Frequency': 'paymentFrequency',
  'Start Date': 'paymentStartDate',
  'End Date': 'paymentEndDate',
  'Amount': 'paymentAmount',
  'Annual Increase': 'annualIncrease',
  'Number of Payments': 'paymentCount',
  'Low Range': 'lowRange',
  'High Range': 'highRange',
  'Death Benefits': 'deathBenefits',

  // Contact Fields
  'CRM ID': 'crmId',
  'Phone 1': 'phone1',
  'Phone 2': 'phone2',
  'Phone 3': 'phone3',

  // Address Fields
  'Full Address': 'fullAddress',
  'Street Address 1': 'streetAddress1',
  'Street Address 2': 'streetAddress2',
  'City': 'city',
  'State': 'state',
  'ZIP Code': 'zipCode'
}

/**
 * Export pricing data to Excel file
 */
export function exportToExcel(
  rows: PricingRow[],
  options: ExportOptions = {}
): void {
  const { includeCalculations = false, filename = 'pricing-sheet-export' } = options

  try {
    // Filter out empty rows
    const validRows = rows.filter(row =>
      row.firstName && row.lastName && row.paymentAmount
    )

    if (validRows.length === 0) {
      alert('No valid data to export. Please ensure you have data with names and amounts.')
      return
    }

    // Prepare data for Excel
    const excelData: any[][] = []

    // Add headers
    excelData.push(EXCEL_HEADERS)

    // Add data rows
    validRows.forEach(row => {
      const excelRow: any[] = []

      EXCEL_HEADERS.forEach(header => {
        const fieldKey = FIELD_MAPPING[header]
        let value = row[fieldKey] || ''

        // Format specific fields
        if (header === 'Gender') {
          value = value === 'male' ? 'Male' : value === 'female' ? 'Female' : value
        } else if (header === 'Payment Type') {
          value = value === 'LCP' ? 'LCP' : value === 'GP' ? 'GP' : value
        } else if (header === 'Payment Frequency') {
          // Keep as is - already normalized
        } else if (header === 'Amount') {
          // Format as currency for display
          const numValue = parseFloat(value.replace(/[,$]/g, ''))
          value = isNaN(numValue) ? value : `$${numValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        }

        excelRow.push(value)
      })

      excelData.push(excelRow)
    })

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.aoa_to_sheet(excelData)

    // Set column widths for better readability
    const columnWidths = [
      // Core Pricing Fields
      { wch: 8 },  // Gender
      { wch: 6 },  // Age
      { wch: 15 }, // First Name
      { wch: 15 }, // Last Name
      { wch: 20 }, // Insurance Company
      { wch: 12 }, // Payment Type
      { wch: 15 }, // Payment Frequency
      { wch: 12 }, // Start Date
      { wch: 12 }, // End Date
      { wch: 12 }, // Amount
      { wch: 12 }, // Annual Increase
      { wch: 15 }, // Number of Payments
      { wch: 12 }, // Low Range
      { wch: 12 }, // High Range
      { wch: 15 }, // Death Benefits

      // Contact Fields
      { wch: 12 }, // CRM ID
      { wch: 15 }, // Phone 1
      { wch: 15 }, // Phone 2
      { wch: 15 }, // Phone 3

      // Address Fields
      { wch: 25 }, // Full Address
      { wch: 20 }, // Street Address 1
      { wch: 15 }, // Street Address 2
      { wch: 15 }, // City
      { wch: 8 },  // State
      { wch: 10 }  // ZIP Code
    ]

    worksheet['!cols'] = columnWidths

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pricing Data')

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 10)
    const finalFilename = `${filename}-${timestamp}.xlsx`

    // Download file
    XLSX.writeFile(workbook, finalFilename)

    console.log(`✅ Exported ${validRows.length} rows to ${finalFilename}`)

  } catch (error) {
    console.error('Export error:', error)
    alert(`Export failed: ${error}`)
  }
}

/**
 * Get export statistics
 */
export function getExportStats(rows: PricingRow[]): {
  totalRows: number
  validRows: number
  emptyRows: number
} {
  const totalRows = rows.length
  const validRows = rows.filter(row =>
    row.firstName && row.lastName && row.paymentAmount
  ).length
  const emptyRows = totalRows - validRows

  return { totalRows, validRows, emptyRows }
}
