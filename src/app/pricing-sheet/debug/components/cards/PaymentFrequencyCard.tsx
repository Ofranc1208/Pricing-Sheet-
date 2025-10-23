import type { PaymentFrequency } from '../../../../../../npvCalculations'

interface PaymentFrequencyCardProps {
  rates: {
    PAYMENT_FREQUENCY: PaymentFrequency
  }
  onRateChange: (field: string, value: PaymentFrequency) => void
}

export default function PaymentFrequencyCard({ rates, onRateChange }: PaymentFrequencyCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="text-sm font-semibold mb-3 text-gray-800">Payment Frequency</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Frequency</span>
          <select
            value={rates.PAYMENT_FREQUENCY}
            onChange={(e) => onRateChange('PAYMENT_FREQUENCY', e.target.value as PaymentFrequency)}
            className="w-full max-w-32 text-sm bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Semiannually">Semiannually</option>
            <option value="Annually">Annually</option>
            <option value="Lump Sum">Lump Sum</option>
          </select>
        </div>
      </div>
    </div>
  )
}

