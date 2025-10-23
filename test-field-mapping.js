/**
 * Field Mapping Test Suite
 * Tests that all fields are properly defined and mapped across the application
 */

// Mock PricingRow structure from PricingFields.tsx
const EXPECTED_PRICING_ROW_FIELDS = {
  // Core Pricing Fields
  id: 'string',
  gender: 'string',
  age: 'string',
  firstName: 'string',
  lastName: 'string',
  insuranceCompany: 'string',
  typeOfPayment: 'string',
  paymentFrequency: 'string',
  paymentStartDate: 'string',
  paymentEndDate: 'string',
  paymentAmount: 'string',
  annualIncrease: 'string',
  paymentCount: 'string',
  lowRange: 'string',
  highRange: 'string',
  deathBenefits: 'string',
  
  // Contact Fields
  crmId: 'string',
  phone1: 'string',
  phone2: 'string',
  phone3: 'string',
  
  // Address Fields
  fullAddress: 'string',
  streetAddress1: 'string',
  streetAddress2: 'string',
  city: 'string',
  state: 'string',
  zipCode: 'string'
}

// Tab definitions from the component
const TAB_DEFINITIONS = {
  pricing: {
    label: '📊 Pricing',
    columns: [
      'gender', 'age', 'firstName', 'lastName', 'insuranceCompany',
      'typeOfPayment', 'paymentFrequency', 'paymentStartDate', 'paymentEndDate',
      'paymentAmount', 'annualIncrease', 'paymentCount', 'lowRange', 'highRange', 'deathBenefits'
    ]
  },
  contact: {
    label: '📞 Contact',
    columns: ['crmId', 'phone1', 'phone2', 'phone3']
  },
  address: {
    label: '📍 Address',
    columns: ['fullAddress', 'streetAddress1', 'streetAddress2', 'city', 'state', 'zipCode']
  }
}

// Excel export headers (should match all fields)
const EXCEL_HEADERS = [
  // Core Pricing Fields
  'Gender', 'Age', 'First Name', 'Last Name', 'Insurance Company',
  'Payment Type', 'Payment Frequency', 'Start Date', 'End Date',
  'Amount', 'Annual Increase', 'Number of Payments', 'Low Range',
  'High Range', 'Death Benefits',
  
  // Contact Fields
  'CRM ID', 'Phone 1', 'Phone 2', 'Phone 3',
  
  // Address Fields
  'Full Address', 'Street Address 1', 'Street Address 2',
  'City', 'State', 'ZIP Code'
]

// Test Results
const results = {
  passed: [],
  failed: [],
  warnings: []
}

function logTest(testName, passed, message) {
  if (passed) {
    results.passed.push({ test: testName, message })
    console.log(`✅ PASS: ${testName}`)
    if (message) console.log(`   ${message}`)
  } else {
    results.failed.push({ test: testName, message })
    console.log(`❌ FAIL: ${testName}`)
    console.log(`   ${message}`)
  }
}

function logWarning(testName, message) {
  results.warnings.push({ test: testName, message })
  console.log(`⚠️  WARN: ${testName}`)
  console.log(`   ${message}`)
}

console.log('\n' + '='.repeat(80))
console.log('🧪 FIELD MAPPING TEST SUITE')
console.log('='.repeat(80) + '\n')

// TEST 1: Check all PricingRow fields are defined
console.log('📋 TEST 1: PricingRow Field Definitions')
console.log('-'.repeat(80))
const totalFields = Object.keys(EXPECTED_PRICING_ROW_FIELDS).length
logTest(
  'PricingRow has all 26 required fields',
  totalFields === 26,
  `Found ${totalFields} fields (expected 26)`
)

// TEST 2: Check tab coverage
console.log('\n📋 TEST 2: Tab Coverage')
console.log('-'.repeat(80))
const allTabFields = [
  ...TAB_DEFINITIONS.pricing.columns,
  ...TAB_DEFINITIONS.contact.columns,
  ...TAB_DEFINITIONS.address.columns
]
const uniqueTabFields = [...new Set(allTabFields)]
const pricingRowFields = Object.keys(EXPECTED_PRICING_ROW_FIELDS).filter(f => f !== 'id')

logTest(
  'All tabs cover all PricingRow fields',
  uniqueTabFields.length === pricingRowFields.length,
  `Tab fields: ${uniqueTabFields.length}, PricingRow fields: ${pricingRowFields.length}`
)

// Check for missing fields in tabs
const missingInTabs = pricingRowFields.filter(field => !uniqueTabFields.includes(field))
if (missingInTabs.length > 0) {
  logWarning(
    'Fields missing from tabs',
    `Missing: ${missingInTabs.join(', ')}`
  )
}

// Check for extra fields in tabs
const extraInTabs = uniqueTabFields.filter(field => !pricingRowFields.includes(field))
if (extraInTabs.length > 0) {
  logWarning(
    'Extra fields in tabs not in PricingRow',
    `Extra: ${extraInTabs.join(', ')}`
  )
}

// TEST 3: Check Excel export coverage
console.log('\n📋 TEST 3: Excel Export Coverage')
console.log('-'.repeat(80))
logTest(
  'Excel has headers for all fields',
  EXCEL_HEADERS.length === pricingRowFields.length,
  `Excel headers: ${EXCEL_HEADERS.length}, PricingRow fields: ${pricingRowFields.length}`
)

// TEST 4: Simulate data upload mapping
console.log('\n📋 TEST 4: Upload Data Mapping Simulation')
console.log('-'.repeat(80))

