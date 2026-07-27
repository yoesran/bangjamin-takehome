'use client';

import { useState } from 'react';

import type { Dictionary } from '@/lib/i18n/dictionaries';
import { cn } from '@/lib/utils';

export function Faq({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState<number | null>(null);
  const last = dict.faq.items.length - 1;

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto max-w-7xl px-4 py-6">
        <h2 className="font-display bg-linear-[135deg,#1f2937_0%,#374151_100%] bg-clip-text px-4 pt-4 text-center text-[28px] leading-[42px] font-semibold text-transparent sm:text-[2.75rem] sm:leading-[66px]">
          {dict.faq.title}
        </h2>

        <div className="mt-8 rounded-4xl border border-black shadow-[8px_8px_0_0_rgb(65,64,71)]">
          <div className="rounded-4xl border border-[rgba(226,232,240,0.8)] p-1 shadow-[0_4px_20px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.1)] sm:p-1.5">
            {dict.faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="faq-item rounded-3xl">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-btn-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="hover:bg-grey10 flex w-full items-center justify-between gap-6 rounded-3xl bg-white px-6 py-3 text-left text-base font-normal text-black sm:min-h-19.5 sm:py-0"
                    >
                      {item.q}
                      <svg
                        aria-hidden
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        className={cn(
                          'shrink-0 transition-transform duration-300',
                          isOpen && 'rotate-45',
                        )}
                      >
                        <rect width="30" height="30" rx="15" fill="#0F0F0F" />
                        <path
                          d="M15 8v14M8 15h14"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    aria-hidden={!isOpen}
                    className={cn(
                      'w-full overflow-hidden transition-[max-height] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
                      isOpen ? 'max-h-[1000px]' : 'max-h-0',
                    )}
                  >
                    <div className="text-grey90 px-6 pt-1 pb-5 text-sm leading-relaxed">
                      {item.a}
                    </div>
                  </div>
                  {i !== last && <div aria-hidden className="bg-grey20 mx-5 my-2 h-px lg:my-3" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
