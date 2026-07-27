import { Contact } from '@/components/contact';
import { Faq } from '@/components/faq';
import { Features } from '@/components/features';
import { Hero } from '@/components/hero';
import { InsurerWall } from '@/components/insurer-wall';
import { Sahabat } from '@/components/sahabat';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Testimonials } from '@/components/testimonials';
import { WhatsappFab } from '@/components/whatsapp-fab';
import { defaultLocale, isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { pageMetadata } from '@/lib/i18n/metadata';

export const generateMetadata = ({ params }: { params: Promise<{ locale: string }> }) =>
  pageMetadata(params, '');

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <>
      <SiteHeader dict={dict} locale={locale} />
      <main id="main">
        <Hero dict={dict} locale={locale} />
        <Features dict={dict} />
        <Testimonials dict={dict} />
        <Sahabat dict={dict} />
        <Faq dict={dict} />
        <InsurerWall dict={dict} />
        <Contact dict={dict} />
      </main>
      <SiteFooter dict={dict} locale={locale} partnerCta />
      <WhatsappFab label={dict.common.whatsappFab} />
    </>
  );
}
