export type MatType = 'comfort' | 'prestige' | 'outdoor';
export type MatPlacement = 'ingang' | 'kantoor' | 'receptie';
export type MatOrientation = 'landscape' | 'portrait';
export type MatBorder = 'geen' | 'standaard' | 'premium';

export interface MatConfig {
  type: MatType;
  placement: MatPlacement;
  orientation: MatOrientation;
  border: MatBorder;
  width: number;
  height: number;
  color: string;
  logoColor: string;
  logoUrl?: string;
  quantity: number;
}

export interface Order {
  id: string;
  created_at: string;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'cancelled';
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_phone?: string;
  customer_address: string;
  customer_city: string;
  customer_postal_code: string;
  customer_country: string;
  is_company: boolean;
  company_name?: string;
  vat_number?: string;
  mat_type: MatType;
  mat_placement: MatPlacement;
  mat_orientation: MatOrientation;
  mat_border: MatBorder;
  mat_width: number;
  mat_height: number;
  mat_color: string;
  logo_color: string;
  logo_url?: string;
  quantity: number;
  price_excl_vat: number;
  vat_amount: number;
  price_incl_vat: number;
  locale: string;
}

export interface PricingSettings {
  price_per_cm2: number;
  bulk_discounts: { minQuantity: number; discountPercent: number }[];
  predefined_sizes: { id: string; width: number; height: number }[];
}
