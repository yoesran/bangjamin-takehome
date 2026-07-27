export type CoverageType = 'comprehensive' | 'tlo';

export type InsurerPlan = {
  id: string;
  slug: string;
  name: string;
  coverage: CoverageType;
  multiplier: number;
  workshops: number;
};

export const INSURER_PLANS: InsurerPlan[] = [
  {
    id: 'plan-zurich-comp',
    slug: 'zurich',
    name: 'Zurich',
    coverage: 'comprehensive',
    multiplier: 1.0,
    workshops: 612,
  },
  {
    id: 'plan-sinarmas-comp',
    slug: 'sinarmas',
    name: 'Sinarmas',
    coverage: 'comprehensive',
    multiplier: 0.96,
    workshops: 548,
  },
  {
    id: 'plan-tugu-comp',
    slug: 'tugu',
    name: 'Tugu Insurance',
    coverage: 'comprehensive',
    multiplier: 1.04,
    workshops: 421,
  },
  {
    id: 'plan-mag-comp',
    slug: 'mag',
    name: 'MAG',
    coverage: 'comprehensive',
    multiplier: 0.92,
    workshops: 386,
  },
  {
    id: 'plan-brins-comp',
    slug: 'brins',
    name: 'BRINS',
    coverage: 'comprehensive',
    multiplier: 1.02,
    workshops: 334,
  },
  {
    id: 'plan-zurich-tlo',
    slug: 'zurich',
    name: 'Zurich',
    coverage: 'tlo',
    multiplier: 0.38,
    workshops: 612,
  },
  {
    id: 'plan-sinarmas-tlo',
    slug: 'sinarmas',
    name: 'Sinarmas',
    coverage: 'tlo',
    multiplier: 0.35,
    workshops: 548,
  },
  {
    id: 'plan-raksa-tlo',
    slug: 'raksa',
    name: 'Raksa',
    coverage: 'tlo',
    multiplier: 0.33,
    workshops: 297,
  },
];
