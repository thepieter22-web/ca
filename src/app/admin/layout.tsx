import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-6 py-4 flex gap-6 items-center">
        <span className="font-bold text-carpetz-primary text-lg">Carpetz Admin</span>
        <a href="/admin" className="text-gray-600 hover:text-carpetz-primary">Dashboard</a>
        <a href="/admin/bestellingen" className="text-gray-600 hover:text-carpetz-primary">Bestellingen</a>
        <a href="/admin/instellingen" className="text-gray-600 hover:text-carpetz-primary">Instellingen</a>
      </nav>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
