export const CURRENT_YEAR = 2026;
export const DISCOUNT_RATE = 0.25;

export const DEPRECIATION_PER_YEAR = 0.972;

export const RATE_BY_TIER: Record<1 | 2 | 3, number> = {
  1: 0.0319,
  2: 0.0315,
  3: 0.0294,
};

export type PremiumInput = {
  basePrice: number;
  year: number;
  tier: 1 | 2 | 3;
};

export type PremiumResult = { amount: number; amountAfterDiscount: number };

export function sumInsured(basePrice: number, year: number): number {
  const age = Math.max(0, CURRENT_YEAR - year);
  return basePrice * DEPRECIATION_PER_YEAR ** age;
}

export function computePremium({ basePrice, year, tier }: PremiumInput): PremiumResult {
  const amount = Math.round(sumInsured(basePrice, year) * RATE_BY_TIER[tier]);
  const amountAfterDiscount = Math.round(amount * (1 - DISCOUNT_RATE));
  return { amount, amountAfterDiscount };
}
