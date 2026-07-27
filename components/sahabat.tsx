import Image from 'next/image';

import { ArrowRight } from 'lucide-react';

import { SITE } from '@/lib/content';
import type { Dictionary } from '@/lib/i18n/dictionaries';

export function Sahabat({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-lime relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[11%] z-0 h-[520px]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 130"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            opacity="0.3"
            d="M-1 75.42C49.55 62.196 169.54-25.43 162.664 28.225c-8.596 67.07 14.043 48.03 58.067 26.052 44.023-21.977 42.773 41.782 54.372 61.946 11.383 19.788 32.445-72.652 85.897-72.652"
            stroke="#fff"
            strokeWidth="12"
          />
        </svg>
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6">
        <h2 className="font-display px-4 pt-4 pb-[22px] text-center text-[28px] leading-[42px] font-semibold text-black sm:text-[2.75rem] sm:leading-[66px]">
          {dict.sahabat.title}
        </h2>

        <div className="flex flex-col py-4 lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-0">
          <div className="contents lg:col-start-1 lg:row-start-1 lg:block">
            <ul className="order-1 flex flex-wrap gap-4">
              {dict.sahabat.rewards.map((reward) => (
                <li key={reward} className="pb-3 lg:pb-[22px]">
                  <div className="reward-chip flex w-fit items-center gap-2 rounded-xl border border-black bg-white px-3 py-2 shadow-[6.8px_6.8px_0_0_rgba(0,0,0,0.25)] lg:px-4 lg:py-5">
                    <Image
                      src="/brand/check-circle.webp"
                      alt=""
                      width={40}
                      height={40}
                      className="h-6 w-6 shrink-0 rounded-l-[32px] lg:h-10 lg:w-10"
                    />
                    <span className="font-display text-base font-semibold text-black">
                      {reward}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={`${SITE.origin}/partner`}
              target="_blank"
              rel="noopener noreferrer"
              className="sahabat-cta group border-ink bg-ink order-3 mt-9 inline-flex w-fit items-center rounded-2xl border px-[14px] py-3 text-base font-semibold text-white lg:mt-4"
            >
              {dict.sahabat.cta}
              <span className="sr-only"> {dict.common.opensExternal}</span>
              <ArrowRight className="ml-6 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            </a>
          </div>

          <div
            className="order-2 justify-self-start lg:col-start-2 lg:row-start-1 lg:justify-self-start"
            aria-hidden
          >
            <Image
              src="/brand/sahabat-money.webp"
              alt=""
              width={468}
              height={425}
              className="h-auto w-[269px] max-w-full object-contain drop-shadow-xl lg:w-[468px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
