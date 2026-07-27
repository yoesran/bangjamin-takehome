import { fail, mockDelay, ok } from '@/lib/mock/api';
import { findModel } from '@/lib/mock/models';
import { encodeQuote } from '@/lib/mock/quotes';
import { REGIONS } from '@/lib/mock/reference';
import { computePremium } from '@/lib/premium';

type Body = {
  wheelerType?: string;
  isEV?: boolean;
  brandId?: string;
  vehicleId?: string;
  year?: number;
  areaCode?: string;
  name?: string;
  phone?: string;
  email?: string;
};

export async function POST(request: Request) {
  await mockDelay(650);
  const body = (await request.json().catch(() => null)) as Body | null;
  if (!body?.brandId || !body.vehicleId || !body.year || !body.areaCode) {
    return fail(400, 'Incomplete vehicle specification');
  }

  const model = findModel(body.brandId, body.vehicleId);
  const region = REGIONS.find((r) => r.code === body.areaCode);
  if (!model || !region) {
    return fail(422, 'Vehicle Specification Not Saved');
  }

  const { amount, amountAfterDiscount } = computePremium({
    basePrice: model.basePrice,
    year: body.year,
    tier: region.tier,
  });

  const quotationId = encodeQuote({
    brandId: body.brandId,
    vehicleId: body.vehicleId,
    year: body.year,
    areaCode: body.areaCode,
  });

  return ok(
    {
      quotationId,
      title: 'Yeay, we have the best deal for you!',
      image: '/brand/premium-calculation.webp',
      amount,
      amountAfterDiscount,
    },
    'Vehicle Specification Saved Successfully',
  );
}
