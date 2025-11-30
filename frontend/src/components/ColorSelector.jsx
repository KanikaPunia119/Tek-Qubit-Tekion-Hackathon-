import React from 'react';
import { Palette } from 'lucide-react';
import { vehicleData } from '../data/vehicleData';

const ColorSelector = ({ selectedColor, onSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Palette size={20} />
        Select Color
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {vehicleData.colors.map(color => (
          <button
            key={color.id}
            onClick={() => onSelect(color.id)}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover-scale ${
              selectedColor === color.id
                ? 'border-blue-600 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div
              className="w-12 h-12 rounded-full shadow-md border-2 border-gray-300"
              style={{ backgroundColor: color.hex }}
            ></div>
            <div className="text-xs font-semibold text-gray-800 text-center">{color.name}</div>
            <div className="text-xs text-gray-500">
              {color.price === 0 ? 'Included' : `+$${color.price}`}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;