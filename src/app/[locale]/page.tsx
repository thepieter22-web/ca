import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <div>
      <HeroSection locale={locale} />
      <FeaturesSection />
    </div>
  );
}

function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations('home');
  return (
    <section className="bg-carpetz-primary text-white py-24 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('hero_title')}</h1>
      <p className="text-xl mb-8 text-carpetz-light">{t('hero_subtitle')}</p>
      <Link
        href={`/${locale}/configurator`}
        className="bg-white text-carpetz-primary font-semibold px-8 py-4 rounded-lg text-lg hover:bg-carpetz-light transition-colors"
      >
        {t('cta')}
      </Link>
    </section>
  );
}

function FeaturesSection() {
  const t = useTranslations('home');
  const features = [
    { title: t('feature_quality'), desc: t('feature_quality_desc'), icon: '⭐' },
    { title: t('feature_fast'), desc: t('feature_fast_desc'), icon: '🚚' },
    { title: t('feature_custom'), desc: t('feature_custom_desc'), icon: '🎨' },
  ];

  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">{t('features_title')}</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f) => (
          <div key={f.title} className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
