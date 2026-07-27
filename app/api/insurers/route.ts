import type { NextRequest } from 'next/server';

import { fail, mockDelay, ok } from '@/lib/mock/api';
import { INSURER_PLANS } from '@/lib/mock/insurers';
import { findModel } from '@/lib/mock/models';
import { decodeQuote } from '@/lib/mock/quotes';
import { REGIONS } from '@/lib/mock/reference';
import { DISCOUNT_RATE, computePremium } from '@/lib/premium';

export async function GET(request: NextRequest) {
  await mockDelay(500);
  const quotationId = request.nextUrl.searchParams.get('quotationId');
  if (!quotationId) return fail(400, 'quotationId is required');

  const ref = decodeQuote(quotationId);
  const model = ref && findModel(ref.brandId, ref.vehicleId);
  const region = ref && REGIONS.find((r) => r.code === ref.areaCode);
  if (!ref || !model || !region) return fail(404, 'Quotation not found');

  const { amount: base } = computePremium({
    basePrice: model.basePrice,
    year: ref.year,
    tier: region.tier,
  });

  const plans = INSURER_PLANS.map((p) => {
    const amount = Math.round(base * p.multiplier);
    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      coverage: p.coverage,
      workshops: p.workshops,
      amount,
      amountAfterDiscount: Math.round(amount * (1 - DISCOUNT_RATE)),
    };
  }).sort((a, b) => a.amountAfterDiscount - b.amountAfterDiscount);

  return ok(
    {
      vehicle: `${model.modelName} ${ref.year}`,
      areaCode: ref.areaCode,
      plans,
    },
    'Insurers fetched',
  );
}
