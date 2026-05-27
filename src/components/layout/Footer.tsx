import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="bg-carpetz-text text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Carpetz. {t('rights')}.</p>
        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-white">{t('privacy')}</a>
          <a href="#" className="hover:text-white">{t('terms')}</a>
        </div>
      </div>
    </footer>
  );
}