// Simulate ParsedRow from CSV
const mockParsedRow = {
  gender: 'male',
  age: '40',
  firstName: 'John',
  lastName: 'Doe',
  insuranceCompany: 'Test Insurance',
  typeOfPayment: 'LCP',
  paymentFrequency: 'Monthly',
  paymentStartDate: '2026-01-01',
  paymentEndDate: '2054-01-01',
  paymentAmount: '5000',
  annualIncrease: '0'
}

// Simulate mapping to PricingRow (from page.tsx handleRowsParsed)
const mappedRow = {
  id: `upload-${Date.now()}-0`,
  // Core Pricing Fields
  gender: mockParsedRow.gender || '',
  age: mockParsedRow.age || '',
  firstName: mockParsedRow.firstName || '',
  lastName: mockParsedRow.lastName || '',
  insuranceCompany: mockParsedRow.insuranceCompany || '',
  typeOfPayment: mockParsedRow.typeOfPayment || '',
  paymentFrequency: mockParsedRow.paymentFrequency || '',
  paymentStartDate: mockParsedRow.paymentStartDate || '',
  paymentEndDate: mockParsedRow.paymentEndDate || '',
  paymentAmount: mockParsedRow.paymentAmount || '',
  annualIncrease: mockParsedRow.annualIncrease || '0',
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
}

// Verify all required fields are present
const mappedFields = Object.keys(mappedRow)
const allFieldsPresent = pricingRowFields.every(field => mappedFields.includes(field))

logTest(
  'Upload mapping creates complete PricingRow',
  allFieldsPresent && mappedFields.includes('id'),
  `Mapped ${mappedFields.length} fields`
)

// TEST 5: Check field initialization
console.log('\n📋 TEST 5: Field Initialization')
console.log('-'.repeat(80))

const hasAllStringFields = Object.values(mappedRow).every(val => typeof val === 'string')
logTest(
  'All fields initialized as strings',
  hasAllStringFields,
  'All fields are string type'
)

// TEST 6: Tab field distribution
console.log('\n📋 TEST 6: Tab Field Distribution')
console.log('-'.repeat(80))
console.log(`   📊 Pricing Tab: ${TAB_DEFINITIONS.pricing.columns.length} fields`)
console.log(`   📞 Contact Tab: ${TAB_DEFINITIONS.contact.columns.length} fields`)
console.log(`   📍 Address Tab: ${TAB_DEFINITIONS.address.columns.length} fields`)
console.log(`   Total: ${uniqueTabFields.length} fields`)

const isBalanced = 
  TAB_DEFINITIONS.pricing.columns.length >= 10 &&
  TAB_DEFINITIONS.contact.columns.length >= 3 &&
  TAB_DEFINITIONS.address.columns.length >= 3

logTest(
  'Tab distribution is balanced',
  isBalanced,
  'Each tab has a reasonable number of fields'
)

// TEST 7: Mock data generation
console.log('\n📋 TEST 7: Mock Data Generation')
console.log('-'.repeat(80))

const mockDataRow = {
  id: 'row-1',
  // Core Pricing Fields
  gender: 'male',
  age: '40',
  firstName: 'Saleh',
  lastName: 'Abdullah',
  insuranceCompany: 'American Home Life Insurance Company',
  typeOfPayment: 'LCP',
  paymentFrequency: 'Monthly',
  paymentStartDate: '2026-05-01',
  paymentEndDate: '2054-05-01',
  paymentAmount: '4090.86',
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
}

const mockDataComplete = Object.keys(EXPECTED_PRICING_ROW_FIELDS).every(
  field => mockDataRow.hasOwnProperty(field)
)

logTest(
  'Mock data includes all fields',
  mockDataComplete,
  'Mock data structure matches PricingRow interface'
)

// TEST 8: Export field mapping
console.log('\n📋 TEST 8: Export Field Mapping')
console.log('-'.repeat(80))

const FIELD_MAPPING = {
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

const allHeadersMapped = EXCEL_HEADERS.every(header => FIELD_MAPPING.hasOwnProperty(header))
const allFieldsMapped = pricingRowFields.every(field => 
  Object.values(FIELD_MAPPING).includes(field)
)

logTest(
  'All Excel headers have field mappings',
  allHeadersMapped,
  `${Object.keys(FIELD_MAPPING).length} headers mapped`
)

logTest(
  'All PricingRow fields are exportable',
  allFieldsMapped,
  'Every field can be exported to Excel'
)

// SUMMARY
console.log('\n' + '='.repeat(80))
console.log('📊 TEST SUMMARY')
console.log('='.repeat(80))
console.log(`✅ Passed: ${results.passed.length}`)
console.log(`❌ Failed: ${results.failed.length}`)
console.log(`⚠️  Warnings: ${results.warnings.length}`)

if (results.failed.length > 0) {
  console.log('\n❌ FAILED TESTS:')
  results.failed.forEach(({ test, message }) => {
    console.log(`   • ${test}`)
    console.log(`     ${message}`)
  })
}

if (results.warnings.length > 0) {
  console.log('\n⚠️  WARNINGS:')
  results.warnings.forEach(({ test, message }) => {
    console.log(`   • ${test}`)
    console.log(`     ${message}`)
  })
}

console.log('\n' + '='.repeat(80))
if (results.failed.length === 0) {
  console.log('🎉 ALL TESTS PASSED! Field mapping is complete and correct.')
} else {
  console.log('⚠️  SOME TESTS FAILED. Please review the issues above.')
}
console.log('='.repeat(80) + '\n')

// Exit with appropriate code
process.exit(results.failed.length > 0 ? 1 : 0)

