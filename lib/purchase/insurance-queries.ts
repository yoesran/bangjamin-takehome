'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export type CoverageType = 'comprehensive' | 'tlo';

export type Plan = {
  id: string;
  slug: string;
  name: string;
  coverage: CoverageType;
  workshops: number;
  amount: number;
  amountAfterDiscount: number;
};

export type Offers = { vehicle: string; areaCode: string; plans: Plan[] };

export type Workshop = {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  phone: string;
  type: 'AUTHORIZED' | 'NON_AUTHORIZED';
  gmaps: string;
  insurers: string[];
};

export type WorkshopPage = {
  data: Workshop[];
  totalWorkshops: number;
  networkTotal: number;
  totalPage: number;
  nextPage: number | null;
};

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const body = await res.json().catch(() => null);
  if (!res.ok || !body || body.data == null) {
    throw new Error(body?.message ?? `Request failed (${res.status})`);
  }
  return body as T;
}

export const useOffers = (quotationId: string | null) =>
  useQuery({
    queryKey: ['insurers', quotationId],
    queryFn: async () => {
      const body = await getJSON<{ data: Offers }>(`/api/insurers?quotationId=${quotationId}`);
      return body.data;
    },
    enabled: !!quotationId,
    retry: false,
  });

export const useWorkshops = (search: string, type: string) =>
  useInfiniteQuery({
    queryKey: ['workshops', search, type],
    queryFn: ({ pageParam }) =>
      getJSON<WorkshopPage>(
        `/api/workshops?search=${encodeURIComponent(search)}&type=${type}&page=${pageParam}`,
      ),
    initialPageParam: 1,
    getNextPageParam: (last) => last.nextPage,
    placeholderData: (prev) => prev,
  });
