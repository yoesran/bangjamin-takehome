import type { NextRequest } from 'next/server';

import { mockDelay } from '@/lib/mock/api';
import { WORKSHOPS, WORKSHOP_TOTAL } from '@/lib/mock/workshops';

const PAGE_SIZE = 6;

export async function GET(request: NextRequest) {
  await mockDelay(400);
  const q = request.nextUrl.searchParams;
  const search = (q.get('search') ?? '').trim().toLowerCase();
  const type = q.get('type') ?? 'all';
  const page = Math.max(1, Number(q.get('page') ?? 1));

  const filtered = WORKSHOPS.filter((w) => {
    if (type !== 'all' && w.type !== type) return false;
    if (!search) return true;
    return (
      w.name.toLowerCase().includes(search) ||
      w.city.toLowerCase().includes(search) ||
      w.area.toLowerCase().includes(search)
    );
  });

  const totalPage = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;

  return Response.json({
    statusCode: 200,
    message: 'Workshops fetched',
    totalWorkshops: filtered.length,
    networkTotal: WORKSHOP_TOTAL,
    currentPage: page,
    totalPage,
    nextPage: page < totalPage ? page + 1 : null,
    data: filtered.slice(start, start + PAGE_SIZE),
  });
}
