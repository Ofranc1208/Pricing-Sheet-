// ========================================
// 📋 CSV Parser Types
// ========================================

export interface ParsedRow {
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
  // Contact
  crmId?: string
  phone1?: string
  phone2?: string
  phone3?: string
  // Address
  fullAddress?: string
  streetAddress1?: string
  streetAddress2?: string
  city?: string
  state?: string
  zipCode?: string
}

export interface UploadResult {
  success: boolean
  data: ParsedRow[]
  errors: string[]
  warnings: string[]
}
