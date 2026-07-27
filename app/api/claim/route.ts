import { fail, mockDelay } from '@/lib/mock/api';

type Body = {
  product?: string;
  policyNumber?: string;
  incidentDate?: string;
  description?: string;
  name?: string;
  phone?: string;
  email?: string;
};

export async function POST(request: Request) {
  await mockDelay(700);
  const body = (await request.json().catch(() => null)) as Body | null;

  if (!body?.product || !body.policyNumber || !body.incidentDate || !body.name || !body.phone) {
    return fail(400, 'Incomplete claim submission');
  }
  if (new Date(body.incidentDate) > new Date()) {
    return fail(422, 'Incident date cannot be in the future');
  }

  return fail(404, 'Policy not found');
}
