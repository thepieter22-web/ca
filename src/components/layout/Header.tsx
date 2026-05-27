'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'nl';

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href={`/${locale}`} className="text-2xl font-bold text-carpetz-primary">
          Carpetz
        </Link>
        <nav className="flex gap-6">
          <Link href={`/${locale}`} className="text-gray-600 hover:text-carpetz-primary transition-colors">
            {t('home')}
          </Link>
          <Link href={`/${locale}/configurator`} className="bg-carpetz-primary text-white px-4 py-2 rounded-lg hover:bg-carpetz-dark transition-colors">
            {t('configurator')}
          </Link>
          <Link href={locale === 'nl' ? '/fr' : '/nl'} className="text-gray-500 hover:text-carpetz-primary transition-colors text-sm">
            {locale === 'nl' ? 'FR' : 'NL'}
          </Link>
        </nav>
      </div>
    </header>
  );
}
