import { supabaseAdmin } from '@/lib/supabase';

export default async function BestellingenPage() {
  const { data: orders } = await supabaseAdmin
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Bestellingen</h1>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Datum</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Klant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Mat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Bedrag</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders?.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-mono">{order.id.slice(0, 8)}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString('nl-BE')}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div>{order.customer_first_name} {order.customer_last_name}</div>
                  <div className="text-gray-400 text-xs">{order.customer_email}</div>
                </td>
                <td className="px-6 py-4 text-sm">
                  {order.mat_type} {order.mat_width}x{order.mat_height}cm × {order.quantity}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    order.status === 'paid' ? 'bg-green-100 text-green-700' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">€{order.price_incl_vat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
