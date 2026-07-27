'use client';

import { useMutation, useQuery } from '@tanstack/react-query';

export type WheelerType = 'fourWheeler' | 'twoWheeler';
export type VehicleType = { key: string; wheelerType: WheelerType; isEV: boolean };
export type Region = { code: string; tier: 1 | 2 | 3 };
export type Brand = { id: string; name: string; image: string };
export type Model = { id: string; modelName: string };
export type PremiumResult = {
  quotationId: string;
  title: string;
  image: string;
  amount: number;
  amountAfterDiscount: number;
};

export type PremiumInput = {
  wheelerType: WheelerType;
  isEV: boolean;
  brandId: string;
  vehicleId: string;
  year: number;
  areaCode: string;
  name: string;
  phone: string;
  email: string;
};

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const body = await res.json().catch(() => null);
  if (!res.ok || !body || body.data == null) {
    throw new Error(body?.message ?? `Request failed (${res.status})`);
  }
  return body.data as T;
}

export const useVehicleTypes = () =>
  useQuery({ queryKey: ['mv-types'], queryFn: () => getJSON<VehicleType[]>('/api/mv-types') });

export const useRegions = () =>
  useQuery({ queryKey: ['regions'], queryFn: () => getJSON<Region[]>('/api/regions') });

export const useBrands = (wheelerType: WheelerType | null) =>
  useQuery({
    queryKey: ['brands', wheelerType],
    queryFn: () => getJSON<Brand[]>(`/api/brands?wheelerType=${wheelerType}`),
    enabled: wheelerType != null,
  });

export const useModels = (brandId: string | null, year: number | null, search: string) =>
  useQuery({
    queryKey: ['models', brandId, year, search],
    queryFn: () =>
      getJSON<Model[]>(
        `/api/models?brandId=${brandId}&year=${year}&search=${encodeURIComponent(search)}`,
      ),
    enabled: brandId != null && year != null,
  });

export const usePremium = () =>
  useMutation({
    mutationFn: async (input: PremiumInput): Promise<PremiumResult> => {
      const res = await fetch('/api/premium', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(input),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.data)
        throw new Error(body?.message ?? 'Vehicle Specification Not Saved');
      return body.data as PremiumResult;
    },
  });
