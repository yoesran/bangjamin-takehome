import Image from 'next/image';
import { Fragment } from 'react';

import { Contact } from '@/components/contact';
import { InsurerWall } from '@/components/insurer-wall';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { WhatsappFab } from '@/components/whatsapp-fab';
import { ABOUT_STATS } from '@/lib/content';
import { defaultLocale, isLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { pageMetadata } from '@/lib/i18n/metadata';

export const generateMetadata = ({ params }: { params: Promise<{ locale: string }> }) =>
  pageMetadata(params, '/about', (d) => d.about.title);

const PILLARS = [
  { icon: '/brand/vision.webp', bg: '#d9df50', title: 'visionTitle', body: 'visionBody' },
  { icon: '/brand/mission.webp', bg: '#beb3fa', title: 'missionTitle', body: 'missionBody' },
] as const;

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const t = dict.about;

  return (
    <>
      <SiteHeader dict={dict} locale={locale} />

      <main id="main">
        <section className="bg-lemon">
          <div className="mx-auto max-w-7xl px-4 py-6">
            <p aria-hidden className="pl-24 text-[32px] leading-none sm:pl-96">
              ✧
            </p>
            <h1 className="text-ink text-[32px] leading-12 font-semibold sm:text-[60px] sm:leading-22.5">
              {t.title}
            </h1>
            <p className="text-ink text-base sm:text-[22px] sm:leading-8.25">{t.tagline}</p>
            <p aria-hidden className="text-right text-[22px] leading-none">
              ✧
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-6">
            <ul className="flex flex-col gap-10 md:flex-row">
              {PILLARS.map((pillar) => (
                <li
                  key={pillar.icon}
                  style={{ backgroundColor: pillar.bg }}
                  className="flex-1 rounded-4xl border border-black p-5.25 shadow-[8px_8px_0_0_rgb(65,64,71)]"
                >
                  <Image
                    src={pillar.icon}
                    alt=""
                    width={464}
                    height={464}
                    className="h-20 w-20 sm:h-28 sm:w-28"
                  />
                  <h2 className="text-ink mt-4 text-2xl font-semibold sm:text-[40px] sm:leading-15">
                    {t[pillar.title]}
                  </h2>
                  <p className="text-ink mt-4 text-base sm:text-[22px] sm:leading-8.25">
                    {t[pillar.body]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-6">
            <div className="flex flex-col items-center gap-10 md:flex-row md:justify-between">
              <div className="max-w-171.5 md:mb-10">
                <h2 className="text-ink text-2xl font-semibold xl:text-[40px] xl:leading-15">
                  {t.foundersTitle}
                </h2>
                <p className="text-grey90 mt-2 text-base xl:text-[22px] xl:leading-8.25">
                  {t.foundersLead}
                  <span className="text-primary-strong">{t.founderExperience}</span>
                  {t.foundersLeadAfter}
                </p>
              </div>
              <div className="w-55 shrink-0 pt-1 pb-5 text-center md:w-41 xl:w-55">
                <Image
                  src="/brand/founder.webp"
                  alt=""
                  width={900}
                  height={1264}
                  className="h-auto w-full"
                />
                <p className="text-ink mt-5 text-[22px] leading-8.25 font-bold">{t.founderName}</p>
                <p className="text-grey60 mt-1 text-[16px] leading-6">{t.founderRole}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-cream">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-14 sm:flex-row sm:justify-evenly sm:gap-0">
            {ABOUT_STATS.map((s, i) => (
              <Fragment key={s.key}>
                {i > 0 && (
                  <span aria-hidden className="bg-ink hidden h-16 w-px shrink-0 sm:block" />
                )}
                <div className="text-center sm:text-left">
                  <p className="font-display text-ink text-2xl font-semibold md:text-[40px] md:leading-15">
                    {s.value}
                  </p>
                  <p className="text-ink mt-2 text-base md:text-[22px] md:leading-8.25">
                    {t[s.key]}
                  </p>
                </div>
              </Fragment>
            ))}
          </div>
        </section>

        <div aria-hidden className="h-8 bg-white" />
        <InsurerWall dict={dict} />

        <Contact dict={dict} />
      </main>

      <SiteFooter dict={dict} locale={locale} />
      <WhatsappFab label={dict.common.whatsappFab} />
    </>
  );
}
