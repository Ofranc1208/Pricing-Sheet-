'use client'

import { useState } from 'react'

interface InputFormProps {
  inputs: {
    gender: string
    age: string
    paymentType: string
    paymentAmount: string
    startDate: string
    endDate: string
    firstName?: string
    lastName?: string
    insuranceCompany?: string
  }
  onInputsChange: (inputs: any) => void
  onCalculate: () => void
}

export default function InputForm({ inputs, onInputsChange, onCalculate }: InputFormProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Input Parameters</h2>

      {/* Essential Fields - Always Visible */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Gender</label>
          <select
            value={inputs.gender}
            onChange={(e) => onInputsChange({...inputs, gender: e.target.value})}
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Age</label>
          <input
            type="number"
            value={inputs.age}
            onChange={(e) => onInputsChange({...inputs, age: e.target.value})}
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Payment Type</label>
          <select
            value={inputs.paymentType}
            onChange={(e) => onInputsChange({...inputs, paymentType: e.target.value})}
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="LCP">LCP</option>
            <option value="GP">GP</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Amount</label>
          <input
            type="number"
            step="0.01"
            value={inputs.paymentAmount}
            onChange={(e) => onInputsChange({...inputs, paymentAmount: e.target.value})}
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Start Date</label>
          <input
            type="date"
            value={inputs.startDate}
            onChange={(e) => onInputsChange({...inputs, startDate: e.target.value})}
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">End Date</label>
          <input
            type="date"
            value={inputs.endDate}
            onChange={(e) => onInputsChange({...inputs, endDate: e.target.value})}
            className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Collapsible Details Section */}
      <div className="border-t border-gray-200 pt-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors mb-3"
        >
          <span className={`transform transition-transform ${showDetails ? 'rotate-90' : ''}`}>▶</span>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>

        {showDetails && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-top duration-300">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">First Name</label>
              <input
                type="text"
                value={inputs.firstName || ''}
                onChange={(e) => onInputsChange({...inputs, firstName: e.target.value})}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Last Name</label>
              <input
                type="text"
                value={inputs.lastName || ''}
                onChange={(e) => onInputsChange({...inputs, lastName: e.target.value})}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter last name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Insurance Company</label>
              <input
                type="text"
                value={inputs.insuranceCompany || ''}
                onChange={(e) => onInputsChange({...inputs, insuranceCompany: e.target.value})}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter insurance company"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onCalculate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Calculate & Debug
        </button>
      </div>
    </div>
  )
}

