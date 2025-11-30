import React from 'react';
import { vehicleData } from '../data/vehicleData';

const VehiclePreview = ({ config }) => {
  const model = vehicleData.models.find(m => m.id === config.model);
  const trim = model?.trims.find(t => t.id === config.trim);
  const color = vehicleData.colors.find(c => c.id === config.color);
if (!model) return null;
return (
<div className="bg-white rounded-xl shadow-md p-8">
<div className="text-center">
<div className="text-9xl mb-4 animate-pulse">{model.image}</div>
<h2 className="text-3xl font-bold text-gray-800 mb-2">{model.name}</h2>
<p className="text-lg text-gray-600 mb-2">{trim?.name} Trim</p>
<p className="text-sm text-gray-500 mb-4">{model.description}</p>
<div 
      className="w-32 h-8 mx-auto mt-4 rounded-full shadow-lg transition-all"
      style={{ backgroundColor: color?.hex }}
    ></div>
    <p className="text-sm font-medium text-gray-700 mt-2">{color?.name}</p>
    
    {config.lastModifiedBy && (
      <p className="text-xs text-gray-400 mt-4">
        Last modified by: <span className="font-semibold text-gray-600">{config.lastModifiedBy}</span>
      </p>
    )}
  </div>
</div>
);
};
export default VehiclePreview;