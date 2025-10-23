// ========================================
// 📊 Pricing Fields Constants
// ========================================
// Table configuration and display constants

import type { TableColumn } from '../types'

export const TABLE_COLUMNS: TableColumn[] = [
  { key: 'gender', label: 'Gender', type: 'select' },
  { key: 'age', label: 'Age', type: 'number' },
  { key: 'firstName', label: 'F Name', type: 'text' },
  { key: 'lastName', label: 'L Name', type: 'text' },
  { key: 'insuranceCompany', label: 'INS', type: 'text' },
  { key: 'typeOfPayment', label: 'PYMT', type: 'select' },
  { key: 'paymentFrequency', label: 'Freq', type: 'select' },
  { key: 'paymentStartDate', label: 'Start', type: 'date' },
  { key: 'paymentEndDate', label: 'End', type: 'date' },
  { key: 'paymentAmount', label: 'Amount', type: 'number' },
  { key: 'annualIncrease', label: 'Ann Inc', type: 'number' },
  { key: 'paymentCount', label: '# Payments', type: 'number' },
  { key: 'lowRange', label: 'Low Range', type: 'number' },
  { key: 'highRange', label: 'High Range', type: 'number' },
  { key: 'deathBenefits', label: 'Death Ben.', type: 'number' }
]

// Maximum number of rows to display at once for performance
export const MAX_DISPLAY_ROWS = 2000

// Default rows per page for pagination
export const DEFAULT_ROWS_PER_PAGE = 50

