import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { TAGS } from '../constants';

const REVALIDATION_SECRET =
  process.env.REVALIDATION_SECRET || process.env.MEDUSA_REVALIDATION_SECRET;

const resolveEventType = async (req: NextRequest): Promise<string> => {
  const headerEvent =
    req.headers.get('x-medusa-event') ||
    req.headers.get('x-event-name') ||
    req.headers.get('x-webhook-event');

  if (headerEvent) {
    return headerEvent.toLowerCase();
  }

  try {
    const body = await req.json();
    const event = body?.event || body?.type || body?.name || 'unknown';
    return String(event).toLowerCase();
  } catch {
    return 'unknown';
  }
};

export async function revalidate(req: NextRequest): Promise<NextResponse> {
  const secret = req.nextUrl.searchParams.get('secret');

  if (REVALIDATION_SECRET && secret !== REVALIDATION_SECRET) {
    console.error('Invalid revalidation secret.');
    return NextResponse.json({ status: 200 });
  }

  const eventType = await resolveEventType(req);

  if (eventType.includes('collection')) {
    revalidateTag(TAGS.collections);
  }

  if (eventType.includes('product')) {
    revalidateTag(TAGS.products);
  }

  if (eventType.includes('cart')) {
    revalidateTag(TAGS.cart);
  }

  return NextResponse.json({ status: 200, revalidated: true, eventType, now: Date.now() });
}
