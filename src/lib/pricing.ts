import { PricingSettings } from '@/types';

export function calculatePrice(
  width: number,
  height: number,
  quantity: number,
  settings: PricingSettings
): { exclVat: number; vatAmount: number; inclVat: number } {
  const area = width * height;
  let pricePerUnit = area * settings.price_per_cm2;

  // Apply bulk discount
  let discountPercent = 0;
  for (const discount of settings.bulk_discounts) {
    if (quantity >= discount.minQuantity) {
      discountPercent = discount.discountPercent;
    }
  }

  pricePerUnit = pricePerUnit * (1 - discountPercent / 100);
  const totalExclVat = pricePerUnit * quantity;
  const vatAmount = totalExclVat * 0.21;
  const totalInclVat = totalExclVat + vatAmount;

  return {
    exclVat: Math.round(totalExclVat * 100) / 100,
    vatAmount: Math.round(vatAmount * 100) / 100,
    inclVat: Math.round(totalInclVat * 100) / 100,
  };
}
