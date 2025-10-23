'use client'

import { useState, useEffect } from 'react'
import UploadData from './UploadData'
import PricingFields, { generateMockData, INITIAL_ROWS } from './pricing-fields'
import type { PricingRow } from './PricingFields'
import { calculatePricingOutputs, shouldRecalculate } from './services/pricingCalculator'
import type { ParsedRow } from './services/calculators'
import { exportToExcel, getExportStats } from './services/calculators'
import { loadPricingData, savePricingData, clearPricingData, hasStoredData, getStorageStats } from './services/localStorage'

export default function PricingSheet() {
  const [rows, setRows] = useState<PricingRow[]>(INITIAL_ROWS)
  const [storageInfo, setStorageInfo] = useState<string>('')

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = loadPricingData()
    if (storedData && storedData.length > 0) {
      setRows(storedData)
      const stats = getStorageStats()
      if (stats) {
        setStorageInfo(`💾 Loaded ${storedData.length} rows (${stats.age})`)
      }
    } else {
      setStorageInfo('')
    }
  }, [])

  // Enhanced setRows that also saves to localStorage
  const updateRows = (newRows: PricingRow[] | ((prevRows: PricingRow[]) => PricingRow[])) => {
    if (typeof newRows === 'function') {
      setRows(prevRows => {
        const result = newRows(prevRows)
        savePricingData(result)
        return result
      })
    } else {
      setRows(newRows)
      savePricingData(newRows)
    }
  }

  const loadMockData = () => {
    const mockData = generateMockData()
    updateRows(mockData)
  }

  const resetData = () => {
    updateRows(INITIAL_ROWS)
  }

  // Hard reset - clears localStorage and refreshes page
  const hardReset = () => {
    clearPricingData()
    window.location.reload()
  }

  const handleRowsParsed = (parsed: ParsedRow[]) => {
    // Map ParsedRow into our PricingRow model
    const mapped: PricingRow[] = parsed.map((p, idx) => ({
      id: `upload-${Date.now()}-${idx}`,
      // Core Pricing Fields
      gender: p.gender || '',
      age: p.age || '',
      firstName: p.firstName || '',
      lastName: p.lastName || '',
      insuranceCompany: p.insuranceCompany || '',
      typeOfPayment: p.typeOfPayment || '',
      paymentFrequency: p.paymentFrequency || '',
      paymentStartDate: p.paymentStartDate || '',
      paymentEndDate: p.paymentEndDate || '',
      paymentAmount: p.paymentAmount || '',
      annualIncrease: p.annualIncrease || '0',
      paymentCount: '',
      lowRange: '',
      highRange: '',
      deathBenefits: '',

      // Contact Fields
      crmId: p.crmId || '',
      phone1: p.phone1 || '',
      phone2: p.phone2 || '',
      phone3: p.phone3 || '',

      // Address Fields
      fullAddress: p.fullAddress || '',
      streetAddress1: p.streetAddress1 || '',
      streetAddress2: p.streetAddress2 || '',
      city: p.city || '',
      state: p.state || '',
      zipCode: p.zipCode || ''
    }))

    updateRows(mapped.length > 0 ? mapped : rows)
  }

  // Manual calculation trigger - only runs when button is clicked
  const runCalculations = () => {
    updateRows(prevRows =>
      prevRows.map(row => {
        // Only calculate if row has required data
        if (row.gender && row.age && row.typeOfPayment && row.paymentStartDate && row.paymentEndDate && row.paymentAmount) {
          const outputs = calculatePricingOutputs(row)
          return {
            ...row,
            paymentCount: outputs.paymentCount,
            lowRange: outputs.lowRange,
            highRange: outputs.highRange,
            deathBenefits: outputs.deathBenefits
          }
        }
        return row
      })
    )
  }

  const updateRow = (id: string, field: keyof PricingRow, value: string) => {
    updateRows(prevRows => {
      return prevRows.map(row => {
        if (row.id === id) {
          return { ...row, [field]: value }
        }
        return row
      })
    })
  }

  const handleDownloadExcel = () => {
    const stats = getExportStats(rows)
    if (stats.validRows === 0) {
      alert('No valid data to export. Please ensure you have data with names and amounts.')
      return
    }

    exportToExcel(rows, {
      includeCalculations: true,
      filename: 'pricing-sheet-all-data'
    })
  }

  const handleDownloadOffersOnly = () => {
    // Filter only rows with valid offers (not "No Offer")
    const offersOnly = rows.filter(row => {
      const hasOffer = row.highRange && row.highRange !== '' && row.highRange !== 'No Offer'
      return hasOffer
    })

    if (offersOnly.length === 0) {
      alert('No offers to export. Please run calculations first and ensure some deals have valid offers.')
      return
    }

    exportToExcel(offersOnly, {
      includeCalculations: true,
      filename: 'pricing-sheet-offers-only'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-3">
      <div className="max-w-full mx-auto">
        <div className="flex justify-between items-center mb-3 md:mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Pricing Sheet</h1>
            {storageInfo && (
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {storageInfo}
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={runCalculations}
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-6 rounded-lg transition-colors shadow-sm"
            >
              ▶ Start Calculations
            </button>
            <button
              onClick={handleDownloadExcel}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors shadow-sm"
            >
              📥 Export Excel
            </button>
            <a
              href="/pricing-sheet/debug"
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors shadow-sm"
            >
              🔍 Debug NPV
            </a>
            <button
              onClick={hardReset}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors shadow-sm"
              title="Clear all data and refresh page"
            >
              🔄 Reset
            </button>
          </div>
        </div>

        {/* Rules Banner */}
        <div className="mb-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Existing Rules</h2>
              <p className="text-sm text-gray-600">Data will be automatically populated when files are uploaded</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <span className="text-2xl font-bold text-blue-600">{rows.filter(row => row.firstName && row.lastName).length}</span>
                <span className="text-sm text-gray-600 ml-2">Active Rules</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Last Updated</div>
                <div className="text-sm font-medium text-gray-900">Today, 2:30 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout - Upload left, Pricing table right */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
          {/* Upload Data Component - Left Sidebar (Compact) */}
          <div className="xl:col-span-2 order-2 xl:order-1">
            <UploadData onLoadMockData={loadMockData} onResetData={resetData} onRowsParsed={handleRowsParsed} />
          </div>

          {/* Pricing Fields Component - Main Area (Expanded) */}
          <div className="xl:col-span-10 order-1 xl:order-2">
            <PricingFields rows={rows} updateRow={updateRow} onExportOffersOnly={handleDownloadOffersOnly} />
          </div>
        </div>
      </div>
    </div>
  )
}
