import React from 'react';
import { vehicleData } from '../data/vehicleData';

const WheelsInterior = ({ selectedWheels, selectedInterior, onWheelsSelect, onInteriorSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Wheels */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Wheels</h3>
        <div className="space-y-2">
          {vehicleData.wheels.map(wheel => (
            <button
              key={wheel.id}
              onClick={() => onWheelsSelect(wheel.id)}
              className={`w-full p-3 rounded-lg border-2 transition-all text-left hover-scale ${
                selectedWheels === wheel.id
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-800">{wheel.name}</div>
                  <div className="text-sm text-gray-500">{wheel.description}</div>
                </div>
                <div className="text-sm font-semibold text-blue-600">
                  {wheel.price === 0 ? 'Included' : `+$${wheel.price.toLocaleString()}`}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interior */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Interior</h3>
        <div className="space-y-2">
          {vehicleData.interior.map(interior => (
            <button
              key={interior.id}
              onClick={() => onInteriorSelect(interior.id)}
              className={`w-full p-3 rounded-lg border-2 transition-all text-left hover-scale ${
                selectedInterior === interior.id
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-gray-800">{interior.name}</div>
                  <div className="text-sm text-gray-500">{interior.description}</div>
                </div>
                <div className="text-sm font-semibold text-blue-600">
                  {interior.price === 0 ? 'Included' : `+$${interior.price.toLocaleString()}`}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WheelsInterior;