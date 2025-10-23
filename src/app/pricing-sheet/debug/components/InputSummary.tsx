interface InputSummaryProps {
  inputs: {
    gender: string
    age: number
    ageBand: string
    paymentType: string
    paymentAmount: number
    startDate: string
    endDate: string
    years: number
    totalPayments: number
    totalPaymentAmount: number
  }
}

export default function InputSummary({ inputs }: InputSummaryProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">📊 Input Summary</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        <div className="text-center">
          <div className="text-gray-600 text-sm mb-1">Gender</div>
          <div className="font-medium text-gray-900">{inputs.gender}</div>
        </div>
        <div className="text-center">
          <div className="text-gray-600 text-sm mb-1">Age</div>
          <div className="font-medium text-gray-900">{inputs.age}</div>
          <div className="text-xs text-gray-500">({inputs.ageBand})</div>
        </div>
        <div className="text-center">
          <div className="text-gray-600 text-sm mb-1">Type</div>
          <div className="font-medium text-gray-900">{inputs.paymentType}</div>
        </div>
        <div className="text-center">
          <div className="text-gray-600 text-sm mb-1">Amount</div>
          <div className="font-medium text-gray-900">${inputs.paymentAmount.toFixed(2)}</div>
        </div>
        <div className="text-center">
          <div className="text-gray-600 text-sm mb-1">Duration</div>
          <div className="font-medium text-gray-900">{inputs.years}y</div>
        </div>
        <div className="text-center">
          <div className="text-gray-600 text-sm mb-1">Payments</div>
          <div className="font-medium text-gray-900">{inputs.totalPayments}</div>
        </div>
        <div className="text-center">
          <div className="text-gray-600 text-sm mb-1">Total</div>
          <div className="font-medium text-green-600">${inputs.totalPaymentAmount.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}

