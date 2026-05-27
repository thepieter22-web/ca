import { supabaseAdmin } from '@/lib/supabase';

export default async function AdminDashboard() {
  const { data: orders } = await supabaseAdmin
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  const { count: totalOrders } = await supabaseAdmin
    .from('orders')
    .select('*', { count: 'exact', head: true });

  const { data: revenue } = await supabaseAdmin
    .from('orders')
    .select('price_incl_vat')
    .eq('status', 'paid');

  const totalRevenue = revenue?.reduce((sum, o) => sum + o.price_incl_vat, 0) || 0;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Totaal bestellingen</p>
          <p className="text-3xl font-bold text-carpetz-primary">{totalOrders || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-500 text-sm">Omzet (betaald)</p>
          <p className="text-3xl font-bold text-carpetz-primary">€{totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold">Recente bestellingen</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Klant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Bedrag</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders?.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 text-sm font-mono">{order.id.slice(0, 8)}</td>
                <td className="px-6 py-4 text-sm">{order.customer_first_name} {order.customer_last_name}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    order.status === 'paid' ? 'bg-green-100 text-green-700' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">€{order.price_incl_vat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
