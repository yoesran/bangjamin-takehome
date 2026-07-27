import { mockDelay, ok } from '@/lib/mock/api';
import { VEHICLE_TYPES } from '@/lib/mock/vehicle-types';

export async function GET() {
  await mockDelay();
  return ok(VEHICLE_TYPES, 'MV Types Fetched Successfully');
}
