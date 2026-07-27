import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { VehicleForm } from '@/components/purchase/vehicle-form';
import { SiteHeader } from '@/components/site-header';
import { defaultLocale, isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { pageMetadata } from '@/lib/i18n/metadata';

export const generateMetadata = ({ params }: { params: Promise<{ locale: string }> }) =>
  pageMetadata(params, '/purchase/category', (d) => d.purchase.title);

export default async function PurchaseCategoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <>
      <SiteHeader dict={dict} locale={locale} />
      <main id="main" data-funnel className="bg-grey10 min-h-[calc(100vh-90px)]">
        <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
          <Link
            href={`/${locale}`}
            className="text-ink hover:text-primary inline-flex items-center gap-2 font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5" /> {dict.common.back}
          </Link>

          <div className="mt-5 flex items-center justify-between">
            <h1 className="font-display text-2xl font-bold text-black">{dict.purchase.title}</h1>
            <span className="bg-grey20 text-grey90 rounded-full px-3 py-1 text-sm font-semibold">
              1/2
            </span>
          </div>

          <div className="mt-6 rounded-[32px] border border-black bg-white p-6 sm:p-8">
            <VehicleForm dict={dict} locale={locale} />
          </div>
        </div>
      </main>
    </>
  );
}
