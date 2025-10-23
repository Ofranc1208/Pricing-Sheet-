// ========================================
// 🧮 NPV Calculation Config & Adjustments
// ========================================

// 🔢 Base discount rates (can be modified)
export const BASE_DISCOUNT_RATE = 0.085; // For Guaranteed payments
export const BASE_DISCOUNT_RATE_LCP = 0.085; // For Life-Contingent payments
export const BASE_DISCOUNT_RATE_LUMP_SUM_GUARANTEED = 0.085; // Guaranteed Lump Sum
export const BASE_DISCOUNT_RATE_LUMP_SUM_LCP = 0.085; // Life-Contingent Lump Sum

// 📉 Min/Max payout rate spreads
export const RATE_SPREADS: { min: number; max: number } = {
  min: 0.03,
  max: 0.02
};

// 💸 Fixed Amount Adjustments (for min/max payout)
export const AMOUNT_ADJUSTMENTS: { min: number; max: number } = {
  min: 30000,
  max: 20000
};

// 👨‍👩‍👧‍👦 Family Protection Constants
export const FAMILY_PROTECTION_DISCOUNT_RATE = 0.055;
export const FAMILY_PROTECTION_GUARANTEED = 0.055; // Same as discount rate for guaranteed family protection

// 🧬 Adjustment Factors by Profile
export const adjustmentMap: Record<string, number> = {


  // ⚧️ Gender
  'gender-male': 0,
  'gender-female': -0.01,


  // 🎂 Age Bands
  'age-18-25': 0,
  'age-26-35': 0.01,
  'age-36-45': 0.02,
  'age-46-50': 0.03,
  'age-51-56': 0.045,
  'age-57-65': 0.06
}; 