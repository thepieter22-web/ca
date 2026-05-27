import { Resend } from 'resend';
import { Order } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation(order: Order) {
  await resend.emails.send({
    from: 'Carpetz <noreply@carpetz.be>',
    to: order.customer_email,
    subject: `Bevestiging bestelling #${order.id.slice(0, 8)}`,
    html: `
      <h1>Bedankt voor je bestelling, ${order.customer_first_name}!</h1>
      <p>We hebben je bestelling ontvangen en gaan er meteen mee aan de slag.</p>
      <h2>Samenvatting</h2>
      <ul>
        <li>Mat: ${order.mat_type} - ${order.mat_width}x${order.mat_height}cm</li>
        <li>Aantal: ${order.quantity}</li>
        <li>Totaal (incl. BTW): €${order.price_incl_vat.toFixed(2)}</li>
      </ul>
      <p>Verwachte leveringstijd: 10-15 werkdagen</p>
    `,
  });
}

export async function sendSupplierOrder(order: Order) {
  const supplierEmail = process.env.SUPPLIER_EMAIL;
  if (!supplierEmail) return;

  await resend.emails.send({
    from: 'Carpetz <orders@carpetz.be>',
    to: supplierEmail,
    subject: `Nieuwe bestelling #${order.id.slice(0, 8)}`,
    html: `
      <h1>Nieuwe bestelling</h1>
      <h2>Klantgegevens</h2>
      <p>${order.customer_first_name} ${order.customer_last_name}<br>
      ${order.customer_address}<br>
      ${order.customer_postal_code} ${order.customer_city}<br>
      ${order.customer_country}</p>
      <h2>Productdetails</h2>
      <ul>
        <li>Type: ${order.mat_type}</li>
        <li>Afmeting: ${order.mat_width}x${order.mat_height}cm</li>
        <li>Kleur: ${order.mat_color}</li>
        <li>Logo kleur: ${order.logo_color}</li>
        <li>Rand: ${order.mat_border}</li>
        <li>Orientatie: ${order.mat_orientation}</li>
        <li>Aantal: ${order.quantity}</li>
        ${order.logo_url ? `<li>Logo: <a href="${order.logo_url}">Download</a></li>` : ''}
      </ul>
    `,
  });
}
