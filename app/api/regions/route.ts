import { mockDelay, ok } from '@/lib/mock/api';
import { REGIONS } from '@/lib/mock/reference';

export async function GET() {
  await mockDelay();
  return ok(REGIONS, 'Regions list fetched');
}
