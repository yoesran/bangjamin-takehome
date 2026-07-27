import Image from 'next/image';

import type { Dictionary } from '@/lib/i18n/dictionaries';

const CARDS = [
  { key: 'fair', img: '/brand/feat-transparent.webp', w: 1280, h: 1160 },
  { key: 'policy', img: '/brand/feat-policy.webp', w: 1280, h: 1160 },
  { key: 'claim', img: '/brand/feat-claim.webp', w: 1280, h: 1200 },
] as const;

export function Features({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <h2 className="font-display px-4 pt-4 pb-[22px] text-center text-[28px] leading-[42px] font-semibold text-black sm:text-[2.75rem] sm:leading-[66px]">
          {dict.features.title}
        </h2>

        <ul className="grid gap-4 pt-4 pb-6 sm:grid-cols-3 sm:gap-0 sm:p-10 sm:pb-14">
          {CARDS.map((card, cardIndex) => {
            const item = dict.features[card.key];
            return (
              <li
                key={card.key}
                style={{ animationDelay: `${200 + cardIndex * 200}ms` }}
                className="anim-feature group flex flex-col items-center gap-5.5"
              >
                <Image
                  src={card.img}
                  alt=""
                  width={card.w}
                  height={card.h}
                  className="h-auto w-[45%] max-w-[292px] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] sm:w-3/4"
                />
                <div className="mx-auto w-full px-12 text-center transition-transform duration-300 group-hover:translate-y-1 sm:px-2 lg:w-3/4 lg:px-6">
                  <h3 className="font-display text-[18px] leading-[27px] font-semibold text-black transition-transform duration-300 group-hover:scale-105 sm:text-[28px] sm:leading-[42px]">
                    {item.title}
                  </h3>
                  <p className="text-grey90 mt-2 text-base leading-6 transition-transform duration-300 group-hover:scale-[1.02]">
                    {item.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
