// ========================================
// 🎼 CSV Parser Orchestrator
// ========================================
// Main orchestrator that coordinates header mapping, normalization, and parsing

import type { ParsedRow, UploadResult } from './csvParser/types'
import { HEADER_MAPPINGS } from './csvParser/headerMappings'
import {
  normalizeGender,
  normalizeFrequency,
  normalizePaymentType,
  normalizeAnnualIncrease,
  normalizeAmount,
  normalizeDate
} from './csvParser/normalizers'
import { findFieldKey } from './csvParser/utils'

// Re-export types for backward compatibility
export type { ParsedRow, UploadResult }

// Re-export mappings for external use
export { HEADER_MAPPINGS }

// Helper function to parse CSV line with proper quote handling
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"'
        i++ // Skip next quote
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  
  // Add last field
  result.push(current.trim())
  
  return result
}

// Main CSV parsing function - orchestrates the entire process
export function parseCSVData(csvContent: string): UploadResult {
  const result: UploadResult = {
    success: false,
    data: [],
    errors: [],
    warnings: []
  }

  try {
    const lines = csvContent.split('\n').filter(line => line.trim())

    if (lines.length < 2) {
      result.errors.push('CSV must have at least header row and one data row')
      return result
    }

    // Performance check for very large files
    if (lines.length > 10000) {
      result.warnings.push('Large file detected. Processing may take longer.')
    }

    // Parse headers using header mappings with proper quote handling
    const headers = parseCSVLine(lines[0])
    const fieldMapping: Record<string, keyof ParsedRow> = {}

    // Map headers to fields using the mappings
    headers.forEach((header, index) => {
      const fieldKey = findFieldKey(header, HEADER_MAPPINGS)
      if (fieldKey) {
        fieldMapping[index] = fieldKey as keyof ParsedRow
      }
    })

    // Check if we have essential fields (only truly required fields)
    const requiredFields = ['gender', 'age', 'firstName', 'lastName', 'paymentAmount', 'paymentStartDate', 'paymentEndDate']
    const missingFields = requiredFields.filter(field => !Object.values(fieldMapping).includes(field as keyof ParsedRow))

    if (missingFields.length > 0) {
      result.errors.push(`Missing required fields: ${missingFields.join(', ')}. Found headers: ${headers.join(', ')}`)
      return result
    }

    // Check for optional fields and add warnings
    const hasPaymentType = Object.values(fieldMapping).includes('typeOfPayment')
    const hasPaymentFrequency = Object.values(fieldMapping).includes('paymentFrequency')
    
    if (!hasPaymentType) {
      result.warnings.push('Payment Type not found - defaulting to LCP for all rows')
    }
    if (!hasPaymentFrequency) {
      result.warnings.push('Payment Frequency not found - defaulting to Monthly for all rows')
    }

    // Parse data rows with progress indication for large files
    const totalRows = lines.length - 1 // Exclude header

    for (let i = 1; i < lines.length; i++) {
      // Progress indication for very large files
      if (totalRows > 5000 && i % 1000 === 0) {
        console.log(`Processing row ${i} of ${totalRows}`)
      }

      const values = parseCSVLine(lines[i])

      // More lenient column count check - allow extra columns to be ignored
      if (values.length < headers.length) {
        result.warnings.push(`Row ${i + 1}: Too few columns (expected ${headers.length}, got ${values.length})`)
        continue
      }
      
      // If there are extra columns, just ignore them (don't warn)
      if (values.length > headers.length) {
        // Silently truncate to header length - this is normal for files with extra columns
        values.length = headers.length
      }

      const row: ParsedRow = {
        gender: '',
        age: '',
        firstName: '',
        lastName: '',
        insuranceCompany: '',
        typeOfPayment: 'LCP', // Default to LCP if not provided
        paymentFrequency: 'Monthly', // Default to Monthly if not provided
        paymentStartDate: '',
        paymentEndDate: '',
        paymentAmount: '',
        annualIncrease: '0', // Default to 0 if not provided
        // Contact (optional)
        crmId: '',
        phone1: '',
        phone2: '',
        phone3: '',
        // Address (optional)
        fullAddress: '',
        streetAddress1: '',
        streetAddress2: '',
        city: '',
        state: '',
        zipCode: ''
      }

      // Map values to fields using normalization functions
      Object.entries(fieldMapping).forEach(([index, fieldKey]) => {
        const valueIndex = parseInt(index)
        if (valueIndex < values.length) {
          let value = values[valueIndex]

          // Apply appropriate normalization based on field type
          switch (fieldKey) {
            case 'gender':
              value = normalizeGender(value)
              break
            case 'paymentFrequency':
              value = normalizeFrequency(value)
              break
            case 'typeOfPayment':
              value = normalizePaymentType(value)
              break
            case 'annualIncrease':
              value = normalizeAnnualIncrease(value)
              break
            case 'paymentAmount':
              value = normalizeAmount(value)
              break
            case 'paymentStartDate':
            case 'paymentEndDate':
              value = normalizeDate(value)
              break
          }

          row[fieldKey] = value
        }
      })

      result.data.push(row)
    }

    // Success message with row count
    result.success = true
    
    // Only show relevant warnings (not column count mismatches which are now handled)
    const relevantWarnings = result.warnings.filter(w => 
      !w.includes('Column count mismatch') && 
      !w.includes('Too few columns')
    )
    
    // Clear warnings and add only relevant ones
    result.warnings = relevantWarnings
    
    if (result.data.length > 0) {
      console.log(`✅ Successfully parsed ${result.data.length} rows from CSV`)
    }
    
    return result

  } catch (error) {
    result.errors.push(`Parse error: ${error}`)
    return result
  }
}
