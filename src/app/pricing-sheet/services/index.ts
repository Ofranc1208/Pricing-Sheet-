// ========================================
// 📦 Services Index
// ========================================
// Central export point for all pricing sheet services

// Main calculator orchestrator
export {
  calculatePricingOutputs,
  calculateAllPricingOutputs,
  shouldRecalculate,
  type CalculatedOutputs
} from './pricingCalculator'

// Individual calculator modules (for advanced usage)
export {
  isValidInputRow,
  isValidAge,
  isValidGender,
  isValidPaymentType,
  isValidAmount,
  isValidDateRange,
  getLCPKeys,
  getRiskAdjustment,
  getAgeBand,
  calculateMinMaxOffers,
  calculateDeathBenefits,
  getBaseDiscountRate,
  getRowsNeedingRecalculation
} from './calculators'

