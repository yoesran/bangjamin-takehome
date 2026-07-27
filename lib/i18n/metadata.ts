import type { Metadata } from 'next';

import { type Locale, defaultLocale, isLocale, locales } from './config';
import { type Dictionary, getDictionary } from './dictionaries';

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000');

export async function pageMetadata(
  params: Promise<{ locale: string }>,
  path: string,
  title?: (dict: Dictionary) => string,
): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  const heading = title?.(dict);
  const fullTitle = heading ? `${heading} — Bang Jamin` : dict.meta.title;
  const url = `/${locale}${path}`;

  return {
    metadataBase: siteUrl,
    title: fullTitle,
    description: dict.meta.description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
        'x-default': `/${defaultLocale}${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description: dict.meta.description,
      locale,
      type: 'website',
      url,
    },
  };
}
