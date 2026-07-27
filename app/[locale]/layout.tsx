import { notFound } from 'next/navigation';

import { type Locale, isLocale, locales } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale as Locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="antialiased">
        <a
          href="#main"
          className="focus:bg-primary sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:px-4 focus:py-2 focus:text-white"
        >
          {getDictionary(locale).common.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
