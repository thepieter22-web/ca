'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useConfiguratorStore } from '@/store/configurator';

const MAT_COLORS = ['#1B5E9E', '#1A1A1A', '#CC0000', '#2E7D32', '#F57F17'];
const LOGO_COLORS = ['#FFFFFF', '#FFD700', '#1B5E9E', '#1A1A1A'];
const PREDEFINED_SIZES = [
  { id: '40x60', width: 40, height: 60 },
  { id: '50x80', width: 50, height: 80 },
  { id: '60x90', width: 60, height: 90 },
  { id: '80x120', width: 80, height: 120 },
  { id: '100x150', width: 100, height: 150 },
];

export default function ConfiguratorForm({ locale }: { locale: string }) {
  const t = useTranslations('configurator');
  const router = useRouter();
  const { config, setConfig } = useConfiguratorStore();

  return (
    <div className="space-y-8">
      {/* Mat Type */}
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">{t('step_mat')}</h2>
        <div className="grid grid-cols-3 gap-4">
          {(['comfort', 'prestige', 'outdoor'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setConfig({ type })}
              className={`p-4 rounded-lg border-2 font-medium transition-all ${
                config.type === type
                  ? 'border-carpetz-primary bg-carpetz-light text-carpetz-primary'
                  : 'border-gray-200 hover:border-carpetz-primary'
              }`}
            >
              {t(`type_${type}` as any)}
            </button>
          ))}
        </div>
      </section>

      {/* Size */}
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">{t('step_size')}</h2>
        <div className="flex flex-wrap gap-3 mb-4">
          {PREDEFINED_SIZES.map((size) => (
            <button
              key={size.id}
              onClick={() => setConfig({ width: size.width, height: size.height })}
              className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                config.width === size.width && config.height === size.height
                  ? 'border-carpetz-primary bg-carpetz-light text-carpetz-primary'
                  : 'border-gray-200 hover:border-carpetz-primary'
              }`}
            >
              {size.width}x{size.height}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t('width')}</label>
            <input
              type="number"
              value={config.width}
              onChange={(e) => setConfig({ width: Number(e.target.value) })}
              className="w-full border rounded-lg px-3 py-2"
              min={30}
              max={200}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('height')}</label>
            <input
              type="number"
              value={config.height}
              onChange={(e) => setConfig({ height: Number(e.target.value) })}
              className="w-full border rounded-lg px-3 py-2"
              min={30}
              max={200}
            />
          </div>
        </div>
      </section>

      {/* Colors */}
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">{t('step_logo')}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">{t('color')}</label>
          <div className="flex gap-3">
            {MAT_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setConfig({ color })}
                className={`w-10 h-10 rounded-full border-4 transition-all ${
                  config.color === color ? 'border-carpetz-primary scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('logo_color')}</label>
          <div className="flex gap-3">
            {LOGO_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setConfig({ logoColor: color })}
                className={`w-10 h-10 rounded-full border-4 transition-all ${
                  config.logoColor === color ? 'border-carpetz-primary scale-110' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quantity */}
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">{t('step_order')}</h2>
        <div>
          <label className="block text-sm font-medium mb-1">{t('quantity')}</label>
          <input
            type="number"
            value={config.quantity}
            onChange={(e) => setConfig({ quantity: Number(e.target.value) })}
            className="w-32 border rounded-lg px-3 py-2"
            min={1}
            max={500}
          />
        </div>
      </section>

      <button
        onClick={() => router.push(`/${locale}/checkout`)}
        className="w-full bg-carpetz-primary text-white py-4 rounded-xl text-lg font-semibold hover:bg-carpetz-dark transition-colors"
      >
        {t('order_now')}
      </button>
    </div>
  );
}
