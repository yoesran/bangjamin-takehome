'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { MessageCircle, Wrench } from 'lucide-react';

import { SITE } from '@/lib/content';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { formatIDR } from '@/lib/purchase/format';
import { type Plan, useOffers } from '@/lib/purchase/insurance-queries';

import { PlanDetailDialog } from './plan-detail-dialog';
import { WorkshopDialog } from './workshop-dialog';

export function InsuranceList({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.insuranceList;
  const quotationId = useSearchParams().get('q');
  const { data, isLoading, isError } = useOffers(quotationId);
  const [dialog, setDialog] = useState<{ plan: Plan; kind: 'detail' | 'workshops' } | null>(null);

  const waHref = (plan: Plan) => {
    const coverage = plan.coverage === 'comprehensive' ? t.coverageComprehensive : t.coverageTlo;
    const message = t.contactMessage
      .replace('{plan}', plan.name)
      .replace('{coverage}', coverage)
      .replace('{vehicle}', data?.vehicle ?? '-')
      .replace('{price}', formatIDR(plan.amountAfterDiscount));
    return `${SITE.whatsappHref}?text=${encodeURIComponent(message)}`;
  };

  if (!quotationId || isError) {
    return (
      <div className="rounded-4xl border border-black bg-white p-8 text-center">
        <p className="text-ink font-medium">{t.expired}</p>
        <Link
          href={`/${locale}/purchase/category`}
          className="bg-primary hover:bg-primary-light mt-5 inline-block rounded-2xl px-6 py-3 font-semibold text-white transition-colors"
        >
          {t.restart}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data && (
        <p className="text-grey90 text-sm">
          {t.forVehicle}: <span className="text-ink font-semibold">{data.vehicle}</span> · {t.area}:{' '}
          <span className="text-ink font-semibold">{data.areaCode}</span>
        </p>
      )}

      {isLoading ? (
        <>
          <p className="text-grey60 text-sm">{t.loading}</p>
          <ul className="space-y-3">
            {[0, 1, 2].map((i) => (
              <li key={i} className="shimmer h-40 rounded-4xl" />
            ))}
          </ul>
        </>
      ) : (
        <ul className="space-y-3">
          {data?.plans.map((p) => (
            <li key={p.id}>
              <div className="border-grey20 rounded-4xl border bg-white p-5 transition-all duration-300 sm:p-6">
                <div className="flex flex-wrap items-center gap-4">
                  <Image
                    src={`/brand/insurers/${p.slug}.webp`}
                    alt={p.name}
                    width={120}
                    height={75}
                    className="h-12 w-auto max-w-27.5 object-contain"
                  />
                  <div className="flex-1">
                    <p className="text-ink font-display font-semibold">{p.name}</p>
                    <p className="text-grey60 text-xs">
                      {p.coverage === 'comprehensive' ? t.coverageComprehensive : t.coverageTlo}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-grey60 text-sm line-through">{formatIDR(p.amount)}</p>
                    <p className="text-primary font-display text-xl font-bold">
                      {formatIDR(p.amountAfterDiscount)}
                    </p>
                    <p className="text-grey60 text-xs">{t.perYear}</p>
                  </div>
                  <a
                    href={waHref(p)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary hover:bg-primary-light flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold text-white transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {t.contactUs}
                    <span className="sr-only"> — {p.name}</span>
                  </a>
                </div>

                <div className="border-grey20 mt-4 flex flex-wrap gap-2 border-t pt-4">
                  <button
                    type="button"
                    onClick={() => setDialog({ plan: p, kind: 'detail' })}
                    className="border-grey20 hover:border-ink text-ink rounded-2xl border px-4 py-2 text-sm font-semibold transition-colors"
                  >
                    {t.checkDetail}
                    <span className="sr-only"> {p.name}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDialog({ plan: p, kind: 'workshops' })}
                    className="border-grey20 hover:border-ink text-ink flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold transition-colors"
                  >
                    <Wrench className="text-grey50 h-4 w-4" />
                    {p.workshops.toLocaleString('id-ID')} {t.workshopCount}
                    <span className="sr-only"> — {p.name}</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {dialog?.kind === 'detail' && (
        <PlanDetailDialog plan={dialog.plan} dict={dict} onClose={() => setDialog(null)} />
      )}
      {dialog?.kind === 'workshops' && (
        <WorkshopDialog plan={dialog.plan} dict={dict} onClose={() => setDialog(null)} />
      )}
    </div>
  );
}
