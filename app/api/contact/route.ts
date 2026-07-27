import { fail, mockDelay, ok } from '@/lib/mock/api';

type Body = { name?: string; phone?: string; message?: string };

export async function POST(request: Request) {
  await mockDelay(600);
  const body = (await request.json().catch(() => null)) as Body | null;
  if (!body?.name || !body.phone) {
    return fail(400, 'Invalid payload');
  }
  return ok({ received: true }, 'Lead received (mock)');
}
