'use client'

import { useState } from 'react'
import type { ParsedRow, UploadResult } from './services/csvParser'
import { parseCSVData } from './services/calculators'

interface UploadDataProps {
  onLoadMockData: () => void
  onResetData: () => void
  onRowsParsed?: (rows: ParsedRow[]) => void
}

export default function UploadData({ onLoadMockData, onResetData, onRowsParsed }: UploadDataProps) {
  const [uploadStatus, setUploadStatus] = useState<string>('')

  async function handleFiles(files: FileList) {
    const file = files[0]
    if (!file) return

    setUploadStatus(`📂 Processing ${file.name}...`)

    const ext = file.name.split('.').pop()?.toLowerCase()

    if (ext === 'csv') {
      const text = await file.text()
      const result: UploadResult = parseCSVData(text)
      if (!result.success) {
        setUploadStatus(`❌ ${result.errors.join('; ')}`)
        return
      }
      
      // Show clean status message
      let statusMsg = `✅ Loaded ${result.data.length} rows`
      if (result.warnings.length > 0) {
        // Only show first 2 warnings to keep it concise
        const warningPreview = result.warnings.slice(0, 2).join('; ')
        statusMsg += ` ⚠️ ${warningPreview}`
        if (result.warnings.length > 2) {
          statusMsg += ` (+ ${result.warnings.length - 2} more)`
        }
      }
      setUploadStatus(statusMsg)
      onRowsParsed?.(result.data)
      return
    }

    if (ext === 'xlsx' || ext === 'xls') {
      try {
        const XLSX = await import('xlsx')
        const arrayBuffer = await file.arrayBuffer()
        const workbook = XLSX.read(arrayBuffer)
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const csv = XLSX.utils.sheet_to_csv(worksheet)
        
        console.log('📊 Excel converted to CSV, first 500 chars:', csv.substring(0, 500))
        
        const result: UploadResult = parseCSVData(csv)
        if (!result.success) {
          setUploadStatus(`❌ ${result.errors.join('; ')}`)
          return
        }
        
        // Show clean status message
        let statusMsg = `✅ Loaded ${result.data.length} rows`
        if (result.warnings.length > 0) {
          // Only show first 2 warnings to keep it concise
          const warningPreview = result.warnings.slice(0, 2).join('; ')
          statusMsg += ` ⚠️ ${warningPreview}`
          if (result.warnings.length > 2) {
            statusMsg += ` (+ ${result.warnings.length - 2} more)`
          }
        }
        setUploadStatus(statusMsg)
        onRowsParsed?.(result.data)
      } catch (e) {
        setUploadStatus(`❌ Error: ${e}`)
      }
      return
    }

    setUploadStatus('❌ Unsupported file type')
  }

  return (
    <div className="bg-white rounded-lg shadow p-2">
      <h2 className="text-sm font-semibold text-gray-900 mb-2">Upload</h2>

      {/* File Upload Area - Ultra Compact */}
      <div className="space-y-2">
        <div
          className="border-2 border-dashed border-gray-300 rounded p-2 text-center hover:border-gray-400 transition-colors cursor-pointer"
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <div className="text-gray-600">
            <p className="font-medium text-xs">CSV/Excel</p>
            <p className="text-[10px]">Click or drag</p>
          </div>
        </div>

        <input
          id="file-upload"
          type="file"
          multiple={false}
          accept=".csv,.xlsx,.xls"
          className="hidden"
          onChange={(e) => {
            const files = e.target.files
            if (files && files.length > 0) {
              handleFiles(files)
            }
          }}
        />

        {/* Upload Instructions - Ultra Compact */}
        <div className="bg-blue-50 rounded p-1.5">
          <p className="text-[10px] text-blue-800">CSV, XLSX, XLS</p>
        </div>

        {/* Action Buttons - Ultra Compact */}
        <div className="space-y-1">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white text-[10px] font-medium py-1 px-1 rounded transition-colors">
            Process
          </button>
          <button
            onClick={onLoadMockData}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-medium py-1 px-1 rounded transition-colors"
          >
            Load Mock
          </button>
          <button
            onClick={onResetData}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] font-medium py-1 px-1 rounded transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Upload Status Display */}
      {uploadStatus && (
        <div className={`mt-2 p-1.5 rounded text-[9px] leading-tight ${
          uploadStatus.includes('✅') ? 'bg-green-50 text-green-800' :
          uploadStatus.includes('❌') ? 'bg-red-50 text-red-800' :
          uploadStatus.includes('📂') ? 'bg-blue-50 text-blue-800' :
          'bg-yellow-50 text-yellow-800'
        }`}>
          {uploadStatus}
        </div>
      )}

      {/* Additional Info - Ultra Compact */}
      <div className="mt-2 bg-yellow-50 rounded p-1.5">
        <p className="text-yellow-800 text-[9px] leading-tight">
          Auto-populates sheet with matching columns
        </p>
      </div>
    </div>
  )
}
