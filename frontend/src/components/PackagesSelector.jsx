import React from 'react';
import { Settings, Check } from 'lucide-react';
import { vehicleData } from '../data/vehicleData';

const PackagesSelector = ({ selectedPackages, onToggle }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Settings size={20} />
        Additional Packages
      </h3>
      <div className="space-y-3">
        {vehicleData.packages.map(pkg => (
          <button
            key={pkg.id}
            onClick={() => onToggle(pkg.id)}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left hover-scale ${
              selectedPackages.includes(pkg.id)
                ? 'border-blue-600 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="font-semibold text-gray-800">{pkg.name}</div>
                  {selectedPackages.includes(pkg.id) && (
                    <Check size={18} className="text-blue-600" />
                  )}
                </div>
                <div className="text-sm text-gray-500 mb-2">{pkg.description}</div>
                <div className="flex flex-wrap gap-1">
                  {pkg.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right ml-4">
                <div className="font-semibold text-blue-600">
                  +${pkg.price.toLocaleString()}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PackagesSelector;