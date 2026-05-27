'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function InstellingenPage() {
  const [pricePerCm2, setPricePerCm2] = useState('0.0045');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from('settings')
      .select('*')
      .eq('key', 'price_per_cm2')
      .single()
      .then(({ data }) => {
        if (data) setPricePerCm2(data.value);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await supabase
      .from('settings')
      .upsert({ key: 'price_per_cm2', value: pricePerCm2 });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Instellingen</h1>
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-md">
        <h2 className="font-semibold mb-4">Prijsinstellingen</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Prijs per cm² (€)</label>
          <input
            type="number"
            value={pricePerCm2}
            onChange={(e) => setPricePerCm2(e.target.value)}
            step="0.0001"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-carpetz-primary text-white px-6 py-2 rounded-lg hover:bg-carpetz-dark transition-colors disabled:opacity-50"
        >
          {saved ? '✓ Opgeslagen' : saving ? 'Bezig...' : 'Opslaan'}
        </button>
      </div>
    </div>
  );
}
