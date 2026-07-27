import { NextResponse } from 'next/server';

export const mockDelay = (ms = 320) => new Promise((r) => setTimeout(r, ms));

export function ok<T>(data: T, message = 'OK') {
  return NextResponse.json({ statusCode: 200, message, data });
}

export function fail(status: number, message: string) {
  return NextResponse.json({ statusCode: status, message, data: null }, { status });
}
