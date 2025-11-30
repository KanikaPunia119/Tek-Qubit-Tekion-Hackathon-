import { vehicleData } from '../data/vehicleData';

export const calculateTotalPrice = (config) => {
  const model = vehicleData.models.find(m => m.id === config.model);
  if (!model) return 0;

  const trim = model.trims.find(t => t.id === config.trim);
  const color = vehicleData.colors.find(c => c.id === config.color);
  const wheels = vehicleData.wheels.find(w => w.id === config.wheels);
  const interior = vehicleData.interior.find(i => i.id === config.interior);
  
  const packagesPrice = config.packages.reduce((sum, pkgId) => {
    const pkg = vehicleData.packages.find(p => p.id === pkgId);
    return sum + (pkg?.price || 0);
  }, 0);

  return (
    model.basePrice +
    (trim?.price || 0) +
    (color?.price || 0) +
    (wheels?.price || 0) +
    (interior?.price || 0) +
    packagesPrice
  );
};

export const calculateMonthlyPayment = (totalPrice, downPayment, loanTerm, interestRate) => {
  const principal = totalPrice - downPayment;
  if (principal <= 0) return 0;
  
  const monthlyRate = interestRate / 100 / 12;
  if (monthlyRate === 0) return principal / loanTerm;
  
  const payment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
    (Math.pow(1 + monthlyRate, loanTerm) - 1);
    
  return payment;
};

export const getPriceBreakdown = (config) => {
  const model = vehicleData.models.find(m => m.id === config.model);
  if (!model) return [];

  const breakdown = [
    { label: 'Base Price', value: model.basePrice }
  ];

  const trim = model.trims.find(t => t.id === config.trim);
  if (trim && trim.price > 0) {
    breakdown.push({ label: `${trim.name} Trim`, value: trim.price });
  }

  const color = vehicleData.colors.find(c => c.id === config.color);
  if (color && color.price > 0) {
    breakdown.push({ label: color.name, value: color.price });
  }

  const wheels = vehicleData.wheels.find(w => w.id === config.wheels);
  if (wheels && wheels.price > 0) {
    breakdown.push({ label: wheels.name, value: wheels.price });
  }

  const interior = vehicleData.interior.find(i => i.id === config.interior);
  if (interior && interior.price > 0) {
    breakdown.push({ label: interior.name, value: interior.price });
  }

  config.packages.forEach(pkgId => {
    const pkg = vehicleData.packages.find(p => p.id === pkgId);
    if (pkg) {
      breakdown.push({ label: pkg.name, value: pkg.price });
    }
  });

  return breakdown;
};