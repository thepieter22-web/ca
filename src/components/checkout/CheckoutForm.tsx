'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useConfiguratorStore } from '@/store/configurator';
import { useState } from 'react';

interface CheckoutData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  is_company: boolean;
  company_name?: string;
  vat_number?: string;
}

export default function CheckoutForm({ locale }: { locale: string }) {
  const t = useTranslations('checkout');
  const router = useRouter();
  const { config } = useConfiguratorStore();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutData>();
  const isCompany = watch('is_company');

  const onSubmit = async (data: CheckoutData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ...config, locale }),
      });
      if (res.ok) {
        router.push(`/${locale}/bedankt`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t('first_name')}</label>
          <input {...register('first_name', { required: true })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('last_name')}</label>
          <input {...register('last_name', { required: true })} className="w-full border rounded-lg px-3 py-2" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{t('email')}</label>
        <input type="email" {...register('email', { required: true })} className="w-full border rounded-lg px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{t('phone')}</label>
        <input {...register('phone')} className="w-full border rounded-lg px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{t('address')}</label>
        <input {...register('address', { required: true })} className="w-full border rounded-lg px-3 py-2" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t('postal_code')}</label>
          <input {...register('postal_code', { required: true })} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t('city')}</label>
          <input {...register('city', { required: true })} className="w-full border rounded-lg px-3 py-2" />
        </div>
      </div>
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" {...register('is_company')} />
          <span className="text-sm font-medium">{t('is_company')}</span>
        </label>
      </div>
      {isCompany && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t('company_name')}</label>
            <input {...register('company_name')} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('vat_number')}</label>
            <input {...register('vat_number')} className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-carpetz-primary text-white py-4 rounded-xl text-lg font-semibold hover:bg-carpetz-dark transition-colors disabled:opacity-50"
      >
        {loading ? '...' : t('submit')}
      </button>
    </form>
  );
}
