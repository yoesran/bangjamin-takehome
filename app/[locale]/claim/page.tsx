import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { ClaimFlow } from '@/components/claim/claim-flow';
import { SiteHeader } from '@/components/site-header';
import { WhatsappFab } from '@/components/whatsapp-fab';
import { defaultLocale, isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { pageMetadata } from '@/lib/i18n/metadata';

export const generateMetadata = ({ params }: { params: Promise<{ locale: string }> }) =>
  pageMetadata(params, '/claim', (d) => d.nav.klaim);

export default async function ClaimPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <>
      <div className="hidden md:block">
        <SiteHeader dict={dict} locale={locale} />
      </div>
      <main id="main" data-funnel className="bg-grey10 min-h-screen md:min-h-[calc(100vh-90px)]">
        <div className="mx-auto max-w-270 px-4 pb-8 md:pt-18">
          <Link
            href={`/${locale}`}
            className="hover:text-primary hidden w-fit items-center gap-4 text-black transition-colors md:flex"
          >
            <ArrowLeft className="h-6 w-6" /> {dict.common.back}
          </Link>

          <div className="md:mt-7.5 md:px-4">
            <ClaimFlow dict={dict} locale={locale} />
          </div>
        </div>
      </main>
      <WhatsappFab label={dict.common.whatsappFab} />
    </>
  );
}
