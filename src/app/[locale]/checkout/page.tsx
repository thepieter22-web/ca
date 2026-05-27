import { useTranslations } from 'next-intl';
import CheckoutForm from '@/components/checkout/CheckoutForm';

export default function CheckoutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations('checkout');
  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
      <CheckoutForm locale={locale} />
    </div>
  );
}
