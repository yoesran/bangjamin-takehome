'use client';

import Image from 'next/image';

import { ShieldCheck, Truck, Wrench, X } from 'lucide-react';

import { Dialog } from '@/components/dialog';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { formatIDR } from '@/lib/purchase/format';
import type { Plan } from '@/lib/purchase/insurance-queries';

export function PlanDetailDialog({
  plan,
  dict,
  onClose,
}: {
  plan: Plan;
  dict: Dictionary;
  onClose: () => void;
}) {
  const t = dict.insuranceList;
  const isTlo = plan.coverage === 'tlo';

  return (
    <Dialog
      labelledBy="plan-detail-title"
      onClose={onClose}
      panelClassName="flex max-h-[85vh] max-w-lg flex-col"
    >
      <div className="border-grey20 flex items-start justify-between gap-4 border-b p-4 sm:p-6">
        <div className="flex items-center gap-4">
          <Image
            src={`/brand/insurers/${plan.slug}.webp`}
            alt=""
            width={120}
            height={75}
            className="h-10 w-auto max-w-[90px] object-contain"
          />
          <div>
            <h2 id="plan-detail-title" className="font-display font-semibold text-black">
              {plan.name}
            </h2>
            <p className="text-grey60 text-xs">{isTlo ? t.coverageTlo : t.coverageComprehensive}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.close}
          className="text-grey40 hover:text-ink shrink-0"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <p className="text-ink flex items-center gap-2 font-semibold">
          <ShieldCheck className="text-primary h-5 w-5" /> {t.insuranceService}
        </p>
        <ul className="mt-3 space-y-3">
          {[
            { label: t.benefitPartial, covered: !isTlo },
            { label: t.benefitLoss, covered: true },
            { label: t.benefitTheft, covered: true },
          ].map(({ label, covered }) => (
            <li key={label} className="flex items-start justify-between gap-3">
              <span className="text-grey90 text-sm">{label}</span>
              <span
                className={
                  covered
                    ? 'text-whatsapp-dark shrink-0 text-sm font-semibold'
                    : 'text-grey60 shrink-0 text-sm font-semibold'
                }
              >
                {covered ? t.yes : t.notCovered}
              </span>
            </li>
          ))}
        </ul>

        <p className="text-ink mt-6 flex items-center gap-2 font-semibold">
          <Wrench className="text-primary h-5 w-5" /> {t.freeService}
        </p>
        <ul className="mt-3 space-y-4">
          <li>
            <p className="text-ink flex items-center gap-2 text-sm font-semibold">
              <Truck className="text-grey50 h-4 w-4" /> {t.towing}
            </p>
            <p className="text-grey90 mt-1 text-xs leading-relaxed">{t.towingDesc}</p>
          </li>
          <li>
            <p className="text-ink flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="text-grey50 h-4 w-4" /> {t.era}
            </p>
            <p className="text-grey90 mt-1 text-xs leading-relaxed">{t.eraDesc}</p>
          </li>
        </ul>
      </div>

      <div className="border-grey20 flex items-center justify-between gap-4 border-t p-4 sm:p-6">
        <div>
          <p className="text-grey60 text-sm line-through">{formatIDR(plan.amount)}</p>
          <p className="text-primary font-display text-xl font-bold">
            {formatIDR(plan.amountAfterDiscount)}
            <span className="text-grey60 ml-1 text-xs font-normal">{t.perYear}</span>
          </p>
        </div>
      </div>
    </Dialog>
  );
}
