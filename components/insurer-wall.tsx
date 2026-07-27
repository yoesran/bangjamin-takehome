import Image from 'next/image';

import { INSURERS } from '@/lib/content';
import type { Dictionary } from '@/lib/i18n/dictionaries';

export function InsurerWall({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-white" aria-labelledby="insurer-wall-title">
      <div className="mx-auto max-w-7xl pb-14 sm:px-4 sm:pb-10">
        <h2 id="insurer-wall-title" className="sr-only">
          {dict.common.insurerWall}
        </h2>
        <ul className="mx-auto grid w-fit grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {INSURERS.map((ins) => (
            <li key={ins.slug}>
              <Image
                src={`/brand/insurers/${ins.slug}.webp`}
                alt={ins.name}
                width={152}
                height={95}
                className="h-[60px] w-24 object-contain sm:h-[95px] sm:w-38"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
