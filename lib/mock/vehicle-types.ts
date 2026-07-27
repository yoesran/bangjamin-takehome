import type { WheelerType } from './reference';

export type VehicleType = {
  key: 'car' | 'motorcycle' | 'pickup' | 'truck' | 'ev';
  wheelerType: WheelerType;
  isEV: boolean;
};

export const VEHICLE_TYPES: VehicleType[] = [
  { key: 'car', wheelerType: 'fourWheeler', isEV: false },
  { key: 'motorcycle', wheelerType: 'twoWheeler', isEV: false },
  { key: 'pickup', wheelerType: 'fourWheeler', isEV: false },
  { key: 'truck', wheelerType: 'fourWheeler', isEV: false },
  { key: 'ev', wheelerType: 'fourWheeler', isEV: true },
];
