import { useTranslations } from 'next-intl';
import ConfiguratorForm from '@/components/configurator/ConfiguratorForm';

export default function ConfiguratorPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations('configurator');
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">{t('title')}</h1>
      <ConfiguratorForm locale={locale} />
    </div>
  );
}
