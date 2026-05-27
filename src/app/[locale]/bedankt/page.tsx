import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function BedanktPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations('thankyou');
  return (
    <div className="max-w-xl mx-auto py-24 px-6 text-center">
      <div className="text-6xl mb-6">✅</div>
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <p className="text-gray-600 mb-8">{t('message')}</p>
      <Link
        href={`/${locale}`}
        className="bg-carpetz-primary text-white px-6 py-3 rounded-lg hover:bg-carpetz-dark transition-colors"
      >
        {t('back_home')}
      </Link>
    </div>
  );
}
