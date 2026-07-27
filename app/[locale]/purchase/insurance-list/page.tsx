import Link from 'next/link';
import { Suspense } from 'react';

import { ArrowLeft } from 'lucide-react';

import { InsuranceList } from '@/components/purchase/insurance-list';
import { SiteHeader } from '@/components/site-header';
import { defaultLocale, isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { pageMetadata } from '@/lib/i18n/metadata';

export const generateMetadata = ({ params }: { params: Promise<{ locale: string }> }) =>
  pageMetadata(params, '/purchase/insurance-list', (d) => d.insuranceList.title);

export default async function InsuranceListPage({
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
        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
          <Link
            href={`/${locale}/purchase/category`}
            className="text-ink hover:text-primary inline-flex items-center gap-2 font-medium transition-colors"
          >
            <ArrowLeft className="h-5 w-5" /> {dict.common.back}
          </Link>

          <div className="mt-5 flex items-center justify-between">
            <h1 className="font-display text-2xl font-bold text-black">
              {dict.insuranceList.title}
            </h1>
            <span className="bg-grey20 text-grey90 rounded-full px-3 py-1 text-sm font-semibold">
              2/2
            </span>
          </div>

          <div className="mt-6">
            <Suspense
              fallback={<p className="text-grey50 text-sm">{dict.insuranceList.loading}</p>}
            >
              <InsuranceList dict={dict} locale={locale} />
            </Suspense>
          </div>
        </div>
      </main>
    </>
  );
}
