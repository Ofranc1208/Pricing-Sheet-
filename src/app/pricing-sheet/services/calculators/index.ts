// ========================================
// 📦 Calculators Index
// ========================================
// Central export point for all calculator modules

// Validation
export {
  isValidInputRow,
  isValidAge,
  isValidGender,
  isValidPaymentType,
  isValidAmount,
  isValidDateRange
} from './validation'

// Risk Adjustment
export {
  getLCPKeys,
  getRiskAdjustment,
  getAgeBand
} from './riskAdjustment'

// NPV Calculations
export {
  calculateMinMaxOffers,
  calculateDeathBenefits,
  getBaseDiscountRate
} from './npvCalculator'

// Batch Processing
export {
  calculateAllPricingOutputs,
  shouldRecalculate,
  getRowsNeedingRecalculation
} from './batchCalculator'

// Payment Count
export {
  calculatePaymentCount
} from './paymentCount'

// Death Benefit (Max PV Exposure)
export {
  calculateDeathBenefitMaxPV
} from './deathBenefit'

// CSV Parser (for upload functionality)
export {
  parseCSVData,
  type ParsedRow,
  type UploadResult,
  HEADER_MAPPINGS
} from '../csvParser'

// Excel Export (for download functionality)
export {
  exportToExcel,
  getExportStats
} from '../excelExporter'
