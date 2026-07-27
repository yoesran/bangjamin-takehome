'use client';

import Image from 'next/image';

import { X } from 'lucide-react';

import { Dialog } from '@/components/dialog';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { formatIDR } from '@/lib/purchase/format';
import type { PremiumResult } from '@/lib/purchase/queries';

export function PremiumModal({
  result,
  dict,
  onClose,
  onContinue,
}: {
  result: PremiumResult;
  dict: Dictionary;
  onClose: () => void;
  onContinue: () => void;
}) {
  return (
    <Dialog labelledBy="premium-title" onClose={onClose} panelClassName="max-w-md p-8 text-center">
      <button
        type="button"
        onClick={onClose}
        aria-label={dict.common.back}
        className="text-grey40 hover:text-ink absolute top-5 left-5"
      >
        <X className="h-6 w-6" />
      </button>

      <h2 id="premium-title" className="font-display text-ink text-xl font-semibold">
        {dict.purchase.resultTitle}
      </h2>

      <div className="my-6 flex justify-center">
        <Image src={result.image} alt="" width={180} height={140} className="h-auto w-40" />
      </div>

      <p className="text-grey60 text-sm">{dict.purchase.startFrom}</p>
      <p className="text-grey60 text-lg font-medium line-through">{formatIDR(result.amount)}</p>
      <p className="text-primary font-display text-3xl font-bold">
        {formatIDR(result.amountAfterDiscount)}
      </p>

      <button
        type="button"
        onClick={onContinue}
        className="bg-primary hover:bg-primary-light mt-6 w-full rounded-2xl px-4 py-3.5 font-semibold text-white transition-colors"
      >
        {dict.purchase.continue}
      </button>
    </Dialog>
  );
}
