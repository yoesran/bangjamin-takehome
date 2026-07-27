import type { NextRequest } from 'next/server';

import { fail, mockDelay } from '@/lib/mock/api';
import { modelsForBrand } from '@/lib/mock/models';

const PAGE_SIZE = 30;

export async function GET(request: NextRequest) {
  await mockDelay();
  const q = request.nextUrl.searchParams;
  const brandId = q.get('brandId');
  const year = q.get('year');
  if (!brandId || !year) {
    return fail(400, 'Incomplete parameters. Must have: year, brand, wheeler type');
  }
  const search = (q.get('search') ?? '').trim().toLowerCase();
  const page = Math.max(1, Number(q.get('page') ?? 1));

  const all = modelsForBrand(brandId).filter((m) =>
    search ? m.modelName.toLowerCase().includes(search) : true,
  );
  const totalPage = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const items = all
    .slice(start, start + PAGE_SIZE)
    .map((m) => ({ id: m.id, modelName: m.modelName }));

  return Response.json({
    statusCode: 200,
    message: 'Models list fetched',
    totalModels: all.length,
    currentPageRecords: items.length,
    totalPage,
    previousPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPage ? page + 1 : null,
    data: items,
  });
}
