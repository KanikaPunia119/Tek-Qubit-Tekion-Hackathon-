import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { calculateTotalPrice, calculateMonthlyPayment, getPriceBreakdown } from '../utils/calculations';

const PriceSummary = ({ config }) => {
  const [financing, setFinancing] = useState({
    downPayment: 5000,
    loanTerm: 60,
    interestRate: 4.5
  });

  const totalPrice = calculateTotalPrice(config);
  const monthlyPayment = calculateMonthlyPayment(
    totalPrice,
    financing.downPayment,
    financing.loanTerm,
    financing.interestRate
  );
  const breakdown = getPriceBreakdown(config);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky-sidebar">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <DollarSign size={20} />
        Price Summary
      </h3>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        {breakdown.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm">
            <span className="text-gray-600">{item.label}</span>
            <span className="font-semibold">
              {item.value === 0 ? 'Included' : `$${item.value.toLocaleString()}`}
            </span>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">Total Price</span>
          <span className="text-2xl font-bold text-blue-600">
            ${totalPrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Financing Calculator */}
      <div className="border-t pt-6">
        <h4 className="font-bold text-gray-800 mb-4">Financing Options</h4>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Down Payment: ${financing.downPayment.toLocaleString()}
            </label>
            <input
              type="range"
              min="0"
              max={totalPrice}
              step="1000"
              value={financing.downPayment}
              onChange={(e) => setFinancing({ ...financing, downPayment: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">Loan Term</label>
            <select
              value={financing.loanTerm}
              onChange={(e) => setFinancing({ ...financing, loanTerm: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value={36}>36 months (3 years)</option>
              <option value={48}>48 months (4 years)</option>
              <option value={60}>60 months (5 years)</option>
              <option value={72}>72 months (6 years)</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Interest Rate: {financing.interestRate}%
            </label>
            <input
              type="range"
              min="0"
              max="15"
              step="0.1"
              value={financing.interestRate}
              onChange={(e) => setFinancing({ ...financing, interestRate: Number(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>

        {/* Monthly Payment Display */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Estimated Monthly Payment</div>
          <div className="text-3xl font-bold text-blue-600">
            ${Math.round(monthlyPayment).toLocaleString()}
            <span className="text-lg">/mo</span>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Total to pay: ${Math.round(monthlyPayment * financing.loanTerm + financing.downPayment).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;