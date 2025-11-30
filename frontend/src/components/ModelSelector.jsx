import React from 'react';
import { Camera } from 'lucide-react';
import { vehicleData } from '../data/vehicleData';

const ModelSelector = ({ selectedModel, onSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Camera size={20} />
        Select Model
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicleData.models.map(model => (
          <button
            key={model.id}
            onClick={() => onSelect(model.id)}
            className={`p-4 rounded-lg border-2 transition-all hover-scale ${
              selectedModel === model.id
                ? 'border-blue-600 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-4xl mb-2">{model.image}</div>
            <div className="text-sm font-semibold text-gray-800">{model.name}</div>
            <div className="text-xs text-gray-500">${model.basePrice.toLocaleString()}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;