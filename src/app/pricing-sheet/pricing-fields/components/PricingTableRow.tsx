// ========================================
// 📊 Pricing Table Row Component
// ========================================
// Renders a single row with all input/output fields

import type { PricingRow, TableColumn } from '../types'
import { formatCurrency, parseCurrency } from '../utils/formatters'
import { isNoOffer } from '../utils/validators'

interface PricingTableRowProps {
  row: PricingRow
  index: number
  columns: TableColumn[]
  onUpdateRow: (id: string, field: keyof PricingRow, value: string) => void
}

export function PricingTableRow({ row, index, columns, onUpdateRow }: PricingTableRowProps) {
  const renderInput = (column: TableColumn) => {
    const value = (row[column.key as keyof PricingRow] as string) || ''

    // Gender Select
    if (column.type === 'select' && column.key === 'gender') {
      return (
        <select
          id={`${column.key}-${row.id}`}
          name={`${column.key}-${row.id}`}
          value={value}
          onChange={(e) => onUpdateRow(row.id, column.key as keyof PricingRow, e.target.value)}
          className="pricing-field-input"
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      )
    }

    // Payment Type Select
    if (column.type === 'select' && column.key === 'typeOfPayment') {
      return (
        <select
          id={`${column.key}-${row.id}`}
          name={`${column.key}-${row.id}`}
          value={value}
          onChange={(e) => onUpdateRow(row.id, column.key as keyof PricingRow, e.target.value)}
          className="pricing-field-input"
        >
          <option value="">Select</option>
          <option value="LCP">LCP</option>
          <option value="GP">GP</option>
        </select>
      )
    }

    // Payment Frequency Select
    if (column.type === 'select' && column.key === 'paymentFrequency') {
      return (
        <select
          id={`${column.key}-${row.id}`}
          name={`${column.key}-${row.id}`}
          value={value}
          onChange={(e) => onUpdateRow(row.id, column.key as keyof PricingRow, e.target.value)}
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

    // Date Input
    if (column.type === 'date') {
      return (
        <input
          id={`${column.key}-${row.id}`}
          name={`${column.key}-${row.id}`}
          type="date"
          value={value}
          onChange={(e) => onUpdateRow(row.id, column.key as keyof PricingRow, e.target.value)}
          className="pricing-field-input pricing-date-input"
          placeholder=""
        />
      )
    }

    // Payment Count (Read-only)
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

    // Currency Output Fields (Low Range, High Range, Death Benefits)
    if (['lowRange', 'highRange', 'deathBenefits'].includes(column.key)) {
      const displayValue = formatCurrency(value || '')
      return (
        <input
          id={`${column.key}-${row.id}`}
          name={`${column.key}-${row.id}`}
          type="text"
          value={displayValue || ''}
          onChange={(e) => {
            const rawValue = parseCurrency(e.target.value)
            onUpdateRow(row.id, column.key as keyof PricingRow, rawValue)
          }}
          className="pricing-field-input pricing-currency-input"
          placeholder="Output value"
          title={`Calculated ${column.label} - This field will be populated by the calculator`}
        />
      )
    }

    // Payment Amount (Currency Input)
    if (column.key === 'paymentAmount') {
      const displayValue = formatCurrency(value || '')
      return (
        <input
          id={`${column.key}-${row.id}`}
          name={`${column.key}-${row.id}`}
          type="text"
          value={displayValue || ''}
          onChange={(e) => {
            const rawValue = parseCurrency(e.target.value)
            onUpdateRow(row.id, column.key as keyof PricingRow, rawValue)
          }}
          className="pricing-field-input"
          placeholder="$0.00"
          title="Payment Amount - Enter the payment amount"
        />
      )
    }

    // Annual Increase (Always 0%)
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
            onUpdateRow(row.id, column.key as keyof PricingRow, newValue.toString())
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

    // Default Input
    return (
      <input
        id={`${column.key}-${row.id}`}
        name={`${column.key}-${row.id}`}
        type={column.type}
        value={value || ''}
        onChange={(e) => onUpdateRow(row.id, column.key as keyof PricingRow, e.target.value)}
        className="pricing-field-input"
        placeholder={`Enter ${column.label.toLowerCase()}`}
      />
    )
  }

  return (
    <tr
      className={`pricing-table-row ${index % 2 === 0 ? 'pricing-row-even' : 'pricing-row-odd'} ${isNoOffer(row) ? 'pricing-row-no-offer' : ''}`}
    >
      {columns.map((column) => (
        <td key={column.key} className="pricing-table-cell">
          <div className="pricing-cell-content">
            {renderInput(column)}
          </div>
        </td>
      ))}
    </tr>
  )
}

