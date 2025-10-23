// Mock data utilities for PricingFields
import type { PricingRow } from '../PricingFields'

// Helper function to convert MM/dd/yyyy to yyyy-MM-dd
export const convertToISODate = (dateStr: string): string => {
  const [month, day, year] = dateStr.split('/')
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

// Helper function to clean amount strings
export const cleanAmount = (amountStr: string): string => {
  return amountStr.replace(/[,$]/g, '')
}

export const INITIAL_ROWS: PricingRow[] = Array.from({ length: 5 }, (_, index) => ({
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

// Mock data based on the Excel image provided
export const generateMockData = (): PricingRow[] => {
  const mockRows: PricingRow[] = []

  // Sample data from the Excel image - Updated to 2026+ start dates
  const sampleData = [
    { gender: 'male', age: '40', firstName: 'Saleh', lastName: 'Abdullah', insuranceCompany: 'American Home Life Insurance Company', paymentType: 'LCP', paymentFrequency: 'Monthly', startDate: '5/1/2026', endDate: '5/1/2054', amount: '4090.86', annualIncrease: '0' },
    { gender: 'male', age: '44', firstName: 'Martha', lastName: 'Abreu', insuranceCompany: 'New York Life', paymentType: 'LCP', paymentFrequency: 'Monthly', startDate: '1/2/2026', endDate: '1/2/2054', amount: '4062.82', annualIncrease: '0' },
    { gender: 'male', age: '43', firstName: 'Ramon', lastName: 'Acevedo', insuranceCompany: 'GABC', paymentType: 'GP', paymentFrequency: 'Quarterly', startDate: '9/15/2026', endDate: '9/15/2054', amount: '1800.00', annualIncrease: '2' },
    { gender: 'male', age: '53', firstName: 'Robert', lastName: 'Acken', insuranceCompany: 'John Hancock', paymentType: 'LCP', paymentFrequency: 'Monthly', startDate: '1/1/2026', endDate: '1/1/2043', amount: '4062.82', annualIncrease: '0' },
    { gender: 'female', age: '58', firstName: 'Brian', lastName: 'Ackley', insuranceCompany: 'Symetra', paymentType: 'LCP', paymentFrequency: 'Monthly', startDate: '1/1/2026', endDate: '1/1/2040', amount: '4644.68', annualIncrease: '0' },
    { gender: 'female', age: '36', firstName: 'Bonnie', lastName: 'Acosta', insuranceCompany: 'Transamerica', paymentType: 'LCP', paymentFrequency: 'Monthly', startDate: '9/9/2044', endDate: '9/9/2054', amount: '8470.43', annualIncrease: '3' },
    { gender: 'male', age: '57', firstName: 'John', lastName: 'Adams', insuranceCompany: 'Nationwide', paymentType: 'GP', paymentFrequency: 'Annually', startDate: '10/1/2029', endDate: '10/1/2040', amount: '4500.00', annualIncrease: '1' },
    { gender: 'male', age: '44', firstName: 'Michael', lastName: 'Adams', insuranceCompany: 'Commonwealth', paymentType: 'LCP', paymentFrequency: 'Monthly', startDate: '5/7/2040', endDate: '5/7/2054', amount: '1673.80', annualIncrease: '0' },
    { gender: 'female', age: '55', firstName: 'Sherrie', lastName: 'Adams', insuranceCompany: 'Transamerica', paymentType: 'LCP', paymentFrequency: 'Monthly', startDate: '5/27/2026', endDate: '5/27/2049', amount: '2994.99', annualIncrease: '0' },
    { gender: 'male', age: '52', firstName: 'Jon', lastName: 'Addison', insuranceCompany: 'Symetra', paymentType: 'LCP', paymentFrequency: 'Monthly', startDate: '1/1/2026', endDate: '1/1/2049', amount: '1813.94', annualIncrease: '0' },
  ]

  sampleData.forEach((data, index) => {
    mockRows.push({
      id: `row-${index + 1}`,
      // Core Pricing Fields
      gender: data.gender,
      age: data.age,
      firstName: data.firstName,
      lastName: data.lastName,
      insuranceCompany: data.insuranceCompany,
      typeOfPayment: data.paymentType,
      paymentFrequency: data.paymentFrequency,
      paymentStartDate: convertToISODate(data.startDate),
      paymentEndDate: convertToISODate(data.endDate),
      paymentAmount: cleanAmount(data.amount),
      annualIncrease: data.annualIncrease,
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
    })
  })

  return mockRows
}
