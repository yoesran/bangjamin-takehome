import Image from 'next/image';

import { TESTIMONIALS } from '@/lib/content';
import type { Dictionary } from '@/lib/i18n/dictionaries';

const CARD: Record<
  (typeof TESTIMONIALS)[number],
  { photo: string; bg: string; w: number; h: number }
> = {
  theo: { photo: '/brand/testi-theo.webp', bg: '#f8d470', w: 916, h: 1256 },
  agustina: { photo: '/brand/testi-agustina.webp', bg: '#d9df50', w: 1028, h: 1208 },
  randy: { photo: '/brand/testi-randy.webp', bg: '#fdf7e9', w: 988, h: 1208 },
  sarjan: { photo: '/brand/testi-sarjan.webp', bg: '#beb3fa', w: 1196, h: 1208 },
};

export function Testimonials({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-cream">
      <div className="relative mx-auto max-w-7xl px-4 py-6">
        <h2 className="font-display px-4 pt-4 pb-[22px] text-center text-[28px] leading-[42px] font-semibold text-black sm:text-[2.75rem] sm:leading-[66px]">
          {dict.testimonials.title}
        </h2>

        <span
          aria-hidden
          className="star-float text-primary/70 absolute top-[76px] right-4 text-[40px] leading-none lg:top-[60px]"
        >
          ✦
        </span>

        <ul className="grid gap-x-8 gap-y-9 py-4 md:grid-cols-2 md:pt-6 md:pb-15">
          {TESTIMONIALS.map((key, i) => {
            const t = dict.testimonials[key];
            const card = CARD[key];
            return (
              <li key={key} className="anim-up" style={{ animationDelay: `${i * 90}ms` }}>
                <figure
                  style={{ background: card.bg }}
                  className="testi-card group relative flex h-[244px] overflow-hidden rounded-4xl border-[1.5px] border-black md:h-[321px]"
                >
                  <Image
                    src={card.photo}
                    alt=""
                    width={card.w}
                    height={card.h}
                    className="testi-photo h-auto w-[112px] self-end object-contain md:w-[160px] xl:w-[208px]"
                  />
                  <QuoteMark />
                  <div className="flex flex-1 flex-col justify-center py-6 pr-4 transition-transform duration-300 group-hover:translate-x-1">
                    <h3 className="font-display text-[18px] leading-[27px] font-semibold text-black transition-transform duration-300 group-hover:scale-105 sm:text-[28px] sm:leading-[42px]">
                      {t.tag}
                    </h3>
                    <blockquote className="mt-1 text-sm leading-[21px] text-black/90 transition-transform duration-300 group-hover:scale-[1.02] sm:text-base sm:leading-6">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-4 pl-6 transition-transform duration-300 group-hover:translate-y-1">
                      <span className="font-display block text-[18px] leading-[27px] font-bold text-black sm:text-[22px] sm:leading-[33px]">
                        {t.name}
                      </span>
                      <span className="block text-sm text-black/60 sm:text-base">{t.role}</span>
                    </figcaption>
                  </div>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function QuoteMark() {
  return (
    <div aria-hidden className="testi-quote absolute top-6 right-8">
      <svg width="68" height="49" viewBox="0 0 68 49" fill="none">
        <g opacity="0.4" fill="#000000" style={{ mixBlendMode: 'overlay' }}>
          <path d="M0 0H29.0134V29.0134H0z" />
          <path d="M38.9863 0H67.9997V29.0134H38.9863z" />
          <path d="M29.013 29.014l-6.8 19.946h-13.6l2.267-19.946h18.133zM68 29.014L61.2 48.96H47.6l2.266-19.946H68z" />
        </g>
      </svg>
    </div>
  );
}
