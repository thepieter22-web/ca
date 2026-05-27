import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendOrderConfirmation, sendSupplierOrder } from '@/lib/email';
import { calculatePrice } from '@/lib/pricing';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Get pricing settings
  const { data: settings } = await supabaseAdmin
    .from('settings')
    .select('*');

  const settingsMap: Record<string, any> = {};
  settings?.forEach((s: any) => {
    settingsMap[s.key] = typeof s.value === 'string' ? JSON.parse(s.value) : s.value;
  });

  const pricing = calculatePrice(
    body.width,
    body.height,
    body.quantity,
    {
      price_per_cm2: parseFloat(settingsMap.price_per_cm2 || '0.0045'),
      bulk_discounts: settingsMap.bulk_discounts || [],
      predefined_sizes: settingsMap.predefined_sizes || [],
    }
  );

  const orderData = {
    status: 'pending',
    customer_first_name: body.first_name,
    customer_last_name: body.last_name,
    customer_email: body.email,
    customer_phone: body.phone || null,
    customer_address: body.address,
    customer_city: body.city,
    customer_postal_code: body.postal_code,
    customer_country: body.country || 'BE',
    is_company: body.is_company || false,
    company_name: body.company_name || null,
    vat_number: body.vat_number || null,
    mat_type: body.type,
    mat_placement: body.placement,
    mat_orientation: body.orientation,
    mat_border: body.border,
    mat_width: body.width,
    mat_height: body.height,
    mat_color: body.color,
    logo_color: body.logoColor,
    logo_url: body.logoUrl || null,
    quantity: body.quantity,
    price_excl_vat: pricing.exclVat,
    vat_amount: pricing.vatAmount,
    price_incl_vat: pricing.inclVat,
    locale: body.locale || 'nl',
  };

  const { data: order, error } = await supabaseAdmin
    .from('orders')
    .insert(orderData)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Send emails
  try {
    await sendOrderConfirmation(order);
    await sendSupplierOrder(order);
    await supabaseAdmin
      .from('orders')
      .update({ supplier_pdf_sent: true })
      .eq('id', order.id);
  } catch (emailError: any) {
    await supabaseAdmin
      .from('orders')
      .update({ supplier_error: emailError.message })
      .eq('id', order.id);
  }

  return NextResponse.json(order);
}
