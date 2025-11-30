export const vehicleData = {
  models: [
    {
      id: 'model-s',
      name: 'Sedan Luxury',
      basePrice: 45000,
      image: '🚗',
      description: 'Premium luxury sedan with advanced features',
      trims: [
        { id: 'base', name: 'Base', price: 0, description: 'Essential features' },
        { id: 'premium', name: 'Premium', price: 5000, description: 'Enhanced comfort' },
        { id: 'sport', name: 'Sport', price: 8000, description: 'Performance oriented' }
      ]
    },
    {
      id: 'suv-x',
      name: 'SUV Adventure',
      basePrice: 55000,
      image: '🚙',
      description: 'Spacious SUV perfect for families',
      trims: [
        { id: 'base', name: 'Base', price: 0, description: 'Family essentials' },
        { id: 'premium', name: 'Premium', price: 6000, description: 'Luxury interior' },
        { id: 'offroad', name: 'Off-Road', price: 10000, description: 'Adventure ready' }
      ]
    },
    {
      id: 'truck-pro',
      name: 'Truck Pro',
      basePrice: 50000,
      image: '🚚',
      description: 'Powerful truck for work and play',
      trims: [
        { id: 'work', name: 'Work', price: 0, description: 'Built for the job' },
        { id: 'luxury', name: 'Luxury', price: 7000, description: 'Premium comfort' },
        { id: 'platinum', name: 'Platinum', price: 12000, description: 'Ultimate luxury' }
      ]
    }
  ],
  
  colors: [
    { id: 'white', name: 'Pearl White', price: 0, hex: '#F8F9FA' },
    { id: 'black', name: 'Midnight Black', price: 500, hex: '#212529' },
    { id: 'blue', name: 'Ocean Blue', price: 800, hex: '#0D6EFD' },
    { id: 'red', name: 'Crimson Red', price: 1000, hex: '#DC3545' },
    { id: 'silver', name: 'Silver Metallic', price: 600, hex: '#ADB5BD' },
    { id: 'green', name: 'Forest Green', price: 900, hex: '#198754' },
    { id: 'gray', name: 'Storm Gray', price: 700, hex: '#6C757D' }
  ],
  
  wheels: [
    { id: '18-standard', name: '18" Standard', price: 0, description: 'Standard alloy wheels' },
    { id: '20-sport', name: '20" Sport', price: 2000, description: 'Performance sport wheels' },
    { id: '22-premium', name: '22" Premium', price: 3500, description: 'Premium chrome wheels' }
  ],
  
  interior: [
    { id: 'cloth', name: 'Cloth', price: 0, description: 'Durable cloth seats' },
    { id: 'leather', name: 'Leather', price: 2500, description: 'Premium leather seats' },
    { id: 'premium', name: 'Premium Leather', price: 4000, description: 'Handcrafted luxury leather' }
  ],
  
  packages: [
    { 
      id: 'tech', 
      name: 'Technology Package', 
      price: 3500, 
      features: ['Navigation System', '360° Camera', 'Parking Sensors', 'Wireless Charging'],
      description: 'Advanced tech features'
    },
    { 
      id: 'safety', 
      name: 'Safety Package', 
      price: 2800, 
      features: ['Blind Spot Monitor', 'Lane Assist', 'Auto Emergency Brake', 'Adaptive Cruise'],
      description: 'Enhanced safety systems'
    },
    { 
      id: 'comfort', 
      name: 'Comfort Package', 
      price: 2200, 
      features: ['Heated Seats', 'Panoramic Sunroof', 'Premium Audio', 'Ambient Lighting'],
      description: 'Luxury comfort features'
    }
  ]
};

export const defaultConfig = {
  model: 'model-s',
  trim: 'base',
  color: 'white',
  wheels: '18-standard',
  interior: 'cloth',
  packages: [],
  lastModifiedBy: 'System'
};