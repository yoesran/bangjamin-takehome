import type { NextRequest } from 'next/server';

import { fail, mockDelay, ok } from '@/lib/mock/api';
import { type WheelerType, brandsFor } from '@/lib/mock/reference';

export async function GET(request: NextRequest) {
  await mockDelay();
  const wheelerType = request.nextUrl.searchParams.get('wheelerType') as WheelerType | null;
  if (wheelerType !== 'fourWheeler' && wheelerType !== 'twoWheeler') {
    return fail(400, 'wheelerType is required');
  }
  return ok(brandsFor(wheelerType), 'Vehicle Brands Fetched Successfully');
}
