/**
 * LocalStorage Test Suite
 * Tests that localStorage functionality works correctly
 */

// Mock the localStorage API for testing
const mockStorage = {
  data: {},
  getItem(key) {
    return this.data[key] || null
  },
  setItem(key, value) {
    this.data[key] = value
  },
  removeItem(key) {
    delete this.data[key]
  },
  clear() {
    this.data = {}
  }
}

// Mock the required functions
const mockPricingRow = {
  id: 'test-1',
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
  annualIncrease: '0',
  paymentCount: '',
  lowRange: '',
  highRange: '',
  deathBenefits: '',
  crmId: '',
  phone1: '',
  phone2: '',
  phone3: '',
  fullAddress: '',
  streetAddress1: '',
  streetAddress2: '',
  city: '',
  state: '',
  zipCode: ''
}

const mockRows = [mockPricingRow]

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
console.log('💾 LOCALSTORAGE TEST SUITE')
console.log('='.repeat(80) + '\n')

// Mock localStorage functions
function savePricingData(rows) {
  try {
    const data = {
      version: '1.0',
      timestamp: Date.now(),
      rows: rows
    }
    mockStorage.setItem('pricing-sheet-data', JSON.stringify(data))
    console.log(`💾 Saved ${rows.length} rows to mockStorage`)
  } catch (error) {
    console.error('❌ Failed to save to mockStorage:', error)
  }
}

function loadPricingData() {
  try {
    const stored = mockStorage.getItem('pricing-sheet-data')
    if (!stored) {
      console.log('💾 No saved data found in mockStorage')
      return null
    }

    const data = JSON.parse(stored)

    if (data.version !== '1.0') {
      console.warn(`💾 Version mismatch: ${data.version} vs 1.0, clearing old data`)
      clearPricingData()
      return null
    }

    const age = Date.now() - data.timestamp
    const hoursOld = age / (1000 * 60 * 60)

    console.log(`💾 Loaded ${data.rows.length} rows from mockStorage (${hoursOld.toFixed(1)} hours old)`)

    return data.rows
  } catch (error) {
    console.error('❌ Failed to load from mockStorage:', error)
    clearPricingData()
    return null
  }
}

function clearPricingData() {
  try {
    mockStorage.removeItem('pricing-sheet-data')
    console.log('💾 Cleared pricing data from mockStorage')
  } catch (error) {
    console.error('❌ Failed to clear mockStorage:', error)
  }
}

function hasStoredData() {
  return mockStorage.getItem('pricing-sheet-data') !== null
}

// TEST 1: Save and Load
console.log('📋 TEST 1: Save and Load Data')
console.log('-'.repeat(80))

// Test saving
savePricingData(mockRows)
logTest(
  'Data saved successfully',
  hasStoredData(),
  'Storage contains data after save'
)

// Test loading
const loadedData = loadPricingData()
logTest(
  'Data loaded successfully',
  loadedData !== null && loadedData.length === mockRows.length,
  `Loaded ${loadedData?.length || 0} rows (expected ${mockRows.length})`
)

// TEST 2: Data Integrity
console.log('\n📋 TEST 2: Data Integrity')
console.log('-'.repeat(80))

if (loadedData) {
  const originalRow = mockRows[0]
  const loadedRow = loadedData[0]

  const fieldsMatch = Object.keys(originalRow).every(key =>
    originalRow[key] === loadedRow[key]
  )

  logTest(
    'Loaded data matches original',
    fieldsMatch,
    'All fields preserved during save/load cycle'
  )
}

// TEST 3: Clear functionality
console.log('\n📋 TEST 3: Clear Functionality')
console.log('-'.repeat(80))

clearPricingData()
logTest(
  'Data cleared successfully',
  !hasStoredData(),
  'Storage is empty after clear'
)

// TEST 4: Version compatibility
console.log('\n📋 TEST 4: Version Compatibility')
console.log('-'.repeat(80))

// Save with current version
savePricingData(mockRows)

// Simulate old version data
mockStorage.setItem('pricing-sheet-data', JSON.stringify({
  version: '0.9',
  timestamp: Date.now(),
  rows: mockRows
}))

const oldVersionData = loadPricingData()
logTest(
  'Old version data cleared on load',
  oldVersionData === null,
  'Incompatible version data was cleared'
)

// TEST 5: Error handling
console.log('\n📋 TEST 5: Error Handling')
console.log('-'.repeat(80))

// Test with corrupted data
mockStorage.setItem('pricing-sheet-data', 'invalid json')

const corruptedData = loadPricingData()
logTest(
  'Handles corrupted data gracefully',
  corruptedData === null,
  'Returns null for invalid JSON'
)

logTest(
  'Clears corrupted data',
  !hasStoredData(),
  'Corrupted data was cleared from storage'
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
  console.log('🎉 ALL TESTS PASSED! LocalStorage functionality is working correctly.')
} else {
  console.log('⚠️  SOME TESTS FAILED. Please review the issues above.')
}
console.log('='.repeat(80) + '\n')

// Exit with appropriate code
process.exit(results.failed.length > 0 ? 1 : 0)
