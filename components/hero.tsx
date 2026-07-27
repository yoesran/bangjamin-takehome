'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Car, HeartPulse, MessageCircle, PawPrint, Plane, Sparkles } from 'lucide-react';

import { PRODUCTS, type ProductKey, SITE } from '@/lib/content';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { cn } from '@/lib/utils';

const ICON: Record<ProductKey, typeof Car> = {
  kendaraan: Car,
  hewan: PawPrint,
  kesehatan: HeartPulse,
  perjalanan: Plane,
};

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [selected, setSelected] = useState<ProductKey>('kendaraan');
  const active = PRODUCTS.find((prod) => prod.key === selected);
  const simulateHref = active?.status === 'available' ? active.href : null;
  const p = (path: string) => `/${locale}${path}`;

  return (
    <section className="bg-coral relative overflow-hidden text-white xl:min-h-[901px]">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
        preserveAspectRatio="none"
        viewBox="0 0 1440 800"
        fill="none"
      >
        <path
          d="M-40 300 C 360 180, 520 460, 840 320 S 1320 180, 1520 380"
          stroke="white"
          strokeWidth="46"
          strokeOpacity="0.35"
          fill="none"
        />
        <path
          d="M-40 560 C 300 460, 700 640, 1000 520 S 1360 440, 1520 600"
          stroke="white"
          strokeWidth="30"
          strokeOpacity="0.25"
          fill="none"
        />
      </svg>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden xl:block"
        aria-hidden
      >
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="relative h-0">
            <Image
              src="/brand/cloud.webp"
              alt=""
              width={2572}
              height={1852}
              priority
              className="absolute bottom-0 left-[640px] h-auto w-156 max-w-none"
            />
            <span className="absolute bottom-[600px] left-[660px] text-3xl text-white">✦</span>
            <span className="absolute bottom-[520px] left-[1120px] text-xl text-white/90">✦</span>
            <div className="anim-character pointer-events-auto absolute bottom-0 left-[702px] w-117">
              <Image
                src="/brand/hero-character.webp"
                alt=""
                width={974}
                height={1384}
                priority
                className="hero-character h-auto w-full max-w-none drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-6 pb-10 xl:pb-1.5">
        <h1 className="anim-title font-display text-center text-[34px] leading-[1.5] font-semibold break-words md:text-[66px]">
          {dict.hero.tagline}
        </h1>
        <p className="anim-subtitle text-center text-base leading-normal text-white md:text-[22px] md:leading-[33px]">
          {dict.hero.subtitle}
        </p>

        <div className="anim-character mt-4 flex justify-center md:mt-24 xl:hidden" aria-hidden>
          <div className="relative w-1/2">
            <Image
              src="/brand/wave-arrow.webp"
              alt=""
              width={260}
              height={378}
              className="pointer-events-none absolute right-1/2 -bottom-3 h-auto w-[130px] max-w-none -translate-x-[91px]"
            />
            <Image
              src="/brand/hero-character.webp"
              alt=""
              width={974}
              height={1384}
              priority
              className="hero-character h-auto w-full max-w-none drop-shadow-2xl"
            />
          </div>
        </div>

        <div className="xl:mt-42 xl:w-1/2">
          <div className="anim-cardin">
            <div className="introduce-card text-ink border-ink relative rounded-4xl border bg-white p-6 shadow-[8px_8px_0_0_rgb(65,64,71)] sm:p-8">
              <div
                className="anim-block flex items-center gap-2.5"
                style={{ animationDelay: '600ms' }}
              >
                <StepBadge filled>1</StepBadge>
                <span
                  id="hero-protection-label"
                  className="font-display text-lg leading-6 font-semibold md:text-xl md:leading-7 lg:text-2xl lg:leading-8"
                >
                  {dict.hero.widgetTitle}
                </span>
              </div>
              <div
                role="group"
                aria-labelledby="hero-protection-label"
                className="mt-5 grid grid-cols-2 gap-2 sm:gap-4"
              >
                {PRODUCTS.map((prod, tileIndex) => {
                  const disabled = prod.status !== 'available';
                  const Icon = ICON[prod.key];
                  return (
                    <button
                      key={prod.key}
                      type="button"
                      style={{ animationDelay: `${1000 + tileIndex * 100}ms` }}
                      aria-pressed={selected === prod.key}
                      disabled={disabled}
                      onClick={() => setSelected(prod.key)}
                      className={cn(
                        'anim-tile protection-tile border-grey20 flex flex-col items-center gap-0 rounded-2xl border bg-white p-[13px] text-center sm:flex-row sm:gap-4 sm:text-left',
                        disabled ? 'cursor-not-allowed' : 'hover:border-ink cursor-pointer',
                        selected === prod.key && 'border-ink ring-ink ring-1 ring-inset',
                      )}
                    >
                      <Icon className="text-ink h-6 w-6 shrink-0" strokeWidth={1.6} />
                      <span className="flex flex-col gap-1">
                        <span className="text-ink text-xs leading-3.75 font-medium sm:text-sm sm:leading-[17.5px]">
                          {dict.products[prod.key]}
                        </span>
                        {prod.status === 'available' ? (
                          <span className="border-grey40 text-grey90 inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold whitespace-nowrap">
                            {dict.status.available}{' '}
                            <span aria-hidden className="text-primary">
                              ✦
                            </span>
                          </span>
                        ) : (
                          <span className="border-magenta text-magenta inline-flex w-fit rounded-full border px-2 py-0.5 text-xs font-semibold whitespace-nowrap">
                            {dict.status.comingSoon}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                className="anim-block mt-[35px] flex items-center gap-2.5"
                style={{ animationDelay: '800ms' }}
              >
                <StepBadge>2</StepBadge>
                <span className="font-display text-lg leading-6 font-semibold md:text-xl md:leading-7 lg:text-2xl lg:leading-8">
                  {dict.hero.widgetQuestion}
                </span>
              </div>
              <div className="mt-5 flex items-stretch gap-2 md:gap-4">
                <div className="anim-help flex-1" style={{ animationDelay: '1400ms' }}>
                  {simulateHref ? (
                    <Link
                      href={p(simulateHref)}
                      className="bg-primary hover:bg-primary-light flex h-[72px] flex-col items-center justify-center gap-1.5 rounded-2xl px-3 text-sm font-semibold text-white transition-colors duration-200"
                    >
                      <Sparkles className="h-5 w-5" />
                      {dict.hero.simulasi}
                    </Link>
                  ) : (
                    <span className="bg-grey20 text-grey50 flex h-[72px] flex-col items-center justify-center gap-1.5 rounded-2xl px-3 text-sm font-semibold">
                      <Sparkles className="h-5 w-5" />
                      {dict.hero.simulasi}
                    </span>
                  )}
                  <p className="text-grey90 mt-2 text-center text-sm">
                    <span className="font-bold text-black">35+</span> {dict.hero.statProviders}
                  </p>
                </div>

                <span
                  className="anim-help text-grey60 hidden self-center text-xs sm:block md:w-12 md:text-center"
                  style={{ animationDelay: '1500ms' }}
                >
                  {dict.hero.or}
                </span>

                <div className="anim-help flex-1" style={{ animationDelay: '1600ms' }}>
                  <a
                    href={SITE.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-ink hover:bg-grey90 flex h-[72px] flex-col items-center justify-center gap-1.5 rounded-2xl px-3 text-sm font-semibold text-white transition-colors duration-200"
                  >
                    <MessageCircle className="h-5 w-5" />
                    {dict.hero.konsultasi}
                  </a>
                  <p className="text-grey90 mt-2 text-center text-sm">
                    <span className="font-bold text-black">4k+</span> {dict.hero.statConsult}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepBadge({ children, filled }: { children: React.ReactNode; filled?: boolean }) {
  return (
    <span
      className={cn(
        'font-display grid h-9 w-9 shrink-0 place-items-center rounded-full border text-lg font-medium md:h-10 md:w-10 md:text-base',
        filled ? 'bg-ink border-ink text-white' : 'border-ink text-ink bg-white',
      )}
    >
      {children}
    </span>
  );
}
