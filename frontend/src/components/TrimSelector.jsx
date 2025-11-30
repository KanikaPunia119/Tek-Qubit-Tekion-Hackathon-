import React from 'react';
import { vehicleData } from '../data/vehicleData';

const TrimSelector = ({ modelId, selectedTrim, onSelect }) => {
  const model = vehicleData.models.find(m => m.id === modelId);
  
  if (!model) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Select Trim Level</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {model.trims.map(trim => (
          <button
            key={trim.id}
            onClick={() => onSelect(trim.id)}
            className={`p-4 rounded-lg border-2 transition-all hover-scale ${
              selectedTrim === trim.id
                ? 'border-blue-600 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-semibold text-gray-800 mb-1">{trim.name}</div>
            <div className="text-sm text-gray-600 mb-2">{trim.description}</div>
            <div className="text-sm font-semibold text-blue-600">
              {trim.price === 0 ? 'Included' : `+$${trim.price.toLocaleString()}`}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrimSelector;