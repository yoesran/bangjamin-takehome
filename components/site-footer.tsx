import Image from 'next/image';
import Link from 'next/link';

import { Facebook, Instagram, Mail, MessageCircle, Phone } from 'lucide-react';

import { PRODUCTS, SITE } from '@/lib/content';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';

import { BrandLogo } from './brand-logo';

export function SiteFooter({
  dict,
  locale,
  partnerCta = false,
}: {
  dict: Dictionary;
  locale: Locale;
  partnerCta?: boolean;
}) {
  const p = (path: string) => `/${locale}${path}`;

  return (
    <>
      {partnerCta && (
        <section className="bg-cream py-10 text-center">
          <div className="mx-auto max-w-[824px] px-4">
            <h2 className="font-display text-[20px] leading-[30px] font-semibold">
              {dict.partnerCta.title}
            </h2>
            <p className="text-grey90 mt-4 text-base leading-6">{dict.partnerCta.desc}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <a
                href={SITE.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="flex transition-transform hover:scale-[1.02]"
              >
                <Image
                  src="/brand/play-store-badge.webp"
                  alt="Get it on Google Play"
                  width={256}
                  height={75}
                  className="h-auto w-48 rounded-xl"
                />
              </a>
              <a
                href={SITE.apkDownload}
                target="_blank"
                rel="noopener noreferrer"
                className="flex transition-transform hover:scale-[1.02]"
              >
                <Image
                  src="/brand/android-apk.webp"
                  alt="Download Android APK"
                  width={256}
                  height={75}
                  className="h-auto w-48 rounded-xl"
                />
              </a>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-white">
        <div className="text-grey90 mx-auto max-w-7xl px-8 pt-10 pb-8 sm:px-4 sm:pt-8">
          <BrandLogo className="h-10" />

          <div className="mt-16 grid gap-8 sm:mt-8 sm:grid-cols-2 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="font-bold">{dict.footer.address}</p>
              <p className="mt-2.5 max-w-[608px]">{dict.footer.addressValue}</p>

              <p className="mt-10 font-bold">{dict.footer.contact}</p>
              <ul className="mt-2.5 space-y-4">
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="hover:text-primary flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4 shrink-0" /> {SITE.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${SITE.phone}`}
                    className="hover:text-primary flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4 shrink-0" /> {SITE.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" /> {SITE.whatsapp}{' '}
                    {dict.footer.chatOnly}
                  </a>
                </li>
              </ul>

              <p className="mt-10 font-bold">{dict.footer.hoursLabel}</p>
              <p>{dict.footer.hours}</p>
            </div>

            <div className="md:col-span-4">
              <p className="font-bold">{dict.footer.products}</p>
              <ul className="mt-3 space-y-2">
                {PRODUCTS.map((prod) => (
                  <li key={prod.key}>
                    {prod.href ? (
                      <Link href={p(prod.href)} className="hover:text-primary block">
                        {dict.products[prod.key]}
                      </Link>
                    ) : (
                      <span className="text-grey60">{dict.products[prod.key]}</span>
                    )}
                  </li>
                ))}
              </ul>

              <Image
                src="/brand/ojk-logo.webp"
                alt="OJK"
                width={378}
                height={175}
                className="mt-13.5 h-11 w-auto"
              />
              <p className="mt-2.5">{dict.footer.ojk}</p>

              <div className="mt-7.5 flex gap-4">
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-primary"
                >
                  <Instagram className="h-10.5 w-10.5" strokeWidth={1.5} />
                </a>
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="hover:text-primary"
                >
                  <Facebook className="h-10.5 w-10.5" strokeWidth={1.5} />
                </a>
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="font-bold">{dict.footer.company}</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href={p('/about')} className="hover:text-primary block">
                    {dict.nav.tentang}
                  </Link>
                </li>
                <li>
                  <span className="text-grey60">{dict.footer.blog}</span>
                </li>
                <li>
                  <span className="text-grey60">{dict.footer.konsultasi}</span>
                </li>
                <li>
                  <Link href={p('/claim')} className="hover:text-primary block">
                    {dict.nav.klaim}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <hr className="border-grey20 mt-25" />
          <div className="flex flex-col gap-2 pt-5.5 sm:flex-row sm:items-center sm:gap-16">
            <p>
              © {SITE.years} {SITE.entity}. {dict.footer.rights}
            </p>
            <a
              href={`${SITE.origin}/privacy`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              {dict.footer.privacy}
              <span className="sr-only"> {dict.common.opensExternal}</span>
            </a>
            <a
              href={`${SITE.origin}/terms`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              {dict.footer.terms}
              <span className="sr-only"> {dict.common.opensExternal}</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
